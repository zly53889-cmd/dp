import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DetailPanelWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  headerContent?: React.ReactNode;
  themeClasses?: {
    bg: string;
    border: string;
    text: string;
    shadow: string;
  };
  children: React.ReactNode;
}

export function DetailPanelWrapper({ 
  isOpen, 
  onClose, 
  title, 
  icon, 
  headerContent,
  themeClasses = {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30',
    text: 'text-cyan-300',
    shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]'
  },
  children 
}: DetailPanelWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 flex flex-col p-4 overflow-hidden z-50 bg-slate-900/95 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-4">
              {icon && (
                <div className={`p-3 rounded-xl ${themeClasses.bg} border ${themeClasses.border} ${themeClasses.shadow}`}>
                  {icon}
                </div>
              )}
              {title && (
                <h2 className={`text-3xl font-bold ${themeClasses.text} tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
                  {title}
                </h2>
              )}
            </div>
            {headerContent && (
              <div className="flex-1 flex justify-center">
                {headerContent}
              </div>
            )}
            <button 
              onClick={onClose}
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] bg-[position:200%_0,0_0] bg-no-repeat group-hover:transition-[background-position_0s_ease] group-hover:bg-[position:-100%_0,0_0] group-hover:duration-[1500ms]"></div>
              <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 group-hover:scale-110 transition-transform duration-300">
                <X className="w-4 h-4" />
              </div>
              <span className="relative font-bold text-cyan-100 tracking-widest group-hover:text-white transition-colors">返回地图</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 min-h-0 relative overflow-y-auto no-scrollbar">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
