import React from 'react';
import { motion } from 'motion/react';
import { Building2, Layout, Database, Cloud, Plane, ShieldCheck } from 'lucide-react';

export function StereoFloatingLayers() {
  const layers = [
    {
      id: 'center',
      title: '中心',
      subtitle: '联合指挥中心大楼',
      icon: <Building2 className="w-5 h-5 text-slate-400" />,
      color: 'from-slate-700/40 to-slate-800/40',
      borderColor: 'border-slate-700/50',
      glowColor: 'shadow-lg',
      items: ['联合指挥中心大楼'],
      z: 120,
      scale: 0.7,
    },
    {
      id: 'platform',
      title: '平台',
      icon: <Layout className="w-5 h-5 text-slate-400" />,
      color: 'from-slate-700/40 to-slate-800/40',
      borderColor: 'border-slate-700/50',
      glowColor: 'shadow-lg',
      items: ['云雾物理与催化技术研发实验平台', '人影机载保障平台'],
      z: 60,
      scale: 0.85,
    },
    {
      id: 'base',
      title: '基地',
      icon: <Database className="w-5 h-5 text-slate-400" />,
      color: 'from-slate-700/40 to-slate-800/40',
      borderColor: 'border-slate-700/50',
      glowColor: 'shadow-lg',
      items: ['防雹试验基地', '立体化云雾观测基地', '重大人影保障业务中试基地'],
      z: 0,
      scale: 1,
    },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center perspective-[1200px] overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d rotate-x-[60deg] rotate-z-[-20deg] translate-y-[-20px]">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, z: layer.z - 100 }}
            animate={{ 
              opacity: 1, 
              z: layer.z,
              y: [0, -10, 0] 
            }}
            transition={{ 
              opacity: { duration: 1, delay: index * 0.3 },
              z: { duration: 1, delay: index * 0.3 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
            }}
            className="absolute flex items-center justify-center transform-style-3d"
            style={{ zIndex: 10 - index }}
          >
            {/* The Layer Platform */}
            <div 
              className={`relative rounded-full border-2 ${layer.borderColor} bg-gradient-to-br ${layer.color} backdrop-blur-md ${layer.glowColor} flex items-center justify-center transition-all duration-500 hover:scale-105`}
              style={{ 
                width: `${300 * layer.scale}px`, 
                height: `${300 * layer.scale}px`,
              }}
            >
              {/* Decorative Rings */}
              <div className="absolute inset-2 rounded-full border border-slate-700/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-6 rounded-full border border-slate-700/20 animate-[spin_15s_linear_infinite_reverse]"></div>
              
              {/* Floating Content (Suspended above the layer) */}
              <div className="absolute transform rotate-x-[-60deg] rotate-z-[20deg] translate-y-[-60px] flex flex-col items-center w-max">
                <div className="glass-card px-4 py-2 border-white/20 flex flex-col items-center shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-1">
                    {layer.icon}
                    <span className="text-white font-black text-lg tracking-widest" style={{ textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                      {layer.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    {layer.items.map((item, i) => (
                      <div key={i} className="text-sm text-slate-200/90 font-medium whitespace-nowrap bg-slate-700/20 px-2 py-0.5 rounded border border-white/5">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Connecting Line to Platform */}
                <div className="w-px h-[40px] bg-gradient-to-b from-white/40 to-transparent mt-1"></div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Central Beam of Light */}
        <div className="absolute w-1 h-[300px] bg-gradient-to-t from-transparent via-cyan-400/30 to-transparent blur-sm translate-z-[-50px]"></div>
      </div>
    </div>
  );
}
