import React from 'react';

export function FifteenthFiveYearPlanPanel() {
  const projects = [
    {
      id: 1,
      title: "人工影响天气防灾减灾\n能力提升工程",
      theme: "cyan"
    },
    {
      id: 2,
      title: "人工影响天气生态保护与\n修复能力建设工程",
      theme: "emerald"
    },
    {
      id: 3,
      title: "人工影响天气重大应急\n保障能力建设工程",
      theme: "blue"
    },
    {
      id: 4,
      title: "人工影响天气作业安全\n能力提升工程",
      theme: "indigo"
    }
  ];

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'cyan': return { 
        bg: 'bg-slate-800/10', 
        border: 'border-slate-700/30', 
        text: 'text-slate-400', 
        numBg: 'bg-slate-600', 
        shadow: 'shadow-lg', 
        headerBg: 'bg-white/5',
        titleColor: 'text-slate-100'
      };
      case 'emerald': return { 
        bg: 'bg-white/5', 
        border: 'border-white/10', 
        text: 'text-slate-400', 
        numBg: 'bg-slate-600', 
        shadow: 'shadow-lg', 
        headerBg: 'bg-white/5',
        titleColor: 'text-slate-100'
      };
      case 'blue': return { 
        bg: 'bg-white/5', 
        border: 'border-white/10', 
        text: 'text-slate-400', 
        numBg: 'bg-slate-600', 
        shadow: 'shadow-lg', 
        headerBg: 'bg-white/5',
        titleColor: 'text-slate-100'
      };
      case 'indigo': return { 
        bg: 'bg-white/5', 
        border: 'border-white/10', 
        text: 'text-slate-400', 
        numBg: 'bg-slate-600', 
        shadow: 'shadow-lg', 
        headerBg: 'bg-white/5',
        titleColor: 'text-slate-100'
      };
      default: return { 
        bg: 'from-slate-900/40 to-slate-900/10', 
        border: 'border-slate-700/40', 
        text: 'text-slate-400', 
        numBg: 'bg-slate-600', 
        shadow: 'shadow-lg', 
        headerBg: 'bg-black/20',
        titleColor: 'text-slate-100'
      };
    }
  };

  return (
    <div className="absolute inset-0 flex gap-3 p-2">
      {projects.map((project) => {
        const styles = getThemeStyles(project.theme);
        return (
          <div key={project.id} className={`flex-1 flex flex-col ios-squircle mirror-edge border ${styles.border} glass-card glass-reflection overflow-hidden ${styles.shadow} relative group hover:-translate-y-2 transition-all duration-500 cursor-pointer backdrop-blur-2xl liquid-distortion`}>
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none"></div>

            {/* Content */}
            <div className={`relative flex-1 p-4 flex flex-col items-center justify-center ${styles.headerBg}`}>
              {/* Decorative corners */}
              <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 ${styles.border} opacity-50 rounded-tl-2xl`}></div>
              <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 ${styles.border} opacity-30 rounded-br-2xl`}></div>
              
              <h4 className={`text-xs font-black text-center ${styles.titleColor} leading-relaxed z-10 whitespace-pre-line drop-shadow-2xl tracking-widest group-hover:scale-110 transition-transform duration-500 refractive-text`}>
                {project.title}
              </h4>
            </div>
            
            {/* Bottom Decoration */}
            <div className={`h-2 w-full ${styles.numBg} opacity-60 shadow-md relative z-20`}></div>
          </div>
        );
      })}
    </div>
  );
}
