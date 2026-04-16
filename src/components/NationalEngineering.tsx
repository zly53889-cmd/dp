import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Building2, Wind, Plane, CloudRain, Telescope, FlaskConical, MonitorPlay, Layers, ArrowLeft, Cloud, Rocket, Radar, Factory, Database, UploadCloud, X } from 'lucide-react';
import imgFangbao from '../assets/images/fangbao.png';

export function NationalEngineeringPanel({ activeTab, setActiveTab }: { activeTab: number | null, setActiveTab: (tab: number | null) => void }) {
  return (
    <div 
      className="w-full h-full flex items-center justify-center p-4 cursor-pointer hover:bg-slate-800/20 transition-all duration-500 group bg-slate-900/60 rounded-lg border border-slate-700/50 hover:border-slate-600/50 hover:shadow-xl relative overflow-hidden"
      onClick={() => setActiveTab(1)}
    >
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-500/5 blur-[40px] rounded-full pointer-events-none group-hover:bg-slate-500/10 transition-colors duration-700"></div>

      {/* Orbit Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full border border-dashed border-slate-700/30 animate-[spin_40s_linear_infinite] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-dashed border-slate-700/20 animate-[spin_60s_linear_reverse_infinite] pointer-events-none"></div>

      {/* Center Node (1) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div 
          className="w-14 h-14 rounded-full bg-slate-700/50 border-2 border-slate-500 flex flex-col items-center justify-center shadow-lg backdrop-blur-md group-hover:scale-110 transition-transform duration-500"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full border border-slate-400/30 scale-110 animate-pulse"></div>
          <Building2 className="w-5 h-5 text-slate-300 mb-0.5" />
          <span className="text-xs text-slate-200 font-bold tracking-widest">一中心</span>
        </motion.div>
      </div>

      {/* Inner Orbit Nodes (2) - Radius ~55px */}
      <div className="absolute z-20" style={{ top: 'calc(50% - 39px)', left: 'calc(50% - 39px)', transform: 'translate(-50%, -50%)' }}>
        <motion.div 
          className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-600 flex flex-col items-center justify-center shadow-md backdrop-blur-md group-hover:bg-slate-700/50 transition-colors"
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <FlaskConical className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
          <span className="text-xs text-slate-300 font-medium">研发实验</span>
        </motion.div>
      </div>

      <div className="absolute z-20" style={{ top: 'calc(50% + 39px)', left: 'calc(50% + 39px)', transform: 'translate(-50%, -50%)' }}>
        <motion.div 
          className="w-12 h-12 rounded-full bg-slate-800/40 border border-slate-600 flex flex-col items-center justify-center shadow-md backdrop-blur-md group-hover:bg-slate-700/50 transition-colors"
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Plane className="w-3.5 h-3.5 text-slate-400 mb-0.5" />
          <span className="text-xs text-slate-300 font-medium">机载保障</span>
        </motion.div>
      </div>

      {/* Outer Orbit Nodes (3) - Radius ~90px */}
      <div className="absolute z-10" style={{ top: 'calc(50% - 90px)', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <motion.div 
          className="w-11 h-11 rounded-full bg-slate-800/30 border border-slate-700/80 flex flex-col items-center justify-center shadow-sm backdrop-blur-md group-hover:bg-slate-700/40 transition-colors"
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <CloudRain className="w-3 h-3 text-slate-400 mb-0.5" />
          <span className="text-xs text-slate-300">防雹试验</span>
        </motion.div>
      </div>

      <div className="absolute z-10" style={{ top: 'calc(50% + 45px)', left: 'calc(50% + 78px)', transform: 'translate(-50%, -50%)' }}>
        <motion.div 
          className="w-11 h-11 rounded-full bg-slate-800/30 border border-slate-700/80 flex flex-col items-center justify-center shadow-sm backdrop-blur-md group-hover:bg-slate-700/40 transition-colors"
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        >
          <Telescope className="w-3 h-3 text-slate-400 mb-0.5" />
          <span className="text-xs text-slate-300">云雾观测</span>
        </motion.div>
      </div>

      <div className="absolute z-10" style={{ top: 'calc(50% + 45px)', left: 'calc(50% - 78px)', transform: 'translate(-50%, -50%)' }}>
        <motion.div 
          className="w-11 h-11 rounded-full bg-slate-800/30 border border-slate-700/80 flex flex-col items-center justify-center shadow-sm backdrop-blur-md group-hover:bg-slate-700/40 transition-colors"
          animate={{ y: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
        >
          <MonitorPlay className="w-3 h-3 text-slate-400 mb-0.5" />
          <span className="text-xs text-slate-300">业务中试</span>
        </motion.div>
      </div>
      
      {/* Click hint */}
      <div className="absolute bottom-3 right-3 text-[10px] text-slate-500 font-mono border border-slate-700 px-2 py-0.5 rounded-full group-hover:border-slate-500 group-hover:text-slate-400 transition-colors flex items-center gap-1 z-40">
        <span>CLICK TO EXPAND</span>
      </div>
    </div>
  );
}

export function NationalEngineeringDetail({ activeTab, setActiveTab, onClose }: { activeTab: number, setActiveTab: (tab: number | null) => void, onClose: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1.0);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // The core visual content is mostly within a 950x600 area.
        // We calculate scale based on this smaller bounding box so it appears much larger on screen.
        const scaleX = width / 950;
        const scaleY = height / 600;
        // Remove the restrictive cap, let it fill the screen aggressively.
        setScale(Math.min(scaleX, scaleY));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0f172a] text-slate-200 font-sans overflow-hidden z-[100] selection:bg-slate-500/30">
      {/* Close Button */}
      <motion.button 
        onClick={onClose}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(100,116,139,0.2)" }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-8 right-8 px-6 py-2.5 bg-slate-700/20 hover:bg-slate-700/30 text-slate-400 rounded-full border border-slate-700/30 hover:border-slate-600 transition-all tracking-widest text-base font-bold shadow-lg z-50 overflow-hidden group flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        返回地图
      </motion.button>

      {/* Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#475569_1px,transparent_1px),linear-gradient(to_bottom,#475569_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.05] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-slate-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Header - Ultra Minimalist HUD Style */}
      <header className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-4 opacity-90">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-slate-500"></div>
          <h1 className="text-sm font-normal tracking-[0.4em] text-slate-200 drop-shadow-md">
            国家人工影响天气工程
          </h1>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-slate-500"></div>
        </div>
        
        <div className="mt-3 px-5 py-1.5 border border-slate-700/20 bg-slate-900/40 backdrop-blur-md rounded-full shadow-lg">
          <p className="text-sm text-slate-400/80 tracking-[0.25em] font-mono">
            一中心 · 两平台 · 三基地
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main ref={containerRef} className="flex-1 relative w-full h-full flex items-center justify-center overflow-hidden min-h-0">
        <div 
          className="relative w-[1200px] h-[750px] shrink-0 origin-center transition-transform duration-300 ease-out"
          style={{ transform: `scale(${scale})` }}
        >
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#64748b" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#475569" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glow-line">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Lines from center to placeholders */}
            <g stroke="url(#line-grad)" strokeWidth="2" filter="url(#glow-line)" fill="none">
              <path d="M 50% 50% L 15% 15%" />
              <path d="M 50% 50% L 85% 15%" />
              <path d="M 50% 50% L 15% 85%" />
              <path d="M 50% 50% L 50% 90%" />
              <path d="M 50% 50% L 85% 85%" />
            </g>
          </svg>

          {/* Center: 一中心 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center w-[800px]">
          
          {/* 3D Base & Components */}
          <div className="relative w-full h-[450px] flex justify-center items-end pb-16">
            
            {/* High-tech Base (科技感圆盘) */}
            <div className="absolute bottom-4 w-[700px] h-[200px] flex items-center justify-center">
              {/* Outer Ring */}
              <div className="absolute w-full h-full rounded-[100%] border-[2px] border-slate-700/30 shadow-lg"></div>
              {/* Middle Dashed Ring */}
              <div className="absolute w-[85%] h-[85%] rounded-[100%] border-[3px] border-dashed border-slate-600/50 animate-[spin_20s_linear_infinite]"></div>
              {/* Inner Solid Ring */}
              <div className="absolute w-[70%] h-[70%] rounded-[100%] border-[4px] border-slate-500/60 shadow-lg bg-slate-900/40 backdrop-blur-sm"></div>
              {/* Core Glow */}
              <div className="absolute w-[40%] h-[40%] rounded-[100%] bg-cyan-400/20 blur-2xl"></div>
              
              {/* Horizontal grid lines for perspective */}
              <div className="absolute inset-0 rounded-[100%] overflow-hidden opacity-20">
                 <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_48%,#22d3ee_50%,transparent_52%)] bg-[size:100%_20px]"></div>
              </div>
            </div>

            {/* Two Parts on the Base */}
            <div className="relative z-10 flex justify-between items-end w-[550px] px-8 mb-8">
              
              {/* Left: Building (立体感的大楼) */}
              <div className="flex flex-col items-center relative group w-[200px]">
                {/* Label */}
                <div className="absolute -top-12 bg-cyan-950/90 border border-cyan-400/60 px-4 py-1.5 rounded shadow-[0_0_15px_rgba(6,182,212,0.5)] z-30">
                  <span className="text-cyan-100 font-bold text-xs tracking-wide">联合指挥中心大楼</span>
                  {/* Pointer line */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-cyan-400"></div>
                </div>

                {/* Building Structure (Real 3D) */}
                <div className="relative w-[180px] h-[220px] [perspective:1200px] flex items-center justify-center mt-4 cursor-pointer">
                  <div className="relative w-[120px] h-[160px] [transform-style:preserve-3d] transition-transform duration-700 [transform:rotateX(-15deg)_rotateY(35deg)] group-hover:[transform:rotateX(-15deg)_rotateY(45deg)]">
                    
                    {/* Antenna */}
                    <Building3DBox 
                      w={4} h={40} d={4} x={58} y={-40} z={0} 
                      className="shadow-[0_0_15px_#22d3ee]"
                      frontContent={<div className="w-full h-full bg-cyan-300"></div>}
                      rightContent={<div className="w-full h-full bg-cyan-200"></div>}
                    />

                    {/* Main Tower */}
                    <Building3DBox 
                      w={70} h={130} d={60} x={25} y={0} z={0}
                      frontContent={
                        <div className="w-full h-full flex flex-col justify-evenly p-1.5">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="w-full h-[2px] bg-cyan-400/50 shadow-[0_0_8px_#22d3ee]"></div>
                          ))}
                          <div className="absolute inset-0 flex justify-evenly pointer-events-none">
                            <div className="w-[1px] h-full bg-cyan-500/30"></div>
                            <div className="w-[1px] h-full bg-cyan-500/30"></div>
                          </div>
                        </div>
                      }
                      rightContent={
                        <div className="w-full h-full flex flex-col justify-evenly p-1.5">
                          {[...Array(7)].map((_, i) => (
                            <div key={i} className="w-full h-[2px] bg-cyan-400/40 shadow-[0_0_5px_#22d3ee]"></div>
                          ))}
                          <div className="absolute inset-0 flex justify-evenly pointer-events-none">
                            <div className="w-[1px] h-full bg-cyan-500/30"></div>
                            <div className="w-[1px] h-full bg-cyan-500/30"></div>
                          </div>
                        </div>
                      }
                      topContent={
                        <div className="w-[70%] h-[70%] border border-cyan-300/60 bg-cyan-900/80 flex items-center justify-center">
                          <div className="w-[40%] h-[40%] bg-cyan-400/60 blur-[2px]"></div>
                        </div>
                      }
                    />

                    {/* Base */}
                    <Building3DBox 
                      w={120} h={30} d={100} x={0} y={130} z={0}
                      frontContent={
                        <div className="w-full h-full flex items-end justify-center pb-1">
                          {/* Entrance */}
                          <div className="w-[30px] h-[15px] border-t-[2px] border-l-[2px] border-r-[2px] border-cyan-300 bg-cyan-800/80 shadow-[inset_0_0_10px_#22d3ee]"></div>
                        </div>
                      }
                      topContent={
                        <div className="w-full h-full border-[2px] border-cyan-400/30 bg-cyan-900/40"></div>
                      }
                    />

                  </div>
                  
                  {/* Ground Reflection/Shadow */}
                  <div className="absolute bottom-0 w-[160px] h-[30px] rounded-[100%] bg-cyan-500/30 blur-xl"></div>
                </div>
              </div>

              {/* Right: Transparent Sphere (透明圆球) */}
              <div className="flex flex-col items-center relative group w-[220px]">
                {/* Label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full text-center pointer-events-none">
                  <span className="text-cyan-50 font-bold text-xs tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-cyan-950/40 px-2 py-1 rounded backdrop-blur-sm border border-cyan-500/30">
                    决策指挥系统软件平台
                  </span>
                </div>

                {/* Sphere */}
                <div className="relative w-[200px] h-[200px] transform hover:scale-105 transition-transform duration-500 cursor-pointer">
                  {/* Glass Globe */}
                  <div className="absolute inset-0 rounded-full border-[2px] border-cyan-300/80 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.2),rgba(2,11,24,0.8))] shadow-[inset_0_0_40px_rgba(34,211,238,0.5),0_0_30px_rgba(6,182,212,0.4)] overflow-hidden backdrop-blur-sm">
                    
                    {/* Map Texture (Simulated with CSS) */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,transparent_50%,#06b6d4_100%)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-[180px] h-[180px] rounded-full border border-cyan-500/20 transform rotate-45"></div>
                       <div className="absolute w-[180px] h-[180px] rounded-full border border-cyan-500/20 transform -rotate-45"></div>
                    </div>

                    {/* Inner Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                      {/* Cloud with Up Arrows */}
                      <div className="relative mb-6">
                        <UploadCloud className="w-16 h-16 text-cyan-200 drop-shadow-[0_0_12px_#22d3ee]" strokeWidth={1.5} />
                      </div>
                      
                      {/* Three small icons */}
                      <div className="flex gap-4 mt-4">
                        <div className="w-8 h-8 rounded-full border border-cyan-400 bg-cyan-950/60 flex items-center justify-center shadow-[0_0_10px_#22d3ee]">
                          <Cloud className="w-4 h-4 text-cyan-200" />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-cyan-400 bg-cyan-950/60 flex items-center justify-center shadow-[0_0_10px_#22d3ee]">
                          <Plane className="w-4 h-4 text-cyan-200" />
                        </div>
                        <div className="w-8 h-8 rounded-full border border-cyan-400 bg-cyan-950/60 flex items-center justify-center shadow-[0_0_10px_#22d3ee]">
                          <Database className="w-4 h-4 text-cyan-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sphere Stand */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80px] h-[20px] flex flex-col items-center">
                    <div className="w-[40px] h-[10px] bg-gradient-to-b from-cyan-400/50 to-transparent" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div>
                    <div className="w-[80px] h-[10px] rounded-[100%] border border-cyan-400 bg-cyan-950 shadow-[0_0_15px_#22d3ee]"></div>
                  </div>
                  
                  {/* Ground Reflection/Shadow */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120px] h-[20px] rounded-[100%] bg-cyan-500/20 blur-md"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Placeholders for Two Platforms & Three Bases */}
        
        {/* Top Left: 风洞 */}
        <PlaceholderCard 
          title="云雾物理与催化技术研发实验平台" 
          subtitle="(风洞)"
          icon={<Factory className="w-10 h-10 text-cyan-300" />}
          className="absolute top-[15%] left-[15%] transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* Top Right: 机载保障 */}
        <PlaceholderCard 
          title="人影机载保障平台" 
          icon={<Plane className="w-10 h-10 text-cyan-300" />}
          className="absolute top-[15%] left-[85%] transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* Bottom Left: 防雹试验 */}
        <PlaceholderCard 
          title="国家级防雹试验基地" 
          icon={<Rocket className="w-10 h-10 text-cyan-300" />}
          className="absolute top-[85%] left-[15%] transform -translate-x-1/2 -translate-y-1/2"
          onClick={() => setSelectedNode('hail-base')}
        />

        {/* Bottom Center: 云雾观测 */}
        <PlaceholderCard 
          title="立体化云雾观测基地" 
          icon={<Radar className="w-10 h-10 text-cyan-300" />}
          className="absolute top-[90%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* Bottom Right: 中试基地 */}
        <PlaceholderCard 
          title="重大人影保障业务中试基地" 
          icon={<Building2 className="w-10 h-10 text-cyan-300" />}
          className="absolute top-[85%] left-[85%] transform -translate-x-1/2 -translate-y-1/2"
        />

        </div>
      </main>

      {/* Detail Modal Overlay */}
      {selectedNode === 'hail-base' && (
        <div className="absolute inset-0 z-[200] bg-[#020b18]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-[1400px] max-h-full bg-[#020b18]/95 backdrop-blur-xl border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden text-cyan-50"
          >
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-xl"></div>

            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-cyan-500/30 bg-cyan-950/30 relative">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-8 bg-cyan-400 rounded-sm shadow-[0_0_10px_#22d3ee]"></div>
                  <div className="w-2 h-8 bg-cyan-500/50 rounded-sm"></div>
                </div>
                <h2 className="truncate text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-cyan-300 tracking-wider drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
                  贵州威宁防雹基地冰雹联防外场试验
                </h2>
              </div>
              <button 
                onClick={() => setSelectedNode(null)}
                className="p-2 text-cyan-400 hover:text-cyan-100 hover:bg-cyan-500/20 rounded-full transition-colors relative z-10"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-transparent flex flex-col items-center relative z-10">
              {/* Description Text */}
              <div className="mb-6 text-cyan-50/90 leading-relaxed text-base md:text-base px-6 py-5 w-full bg-cyan-950/40 border border-cyan-500/20 rounded-lg shadow-[inset_0_0_20px_rgba(34,211,238,0.05)] relative overflow-hidden">
                {/* Decorative background scanline */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                <div className="relative z-10">
                  依托国家工程，研发一套相控阵雷达瞬时-随动精准捕捉弹炸点协同观测系统和一套防雹专用相控阵雷达监控系统，
                  <span className="text-rose-400 font-bold mx-1 drop-shadow-[0_0_5px_rgba(251,113,133,0.5)]">突破防雹爆炸效应的观测瓶颈</span>，
                  获得高炮防雹效果、爆炸效应观测证据及冰雹云雹胚对流触发高度等新特征。
                  <span className="text-rose-400 font-bold mx-1 drop-shadow-[0_0_5px_rgba(251,113,133,0.5)]">发展冰雹早期预警、精准作业和区域联防技术，助力农民增收和”FAST”大科学装置免遭冰雹损坏。</span>
                </div>
              </div>

              {/* Image Container with Tech Border */}
              <div className="relative w-full p-2 rounded-lg border border-cyan-500/30 bg-[#020b18]/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
                {/* Inner Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-300 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-300 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-300 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-300 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <img 
                  src={imgFangbao} 
                  alt="贵州威宁防雹基地冰雹联防外场试验" 
                  className="w-full h-auto max-h-full object-contain rounded shadow-sm opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Global Styles for custom animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}

const PlaceholderCard = ({ title, subtitle, icon, className, onClick }: { title: string, subtitle?: string, icon: React.ReactNode, className?: string, onClick?: () => void }) => {
  return (
    <div className={`flex flex-col items-center z-10 w-[240px] ${className}`} onClick={onClick}>
      {/* Hexagon or Circle Icon Container */}
      <div className="relative w-28 h-28 mb-4 group cursor-pointer">
        {/* Outer rotating dashed ring */}
        <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-cyan-500/40 group-hover:border-cyan-300 animate-[spin_10s_linear_infinite] group-hover:animate-[spin_5s_linear_infinite]"></div>
        {/* Inner solid ring */}
        <div className="absolute inset-2 rounded-full border-[2px] border-cyan-400/60 bg-cyan-950/80 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Title Box */}
      <div className="relative w-full">
        {/* Decorative corners */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
        
        <div className="bg-cyan-950/60 border border-cyan-500/30 px-4 py-3 text-center backdrop-blur-sm shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
          <h3 className="truncate text-xs font-bold text-cyan-50 tracking-wide leading-snug">{title}</h3>
          {subtitle && <p className="text-xs text-cyan-300 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

interface Building3DBoxProps {
  w: number;
  h: number;
  d: number;
  x?: number;
  y?: number;
  z?: number;
  frontContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  topContent?: React.ReactNode;
  className?: string;
}

const Building3DBox = ({ w, h, d, x = 0, y = 0, z = 0, frontContent = null, rightContent = null, topContent = null, className = "" }: Building3DBoxProps) => {
  return (
    <div
      className={`absolute [transform-style:preserve-3d] ${className}`}
      style={{
        width: w,
        height: h,
        transform: `translate3d(${x}px, ${y}px, ${z}px)`
      }}
    >
      {/* Front */}
      <div className="absolute bg-cyan-950/80 border border-cyan-400/60 overflow-hidden shadow-[inset_0_0_20px_rgba(34,211,238,0.2)]" 
           style={{ left: 0, top: 0, width: w, height: h, transform: `translateZ(${d/2}px)` }}>
        {frontContent}
      </div>
      {/* Back */}
      <div className="absolute bg-cyan-950/90 border border-cyan-400/60" 
           style={{ left: 0, top: 0, width: w, height: h, transform: `translateZ(-${d/2}px) rotateY(180deg)` }}></div>
      {/* Right */}
      <div className="absolute bg-cyan-900/90 border border-cyan-400/60 overflow-hidden shadow-[inset_0_0_20px_rgba(34,211,238,0.3)]" 
           style={{ left: w - d/2, top: 0, width: d, height: h, transform: `rotateY(90deg)` }}>
        {rightContent}
      </div>
      {/* Left */}
      <div className="absolute bg-cyan-950/90 border border-cyan-400/60" 
           style={{ left: -d/2, top: 0, width: d, height: h, transform: `rotateY(-90deg)` }}></div>
      {/* Top */}
      <div className="absolute bg-cyan-800/90 border border-cyan-400/60 flex items-center justify-center shadow-[inset_0_0_30px_rgba(34,211,238,0.4)]" 
           style={{ left: 0, top: -d/2, width: w, height: d, transform: `rotateX(90deg)` }}>
        {topContent}
      </div>
      {/* Bottom */}
      <div className="absolute bg-cyan-950/90 border border-cyan-400/60" 
           style={{ left: 0, bottom: -d/2, width: w, height: d, transform: `rotateX(-90deg)` }}></div>
    </div>
  );
};
