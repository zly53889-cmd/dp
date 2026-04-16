import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// --- Constants & Types ---

type Coords = [number, number];

interface CenterInfo {
  name: string;
  coords: Coords;
  color: string;
}

const CENTERS: Record<string, CenterInfo> = {
  NATIONAL: { name: '国家指挥中心', coords: [39.9042, 116.4074], color: '#ef4444' },
  NORTH: { name: '华北区域中心', coords: [39.1236, 117.1901], color: '#3b82f6' },
  NORTHEAST: { name: '东北区域中心', coords: [45.7569, 126.6424], color: '#3b82f6' },
  EAST: { name: '华东区域中心', coords: [31.2304, 121.4737], color: '#3b82f6' },
  CENTRAL: { name: '华中区域中心', coords: [30.5928, 114.3055], color: '#3b82f6' },
  SOUTH: { name: '华南区域中心', coords: [23.1291, 113.2644], color: '#3b82f6' },
  SOUTHWEST: { name: '西南区域中心', coords: [30.5728, 104.0668], color: '#3b82f6' },
  NORTHWEST: { name: '西北区域中心', coords: [34.3416, 108.9398], color: '#3b82f6' },
  URUMQI: { name: '乌鲁木齐区域中心', coords: [43.8256, 87.6168], color: '#3b82f6' },
};

// --- Icon Factories ---

const createHtmlIcon = (html: string, size: [number, number], anchor: [number, number]) => 
  L.divIcon({ className: 'custom-div-icon', html, iconSize: size, iconAnchor: anchor });

const icons = {
  national: createHtmlIcon(
    `<div class="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center border-2 border-white shadow-[0_0_15px_rgba(239,68,68,0.8)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3z"/><path d="M9 17h6"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/></svg>
     </div>`, [32, 32], [16, 16]
  ),
  regional: createHtmlIcon(
    `<div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-[0_0_10px_rgba(37,99,235,0.6)]">
      <div class="w-2 h-2 bg-white rounded-full"></div>
     </div>`, [24, 24], [12, 12]
  ),
  plane: (rotation: number = 0, color: string = 'text-blue-600') => createHtmlIcon(
    `<div style="transform: rotate(${rotation}deg)" class="${color} drop-shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="white" stroke-width="1"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-1.1-.2-2.1.5-2.4 1.5l-.5 1.5c-.2.7.2 1.4.9 1.7l6.6 2.1-2.2 2.2-3.2-.1c-.5 0-1 .3-1.2.8l-.5 1.1c-.2.5 0 1.1.4 1.4l2.5 2.5c.3.3.9.5 1.4.3l1.1-.5c.5-.2.8-.7.8-1.2l-.1-3.2 2.2-2.2 2.1 6.6c.3.7 1 1.1 1.7.9l1.5-.5c1-.3 1.7-1.3 1.5-2.4z"/></svg>
     </div>`, [24, 24], [12, 12]
  ),
  drone: createHtmlIcon(
    `<div class="text-slate-800 drop-shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-1.1-.2-2.1.5-2.4 1.5l-.5 1.5c-.2.7.2 1.4.9 1.7l6.6 2.1-2.2 2.2-3.2-.1c-.5 0-1 .3-1.2.8l-.5 1.1c-.2.5 0 1.1.4 1.4l2.5 2.5c.3.3.9.5 1.4.3l1.1-.5c.5-.2.8-.7.8-1.2l-.1-3.2 2.2-2.2 2.1 6.6c.3.7 1 1.1 1.7.9l1.5-.5c1-.3 1.7-1.3 1.5-2.4z"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>
     </div>`, [24, 24], [12, 12]
  ),
  ground: createHtmlIcon(
    `<div class="text-slate-700 drop-shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4"/><path d="M19 17h1a2 2 0 0 1 2 2v1"/><path d="M14 17h5"/><path d="M2 17h1a2 2 0 0 0 2-2V9a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v6a2 2 0 0 0 2 2h1"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
     </div>`, [20, 20], [10, 10]
  ),
  label: (text: string, colorClass: string = 'text-blue-700', bgClass: string = 'bg-white/40') => createHtmlIcon(
    `<div class="text-sm font-bold ${colorClass} whitespace-nowrap drop-shadow-sm ${bgClass} px-1 rounded border border-white/20 backdrop-blur-sm">${text}</div>`, [100, 20], [50, 0]
  )
};

