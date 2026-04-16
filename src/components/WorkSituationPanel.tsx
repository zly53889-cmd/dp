import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom plane icon
const createPlaneIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px ${color};"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

// Custom equipment icon
const createEquipmentIcon = (color: string) => L.divIcon({
  className: 'custom-div-icon',
  html: `<div style="background-color: ${color}; width: 10px; height: 10px; transform: rotate(45deg); border: 1px solid white; box-shadow: 0 0 8px ${color};"></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5]
});

const planeData = [
  { name: '运12', value: 25, color: '#2563eb' },
  { name: '空中国王', value: 18, color: '#d97706' },
  { name: '新舟60', value: 5, color: '#65a30d' },
  { name: '大中型无人机', value: 5, color: '#dc2626' },
  { name: '运7', value: 2, color: '#0284c7' },
];

// Major Chinese cities for realistic marker distribution
const chinaCities = [
  [39.9042, 116.4074], [31.2304, 121.4737], [23.1291, 113.2644], [30.5728, 104.0668],
  [43.8256, 87.6168], [29.6469, 91.1172], [45.8038, 126.5350], [25.0406, 102.7122],
  [34.3416, 108.9398], [30.5928, 114.3055], [20.0174, 110.3492], [40.8428, 111.7510],
  [36.0611, 103.8343], [36.6232, 101.7782], [38.4872, 106.2309], [26.6477, 106.6302],
  [22.8170, 108.3665], [26.0745, 119.2965], [30.2741, 120.1551], [32.0603, 118.7969],
  [31.8206, 117.2272], [28.6820, 115.8579], [28.2282, 112.9388], [34.7466, 113.6253],
  [36.6512, 117.0483], [37.8706, 112.5489], [38.0423, 114.5149], [41.6772, 123.4631],
  [43.8171, 125.3235]
];

const equipmentData = [
  { year: '2020', 高炮: 5730, 火箭: 7701, 烟炉: 1431 },
  { year: '2021', 高炮: 5281, 火箭: 7916, 烟炉: 1594 },
  { year: '2022', 高炮: 5138, 火箭: 7435, 烟炉: 1788 },
  { year: '2023', 高炮: 4869, 火箭: 7795, 烟炉: 1982 },
  { year: '2024', 高炮: 4777, 火箭: 8066, 烟炉: 2172 },
];

const GlassCapsuleBar = (props: any) => {
  const { fill, x, y, width, height } = props;
  if (height < 2) return null;
  
  return (
    <g>
      {/* Background Track */}
      <rect x={x} y={y} width={width} height={height} fill="rgba(255,255,255,0.01)" rx={width/2} />
      
      {/* Main Bar Fill with Gradient-like effect via opacity */}
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={width/2} opacity={0.3} />
      
      {/* Inner Glow / Highlight */}
      <rect x={x + 1} y={y + 1} width={width - 2} height={height - 2} fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth={1} rx={(width-2)/2} />
      
      {/* Top Edge Bright Highlight */}
      <path d={`M ${x + 2} ${y + 2} Q ${x + width/2} ${y} ${x + width - 2} ${y + 2}`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth={1} strokeLinecap="round" />
      
      {/* Subtle Bottom Shadow inside the capsule */}
      <path d={`M ${x + 2} ${y + height - 2} Q ${x + width/2} ${y + height} ${x + width - 2} ${y + height - 2}`} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth={2} strokeLinecap="round" />
    </g>
  );
};

// Helper to check for valid coordinates
const isValidLatLng = (coords: any): coords is [number, number] => {
  try {
    if (!coords || !Array.isArray(coords) || coords.length !== 2) return false;
    const [lat, lng] = coords;
    return typeof lat === 'number' && 
           typeof lng === 'number' && 
           !isNaN(lat) && 
           !isNaN(lng) &&
           isFinite(lat) &&
           isFinite(lng);
  } catch (e) {
    return false;
  }
};

export function WorkSituationPanel() {
  const [activeMap, setActiveMap] = useState<'plane' | 'ground'>('plane');

  // Generate random markers centered around China
  const markers = useMemo(() => {
    const count = activeMap === 'plane' ? 25 : 50;
    return Array.from({ length: count }).map((_, i) => {
      // Pick a random city as base to ensure it's in China
      const baseCity = chinaCities[Math.floor(Math.random() * chinaCities.length)] || [35.8617, 104.1954];
      // Add random jitter (approx 200km radius)
      const jitterLat = (Math.random() - 0.5) * 4;
      const jitterLng = (Math.random() - 0.5) * 4;
      
      return {
        id: i,
        position: [
          baseCity[0] + jitterLat,
          baseCity[1] + jitterLng
        ] as [number, number],
        name: activeMap === 'plane' ? `飞机 ${i + 1}` : `装备 ${i + 1}`,
        type: activeMap === 'plane' 
          ? (Math.random() > 0.5 ? '探测' : '增雨') 
          : (Math.random() > 0.6 ? '高炮' : Math.random() > 0.3 ? '火箭' : '烟炉'),
        color: activeMap === 'plane' 
          ? (Math.random() > 0.5 ? '#0ea5e9' : '#10b981') 
          : (Math.random() > 0.6 ? '#3b82f6' : Math.random() > 0.3 ? '#fbbf24' : '#22c55e')
      };
    });
  }, [activeMap]);

  return (
    <div className="absolute inset-0 flex gap-6 p-6 bg-transparent">
      <style>{`
        .leaflet-container {
          background: transparent !important;
        }
        .leaflet-vignette {
          box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
          pointer-events: none;
          z-index: 400;
        }
        @keyframes liquid-rise {
          0% { transform: scaleY(0); }
          70% { transform: scaleY(1.05); }
          100% { transform: scaleY(1); }
        }
        .liquid-fill-anim {
          animation: liquid-rise 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .crystal-ring-anim {
          animation: float-ring 6s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes float-ring {
          0%, 100% { transform: translateY(0) rotateX(45deg); }
          50% { transform: translateY(-10px) rotateX(50deg); }
        }
        .crystal-cell {
          transition: all 0.3s ease;
        }
        .crystal-cell:hover {
          filter: drop-shadow(0 0 15px rgba(255,255,255,0.8)) brightness(1.2);
          transform: translateY(-5px);
        }
      `}</style>
      {/* Left: Maps */}
      <div className="flex-[2] flex flex-col gap-4 relative">
        <div className="flex-1 glass-panel ios-squircle mirror-edge relative overflow-hidden group">
          
          {/* Leaflet Map */}
          <div className="absolute inset-0 z-0">
            <MapContainer 
              center={[35.8617, 104.1954]} 
              zoom={4} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                opacity={0.7}
              />
              <div className="leaflet-vignette absolute inset-0"></div>
              
              {markers.map(marker => {
                const isValid = Array.isArray(marker.position) && 
                               marker.position.length === 2 && 
                               typeof marker.position[0] === 'number' && 
                               typeof marker.position[1] === 'number' && 
                               !isNaN(marker.position[0]) && 
                               !isNaN(marker.position[1]) &&
                               isFinite(marker.position[0]) &&
                               isFinite(marker.position[1]);
                
                return isValid && (
                  <Marker 
                    key={marker.id} 
                    position={marker.position}
                    icon={activeMap === 'plane' ? createPlaneIcon(marker.color) : createEquipmentIcon(marker.color)}
                  >
                    <Popup className="custom-popup">
                      <div className="text-sm font-bold text-slate-800">
                        {marker.name} ({marker.type})
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
          
          {/* Top Left: Toggle Buttons */}
          <div className="absolute top-4 left-4 z-20 flex gap-2 bg-cyan-300/10 p-1.5 rounded-xl border border-cyan-500/30 backdrop-blur-md shadow-2xl">
            <button 
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-500 ${activeMap === 'plane' ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.6)]' : 'text-cyan-200/70 hover:text-cyan-300 hover:bg-white/5'}`}
              onClick={() => setActiveMap('plane')}
            >
              飞机作业分布
            </button>
            <button 
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-500 ${activeMap === 'ground' ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.6)]' : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'}`}
              onClick={() => setActiveMap('ground')}
            >
              地面装备分布
            </button>
          </div>

          {/* Top Right: Title */}
          <div className="absolute top-4 right-4 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-cyan-100 text-xs font-bold z-20 shadow-2xl backdrop-blur-md">
            {activeMap === 'plane' ? '全国人影飞机作业架次和时长分布 (2024年)' : '全国人影地面作业装备分布图 (2024年)'}
          </div>

          {/* Bottom Right: Legend (Shrunk) */}
          <div className="absolute bottom-4 right-4 bg-white/5 border border-white/10 p-2 rounded-xl text-xs text-cyan-100 z-20 flex gap-4 shadow-2xl backdrop-blur-xl scale-90 origin-bottom-right">
            {activeMap === 'plane' ? (
              <>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-cyan-400 mb-0.5 border-b border-cyan-500/30 pb-0.5">飞机作业架次</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#00441b] rounded-sm"></div> ≥100</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#006d2c] rounded-sm"></div> 50-100</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#238b45] rounded-sm"></div> 30-50</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#41ab5d] rounded-sm"></div> 20-30</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#74c476] rounded-sm"></div> 10-20</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#a1d99b] rounded-sm"></div> 1-10</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-white rounded-sm"></div> 0</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-amber-400 mb-0.5 border-b border-amber-500/30 pb-0.5">飞机作业时长</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500"></div> 500-800</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> 250-500</div>
                  <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div> 100-250</div>
                  <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> 50-100</div>
                  <div className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-amber-500"></div> 1-50</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-cyan-400 mb-0.5 border-b border-cyan-500/30 pb-0.5">作业装备总数量</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#08519c] rounded-sm"></div> ≥1200</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#3182bd] rounded-sm"></div> 800-1200</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#6baed6] rounded-sm"></div> 600-800</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#9ecae1] rounded-sm"></div> 400-600</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#c6dbef] rounded-sm"></div> 200-400</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-white rounded-sm"></div> &lt; 200</div>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-bold text-emerald-400 mb-0.5 border-b border-emerald-500/30 pb-0.5">作业装备类型</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></div> 高炮</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-yellow-400 rounded-sm"></div> 火箭</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-green-500 rounded-sm"></div> 烟炉</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right: Charts */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Pie Chart: Glowing Liquid Donut */}
        <div className="flex-1 glass-panel ios-squircle mirror-edge p-4 flex flex-col relative liquid-border-anim">
          <h3 className="truncate text-base font-bold refractive-text mb-4 text-center tracking-widest">全国飞机型号和数量</h3>
          <div className="flex-1 min-h-0 relative flex items-center justify-center">
            <div className="w-full h-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <filter id="glow-plane" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  {/* Background Track */}
                  <Pie
                    data={[{value: 1}]}
                    cx="40%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="85%"
                    stroke="none"
                    fill="rgba(255,255,255,0.02)"
                    isAnimationActive={false}
                  />
                  {/* Main Donut Layer */}
                  <Pie
                    data={planeData}
                    cx="40%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="85%"
                    paddingAngle={4}
                    cornerRadius={20}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: 'rgba(255,255,255,0.3)', strokeWidth: 1.5 }}
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={1}
                  >
                    {planeData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color} 
                        className="outline-none hover:opacity-100 transition-opacity duration-300"
                        style={{ filter: 'url(#glow-plane)', opacity: 0.8 }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '1rem', backdropFilter: 'blur(20px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                    formatter={(value) => [`${value} 架`, '数量']}
                    cursor={false}
                  />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="right" 
                    wrapperStyle={{ fontSize: '11px', right: 0 }} 
                    iconType="circle" 
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Total / Icon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ left: '-30%' }}>
                <div className="flex flex-col items-center justify-center">
                  <span className="truncate text-xl font-bold text-slate-200">55</span>
                  <span className="text-xs text-slate-400">总架次</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart: Glass Volumetric Columns */}
        <div className="flex-1 glass-panel ios-squircle mirror-edge p-4 flex flex-col relative liquid-border-anim">
          <h3 className="truncate text-base font-bold refractive-text mb-4 text-center tracking-widest">全国地面作业装备数量</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '1rem', backdropFilter: 'blur(20px)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '5px' }} iconType="circle" />
                <Bar dataKey="高炮" fill="#3b82f6" barSize={16} name="高炮 (门)" shape={<GlassCapsuleBar />} />
                <Bar dataKey="火箭" fill="#0ea5e9" barSize={16} name="火箭 (架)" shape={<GlassCapsuleBar />} />
                <Bar dataKey="烟炉" fill="#eab308" barSize={16} name="烟炉 (台)" shape={<GlassCapsuleBar />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
