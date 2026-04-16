import React from 'react';
import { motion } from 'motion/react';
import { Target, Shield, Droplets, Flame, Zap } from 'lucide-react';

const benefitsData = [
  {
    id: '2021',
    year: '2021',
    title: '重大服务保障',
    highlights: ['建党百年保障', '西安十四运保障', '冬奥会保障'],
    icon: <Shield className="w-4 h-4 text-cyan-300" />
  },
  {
    id: '2022',
    year: '2022',
    title: '南方高温抗旱',
    highlights: ['首次2架大型无人机协同', '首次调配3架高性能飞机'],
    icon: <Flame className="w-4 h-4 text-orange-400" />
  },
  {
    id: '2023',
    year: '2023',
    title: '成都大运会 & 杭州亚运会',
    highlights: ['“天工”系统首次实战', '亚运会开闭幕式保障'],
    icon: <Target className="w-4 h-4 text-green-400" />
  },
  {
    id: '2024',
    year: '2024',
    title: '常态化防灾减灾',
    highlights: ['华北黄淮抗旱', '南水北调蓄水', '森林防火灭火'],
    icon: <Droplets className="w-4 h-4 text-blue-400" />
  },
  {
    id: '2025',
    year: '2025',
    title: '“春雨”和“谷雨”行动',
    highlights: ['13省联合大范围作业', '23架飞机协同', '增加降水8.5亿吨'],
    icon: <Zap className="w-4 h-4 text-yellow-400" />
  }
];

export function ServiceBenefitsPanel({ activeTab, setActiveTab }: { activeTab: string | null, setActiveTab: (tab: string | null) => void }) {
  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden">
      <style>
        {`
          @keyframes scroll-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .animate-scroll-up {
            animation: scroll-up 20s linear infinite;
          }
          .animate-scroll-up:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      {/* Auto-scrolling container */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-scroll-up flex flex-col gap-3 pb-3">
          {/* Duplicate data for seamless scrolling */}
          {[...benefitsData, ...benefitsData].map((item, idx) => {
            const isSelected = activeTab === item.id;
            return (
              <div 
                key={`${item.id}-${idx}`}
                onClick={() => setActiveTab(isSelected ? null : item.id)}
                className={`flex gap-3 p-3 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300 group shrink-0 glass-card ${
                  isSelected 
                    ? 'bg-cyan-900/40 border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                    : 'border-cyan-500/20 hover:bg-white/10 hover:border-cyan-500/30'
                }`}
              >
                {/* Year Badge */}
                <div className="flex flex-col items-center justify-center shrink-0 w-12 h-12 rounded-lg bg-slate-900/80 border border-white/5 shadow-inner relative overflow-hidden layered-glass-icon">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <span className="text-cyan-300 font-bold text-base tracking-tighter relative z-10 refractive-text">{item.year}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <h3 className={`font-bold text-sm truncate refractive-text ${isSelected ? 'text-cyan-100' : 'text-white group-hover:text-cyan-100'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.highlights.map((highlight, hIdx) => (
                      <span 
                        key={hIdx} 
                        className={`text-sm px-1.5 py-0.5 rounded-md border ${
                          isSelected 
                            ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-100' 
                            : 'bg-cyan-300/10 border-cyan-500/30 text-cyan-200/70 group-hover:text-cyan-100'
                        }`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Fade overlays for smooth scrolling effect */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none"></div>
    </div>
  );
}
