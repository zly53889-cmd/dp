import React from 'react';
import { CheckCircle2, Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface ThreeYearActionModalProps {
  onClose: () => void;
}

export function ThreeYearActionModal({ onClose }: ThreeYearActionModalProps) {
  return (
    <div className="w-full h-full flex flex-col bg-slate-950/40 backdrop-blur-xl rounded-[36px] overflow-hidden border border-cyan-500/30 shadow-2xl relative">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-cyan-300/10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="truncate text-2xl font-bold text-white tracking-wider">
              落实《纲要》三年行动重点任务
            </h2>
            <p className="text-sm text-cyan-400/60 font-medium mt-0.5 tracking-widest uppercase">
              <span className="text-amber-400">5种</span>能力提升 · <span className="text-amber-400">21项</span>重点任务 · <span className="text-amber-400">4条</span>保障措施
            </p>
          </div>
        </div>
        
        <motion.button 
          onClick={onClose}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-3 px-6 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-full transition-all border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none"></div>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold tracking-widest text-base">返回地图</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          
          {/* Column 1: 基本情况 */}
          <div className="glass-card border-blue-500/30 flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600/40 to-blue-400/20 p-4 border-b border-blue-500/30 text-center">
              <h3 className="truncate text-xl font-bold text-blue-100 tracking-widest drop-shadow-md">基本情况</h3>
            </div>
            <div className="p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar">
              <div>
                <h4 className="truncate text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
                  <span className="italic">1.</span> 完成率达到100%
                </h4>
                <ul className="space-y-2 text-sm text-cyan-100 list-disc pl-5 marker:text-blue-400">
                  <li><span className="text-amber-400 font-bold">1个</span>总体目标和<span className="text-amber-400 font-bold">6个</span>具体指标全部实现</li>
                  <li><span className="text-amber-400 font-bold">5大</span>方面<span className="text-amber-400 font-bold">21条</span>任务<span className="text-amber-400 font-bold">219项</span>具体工作已全部完成</li>
                </ul>
              </div>
              <div>
                <h4 className="truncate text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
                  <span className="italic">2.</span> 软建设能力增强
                </h4>
                <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5 marker:text-blue-400">
                  <li>新制修订业务规范、技术指南等<span className="text-amber-400 font-bold">38项</span>、标准<span className="text-amber-400 font-bold">13项</span></li>
                  <li>新增业务指导产品<span className="text-amber-400 font-bold">19类</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
                  <span className="italic">3.</span> 科技人才全面提升
                </h4>
                <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5 marker:text-blue-400">
                  <li><span className="text-amber-400 font-bold">9名</span>入选中国局高层次人才</li>
                  <li><span className="text-amber-400 font-bold">40余项</span>省部级以上科研项目</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: 典型成果 */}
          <div className="glass-card border-orange-500/30 flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-orange-600/40 to-orange-400/20 p-4 border-b border-orange-500/30 text-center">
              <h3 className="truncate text-xl font-bold text-orange-100 tracking-widest drop-shadow-md">典型成果</h3>
            </div>
            <div className="p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar">
              <div className="flex gap-3 items-start">
                <div className="text-orange-400 font-bold text-xl italic shrink-0">1.</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="text-orange-400 font-bold">暖云催化</span>关键技术研究取得突破，增强人工干预能力
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="text-orange-400 font-bold text-xl italic shrink-0">2.</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  研发了多元融合<span className="text-orange-400 font-bold">效果评估技术</span>，提升评估的科学性和可靠性
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="text-orange-400 font-bold text-xl italic shrink-0">3.</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  开拓了空中作业装备，建立大型<span className="text-orange-400 font-bold">无人机</span>人影应用技术
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="text-orange-400 font-bold text-xl italic shrink-0">4.</div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  建成了国省一体化平台，实现了<span className="text-orange-400 font-bold">“端到端”</span>的科学作业指挥
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: 成效检验 */}
          <div className="glass-card border-cyan-500/30 flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-600/40 to-cyan-400/20 p-4 border-b border-cyan-500/30 text-center">
              <h3 className="truncate text-xl font-bold text-cyan-100 tracking-widest drop-shadow-md">成效检验</h3>
            </div>
            <div className="p-6 flex flex-col gap-6 overflow-y-auto no-scrollbar">
              <p className="text-sm text-slate-300 leading-relaxed">
                在<span className="text-cyan-300 font-bold">北京9.3活动保障、广东十五运、西藏和新疆专项活动保障、春雨行动、谷雨行动</span>等实战中，高质量发展成果得到了系统全面检验，取得了明显成效，<span className="text-cyan-300 font-bold">获得了局领导批示肯定</span>
              </p>
              
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-xl"></div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="text-cyan-300 font-bold">陈振林</span>局长：望再接再厉抢抓机遇，大力提升科技能力、完善工作机制，统筹国内国际做好长远谋划。
                </p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-xl"></div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  <span className="text-cyan-300 font-bold">熊绍员</span>副局长：9.3重大保障任务圆满完成，人影发挥了关键性作用”，认为人影“体系化能力水平‘前所未有’，取得了提升政治站位、社会反响、体制机制、业务技术、精神风貌等多方面显著成效”
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
