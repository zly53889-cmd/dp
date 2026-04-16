import React from 'react';

export function OperationEffectTable() {
  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="flex-1 overflow-hidden rounded-lg border border-cyan-500/30 bg-slate-900/50 flex items-center justify-center">
        <img 
          src="/images/operation-effect-table.png" 
          alt="作业效果一张表" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
