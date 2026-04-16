import React from 'react';
import { X } from 'lucide-react';

interface NationalCenterDetailProps {
  onClose: () => void;
}

export function NationalCenterDetail({ onClose }: NationalCenterDetailProps) {
  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-red-500/50 text-cyan-100 hover:text-white rounded-full transition-all duration-300 z-50 backdrop-blur-md border border-white/20"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="glass-card border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)] mb-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <p className="truncate text-lg leading-relaxed text-white relative z-10">
          <span className="text-red-500 font-bold text-xl mr-2 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">➤ 首家通过现场核查：</span>
          <span className="font-medium">10月31日，专项司会同高质量发展改革办共同组建现场核查组，对照《实施方案》、验收总结报告、完成情况自评估表等，逐一核实高质量</span>
          <span className="text-blue-400 font-bold">指标、任务完成情况、取得实际成效、相关佐证材料的完整性与真实性等</span>
          <span className="font-medium">，认为</span>
          <span className="text-red-500 font-bold">人影中心全面完成了《实施方案》确定的各项目标任务</span>
          <span className="font-medium">，为全国人工影响天气高质量发展提供了重要示范和引领。验收材料</span>
          <span className="text-red-500 font-bold">内容真实可信，具备召开验收会议条件。</span>
        </p>
      </div>

      <div className="flex gap-6 h-64">
        {/* Image 1 */}
        <div className="flex-1 relative glass-card border-cyan-500/30 overflow-hidden group flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <img 
              src="https://picsum.photos/seed/command-center/800/600" 
              alt="人工影响天气联合指挥中心" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div className="bg-blue-500/80 backdrop-blur-md text-white text-center py-2 text-base font-medium border-t border-blue-400/50">
            2025.10.31 | 专项司会同高质量发展改革办共同开展现场核查
          </div>
        </div>

        {/* Image 2 */}
        <div className="flex-1 relative glass-card border-white/10 overflow-hidden group flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <img 
              src="https://picsum.photos/seed/inspection/800/600" 
              alt="核查组专家现场查验业务系统建设" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
              referrerPolicy="no-referrer" 
            />
          </div>
          <div className="bg-blue-500/80 backdrop-blur-md text-white text-center py-2 text-sm font-medium border-t border-blue-400/50">
            2025.10.31 | 核查组专家现场查验业务系统建设
          </div>
        </div>

        {/* Image 3 (Document) */}
        <div className="flex-[0.8] relative glass-card border-white/10 overflow-hidden group flex items-center justify-center bg-slate-800/50 p-4">
          <div className="w-full h-full bg-white rounded shadow-2xl p-6 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-500 relative">
            {/* Stacked paper effect */}
            <div className="absolute top-2 left-2 right-[-8px] bottom-[-8px] bg-cyan-300/100 rounded shadow-lg -z-10"></div>
            <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] bg-white/30 rounded shadow-lg -z-20"></div>
            
            <div className="text-black text-center flex flex-col items-center justify-center h-full">
              <p className="text-sm text-gray-500 self-start mb-4">附件 2</p>
              <h3 className="text-sm font-bold mb-8 leading-relaxed">中国气象局人工影响天气中心高质量发展<br/>实施方案（2023—2025年）评估报告</h3>
              <div className="mt-auto text-sm text-gray-600">
                <p>中国气象局人工影响天气中心</p>
                <p className="mt-1">2025年9月</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
