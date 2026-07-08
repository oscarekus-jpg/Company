import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { School, TreePine, Car, Home, Building, ShoppingBag, Heart, Train } from 'lucide-react';

interface WarsawMapProps {
  className?: string;
}

// Mapbox public token
const MAPBOX_TOKEN = 'pk.eyJ1Ijoib3NjYXJ3b3puaWN6a2EiLCJhIjoiY21qaGZoNXQzMTZtYjNlc2h1aWE2c20wcyJ9.iqeGGso0CbvIHFzgIIs3ww';

// Warsaw location data with real POIs
const warsawData = {
  districts: [
    { lng: 21.0067, lat: 52.2319, name: 'Stare Miasto (Old Town)', type: 'Historic', avgRent: '€1,200/mo', walkScore: 95 },
    { lng: 21.0281, lat: 52.2329, name: 'Praga Północ', type: 'Emerging & Artsy', avgRent: '€800/mo', walkScore: 82 },
    { lng: 20.9842, lat: 52.2127, name: 'Mokotów', type: 'Family-Friendly', avgRent: '€1,000/mo', walkScore: 78 },
    { lng: 21.0015, lat: 52.2394, name: 'Żoliborz', type: 'Green & Quiet', avgRent: '€950/mo', walkScore: 75 },
    { lng: 20.9953, lat: 52.2167, name: 'Ochota', type: 'University Area', avgRent: '€850/mo', walkScore: 80 },
    { lng: 21.0355, lat: 52.2482, name: 'Targówek', type: 'Affordable', avgRent: '€650/mo', walkScore: 68 },
  ],
  schools: [
    { lng: 21.0211, lat: 52.2397, name: 'Warsaw University', type: 'University', rating: 4.8 },
    { lng: 20.9894, lat: 52.2106, name: 'SGH Warsaw School of Economics', type: 'University', rating: 4.7 },
    { lng: 21.0156, lat: 52.2289, name: 'International School of Warsaw', type: 'International K-12', rating: 4.6 },
    { lng: 20.9967, lat: 52.2234, name: 'American School of Warsaw', type: 'International K-12', rating: 4.5 },
  ],
  parks: [
    { lng: 21.0356, lat: 52.2151, name: 'Łazienki Park', type: 'Royal Park', size: '76 hectares' },
    { lng: 20.9594, lat: 52.2147, name: 'Pole Mokotowskie', type: 'Urban Park', size: '68 hectares' },
    { lng: 21.0711, lat: 52.2489, name: 'Park Skaryszewski', type: 'Historic Park', size: '58 hectares' },
    { lng: 20.9228, lat: 52.2033, name: 'Las Kabacki', type: 'Forest', size: '920 hectares' },
  ],
  transport: [
    { lng: 21.0031, lat: 52.2289, name: 'Centrum Metro', type: 'Metro M1 & M2', lines: 'M1, M2' },
    { lng: 20.9458, lat: 52.2031, name: 'Wilanowska Metro', type: 'Metro M1', lines: 'M1' },
    { lng: 21.0544, lat: 52.2478, name: 'Stadion Narodowy', type: 'Metro M2', lines: 'M2' },
    { lng: 21.0031, lat: 52.2289, name: 'Warszawa Centralna', type: 'Main Train Station', lines: 'National & International' },
  ],
  healthcare: [
    { lng: 20.9917, lat: 52.2089, name: 'Medicover Hospital', type: 'Private Hospital', rating: 4.5 },
    { lng: 21.0333, lat: 52.2544, name: 'Bródno Hospital', type: 'Public Hospital', rating: 4.0 },
    { lng: 20.9839, lat: 52.2228, name: 'LUX MED', type: 'Medical Center', rating: 4.6 },
  ],
  shopping: [
    { lng: 21.0028, lat: 52.2311, name: 'Złote Tarasy', type: 'Shopping Mall', stores: '200+' },
    { lng: 21.0178, lat: 52.2356, name: 'Galeria Mokotów', type: 'Shopping Mall', stores: '180+' },
    { lng: 20.9842, lat: 52.1894, name: 'Westfield Arkadia', type: 'Shopping Center', stores: '230+' },
  ],
};

const categoryColors: Record<string, string> = {
  districts: '#14b8a6',
  schools: '#f59e0b',
  parks: '#22c55e',
  transport: '#6366f1',
  healthcare: '#ef4444',
  shopping: '#ec4899',
};

