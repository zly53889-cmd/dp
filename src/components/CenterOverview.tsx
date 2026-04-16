import React from 'react';
import { Target, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface CenterOverviewProps {
  onClose: () => void;
}

export function CenterOverview({ onClose }: CenterOverviewProps) {

  return (
    <div className="w-full h-full flex flex-col bg-slate-950/40 backdrop-blur-xl rounded-[36px] overflow-hidden border border-slate-700/30 shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-slate-700/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-700/20 rounded-2xl border border-slate-700/30 shadow-lg">
            <ShieldCheck className="w-7 h-7 text-slate-400" />
          </div>
          <div>
            <h2 className="truncate text-xl font-bold text-white tracking-wider">中心概况</h2>
            <p className="text-xs text-slate-400/60 font-medium mt-0.5 tracking-widest uppercase">Center Overview</p>
          </div>
        </div>
        


        <motion.button 
          onClick={onClose}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-6 py-2.5 bg-slate-700/20 hover:bg-slate-700/30 text-slate-400 rounded-full transition-all border border-slate-700/30 hover:border-slate-600 shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-sm">返回地图</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></div>
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="h-full p-8 overflow-y-auto custom-scrollbar"
        >
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="glass-card p-8 border-slate-700/20 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 to-slate-800/5 pointer-events-none"></div>
                  <h3 className="truncate text-lg font-bold text-slate-400 mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-slate-500 rounded-full"></div>
                    国家级人工影响天气业务中心
                  </h3>
                  <p className="truncate text-base leading-relaxed text-white indent-8">
                    中国气象局人工影响天气中心（以下简称人影中心）是国家级人工影响天气业务中心，承担着全国人工影响天气工作的业务指导、技术支持、系统建设、重大服务组织、重点工程实施等重要职责。
                  </p>
                  <div className="mt-6 p-6 bg-slate-700/10 border-l-4 border-slate-500 rounded-r-xl">
                    <p className="text-base leading-relaxed text-slate-200">
                      <span className="text-slate-400 font-bold text-lg mr-2 drop-shadow-md">➤ 首家通过现场核查：</span>
                      <span className="font-medium">2025年10月31日，专项司会同高质量发展改革办共同组建现场核查组，认为</span>
                      <span className="text-slate-400 font-bold">人影中心全面完成了《实施方案》确定的各项目标任务</span>
                      <span className="font-medium">，为全国人工影响天气高质量发展提供了重要示范 and 引领。</span>
                    </p>
                  </div>
                  <p className="text-base leading-relaxed text-slate-200 indent-8 mt-6">
                    中心致力于推进人工影响天气现代化建设，提升防灾减灾救灾能力，服务生态文明建设和经济社会发展。标志着中心在现代化建设道路上迈出了坚实一步。
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-card p-6 border-slate-700/20">
                    <h4 className="truncate text-slate-300 font-bold mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      核心使命
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      为全国人工影响天气高质量发展提供重要示范和引领，确保国家级业务系统的高效运行与持续创新。
                    </p>
                  </div>
                  <div className="glass-card p-6 border-white/5">
                    <h4 className="text-cyan-300 font-bold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      发展目标
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      建设世界一流的人工影响天气业务中心，实现监测精密、预报精准、服务精细。
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 h-64">
                  <div className="flex-1 relative glass-card border-white/10 overflow-hidden group rounded-2xl">
                    <img 
                      src="https://picsum.photos/seed/command-center/800/600" 
                      alt="指挥中心" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-md p-3 text-center text-xs font-medium text-white border-t border-white/10">
                      人工影响天气联合指挥中心
                    </div>
                  </div>
                  <div className="flex-1 relative glass-card border-white/10 overflow-hidden group rounded-2xl">
                    <img 
                      src="https://picsum.photos/seed/inspection/800/600" 
                      alt="现场核查" 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-md p-3 text-center text-xs font-medium text-white border-t border-white/10">
                      高质量发展实施方案现场核查
                    </div>
                  </div>
                </div>
              </div>
        </motion.div>
      </div>
    </div>
  );
}
