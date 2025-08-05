import { Cloud, Plane } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-[200px] bg-gradient-to-br from-sky-start to-sky-end overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated clouds */}
        <div className="absolute top-4 left-1/4 opacity-20">
          <Cloud className="w-16 h-16 text-white animate-pulse" />
        </div>
        <div className="absolute top-12 right-1/3 opacity-30">
          <Cloud className="w-12 h-12 text-white animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-8 right-1/4 opacity-25">
          <Cloud className="w-20 h-20 text-white animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Animated plane */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-40">
          <div className="animate-fly">
            <Plane className="w-8 h-8 text-white transform rotate-45" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Find Your Perfect Flight
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
          Compare prices from hundreds of airlines and travel sites to get the best deals on flights worldwide.
        </p>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-8 fill-background"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
};