const WarsawMap: React.FC<WarsawMapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>(['districts', 'schools', 'parks', 'transport']);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const clearMarkers = () => {
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
  };

  const addMarkers = () => {
    if (!map.current) return;
    clearMarkers();

    // Add district markers
    if (activeCategories.includes('districts')) {
      warsawData.districts.forEach(district => {
        const marker = new mapboxgl.Marker({ color: categoryColors.districts })
          .setLngLat([district.lng, district.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-base">${district.name}</h3>
              <p class="text-sm text-gray-600">${district.type}</p>
              <div class="mt-2 space-y-1">
                <p class="text-sm"><strong>Avg Rent:</strong> ${district.avgRent}</p>
                <p class="text-sm"><strong>Walk Score:</strong> ${district.walkScore}/100</p>
              </div>
            </div>
          `))
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add school markers
    if (activeCategories.includes('schools')) {
      warsawData.schools.forEach(school => {
        const marker = new mapboxgl.Marker({ color: categoryColors.schools })
          .setLngLat([school.lng, school.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-base">${school.name}</h3>
              <p class="text-sm text-gray-600">${school.type}</p>
              <p class="text-sm mt-1"><strong>Rating:</strong> ⭐ ${school.rating}/5</p>
            </div>
          `))
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add park markers
    if (activeCategories.includes('parks')) {
      warsawData.parks.forEach(park => {
        const marker = new mapboxgl.Marker({ color: categoryColors.parks })
          .setLngLat([park.lng, park.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-base">${park.name}</h3>
              <p class="text-sm text-gray-600">${park.type}</p>
              <p class="text-sm mt-1"><strong>Size:</strong> ${park.size}</p>
            </div>
          `))
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add transport markers
    if (activeCategories.includes('transport')) {
      warsawData.transport.forEach(stop => {
        const marker = new mapboxgl.Marker({ color: categoryColors.transport })
          .setLngLat([stop.lng, stop.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-base">${stop.name}</h3>
              <p class="text-sm text-gray-600">${stop.type}</p>
              <p class="text-sm mt-1"><strong>Lines:</strong> ${stop.lines}</p>
            </div>
          `))
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add healthcare markers
    if (activeCategories.includes('healthcare')) {
      warsawData.healthcare.forEach(facility => {
        const marker = new mapboxgl.Marker({ color: categoryColors.healthcare })
          .setLngLat([facility.lng, facility.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-base">${facility.name}</h3>
              <p class="text-sm text-gray-600">${facility.type}</p>
              <p class="text-sm mt-1"><strong>Rating:</strong> ⭐ ${facility.rating}/5</p>
            </div>
          `))
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }

    // Add shopping markers
    if (activeCategories.includes('shopping')) {
      warsawData.shopping.forEach(mall => {
        const marker = new mapboxgl.Marker({ color: categoryColors.shopping })
          .setLngLat([mall.lng, mall.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-base">${mall.name}</h3>
              <p class="text-sm text-gray-600">${mall.type}</p>
              <p class="text-sm mt-1"><strong>Stores:</strong> ${mall.stores}</p>
            </div>
          `))
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [21.0122, 52.2297],
      zoom: 12,
      pitch: 45,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({ visualizePitch: true }),
      'top-right'
    );

    map.current.on('load', () => {
      setIsMapLoaded(true);
      map.current?.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.1,
      });
      addMarkers();
    });

    return () => {
      clearMarkers();
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      addMarkers();
    }
  }, [activeCategories, isMapLoaded]);

  const toggleCategory = (category: string) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categories = [
    { id: 'districts', label: 'Districts', icon: Building },
    { id: 'schools', label: 'Schools', icon: School },
    { id: 'parks', label: 'Parks', icon: TreePine },
    { id: 'transport', label: 'Transport', icon: Train },
    { id: 'healthcare', label: 'Healthcare', icon: Heart },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  ];

  return (
    <div className={`relative rounded-2xl overflow-hidden ${className}`}>
      {/* Category Filter Controls */}
      <div className="absolute top-4 left-4 z-10 glass p-3 rounded-xl">
        <p className="text-xs font-semibold mb-2 text-foreground">Filter Layers</p>
        <div className="flex flex-wrap gap-2 max-w-xs">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'bg-background/50 text-muted-foreground hover:bg-background/80'
                }`}
                style={{ borderLeft: `3px solid ${categoryColors[cat.id]}` }}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      <div 
        ref={mapContainer} 
        className="w-full h-[500px]"
        style={{ minHeight: '500px' }}
      />
      
      {isMapLoaded && (
        <div className="absolute bottom-4 left-4 glass px-4 py-2 rounded-lg">
          <p className="text-sm font-medium">Warsaw, Poland</p>
          <p className="text-xs text-muted-foreground">Click markers for details</p>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 glass p-3 rounded-xl">
        <p className="text-xs font-semibold mb-2 text-foreground">Legend</p>
        <div className="space-y-1.5">
          {categories.filter(c => activeCategories.includes(c.id)).map(cat => (
            <div key={cat.id} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: categoryColors[cat.id] }}
              />
              <span className="text-muted-foreground">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WarsawMap;
