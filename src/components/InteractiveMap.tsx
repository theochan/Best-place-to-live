import React, { useState } from 'react';
import { RankedNeighbourhood } from '../types';
import {
  Train,
  GraduationCap,
  Trees,
  Cross,
  ShoppingBag,
  Bus,
  Plus,
  Minus,
  Layers,
  MapPin,
  Info
} from 'lucide-react';

interface InteractiveMapProps {
  neighbourhood: RankedNeighbourhood;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ neighbourhood }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mrt' | 'school' | 'park' | 'healthcare' | 'shopping'>('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedAmenity, setSelectedAmenity] = useState<RankedNeighbourhood['amenityList'][0] | null>(null);

  const amenities = neighbourhood.amenityList || [];

  const filteredAmenities = amenities.filter((a) => {
    if (activeFilter === 'all') return true;
    return a.category === activeFilter;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mrt':
        return 'bg-blue-600 text-white border-blue-200';
      case 'school':
        return 'bg-purple-600 text-white border-purple-200';
      case 'park':
        return 'bg-emerald-600 text-white border-emerald-200';
      case 'healthcare':
        return 'bg-rose-600 text-white border-rose-200';
      case 'shopping':
        return 'bg-amber-500 text-white border-amber-200';
      default:
        return 'bg-slate-700 text-white border-slate-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mrt':
        return <Train className="w-3 h-3" />;
      case 'school':
        return <GraduationCap className="w-3 h-3" />;
      case 'park':
        return <Trees className="w-3 h-3" />;
      case 'healthcare':
        return <Cross className="w-3 h-3" />;
      case 'shopping':
        return <ShoppingBag className="w-3 h-3" />;
      default:
        return <MapPin className="w-3 h-3" />;
    }
  };

  // Convert GPS offset into local SVG canvas coordinates (400x260)
  const centerLat = neighbourhood.coordinates.lat;
  const centerLng = neighbourhood.coordinates.lng;

  const latSpan = 0.05 / zoomLevel;
  const lngSpan = 0.08 / zoomLevel;

  const toSvgCoords = (lat: number, lng: number) => {
    const x = ((lng - (centerLng - lngSpan / 2)) / lngSpan) * 400;
    const y = (((centerLat + latSpan / 2) - lat) / latSpan) * 260;
    return { x, y };
  };

  // Generate SVG polygon string for zone boundary
  const polygonPoints = (neighbourhood.boundaryPolygon || [
    [centerLat + 0.015, centerLng - 0.02],
    [centerLat + 0.02, centerLng + 0.01],
    [centerLat + 0.005, centerLng + 0.03],
    [centerLat - 0.018, centerLng + 0.02],
    [centerLat - 0.015, centerLng - 0.015],
    [centerLat + 0.015, centerLng - 0.02]
  ])
    .map(([lat, lng]) => {
      const { x, y } = toSvgCoords(lat, lng);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="bg-slate-100/70 rounded-2xl border border-slate-200 overflow-hidden relative shadow-inner">
      {/* Map Filter Badges Header */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-xs p-1.5 rounded-xl border border-slate-200/90 shadow-xs text-xs">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
            activeFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All Layers
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('mrt')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            activeFilter === 'mrt' ? 'bg-blue-600 text-white' : 'text-blue-700 hover:bg-blue-50'
          }`}
        >
          <Train className="w-3 h-3" />
          MRT
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('school')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            activeFilter === 'school' ? 'bg-purple-600 text-white' : 'text-purple-700 hover:bg-purple-50'
          }`}
        >
          <GraduationCap className="w-3 h-3" />
          Schools
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('park')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            activeFilter === 'park' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <Trees className="w-3 h-3" />
          Parks
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('healthcare')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            activeFilter === 'healthcare' ? 'bg-rose-600 text-white' : 'text-rose-700 hover:bg-rose-50'
          }`}
        >
          <Cross className="w-3 h-3" />
          Clinics
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('shopping')}
          className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
            activeFilter === 'shopping' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-50'
          }`}
        >
          <ShoppingBag className="w-3 h-3" />
          Malls
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1 bg-white/95 backdrop-blur-xs p-1 rounded-xl border border-slate-200 shadow-xs">
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.2))}
          className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="h-[1px] bg-slate-200"></div>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
          className="w-7 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      {/* Basemap Canvas */}
      <div className="w-full h-80 sm:h-96 relative bg-[#f1f5f9] select-none">
        {/* Road & Transit Grid Simulation */}
        <svg
          viewBox="0 0 400 260"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="road-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>
            <linearGradient id="zoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.14" />
            </linearGradient>
          </defs>

          <rect width="400" height="260" fill="url(#road-grid)" />

          {/* Major Singapore Expressways Simulation */}
          <path d="M 0,40 Q 180,90 400,60" fill="none" stroke="#cbd5e1" strokeWidth="5" />
          <path d="M 0,40 Q 180,90 400,60" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeDasharray="6 4" />

          <path d="M 50,0 Q 120,140 220,260" fill="none" stroke="#cbd5e1" strokeWidth="4" />
          <path d="M 50,0 Q 120,140 220,260" fill="none" stroke="#f8fafc" strokeWidth="2" />

          <path d="M 280,0 Q 320,130 400,200" fill="none" stroke="#cbd5e1" strokeWidth="4" />
          <path d="M 280,0 Q 320,130 400,200" fill="none" stroke="#f8fafc" strokeWidth="2" />

          {/* Green Planning Area Boundary Polygon (matching wireframe) */}
          <polygon
            points={polygonPoints}
            fill="url(#zoneGradient)"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />

          {/* Center Area Name Label */}
          <text
            x="200"
            y="135"
            textAnchor="middle"
            fill="#0f172a"
            fontSize="13"
            fontWeight="bold"
            letterSpacing="2"
            opacity="0.85"
            className="select-none"
          >
            {neighbourhood.name.toUpperCase()}
          </text>
        </svg>

        {/* Amenity Markers Rendered Over Map */}
        {filteredAmenities.map((amenity) => {
          const { x, y } = toSvgCoords(amenity.lat, amenity.lng);
          // Keep within map boundaries
          const clampedX = Math.max(15, Math.min(385, x));
          const clampedY = Math.max(45, Math.min(240, y));

          const percentLeft = `${(clampedX / 400) * 100}%`;
          const percentTop = `${(clampedY / 260) * 100}%`;

          return (
            <div
              key={amenity.id}
              style={{ left: percentLeft, top: percentTop }}
              onClick={() => setSelectedAmenity(amenity)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md border border-white transition-transform hover:scale-125 ${getCategoryColor(
                  amenity.category
                )}`}
              >
                {getCategoryIcon(amenity.category)}
              </div>

              {/* Hover tooltip */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 whitespace-nowrap bg-slate-900 text-white text-[11px] font-medium py-1 px-2 rounded-md shadow-lg pointer-events-none z-30">
                {amenity.name}
              </div>
            </div>
          );
        })}

        {/* Selected Amenity Info Card */}
        {selectedAmenity && (
          <div className="absolute bottom-3 left-3 z-30 bg-white p-3 rounded-xl border border-slate-200 shadow-md max-w-xs flex items-start gap-2.5">
            <div className={`p-1.5 rounded-lg ${getCategoryColor(selectedAmenity.category)}`}>
              {getCategoryIcon(selectedAmenity.category)}
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-bold text-slate-900">{selectedAmenity.name}</h5>
              <p className="text-[10px] text-slate-500 capitalize">{selectedAmenity.category} • Within {selectedAmenity.distanceMeters}m</p>
            </div>
            <button
              onClick={() => setSelectedAmenity(null)}
              className="text-slate-400 hover:text-slate-600 text-xs px-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Map Footer Attribution */}
      <div className="px-3 py-1.5 bg-white/90 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
        <span>OneMap Singapore SLA Thematic GIS Layers</span>
        <span className="font-medium">EPSG:3414 SVY21 Projection</span>
      </div>
    </div>
  );
};
