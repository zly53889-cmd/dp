import React, { useState, useRef, useEffect } from 'react';
import { Target, ShieldCheck, Cpu, FileText, X, GitCommit, GitBranch, Network, ArrowLeft, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ProvincialCapacityPanel({ activeTab, setActiveTab }: { activeTab: number | null, setActiveTab: (tab: number | null) => void }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={scrollContainerRef}
      className="absolute inset-0 flex flex-col p-3 overflow-y-auto overflow-x-hidden custom-scrollbar"
    >
      {/* Root Node */}
      <div className="relative">
        <div
          onClick={() => setActiveTab(activeTab === 1 ? null : 1)}
          className={`relative z-10 cursor-pointer border p-2.5 rounded-lg transition-all duration-300 flex items-center gap-3 glass-card ${
            activeTab === 1
              ? 'bg-slate-700/40 border-slate-500 shadow-lg'
              : 'border-slate-700/20 hover:bg-white/5 hover:border-slate-500/50'
          }`}
        >
          <div className="layered-glass-icon w-8 h-8 shrink-0">
            <Target className="w-4 h-4 text-slate-300" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-xs text-slate-400/80 mb-0.5 font-bold tracking-wider flex items-center gap-1">
              <Network className="w-3 h-3" /> 建设目标
            </div>
            <div className={`font-bold text-xs truncate transition-colors ${activeTab === 1 ? 'text-slate-200' : 'text-slate-400'}`}>补短板、强能力、筑安全</div>
          </div>
        </div>

        {/* Vertical Line from Root */}
        <div className={`absolute left-6 top-10 bottom-[-16px] w-px z-0 transition-colors duration-500 ${activeTab === 1 || activeTab === 2 || activeTab === 3 || activeTab === 4 ? 'bg-slate-500 shadow-sm' : 'bg-white/5'}`}></div>
      </div>

      {/* Branch Node 1 */}
      <div className="relative mt-4 pl-8">
        {/* Horizontal connector */}
        <div className={`absolute left-6 top-1/2 w-2 h-px z-0 transition-colors duration-500 ${activeTab === 2 ? 'bg-slate-500 shadow-sm' : 'bg-white/5'}`}></div>

        <div
          onClick={() => setActiveTab(activeTab === 2 ? null : 2)}
          className={`relative z-10 cursor-pointer border p-2 rounded-lg transition-all duration-300 flex items-center gap-2.5 glass-card ${
            activeTab === 2
              ? 'bg-slate-700/40 border-slate-500 shadow-lg'
              : 'border-white/5 hover:bg-white/5 hover:border-slate-500/50'
          }`}
        >
          <div className={`p-1.5 rounded-md transition-colors ${activeTab === 2 ? 'bg-slate-600/30 text-slate-200' : 'bg-white/5 text-slate-500'}`}>
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-xs text-slate-400/80 mb-0.5 font-bold tracking-wider flex items-center gap-1">
              <GitBranch className="w-3 h-3" /> 核心任务一
            </div>
            <div className={`font-bold text-xs truncate transition-colors ${activeTab === 2 ? 'text-slate-200' : 'text-slate-400'}`}>作业装备升级改造</div>
          </div>
        </div>
      </div>

      {/* Branch Node 2 */}
      <div className="relative mt-2 pl-8">
        {/* Horizontal connector */}
        <div className={`absolute left-6 top-1/2 w-2 h-px z-0 transition-colors duration-500 ${activeTab === 3 ? 'bg-slate-500 shadow-sm' : 'bg-white/5'}`}></div>

        <div
          onClick={() => setActiveTab(activeTab === 3 ? null : 3)}
          className={`relative z-10 cursor-pointer border p-2 rounded-lg transition-all duration-300 flex items-center gap-2.5 glass-card ${
            activeTab === 3
              ? 'bg-slate-700/40 border-slate-500 shadow-lg'
              : 'border-white/5 hover:bg-white/5 hover:border-slate-500/50'
          }`}
        >
          <div className={`p-1.5 rounded-md transition-colors ${activeTab === 3 ? 'bg-slate-600/30 text-slate-200' : 'bg-white/5 text-slate-500'}`}>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-xs text-slate-400/80 mb-0.5 font-bold tracking-wider flex items-center gap-1">
              <GitBranch className="w-3 h-3" /> 核心任务二
            </div>
            <div className={`font-bold text-xs truncate transition-colors ${activeTab === 3 ? 'text-slate-200' : 'text-slate-400'}`}>安全与指挥能力提升</div>
          </div>
        </div>
      </div>

      {/* Branch Node 3 */}
      <div className="relative mt-2 pl-8">
        {/* Horizontal connector */}
        <div className={`absolute left-6 top-1/2 w-2 h-px z-0 transition-colors duration-500 ${activeTab === 4 ? 'bg-slate-500 shadow-sm' : 'bg-white/5'}`}></div>

        <div
          onClick={() => setActiveTab(activeTab === 4 ? null : 4)}
          className={`relative z-10 cursor-pointer border p-2 rounded-lg transition-all duration-300 flex items-center gap-2.5 glass-card ${
            activeTab === 4
              ? 'bg-slate-700/40 border-slate-500 shadow-lg'
              : 'border-white/5 hover:bg-white/5 hover:border-slate-500/50'
          }`}
        >
          <div className={`p-1.5 rounded-md transition-colors ${activeTab === 4 ? 'bg-slate-600/30 text-slate-200' : 'bg-white/5 text-slate-500'}`}>
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-xs text-slate-400/80 mb-0.5 font-bold tracking-wider flex items-center gap-1">
              <GitBranch className="w-3 h-3" /> 核心任务三
            </div>
            <div className={`font-bold text-xs truncate transition-colors ${activeTab === 4 ? 'text-slate-200' : 'text-slate-400'}`}>技术指导与规范编制</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProvincialCapacityDetail({ activeTab, onClose }: { activeTab: number, onClose: () => void }) {
  const renderContent = () => {
    if (activeTab === 1) {
      return (
        <div className="space-y-6">
          <h2 className="truncate text-xl font-bold text-cyan-300 mb-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] border-b border-cyan-500/30 pb-2 pr-10">
            国债项目省级及以下人影能力建设指南
          </h2>
          <div className="glass-card p-6 border-cyan-500/20 mb-6">
            <h3 className="truncate text-lg font-bold text-red-400 mb-4">建设目标：补短板、强能力、筑安全</h3>
            <p className="truncate text-base leading-relaxed">
              加快全国各省（区、市）人工影响天气工作<span className="text-red-400 font-bold">数字化、智能化转型</span>，为地方经济社会发展、生态文明建设提供更好服务保障。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-cyan-300/10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-base p-4 text-center h-48">
              指南封面图
            </div>
            <div className="bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-sm p-4 text-center h-48">
              数字化转型示意图
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 2) {
      return (
        <div className="space-y-6">
          <h2 className="truncate text-xl font-bold text-cyan-300 mb-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] border-b border-cyan-500/30 pb-2 pr-10">
            人影作业装备升级改造
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="glass-card p-4 border-cyan-500/20">
              <ul className="list-decimal pl-5 space-y-2 text-sm">
                <li>高炮升级改造</li>
                <li>火箭发射装置升级更新</li>
                <li>烟炉作业系统升级</li>
                <li>智能化烟炉建设</li>
                <li>机动集成作业系统建设</li>
                <li>人影作业飞机任务系统升级改造</li>
                <li>地面作业装备及弹药技术保障系统建设</li>
              </ul>
            </div>
            <div className="glass-card p-4 border-red-500/20 bg-red-500/5">
              <h3 className="truncate text-lg font-bold text-red-400 mb-3">关键指标</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-red-300">
                <li>地面装备自动化改造完成率达<span className="font-bold text-red-400">100%</span></li>
                <li>增建智能烟炉<span className="font-bold text-red-400">910套</span></li>
                <li>建设<span className="font-bold text-red-400">54套</span>机动集成作业系统</li>
                <li>升级改造<span className="font-bold text-red-400">22架</span>地方人影作业飞机</li>
                <li>建设<span className="font-bold text-red-400">3套</span>地面作业装备及弹药保障系统</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-sm p-4 text-center h-32">远程控制改造后37mm人影高炮</div>
            <div className="bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-sm p-4 text-center h-32">自动化升级后的火箭发射装置</div>
            <div className="bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-sm p-4 text-center h-32">三码合一</div>
          </div>
        </div>
      );
    }

    if (activeTab === 3) {
      return (
        <div className="space-y-6">
          <h2 className="truncate text-xl font-bold text-cyan-300 mb-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] border-b border-cyan-500/30 pb-2 pr-10">
            安全与指挥能力提升
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="glass-card p-4 border-cyan-500/20">
                <h3 className="truncate text-lg font-bold text-cyan-300 mb-3">人影地面作业安全能力提升</h3>
                <ul className="list-decimal pl-5 space-y-2 text-sm">
                  <li>固定作业点升级改造</li>
                  <li>流动作业点升级改造</li>
                  <li>地面作业装备实训能力提升</li>
                </ul>
              </div>
              <div className="glass-card p-4 border-cyan-500/20">
                <h3 className="truncate text-lg font-bold text-cyan-300 mb-3">人影指挥能力建设</h3>
                <ul className="list-decimal pl-5 space-y-2 text-sm">
                  <li>硬件建设</li>
                  <li>软件建设</li>
                </ul>
              </div>
            </div>
            <div className="glass-card p-4 border-red-500/20 bg-red-500/5">
              <h3 className="truncate text-lg font-bold text-red-400 mb-3">关键指标</h3>
              <ul className="list-disc pl-5 space-y-3 text-sm text-red-300">
                <li>固定/流动作业点升级<span className="font-bold text-red-400">全覆盖</span></li>
                <li>配发作业安全防护装备、作业记录和应急通讯终端，配发率达到<span className="font-bold text-red-400">100%</span></li>
                <li>建设<span className="font-bold text-red-400">3个</span>人影实训基地</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 4) {
      return (
        <div className="space-y-6">
          <h2 className="truncate text-xl font-bold text-cyan-300 mb-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] border-b border-cyan-500/30 pb-2 pr-10">
            牵头编制超长期国债《省级及以下人工影响天气能力建设指南》
          </h2>
          <div className="glass-card p-6 border-cyan-500/20 mb-6">
            <h3 className="text-lg font-bold text-red-400 mb-4">加强技术指导</h3>
            <p className="text-sm leading-relaxed">
              地面装备相关技术要求和测算大纲已印发指导各省，飞机改造、国省一体化平台、机动作业指挥系统等技术指导文件正在全国征求意见。<span className="text-red-400 font-bold">共计提出33项技术要求。</span>
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center text-sm p-4 text-center h-40">
              <span className="font-bold mb-2">人工影响天气作业用37mm高炮数字化改造技术要求</span>
              <span className="text-slate-400">2025年6月</span>
            </div>
            <div className="bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center text-sm p-4 text-center h-40">
              <span className="font-bold mb-2">国省一体化人影综合业务平台（天工）- 数据交互接口</span>
              <span className="text-slate-400">(2025内网版)</span>
              <span className="text-slate-400 mt-2">2025年9月</span>
            </div>
            <div className="bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center text-sm p-4 text-center h-40">
              <span className="font-bold mb-2">关于提请省级及以下人影项目机动集成系统相关技术要求的函</span>
              <span className="text-slate-400">等多项技术要求及测试大纲</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!activeTab) return null;

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-950/40 backdrop-blur-xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            <Database className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wider">省级以下能力建设</h2>
            <p className="text-sm text-cyan-400/60 font-medium mt-0.5 tracking-widest uppercase">Provincial Capacity Building</p>
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
          <span className="font-bold tracking-widest text-sm">返回地图</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
        </motion.button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 text-slate-200">
        {renderContent()}
      </div>
    </div>
  );
}
