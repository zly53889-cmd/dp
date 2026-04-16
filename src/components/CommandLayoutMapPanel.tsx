import React from 'react';
import { X } from 'lucide-react';
import { CommandCenterMap } from './CommandCenterMap';

interface CommandLayoutMapPanelProps {
  onClose: () => void;
}

export function CommandLayoutMapPanel({ onClose }: CommandLayoutMapPanelProps) {
  return (
    <div className="w-full h-full flex flex-col p-6 overflow-y-auto custom-scrollbar relative">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-red-500/50 text-cyan-100 hover:text-white rounded-full transition-all duration-300 z-50 backdrop-blur-md border border-white/20"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="glass-card border-cyan-500/30 p-4 shadow-[0_0_30px_rgba(34,211,238,0.15)] mb-4 relative overflow-hidden group shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 pointer-events-none"></div>
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>
        
        <h2 className="truncate text-xl font-bold text-cyan-300 tracking-wider flex items-center gap-2 relative z-10">
          <div className="w-1 h-5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
          国家（区域）指挥协同能力建设布局图
        </h2>
      </div>

      <div className="flex-1 relative glass-card border-cyan-500/30 overflow-hidden group flex flex-col min-h-0">
        <div className="flex-1 relative overflow-hidden bg-slate-900/50 flex items-center justify-center">
          <div className="absolute inset-0">
            <CommandCenterMap />
          </div>
        </div>
      </div>
    </div>
  );
}