// --- Utilities ---

const isValidLatLng = (coords: any): coords is Coords => {
  if (!Array.isArray(coords) || coords.length !== 2) return false;
  const [lat, lng] = coords;
  return typeof lat === 'number' && typeof lng === 'number' && isFinite(lat) && isFinite(lng) && !isNaN(lat) && !isNaN(lng);
};

const getCurvePoints = (start: Coords, end: Coords, factor: number = 0.2): Coords[] => {
  const mid: Coords = [
    (start[0] + end[0]) / 2 + (end[1] - start[1]) * factor,
    (start[1] + end[1]) / 2 - (end[0] - start[0]) * factor
  ];
  
  const points: Coords[] = [];
  for (let t = 0; t <= 1; t += 0.05) {
    const x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * mid[0] + t ** 2 * end[0];
    const y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * mid[1] + t ** 2 * end[1];
    points.push([x, y]);
  }
  return points;
};

// --- Sub-components ---

const TrajectoryLine = ({ start, end, color = '#3b82f6', dashArray = '5, 5', animate = true }: { start: Coords, end: Coords, color?: string, dashArray?: string, animate?: boolean }) => {
  if (!isValidLatLng(start) || !isValidLatLng(end)) return null;
  const points = getCurvePoints(start, end);
  
  return (
    <>
      <Polyline positions={points} pathOptions={{ color, weight: 2, opacity: 0.3, dashArray }} />
      {animate && (
        <Polyline 
          positions={points} 
          pathOptions={{ 
            color, weight: 3, opacity: 0.8, dashArray: '10, 50', lineCap: 'round', className: 'animate-trajectory' 
          }} 
        />
      )}
    </>
  );
};

const MapLegend = () => (
  <div className="absolute bottom-6 left-6 z-[1000] bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 p-4 rounded-2xl shadow-2xl text-sm text-white flex flex-col gap-2.5">
    <div className="flex items-center gap-2.5">
      <div className="w-4 h-4 bg-red-600 rounded flex items-center justify-center shadow-lg shadow-red-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3z"/></svg>
      </div>
      <span className="font-medium">国家级指挥中心</span>
    </div>
    <div className="flex items-center gap-2.5">
      <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
        <div className="w-1 h-1 bg-white rounded-full"></div>
      </div>
      <span className="font-medium">区域人影中心</span>
    </div>
    <div className="flex items-center gap-2.5">
      <div className="text-blue-500"><PlaneIcon size={16} /></div>
      <span className="font-medium">已建国家级飞机</span>
    </div>
    <div className="flex items-center gap-2.5">
      <div className="text-cyan-200/70"><PlaneIcon size={16} /></div>
      <span className="font-medium">拟建大载荷飞机</span>
    </div>
    <div className="flex items-center gap-2.5">
      <div className="w-6 h-0.5 bg-red-500/60 shadow-lg shadow-red-500/20"></div>
      <span className="font-medium">跨区指挥示意</span>
    </div>
  </div>
);

const PlaneIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="1"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5s-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-1.1-.2-2.1.5-2.4 1.5l-.5 1.5c-.2.7.2 1.4.9 1.7l6.6 2.1-2.2 2.2-3.2-.1c-.5 0-1 .3-1.2.8l-.5 1.1c-.2.5 0 1.1.4 1.4l2.5 2.5c.3.3.9.5 1.4.3l1.1-.5c.5-.2.8-.7.8-1.2l-.1-3.2 2.2-2.2 2.1 6.6c.3.7 1 1.1 1.7.9l1.5-.5c1-.3 1.7-1.3 1.5-2.4z"/></svg>
);

// --- Main Component ---

