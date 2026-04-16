import React from 'react';

export function CenterHistoryTimeline() {
  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden bg-white/[0.02] backdrop-blur-md border border-cyan-500/20 shadow-inner">
      {/* Misty effect background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.15)_0%,transparent_70%)] blur-md"></div>
      <svg viewBox="0 0 200 60" className="w-full h-full absolute inset-0 overflow-visible" preserveAspectRatio="xMidYMid meet">
        {/* Flowing light ribbon */}
        <path d="M 10,40 C 40,40 50,20 80,20 C 110,20 130,35 160,35 C 180,35 190,15 210,15" fill="none" stroke="url(#ribbonGradient)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
        
        <defs>
          <linearGradient id="ribbonGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#a5f3fc" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Glowing nodes and dates */}
        <g transform="translate(25, 30)">
          <circle cx="0" cy="0" r="3" fill="#fff" filter="url(#glow)" />
          <circle cx="0" cy="0" r="1.5" fill="#0284c7" />
          <text x="0" y="-8" fontSize="6" textAnchor="middle" fill="#e2e8f0" fontWeight="bold" className="refractive-text">1965</text>
          <text x="0" y="10" fontSize="4.5" textAnchor="middle" fill="#94a3b8">庐山会议</text>
        </g>
        <g transform="translate(80, 20)">
          <circle cx="0" cy="0" r="3" fill="#fff" filter="url(#glow)" />
          <circle cx="0" cy="0" r="1.5" fill="#0284c7" />
          <text x="0" y="-8" fontSize="6" textAnchor="middle" fill="#e2e8f0" fontWeight="bold" className="refractive-text">1978</text>
          <text x="0" y="10" fontSize="4.5" textAnchor="middle" fill="#94a3b8">北京成立</text>
        </g>
        <g transform="translate(135, 31)">
          <circle cx="0" cy="0" r="3" fill="#fff" filter="url(#glow)" />
          <circle cx="0" cy="0" r="1.5" fill="#0284c7" />
          <text x="0" y="-8" fontSize="6" textAnchor="middle" fill="#e2e8f0" fontWeight="bold" className="refractive-text">2012</text>
          <text x="0" y="10" fontSize="4.5" textAnchor="middle" fill="#94a3b8">中心更名</text>
        </g>
        <g transform="translate(185, 21)">
          <circle cx="0" cy="0" r="3" fill="#fff" filter="url(#glow)" />
          <circle cx="0" cy="0" r="1.5" fill="#0284c7" />
          <text x="0" y="-8" fontSize="6" textAnchor="middle" fill="#e2e8f0" fontWeight="bold" className="refractive-text">2021</text>
          <text x="0" y="10" fontSize="4.5" textAnchor="middle" fill="#94a3b8">直属机构</text>
        </g>
      </svg>
    </div>
  );
}
