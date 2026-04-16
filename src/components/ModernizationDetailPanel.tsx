import React from 'react';
import { CloudRain, BarChart2, Navigation, Network, X, ArrowLeft, Activity, Satellite, ShieldCheck } from 'lucide-react';

interface ModernizationDetailPanelProps {
  activeTab: number | null;
  onClose: () => void;
}

export function ModernizationDetailPanel({ activeTab, onClose }: ModernizationDetailPanelProps) {
  if (activeTab === null) return null;

  const content = [
    {
      title: '数值预报能力',
      icon: <Activity className="w-8 h-8 text-slate-400" />,
      themeClasses: {
        bg: 'bg-slate-700/20',
        border: 'border-slate-700/30',
        text: 'text-slate-300',
        shadow: 'shadow-lg'
      },
      body: (
        <div className="flex flex-col gap-4 h-full">
          <div className="glass-card p-5 border-slate-700/30 bg-slate-700/5 shadow-sm">
            <p className="text-white leading-relaxed text-lg">
              <span className="text-slate-200 font-bold text-xl drop-shadow-md">CMA-CPEFS数值预报系统：</span>
              研发基于FDDA同化的重点区域百米级分辨率模式预报系统，实现云精细预报和暖云催化模拟功能。
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/forecast1/800/600" alt="预报系统1" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/forecast2/800/600" alt="预报系统2" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '星空地一体化监测',
      icon: <Satellite className="w-8 h-8 text-slate-400" />,
      themeClasses: {
        bg: 'bg-slate-700/20',
        border: 'border-slate-700/30',
        text: 'text-slate-300',
        shadow: 'shadow-lg'
      },
      body: (
        <div className="flex flex-col gap-4 h-full">
          <div className="glass-card p-5 border-slate-700/30 bg-slate-700/5 shadow-sm">
            <p className="text-white leading-relaxed text-lg">
              <span className="text-slate-200 font-bold text-xl drop-shadow-md">多源资料融合监测：</span>
              集成风云卫星、天气雷达、地基微波辐射计及无人机探测资料，实现云水资源立体化、精细化实时监测。
            </p>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/sat/600/400" alt="卫星监测" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/radar/600/400" alt="雷达监测" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/ground/600/400" alt="地基监测" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '安全高效装备',
      icon: <ShieldCheck className="w-8 h-8 text-slate-400" />,
      themeClasses: {
        bg: 'bg-slate-700/20',
        border: 'border-slate-700/30',
        text: 'text-slate-300',
        shadow: 'shadow-lg'
      },
      body: (
        <div className="flex flex-col gap-4 h-full">
          <div className="glass-card p-5 border-slate-700/30 bg-slate-700/5 shadow-sm">
            <p className="text-white leading-relaxed text-lg">
              <span className="text-slate-200 font-bold text-xl drop-shadow-md">新型作业装备研发：</span>
              研发大型无人机作业平台、新型暖云催化剂及自动化地面作业终端，提升作业安全水平与催化效率。
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/drone/800/600" alt="无人机平台" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/device/800/600" alt="作业装备" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: '实时精准指挥',
      icon: <Network className="w-8 h-8 text-slate-400" />,
      themeClasses: {
        bg: 'bg-slate-700/20',
        border: 'border-slate-700/30',
        text: 'text-slate-300',
        shadow: 'shadow-lg'
      },
      body: (
        <div className="flex flex-col gap-4 h-full">
          <div className="glass-card p-5 border-slate-700/30 bg-slate-700/5 shadow-sm">
            <p className="text-white leading-relaxed text-lg">
              <span className="text-slate-200 font-bold text-xl drop-shadow-md">国省一体化指挥平台：</span>
              依托“天工”平台实现全流程“端到端”实时指挥，指令秒级下达，实现跨区域空地一体化协同作业。
            </p>
          </div>
          <div className="flex-1 glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
            <img src="https://picsum.photos/seed/command/1200/800" alt="指挥系统" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
          </div>
        </div>
      )
    },
    {
      title: '效果效益评估',
      icon: <BarChart2 className="w-8 h-8 text-slate-400" />,
      themeClasses: {
        bg: 'bg-slate-700/20',
        border: 'border-slate-700/30',
        text: 'text-slate-300',
        shadow: 'shadow-lg'
      },
      body: (
        <div className="flex flex-col gap-4 h-full">
          <div className="glass-card p-5 border-slate-700/30 bg-slate-700/5 shadow-sm">
            <p className="text-white leading-relaxed text-lg">
              <span className="text-slate-200 font-bold text-xl drop-shadow-md">科学客观评估体系：</span>
              建立基于物理响应、数值模拟和AI智能集合的多元融合评估方法，定量分析人工增雨雪的社会与经济效益。
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/eval1/800/600" alt="评估分析1" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="glass-card p-2 border-white/10 bg-black/20 overflow-hidden">
              <img src="https://picsum.photos/seed/eval2/800/600" alt="评估分析2" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentContent = content[activeTab];

  return (
    <div className="absolute inset-0 flex flex-col p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${currentContent.themeClasses.bg} border ${currentContent.themeClasses.border} ${currentContent.themeClasses.shadow}`}>
            {currentContent.icon}
          </div>
          <h2 className={`text-3xl font-bold ${currentContent.themeClasses.text} tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
            {currentContent.title}
          </h2>
        </div>
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 px-6 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-full transition-all border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-base">返回地图</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0 relative">
        {currentContent.body}
      </div>
    </div>
  );
}
