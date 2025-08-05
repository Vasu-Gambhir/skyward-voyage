-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  preferred_currency TEXT DEFAULT 'USD',
  preferred_locale TEXT DEFAULT 'en-US',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create search history table
CREATE TABLE public.search_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  origin_sky_id TEXT NOT NULL,
  origin_name TEXT NOT NULL,
  destination_sky_id TEXT NOT NULL,
  destination_name TEXT NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE,
  adults INTEGER NOT NULL DEFAULT 1,
  cabin_class TEXT NOT NULL DEFAULT 'economy',
  search_count INTEGER NOT NULL DEFAULT 1,
  last_searched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create favorite routes table
CREATE TABLE public.favorite_routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  origin_sky_id TEXT NOT NULL,
  origin_name TEXT NOT NULL,
  destination_sky_id TEXT NOT NULL,
  destination_name TEXT NOT NULL,
  route_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, origin_sky_id, destination_sky_id)
);

-- Create price alerts table
CREATE TABLE public.price_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  origin_sky_id TEXT NOT NULL,
  origin_name TEXT NOT NULL,
  destination_sky_id TEXT NOT NULL,
  destination_name TEXT NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE,
  adults INTEGER NOT NULL DEFAULT 1,
  cabin_class TEXT NOT NULL DEFAULT 'economy',
  target_price DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_checked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorite_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.price_alerts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for search history
CREATE POLICY "Users can view their own search history" 
ON public.search_history 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own search history" 
ON public.search_history 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own search history" 
ON public.search_history 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own search history" 
ON public.search_history 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for favorite routes
CREATE POLICY "Users can view their own favorite routes" 
ON public.favorite_routes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorite routes" 
ON public.favorite_routes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorite routes" 
ON public.favorite_routes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for price alerts
CREATE POLICY "Users can view their own price alerts" 
ON public.price_alerts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own price alerts" 
ON public.price_alerts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own price alerts" 
ON public.price_alerts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own price alerts" 
ON public.price_alerts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_price_alerts_updated_at
  BEFORE UPDATE ON public.price_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_search_history_user_id ON public.search_history(user_id);
CREATE INDEX idx_search_history_last_searched ON public.search_history(last_searched_at DESC);
CREATE INDEX idx_favorite_routes_user_id ON public.favorite_routes(user_id);
CREATE INDEX idx_price_alerts_user_id ON public.price_alerts(user_id);
CREATE INDEX idx_price_alerts_active ON public.price_alerts(is_active) WHERE is_active = true;