import React, { useRef, useEffect } from 'react';

export function AutoScrollList({ items }: { items: string[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scroll = () => {
      if (scrollContainer.scrollTop >= scrollContainer.scrollHeight / 2) {
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 0.5;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="h-full overflow-hidden space-y-2 py-2"
    >
      {[...items, ...items].map((item, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg bg-cyan-300/10 border border-cyan-500/30 hover:bg-white/10 transition-colors group"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] group-hover:scale-125 transition-transform" />
          <span className="text-white text-base leading-relaxed">{item}</span>
        </div>
      ))}
    </div>
  );
}