export function CommandCenterMap() {
  const [geoData, setGeoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGeoData = async () => {
      const sources = [
        'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
        'https://cdn.jsdelivr.net/npm/china-geojson@0.1.0/china.json'
      ];

      for (const url of sources) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            setGeoData(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.warn(`Failed to load map from ${url}`);
        }
      }
      setLoading(false);
    };

    fetchGeoData();
  }, []);

  const regionStyles = useMemo(() => ({
    northeast: ['黑龙江', '吉林', '辽宁'],
    north: ['北京', '天津', '河北', '山西', '内蒙古'],
    east: ['上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '台湾'],
    central: ['河南', '湖北', '湖南'],
    south: ['广东', '广西', '海南', '香港', '澳门'],
    southwest: ['重庆', '四川', '贵州', '云南', '西藏'],
    northwest: ['陕西', '甘肃', '青海', '宁夏'],
    urumqi: ['新疆']
  }), []);

  const getFeatureStyle = (feature: any) => {
    const name = feature.properties?.name || "";
    let color = '#1e293b';
    
    if (regionStyles.northeast.some(n => name.includes(n))) color = '#4d7c0f';
    else if (regionStyles.north.some(n => name.includes(n))) color = '#be123c';
    else if (regionStyles.east.some(n => name.includes(n))) color = '#0369a1';
    else if (regionStyles.central.some(n => name.includes(n))) color = '#047857';
    else if (regionStyles.south.some(n => name.includes(n))) color = '#1d4ed8';
    else if (regionStyles.southwest.some(n => name.includes(n))) color = '#6d28d9';
    else if (regionStyles.northwest.some(n => name.includes(n))) color = '#c2410c';
    else if (regionStyles.urumqi.some(n => name.includes(n))) color = '#a16207';

    return {
      fillColor: color,
      fillOpacity: 0.3,
      color: 'rgba(255, 255, 255, 0.15)',
      weight: 1,
    };
  };

  return (
    <div className="w-full h-full relative bg-[#0b0e14] overflow-hidden rounded-xl">
      <style>
        {`
          @keyframes trajectory { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
          .animate-trajectory { animation: trajectory 3s linear infinite; }
          .leaflet-container { background: #0b0e14 !important; }
        `}
      </style>
      
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] text-center pointer-events-none">
        <h2 className="truncate text-2xl font-bold text-white tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          国家（区域）指挥协同能力建设布局图
        </h2>
      </div>

      {loading && (
        <div className="absolute inset-0 z-[2000] bg-slate-950/40 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-blue-400 text-base font-medium animate-pulse">加载指挥协同布局...</p>
          </div>
        </div>
      )}

      <MapContainer 
        center={[35.8617, 104.1954]} 
        zoom={4} 
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        
        {geoData && <GeoJSON data={geoData} style={getFeatureStyle} />}

        {/* National Center */}
        {isValidLatLng(CENTERS.NATIONAL.coords) && (
          <>
            <Marker position={CENTERS.NATIONAL.coords} icon={icons.national}>
              <Popup>{CENTERS.NATIONAL.name}</Popup>
            </Marker>
            <Marker 
              position={[CENTERS.NATIONAL.coords[0] - 2.5, CENTERS.NATIONAL.coords[1]]} 
              icon={icons.label(CENTERS.NATIONAL.name, 'text-red-700', 'bg-white/60')}
              interactive={false}
            />
          </>
        )}

        {/* Regional Centers */}
        {Object.entries(CENTERS).filter(([key]) => key !== 'NATIONAL').map(([key, center]) => (
          isValidLatLng(center.coords) && (
            <React.Fragment key={key}>
              <Marker position={center.coords} icon={icons.regional}>
                <Popup>{center.name}</Popup>
              </Marker>
              <Marker 
                position={[center.coords[0] - 1.5, center.coords[1]]} 
                icon={icons.label(center.name)}
                interactive={false}
              />
              {/* Trajectories */}
              <TrajectoryLine 
                start={CENTERS.NATIONAL.coords} 
                end={center.coords} 
                color="#ef4444" 
                dashArray=""
              />
            </React.Fragment>
          )
        ))}

        {/* Assets */}
        <Marker position={[47.0, 128.0]} icon={icons.plane(45)} />
        <Marker position={[40.0, 90.0]} icon={icons.plane(-30)} />
        <Marker position={[25.0, 115.0]} icon={icons.plane(120)} />
        <Marker position={[33.0, 118.0]} icon={icons.plane(-15, 'text-slate-400')} />
        
        <Marker position={[45.0, 110.0]} icon={icons.drone} />
        <Marker position={[30.0, 95.0]} icon={icons.drone} />

        <Marker position={[35.0, 112.0]} icon={icons.ground} />
        <Marker position={[26.0, 105.0]} icon={icons.ground} />

        <MapLegend />
      </MapContainer>
    </div>
  );
}
