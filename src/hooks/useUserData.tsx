import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SearchHistory {
  id: string;
  origin_sky_id: string;
  origin_name: string;
  destination_sky_id: string;
  destination_name: string;
  departure_date: string;
  return_date?: string;
  adults: number;
  cabin_class: string;
  search_count: number;
  last_searched_at: string;
}

interface FavoriteRoute {
  id: string;
  origin_sky_id: string;
  origin_name: string;
  destination_sky_id: string;
  destination_name: string;
  route_name?: string;
  created_at: string;
}

interface PriceAlert {
  id: string;
  origin_sky_id: string;
  origin_name: string;
  destination_sky_id: string;
  destination_name: string;
  departure_date: string;
  return_date?: string;
  adults: number;
  cabin_class: string;
  target_price: number;
  currency: string;
  is_active: boolean;
  created_at: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [favoriteRoutes, setFavoriteRoutes] = useState<FavoriteRoute[]>([]);
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user data when user changes
  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      // Clear data when user logs out
      setSearchHistory([]);
      setFavoriteRoutes([]);
      setPriceAlerts([]);
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [historyResult, favoritesResult, alertsResult] = await Promise.all([
        supabase
          .from('search_history')
          .select('*')
          .order('last_searched_at', { ascending: false })
          .limit(10),
        supabase
          .from('favorite_routes')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('price_alerts')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
      ]);

      if (historyResult.data) setSearchHistory(historyResult.data);
      if (favoritesResult.data) setFavoriteRoutes(favoritesResult.data);
      if (alertsResult.data) setPriceAlerts(alertsResult.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSearchHistory = async (searchData: Omit<SearchHistory, 'id' | 'user_id' | 'search_count' | 'last_searched_at'>) => {
    if (!user) return;

    try {
      // Check if this search already exists
      const { data: existing } = await supabase
        .from('search_history')
        .select('*')
        .eq('origin_sky_id', searchData.origin_sky_id)
        .eq('destination_sky_id', searchData.destination_sky_id)
        .eq('departure_date', searchData.departure_date)
        .eq('return_date', searchData.return_date || null)
        .eq('adults', searchData.adults)
        .eq('cabin_class', searchData.cabin_class)
        .single();

      if (existing) {
        // Update existing search
        await supabase
          .from('search_history')
          .update({
            search_count: existing.search_count + 1,
            last_searched_at: new Date().toISOString(),
          })
          .eq('id', existing.id);
      } else {
        // Create new search history entry
        await supabase
          .from('search_history')
          .insert({
            user_id: user.id,
            ...searchData,
          });
      }

      // Refresh search history
      fetchUserData();
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const addFavoriteRoute = async (routeData: Omit<FavoriteRoute, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    try {
      await supabase
        .from('favorite_routes')
        .insert({
          user_id: user.id,
          ...routeData,
        });

      fetchUserData();
    } catch (error) {
      console.error('Error adding favorite route:', error);
    }
  };

  const removeFavoriteRoute = async (routeId: string) => {
    try {
      await supabase
        .from('favorite_routes')
        .delete()
        .eq('id', routeId);

      fetchUserData();
    } catch (error) {
      console.error('Error removing favorite route:', error);
    }
  };

  const createPriceAlert = async (alertData: Omit<PriceAlert, 'id' | 'user_id' | 'is_active' | 'created_at'>) => {
    if (!user) return;

    try {
      await supabase
        .from('price_alerts')
        .insert({
          user_id: user.id,
          is_active: true,
          ...alertData,
        });

      fetchUserData();
    } catch (error) {
      console.error('Error creating price alert:', error);
    }
  };

  const togglePriceAlert = async (alertId: string, isActive: boolean) => {
    try {
      await supabase
        .from('price_alerts')
        .update({ is_active: isActive })
        .eq('id', alertId);

      fetchUserData();
    } catch (error) {
      console.error('Error toggling price alert:', error);
    }
  };

  return {
    searchHistory,
    favoriteRoutes,
    priceAlerts,
    loading,
    saveSearchHistory,
    addFavoriteRoute,
    removeFavoriteRoute,
    createPriceAlert,
    togglePriceAlert,
    refreshData: fetchUserData,
  };
};