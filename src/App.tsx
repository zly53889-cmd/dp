import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Plane, Rocket, TrendingUp, ShieldCheck, Cpu, Layout, Globe, Radio, Activity, History, CloudRain, BarChart2, Navigation, Network, Users, Satellite } from 'lucide-react';
import { StereoFloatingLayers } from './components/StereoFloatingLayers';
import { FifteenthFiveYearPlanPanel } from './components/FifteenthFiveYearPlanPanel';
import { IndustryAcademiaPanel, TalentTeam } from './components/IndustryAcademiaPanel';
import { NationalEngineeringPanel, NationalEngineeringDetail } from './components/NationalEngineering';
import { CenterHistoryTimeline } from './components/CenterHistoryTimeline';
import { AutoScrollList } from './components/AutoScrollList';
import { CenterOverview } from './components/CenterOverview';
import { ProvincialCapacityPanel, ProvincialCapacityDetail } from './components/ProvincialCapacity';
import { ServiceBenefitsPanel } from './components/ServiceBenefits';
import { SocialServicesTimeline } from './components/SocialServicesTimeline';
import { ModernizationDetailPanel } from './components/ModernizationDetailPanel';
import { WorkSituationPanel } from './components/WorkSituationPanel';
import { CommandCenterMap } from './components/CommandCenterMap';
import { OperationEffectTable } from './components/OperationEffectTable';
import { ThreeYearActionModal } from './components/ThreeYearActionModal';
import { CommandLayoutMapPanel } from './components/CommandLayoutMapPanel';

const responsibilities = [
  "拟定发展规划与标准规范",
  "业务指导与技术支持",
  "国家级系统建设与运维",
  "重大服务与跨区作业组织",
  "重点工程与科技项目实施",
  "安全监督技术管理",
  "协调会议与标委会工作",
  "基础理论与应用技术研究",
  "新技术新装备研发推广",
  "作业效果评估与效益分析",
  "国际交流合作与科普宣传"
];

const sysHeaders = ["过程预报\n与作业展望", "潜力预报\n与作业计划", "条件预报\n与作业预案", "监测预警\n与方案设计", "跟踪监测\n与作业指挥", "作业分析\n与效果评估", "安全管理"];
const sysData = [
  {
    lvl: "国家级\n(区域)", lvlBg: "#e6c8d8", plat: "国家级人影综合业务平台", platBg: "#f4e8ee",
    cells: [
      { r: "开展干旱、森林草原火险等级、空气污染等作业需求分析、作业过程预报和作业展望。", p: "人影作业过程预报与作业展望指导专报。" },
      { r: "开展作业潜力预报，制定发布作业计划，适时组织开展专题会商。", p: "人影作业潜力预报和作业计划指导产品。" },
      { r: "运行CMA-CPEF-SEED模式系统，发布云宏微观和作业预案预估产品，开展作业条件预报和作业预案制定。", p: "人影作业条件预报和作业预案指导产品。" },
      { r: "发布多源观测资料的云降水监测反演产品及重点区域作业条件监测预警产品。", p: "云降水监测指导产品；重点区域作业条件监测预警产品。" },
      { r: "开展跨区域空地一体化作业，申请飞机作业空域，飞机实时通讯，跟踪指挥飞机作业；跟踪监测地面作业。", p: "飞机作业修订指令、地面作业指令、空域申请产品。" },
      { r: "针对全国人工增雨雪作业，开展作业效果评估。", p: "全国人工增雨雪作业日报；全国人影作业信息报；全国人工增雨雪年度报告。" },
      { r: "国家级飞机保障工作评价；飞机作业物资使用情况统计；弹药库存及质量监管；全国地面作业装备运行管理。", p: "国家人影飞机月度运行质量通报、催化剂使用情况月报；全国人影弹药质量通报；全国地面作业装备运行状况月报。" }
    ]
  },
  {
    lvl: "省级", lvlBg: "#a3d4b6", plat: "省（区、市）人影综合业务平台", platBg: "#cce8d6",
    cells: [
      { r: "基于国家级指导产品和本省需求，开展需求分析、作业过程预报和作业展望。", p: "XX省人影作业过程预报与作业展望指导专报。" },
      { r: "基于国家级指导产品，开展本省作业潜力预报，制定发布作业计划。", p: "XX省人影作业潜力预报和作业计划指导产品。" },
      { r: "基于国家级指导产品，开展本省作业条件预报和作业预案制定。对国家级模式产品的云宏观检验。", p: "XX省人影作业条件预报和作业预案指导产品。" },
      { r: "国家级产品释用，发展本省作业条件监测预警客观产品，制作本省作业方案设计产品。", p: "XX省人影作业条件监测预警产品；XX省作业方案设计。" },
      { r: "飞机作业方案设计和滚动修订，飞机作业跟踪指挥。地面作业指令制作、滚动修订及作业指导。", p: "飞机作业方案、飞机作业修订指令、地面作业指令、空域申请产品。" },
      { r: "针对本省人工增雨雪/防雹作业，开展作业效果评估。", p: "XX省人工增雨雪作业日报；XX省人工防雹作业日报；XX省人工增雨雪年度报告。" },
      { r: "人影飞机保障工作评价；飞机作业物资使用统计；弹药库存及质量监管；地面作业装备运行管理。", p: "XX省人影飞机运行维护报告、催化剂使用情况月报；XX省人影弹药使用情况月报、地面作业装备运行情况通报。" }
    ]
  },
  {
    lvl: "市县级", lvlBg: "#a3ccee", plat: "省（区、市）人影综合业务平台（客户端，APP）", platBg: "#e6f0fa",
    sp: ["作业飞机"],
    cells: [
      null, null, null,
      { r: "应用上级指导产品及本地资料，加强作业条件监测，制作地面作业方案。", p: "XX市人影作业方案。" },
      { r: "制作发布地面作业指令，科学实施地面作业，实时上报作业信息。", p: "作业指令，作业信息。" },
      null,
      { r: "本级装备、弹药库存信息上报。", p: "无" }
    ]
  },
  {
    lvl: "作业点", lvlBg: "#e8b9b9", plat: "省（区、市）人影综合业务平台（客户端，APP）", platBg: "#e6f0fa",
    sp: ["高炮", "火箭"],
    cells: [
      null, null, null,
      { r: "做好飞机和地面作业准备。", p: "无" },
      { r: "实施飞机和地面作业，上报作业信息。", p: "作业信息。" },
      null,
      { r: "弹药物联网系统终端数据、地面作业装备数据采集及信息上传。", p: "无" }
    ]
  }
];

function BusinessSystemTable() {
  const [activeStage, setActiveStage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage(prev => (prev + 1) % sysHeaders.length);
    }, 6000); // 6 seconds per stage
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isHovering) return;

    let animationId: number;
    const scrollStep = () => {
      if (el && el.scrollHeight > el.clientHeight) {
        el.scrollTop += 0.3;
        if (el.scrollTop >= el.scrollHeight / 2) {
          el.scrollTop = 0;
        }
      }
      animationId = requestAnimationFrame(scrollStep);
    };
    animationId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationId);
  }, [isHovering, activeStage]); // Reset scroll behavior on stage change

  const currentStageName = sysHeaders[activeStage].replace('\n', '');

  return (
    <div className="w-full h-full flex flex-col glass-card relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-cyan-900/30 w-full z-10">
        <div 
          className="h-full bg-cyan-400 transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          style={{ width: `${((activeStage + 1) / sysHeaders.length) * 100}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-cyan-300/10 border-b border-cyan-500/30 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
          <span className="text-cyan-100 font-bold text-sm tracking-widest">
            {currentStageName}
          </span>
        </div>
        <div className="flex gap-1">
          {sysHeaders.map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === activeStage ? 'bg-cyan-400 scale-125 shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'bg-slate-600'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative min-h-0"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)'
        }}
      >
        <div 
          ref={scrollRef}
          className="h-full overflow-y-auto no-scrollbar pb-4"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="p-2 flex flex-col gap-2">
            {[...sysData, ...sysData].map((row, i) => {
            const cell = row.cells[activeStage];
            if (!cell) return null; // 只要没有工作职责，就直接不显示该层级

            return (
              <div key={i} className="group flex flex-col glass-card border-cyan-500/20 overflow-hidden shrink-0 shadow-lg hover:border-cyan-500/30 transition-all duration-300 relative">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] transition-colors" style={{ backgroundColor: row.lvlBg }}></div>
                {/* Level Header */}
                <div className="px-3 py-1.5 flex items-center justify-between bg-white/5 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm tracking-wide" style={{ color: row.lvlBg, textShadow: `0 0 8px ${row.lvlBg}80` }}>
                      {row.lvl.replace('\n', '')}
                    </span>
                    <span className="text-sm text-cyan-100/70 bg-white/5 px-1.5 py-0.5 rounded truncate max-w-[150px] border border-white/10">
                      {row.plat}
                    </span>
                  </div>
                </div>

                {/* Level Work */}
                <div className="p-3 flex flex-col gap-2 text-sm">
                  {row.sp && (
                    <div className="flex flex-wrap gap-1.5 mb-1">
                      {row.sp.map(item => (
                        <span key={item} className="bg-cyan-500/10 text-cyan-100 border border-cyan-500/20 px-2 py-0.5 rounded text-sm shadow-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 rounded-sm bg-blue-400 shrink-0 mt-1 shadow-[0_0_5px_rgba(96,165,250,0.8)]"></div>
                    <div className="text-cyan-100 leading-relaxed group-hover:text-cyan-50 transition-colors">
                      <span className="text-blue-300 font-bold mr-1.5">工作职责:</span>
                      {cell.r}
                    </div>
                  </div>
                  <div className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    <div className="w-1.5 h-1.5 rounded-sm bg-emerald-400 shrink-0 mt-1 shadow-[0_0_5px_rgba(52,211,153,0.8)]"></div>
                    <div className="text-slate-300 leading-relaxed group-hover:text-cyan-50 transition-colors">
                      <span className="text-emerald-300 font-bold mr-1.5">业务产品:</span>
                      {cell.p}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="w-[25%] flex justify-end text-cyan-400 font-bold text-lg tracking-wider drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
      {time.toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')}
    </div>
  );
}

export default function App() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const scaleX = width / 1920;
      const scaleY = height / 1080;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-screen h-screen dynamic-bg flex items-center justify-center overflow-hidden relative">
      {/* Static Ambient Background for Performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vh] bg-[radial-gradient(circle,rgba(0,180,216,0.3)_0%,transparent_60%)] blur-[120px]"></div>
        <div className="absolute top-[30%] -right-[10%] w-[50vw] h-[70vh] bg-[radial-gradient(circle,rgba(25,150,211,0.3)_0%,transparent_60%)] blur-[130px]"></div>
        <div className="absolute -bottom-[10%] left-[10%] w-[70vw] h-[50vh] bg-[radial-gradient(circle,rgba(0,212,255,0.2)_0%,transparent_60%)] blur-[140px]"></div>
      </div>

      <div 
        className="font-sans text-white relative flex flex-col origin-center shrink-0 z-10"
        style={{ 
          width: '1920px', 
          height: '1080px',
          transform: `scale(${scale})`
        }}
      >
        {/* Header */}
        <header className="h-[10%] flex items-center justify-between px-6 relative z-10 border-b border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          {/* Left: Logo & Title */}
          <div className="flex items-center space-x-3 w-[25%] relative">
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-8 bg-cyan-400"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">人工影响天气中心</span>
              <span className="text-sm text-cyan-400 tracking-widest uppercase mt-0.5">Weather Modification Center</span>
            </div>
          </div>
          
          {/* Center: Main Title */}
          <div className="flex items-center justify-center space-x-6 w-[50%]">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              人工影响天气现代化建设
            </h1>
          </div>

          {/* Right: Time */}
          <Clock />
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 h-[90%] relative z-10 overflow-hidden">
          <CenterOverviewView />
        </main>

        {/* Bottom glow effect */}
        <div className="h-4 w-full bg-gradient-to-t from-cyan-500/10 to-transparent absolute bottom-0 z-0 pointer-events-none"></div>
      </div>
    </div>
  );
}

// ==========================================
// Comprehensive System Panel Component
// ==========================================
function ComprehensiveSystemPanel({ className = '' }: { className?: string }) {
  const [sysTab, setSysTab] = useState<'业务体系' | '制度体系' | '标准规范体系'>('业务体系');

  const ruleData = [
    { name: '法规政策制度', value: 18, color: '#38bdf8' },
    { name: '工程管理', value: 8, color: '#34d399' },
    { name: '业务规范', value: 30, color: '#a78bfa' }
  ];

  const standardData = [
    { title: '基础标准', items: ['术语', '编码格式', '培训'] },
    { title: '作业条件', items: ['作业技术预报', '作业条件预警', '作业条件监测', '作业条件识别', '作业条件分析'] },
    { title: '作业技术', items: ['作业方案与技术要求', '作业操作规范与规程', '作业调度与指挥'] },
    { title: '作业评估', items: ['作业效果检验', '云水资源评估', '作业效益评估'] },
    { title: '设施设备', items: ['探测装备', '作业装备', '催化剂', '站点建设', '试验设施'] },
    { title: '安全保障', items: ['作业安全技术和管理', '装备运输储存', '空域申请与使用', '岗位管理'] }
  ];

  return (
    <Panel 
      title="业务综合体系" 
      className={className}
      extra={
        <div className="flex flex-nowrap gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 backdrop-blur-md shrink-0">
          <button onClick={() => setSysTab('业务体系')} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${sysTab === '业务体系' ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-cyan-200/70 hover:text-cyan-300'}`}>业务体系</button>
          <button onClick={() => setSysTab('制度体系')} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${sysTab === '制度体系' ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-cyan-200/70 hover:text-cyan-300'}`}>制度体系</button>
          <button onClick={() => setSysTab('标准规范体系')} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${sysTab === '标准规范体系' ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-cyan-300'}`}>标准规范体系</button>
        </div>
      }
    >
      <div className="w-full h-full border border-white/5 rounded-xl bg-white/5 relative overflow-hidden min-h-0 glass-card">
        {sysTab === '业务体系' && (
          <div className="absolute inset-0 flex flex-col p-2">
            <div className="text-sm font-bold text-cyan-300 mb-1.5 self-start shrink-0 refractive-text">1. 形成“横向到边、纵向到底”业务体系</div>
            <div className="flex-1 w-full border border-cyan-500/20 overflow-hidden rounded min-h-0 flex flex-col glass-card">
              <BusinessSystemTable />
            </div>
          </div>
        )}
        {sysTab === '制度体系' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
            <div className="text-sm font-bold text-cyan-300 mb-1 self-start w-full shrink-0 refractive-text">2. 制度体系 (56个+)</div>
            <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
              <div className="w-full h-full absolute inset-0">
                <ResponsiveContainer>
                  <PieChart>
                    <defs>
                      <filter id="glow-sys" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    {/* Background Track */}
                    <Pie 
                      data={[{value: 1}]} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="55%" 
                      outerRadius="85%" 
                      stroke="none" 
                      fill="rgba(255,255,255,0.05)"
                      isAnimationActive={false}
                    />
                    {/* Main Donut */}
                    <Pie 
                      data={ruleData} 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="55%" 
                      outerRadius="85%" 
                      stroke="rgba(255,255,255,0.15)" 
                      strokeWidth={1} 
                      dataKey="value"
                      paddingAngle={6}
                      cornerRadius={16}
                      isAnimationActive={true}
                    >
                      {ruleData.map((e, i) => <Cell key={i} fill={e.color} style={{ filter: 'url(#glow-sys)', opacity: 0.9 }} className="outline-none hover:opacity-100 transition-opacity duration-300" />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: '#22d3ee', borderRadius: '12px', fontSize: '11px', padding: '6px 10px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }} itemStyle={{ color: '#e2e8f0' }} cursor={false} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-cyan-300" style={{ textShadow: '0 0 10px rgba(34,211,238,0.5)' }}>56<span className="text-sm">+</span></span>
                <span className="text-sm text-slate-400">总计</span>
              </div>
            </div>
            <div className="w-full flex justify-center gap-3 mt-2 flex-wrap shrink-0">
              {ruleData.map((e, i) => (
                <div key={i} className="flex items-center gap-1 text-sm">
                  <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: e.color }}></span>
                  <span className="text-slate-300">{e.name}</span>
                  <span className="font-mono text-cyan-400 font-bold">{e.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {sysTab === '标准规范体系' && (
          <div className="absolute inset-0 flex flex-col p-2 pt-1">
            {/* Top Stats */}
            <div className="flex items-center justify-between mb-2 px-1 border-b border-cyan-500/20 pb-2 shrink-0">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">126</span>
                <span className="text-sm text-slate-400">项总计</span>
              </div>
              <div className="flex gap-1.5">
                <div className="flex flex-col items-center glass-card border-white/10 px-2 py-0.5">
                  <span className="text-sm text-slate-400">国家标准</span>
                  <span className="text-sm font-bold text-amber-400">7</span>
                </div>
                <div className="flex flex-col items-center glass-card border-white/10 px-2 py-0.5">
                  <span className="text-sm text-slate-400">行业标准</span>
                  <span className="text-sm font-bold text-emerald-400">37</span>
                </div>
                <div className="flex flex-col items-center glass-card border-white/10 px-2 py-0.5">
                  <span className="text-sm text-slate-400">地方标准</span>
                  <span className="text-sm font-bold text-cyan-400">82</span>
                </div>
              </div>
            </div>

            {/* Categories Grid & Books */}
            <div className="flex-1 flex gap-2 overflow-hidden min-h-0">
              {/* Left: 3x2 Grid */}
              <div className="flex-1 grid grid-cols-3 grid-rows-2 gap-1.5 min-h-0">
                {standardData.map((category, idx) => (
                  <div key={idx} className="flex flex-col h-full overflow-hidden border border-white/5 rounded glass-card shadow-inner">
                    <div className="bg-white/5 text-cyan-100 text-center text-sm font-bold py-1 border-b border-white/5 shrink-0">
                      {category.title}
                    </div>
                    <div className="flex-1 p-1 flex justify-center gap-2 overflow-hidden">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex flex-col items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mb-1 shrink-0 shadow-[0_0_4px_rgba(34,211,238,0.8)]"></div>
                          <div className="flex flex-col items-center text-slate-300 text-sm leading-[1.2] overflow-y-auto no-scrollbar font-medium tracking-widest">
                            {item.split('').map((char, charIdx) => (
                              <span key={charIdx}>{char}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: Books */}
              <div className="w-[90px] shrink-0 flex flex-col gap-2 overflow-y-auto no-scrollbar">
                {/* Book 1 */}
                <div className="relative flex-1 min-h-[70px] bg-gradient-to-br from-cyan-900 to-blue-900 rounded shadow-[4px_4px_10px_rgba(0,0,0,0.3)] overflow-hidden border border-cyan-500/40 border-l-[4px] border-l-cyan-400 flex flex-col items-center justify-center p-1.5 group hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 transform rotate-45 translate-x-4 -translate-y-4"></div>
                  <div className="text-cyan-50 text-sm font-bold text-center leading-tight drop-shadow-md z-10">人工影响天气<br/>文件选编</div>
                  <div className="text-cyan-200 text-sm text-center mt-1 drop-shadow-md z-10 bg-black/20 px-1 py-0.5 rounded">(2021年版)</div>
                  <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Book 2 */}
                <div className="relative flex-1 min-h-[70px] bg-gradient-to-br from-slate-100 to-slate-300 rounded shadow-[4px_4px_10px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-400 border-l-[4px] border-l-slate-600 flex flex-col items-center pt-3 group hover:scale-[1.02] transition-transform cursor-pointer">
                  <div className="border-y border-slate-400 py-1 mb-1 z-10 w-[85%]">
                    <div className="text-slate-800 text-sm font-serif font-bold text-center tracking-tighter leading-tight">人工影响天气<br/>标准汇编</div>
                  </div>
                  <div className="text-slate-600 text-sm text-center z-10 font-medium">2000年-2022年</div>
                  <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-red-900/80 to-red-700/60" style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }}></div>
                  <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full border border-white/40 bg-white/20 flex items-center justify-center z-10 shadow-sm">
                     <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}
// ==========================================
// Engineering Construction Panel Content
// ==========================================
function EngineeringConstructionPanelContent() {
  const projects = [
    { name: '国家工程', desc: '联指大楼已验收交付', status: '已完成', statusColor: 'text-emerald-400 border-emerald-500/50 bg-emerald-900/30', indicator: 'bg-emerald-400' },
    { name: '东北/西北工程', desc: '全线工程已建设完成', status: '已完成', statusColor: 'text-emerald-400 border-emerald-500/50 bg-emerald-900/30', indicator: 'bg-emerald-400' },
    { name: '中部工程', desc: '指导飞机、指挥系统建设，承担丹江口增雨试验', status: '已完成', statusColor: 'text-emerald-400 border-emerald-500/50 bg-emerald-900/30', indicator: 'bg-emerald-400' },
    { name: '西南工程', desc: '实施中：派首席科学家指导飞机、指挥系统建设', status: '实施中', statusColor: 'text-amber-400 border-amber-500/50 bg-amber-900/30', indicator: 'bg-amber-400' },
    { name: '华北工程', desc: '已立项启动：开展研究试验与系统建设', status: '启动中', statusColor: 'text-amber-400 border-amber-500/50 bg-amber-900/30', indicator: 'bg-amber-400' },
    { name: '东南工程', desc: '申报阶段：已上报国家发改委', status: '待批复', statusColor: 'text-slate-400 border-slate-500/50 bg-white/[0.05]', indicator: 'bg-slate-400' },
  ];

  const images = [
    { seed: 'drone', alt: '无人机' },
    { seed: 'group1', alt: '合影1' },
    { seed: 'group2', alt: '合影2' }
  ];

  return (
    <div className="absolute inset-0 flex gap-2 overflow-hidden p-1.5 pt-2">
      {/* Left: Projects List */}
      <div className="flex-[1.5] flex flex-col gap-1.5 overflow-y-auto no-scrollbar pr-1 pb-1">
        <div className="text-cyan-300 font-bold text-sm mb-0.5 flex items-center gap-1.5 shrink-0">
          <div className="w-1 h-3.5 bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
          1.组建工作专班强化技术指导
        </div>
        {projects.map((p, i) => (
          <div key={i} className="glass-card border-white/5 p-1.5 flex justify-between items-center relative overflow-hidden shrink-0 hover:bg-white/10 transition-colors">
            <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${p.indicator} shadow-[0_0_5px_currentColor]`}></div>
            <div className="flex flex-col pl-1.5 min-w-0 pr-2">
              <span className="text-cyan-100 font-bold text-sm truncate">{p.name}</span>
              <span className="text-slate-400 text-sm truncate mt-0.5" title={p.desc}>{p.desc}</span>
            </div>
            <div className={`shrink-0 px-1.5 py-0.5 rounded-full border text-sm font-bold backdrop-blur-sm ${p.statusColor}`}>
              {p.status}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Images */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto no-scrollbar pb-1 pr-1">
        {images.map((img, i) => (
          <div key={i} className="flex flex-col rounded overflow-hidden border border-cyan-500/30 shrink-0 shadow-sm">
            <div className="h-16 bg-white/[0.05] relative">
              <img src={`https://picsum.photos/seed/${img.seed}/200/100`} alt={img.alt} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
            </div>
            <div className="bg-blue-600/90 text-white text-sm text-center py-0.5 truncate px-1 font-medium tracking-wider">
              全国人影现代化建设现场会 - 2023.06 张掖
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// Tiangong Platform Compact Panel Content
// ==========================================
function TiangongPlatformCompactPanel() {
  return (
    <div className="absolute inset-0 flex flex-col p-1.5 gap-1.5 overflow-hidden">
      {/* Top: Text Info */}
      <div className="flex gap-2 shrink-0">
        <div className="flex-1 flex flex-col gap-1">
          <div className="text-cyan-300 font-bold text-sm leading-tight flex items-center gap-1">
            <div className="w-0.5 h-2.5 bg-cyan-400"></div>
            2. “天工”平台迭代升级
          </div>
          <div className="text-sm text-cyan-100 bg-white/[0.05] p-1 rounded border border-white/10 leading-tight backdrop-blur-sm">
            <span className="text-red-400 font-bold">路线：</span>3年逐年迭代，全面支持人影“七段”实时业务。
          </div>
        </div>
        <div className="flex-[1.5] flex flex-col justify-center gap-0.5 text-sm text-slate-300 glass-card border-white/5 p-1">
          <div className="truncate"><span className="text-red-300 font-bold">国省一体：</span>一套平台两级部署，上下联通</div>
          <div className="truncate"><span className="text-red-300 font-bold">组件化：</span>微服务、算法组件化、“积木化”</div>
          <div className="truncate"><span className="text-red-300 font-bold">算法众创：</span>开放中试平台，征集加入算法仓库</div>
        </div>
      </div>

      {/* Bottom: Horizontal Timeline */}
      <div className="flex-1 relative flex items-center mt-1">
        {/* Connecting Line */}
        <div className="absolute left-[10%] right-[10%] top-[10px] h-[2px] bg-white/10 z-0"></div>
        <div className="absolute left-[10%] right-[50%] top-[10px] h-[2px] bg-cyan-500 z-0 shadow-[0_0_5px_rgba(6,182,212,0.8)]"></div>

        {/* 2023 */}
        <div className="flex-1 flex flex-col items-center z-10 relative">
          <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-transparent mb-1 shadow-[0_0_5px_rgba(59,130,246,0.8)]"></div>
          <div className="text-cyan-300 font-bold text-sm">2023年</div>
          <div className="text-cyan-100 text-sm text-center leading-tight mt-0.5">五段→七段<br/>初步覆盖</div>
        </div>

        {/* 2024 */}
        <div className="flex-1 flex flex-col items-center z-10 relative">
          <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-transparent mb-1 shadow-[0_0_5px_rgba(245,158,11,0.8)]"></div>
          <div className="text-cyan-300 font-bold text-sm">2024年</div>
          <div className="text-cyan-100 text-sm text-center leading-tight mt-0.5">平台整合<br/>上下联通</div>
        </div>

        {/* 现阶段 */}
        <div className="flex-[1.2] flex flex-col items-center z-10 relative -mt-1">
          <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-transparent mb-0.5 flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,1)]">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <div className="text-emerald-400 font-bold text-sm">现阶段</div>
          <div className="bg-emerald-900/60 border border-emerald-500/50 rounded px-1 py-0.5 text-emerald-100 text-sm text-center leading-tight mt-0.5 shadow-lg backdrop-blur-sm">
            4系统已整合<br/>部署<span className="text-red-400 font-bold text-sm">21</span>省
          </div>
        </div>

        {/* 2025 */}
        <div className="flex-1 flex flex-col items-center z-10 relative">
          <div className="w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-800 mb-1 shadow-[0_0_5px_rgba(168,85,247,0.8)]"></div>
          <div className="text-cyan-300 font-bold text-sm">2025年</div>
          <div className="text-cyan-100 text-sm text-center leading-tight mt-0.5">组件化/众创<br/>发布3.0版</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Equipment Construction Panel Content
// ==========================================
function EquipmentConstructionPanelContent() {
  const items = [
    {
      icon: <Plane className="w-3 h-3 text-blue-400" />,
      title: "高性能飞机",
      desc: "实现从无到有，现役10余架，未来2年新增6架",
      highlight: "10余架"
    },
    {
      icon: <Rocket className="w-3 h-3 text-emerald-400" />,
      title: "无人机",
      desc: "大中小型先行先试，全域全时保障",
      highlight: "全域保障"
    },
    {
      icon: <TrendingUp className="w-3 h-3 text-amber-400" />,
      title: "作业能力",
      desc: "飞机作业能力较10年前提升近5倍",
      highlight: "提升5倍"
    },
    {
      icon: <ShieldCheck className="w-3 h-3 text-purple-400" />,
      title: "地面站点",
      desc: "高安全等级站点占比增至89%",
      highlight: "达89%"
    },
    {
      icon: <Cpu className="w-3 h-3 text-cyan-400" />,
      title: "弹药保障",
      desc: "瞎火率降30倍，物联网覆盖超75%",
      highlight: "超75%"
    }
  ];

  return (
    <div className="absolute inset-0 flex flex-col p-1.5 gap-1 overflow-y-auto no-scrollbar">
      <div className="text-cyan-300 font-bold text-sm flex items-center gap-1.5 shrink-0 mb-0.5">
        <div className="w-1 h-3 bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"></div>
        <span>3. 作业装备核心能力提升</span>
      </div>
      
      <div className="flex flex-col gap-1 flex-1 justify-between">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 glass-card border-white/5 p-1 hover:bg-white/10 transition-colors">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10 backdrop-blur-sm">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-slate-200">{item.title}</span>
                <span className="text-sm font-bold text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">{item.highlight}</span>
              </div>
              <div className="text-sm text-slate-400 truncate mt-0.5" title={item.desc}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherModPrinciplesPanel() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    {
      id: 'overview',
      title: '01 概念概述',
      en: 'OVERVIEW',
      content: (
        <div className="flex flex-col gap-4 h-full">
          <div className="text-slate-200 text-base leading-relaxed space-y-4">
            <p><b className="text-cyan-400 text-lg">嘱托：</b>“人工造雨是非常重要的，希望气象工作者多努力。”——毛泽东</p>
            <p><b className="text-cyan-400 text-lg">定义：</b>人工影响天气是指为避免或减轻气象灾害，在适当条件下通过科技手段对局部大气的物理、化学过程进行人工控制，实现增雨雪、防雹、消雨、消雾、防霜等目的。</p>
            <p><b className="text-cyan-400 text-lg">科学逻辑：</b>基于大气水循环理论，当自然循环带来的降水不能满足陆地需求时，通过人工干预增加或减少局部降水。</p>
          </div>
          <div className="w-full flex-1 min-h-[200px] bg-cyan-300/10 border border-dashed border-cyan-500/50 rounded-lg flex flex-col items-center justify-center text-cyan-400 mt-4">
            <span className="text-4xl mb-2">🖼️</span>
            <span>【图示：毛主席视察照片 / 全球水循环示意图】</span>
          </div>
        </div>
      )
    },
    {
      id: 'mechanisms',
      title: '02 核心作业机理',
      en: 'MECHANISMS',
      content: (
        <div className="grid grid-cols-1 gap-6 overflow-y-auto pr-2 custom-scrollbar h-full pb-10">
          {[
            { title: "1. 冷云催化机理", desc: "针对0℃以下的过冷云（云中过冷水滴多而冰晶少）。通过播撒人工冰核（碘化银）或致冷剂（干冰、液氮），产生大量人工冰晶，触发“贝吉龙过程”，提高降水效率。常用于我国北方层状云增雨。", img: "【图示：贝吉龙过程与冷云播撒实验图】" },
            { title: "2. 暖云催化机理", desc: "针对0℃以上的暖云。通过播撒吸湿性云凝结核（食盐、氯化钙等），在云中培植大水滴，诱发“重力碰并”过程，使小水滴迅速合并增长为雨滴，加快降水形成过程。", img: "【图示：暖云重力碰并过程原理图】" },
            { title: "3. 人工防雹机理", desc: "采用“利益竞争”理论：在雹云中播撒大量人工冰核，迅速形成海量雹胚，与自然雹胚“争食”云中有限的过冷水，抑制其长大；同时利用爆炸等动力干扰促使雹云解体，使冰雹在落地前融化或变小。", img: "【图示：雹云结构与利益竞争机理模型】" },
            { title: "4. 人工消减雨机理", desc: "核心手段包括：①过量播撒：密集产生高浓度冰晶“争食”水分，延缓降水增长；②动力下沉：播撒高浓度粒子引发下沉气流促使云体消散；③提前降水：在保护区上风方作业促使降雨提前释放，保障目标区晴朗。", img: "【图示：重大活动保障消减雨阵地分布】" },
            { title: "5. 人工消雾机理", desc: "针对不同雾种：①消冷雾：播撒致冷剂使水汽凝华为冰晶沉降；②消暖雾：采用吸湿性物质诱发碰并、加热法蒸发雾滴、直升机动力混合干暖空气、或强电场静电过滤等手段清除雾滴。", img: "【图示：涡喷消雾车作业与液氮消冷雾试验】" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/[0.02] p-5 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-colors">
              <div className="text-lg text-cyan-400 font-bold mb-3 flex items-center">
                {item.title}
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent ml-4"></div>
              </div>
              <div className="text-slate-200 text-sm leading-relaxed mb-4">{item.desc}</div>
              <div className="w-full h-32 bg-cyan-900/20 border border-dashed border-cyan-500/30 rounded flex flex-col items-center justify-center text-cyan-500/70 text-sm">
                <span className="text-2xl mb-1">🖼️</span>
                <span>{item.img}</span>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'operations',
      title: '03 现代化作业手段',
      en: 'OPERATIONS',
      content: (
        <div className="flex flex-col gap-4 h-full">
          <div className="text-slate-200 text-base leading-relaxed space-y-4">
            <p><b className="text-cyan-400 text-lg">地面作业：</b>利用<b className="text-cyan-300">火箭架、高炮、地面碘化银烟炉</b>。火箭与高炮用于强对流云快速拦截，烟炉则常布设于山坡，利用上升气流将催化剂送入云层。</p>
            <p><b className="text-cyan-400 text-lg">空中作业：</b>利用<b className="text-cyan-300">高性能飞机（新舟60、空中国王、翼龙无人机等）</b>挂载碘化银发生器、液氮或干冰撒播装置，实现大面积、精准催化。</p>
          </div>
          <div className="w-full flex-1 min-h-[200px] bg-cyan-900/20 border border-dashed border-cyan-500/50 rounded-lg flex flex-col items-center justify-center text-cyan-400 mt-4">
            <span className="text-4xl mb-2">🖼️</span>
            <span>【图示：立体化作业装备全景照片】</span>
          </div>
        </div>
      )
    },
    {
      id: 'system',
      title: '04 法律政策与工作体系',
      en: 'SYSTEM',
      content: (
        <div className="flex flex-col gap-4 h-full">
          <div className="text-slate-200 text-base leading-relaxed space-y-4">
            <p><b className="text-cyan-400 text-lg">法律基石：</b>依据《中华人民共和国气象法》及《人工影响天气管理条例》开展业务。</p>
            <p><b className="text-cyan-400 text-lg">协作体系：</b>建立部际联席会议制度，由<b className="text-cyan-300">中国气象局牵头、包含发改委、财政部、军委联参等22个成员单位</b>协作。形成“国家-省-市-县”四级联动业务链。</p>
          </div>
          <div className="w-full flex-1 min-h-[200px] bg-cyan-900/20 border border-dashed border-cyan-500/50 rounded-lg flex flex-col items-center justify-center text-cyan-400 mt-4">
            <span className="text-4xl mb-2">🖼️</span>
            <span>【图示：22个部委协作架构图】</span>
          </div>
        </div>
      )
    },
    {
      id: 'status',
      title: '05 发展历史与业务规模',
      en: 'STATUS',
      content: (
        <div className="flex flex-col gap-4 h-full">
          <div className="text-slate-200 text-base leading-relaxed space-y-4">
            <p><b className="text-cyan-400 text-lg">历程：</b>自1958年吉林省首次飞机增雨起步，历经初创与跨越。目前增雨作业影响面积已达<b className="text-cyan-300">583.6万平方公里</b>，防雹保护面积<b className="text-cyan-300">59.8万平方公里</b>。</p>
            <p><b className="text-cyan-400 text-lg">装备：</b>全国拥有人影飞机55架（含10架国家级高性能增雨飞机），高炮4306门，火箭7631部，地面作业站点1.5万个，作业人员3.4万名。</p>
          </div>
          <div className="w-full flex-1 min-h-[200px] bg-cyan-900/20 border border-dashed border-cyan-500/50 rounded-lg flex flex-col items-center justify-center text-cyan-400 mt-4">
            <span className="text-4xl mb-2">🖼️</span>
            <span>【图示：全国作业覆盖热力图与飞机阵列】</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex w-full h-full gap-6 p-4">
      {/* Left Navigation */}
      <div className="w-64 shrink-0 flex flex-col gap-3">
        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(idx)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-300 relative overflow-hidden group ${
              activeSection === idx 
                ? 'bg-cyan-900/40 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                : 'bg-white/[0.02] border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.05]'
            }`}
          >
            {activeSection === idx && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
            )}
            <div className={`font-bold text-lg transition-colors ${activeSection === idx ? 'text-cyan-300' : 'text-slate-300 group-hover:text-cyan-100'}`}>
              {section.title}
            </div>
            <div className={`text-sm mt-1 transition-colors ${activeSection === idx ? 'text-cyan-500' : 'text-slate-500 group-hover:text-cyan-400/70'}`}>
              {section.en}
            </div>
          </button>
        ))}
      </div>

      {/* Right Content Area */}
      <div className="flex-1 glass-card border-cyan-500/20 p-6 relative overflow-hidden flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center mb-6 shrink-0">
          <div className="w-1.5 h-6 bg-cyan-400 mr-3 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          <h3 className="truncate text-2xl font-bold text-amber-400 tracking-wide">
            {sections[activeSection].title.split(' ')[1]}
          </h3>
          <span className="text-sm text-slate-500 ml-4 tracking-widest uppercase">
            {sections[activeSection].en}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-h-0">
          {sections[activeSection].content}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Center Map Section with Tabs
// ==========================================
function CenterMapSection({ 
  historyTab, 
  setHistoryTab,
  nationalEngineeringTab, 
  setNationalEngineeringTab, 
  provincialCapacityTab, 
  setProvincialCapacityTab, 
  serviceBenefitsTab, 
  setServiceBenefitsTab,
  centerMapTab,
  setCenterMapTab,
  activeModernizationTab,
  setActiveModernizationTab,
  showNationalCenterDetail,
  setShowNationalCenterDetail,
  showCommandLayoutMap,
  setShowCommandLayoutMap,
  isActionModalOpen,
  setIsActionModalOpen
}: { 
  historyTab?: '中心历程' | '人影历程' | '人影原理', 
  setHistoryTab?: (tab: '中心历程' | '人影历程' | '人影原理') => void,
  nationalEngineeringTab?: number | null, 
  setNationalEngineeringTab?: (tab: number | null) => void, 
  provincialCapacityTab?: number | null, 
  setProvincialCapacityTab?: (tab: number | null) => void, 
  serviceBenefitsTab?: string | null, 
  setServiceBenefitsTab?: (tab: string | null) => void,
  centerMapTab: 'network' | 'command' | 'effect',
  setCenterMapTab: (tab: 'network' | 'command' | 'effect') => void,
  activeModernizationTab?: number | null,
  setActiveModernizationTab?: (tab: number | null) => void,
  showNationalCenterDetail?: boolean,
  setShowNationalCenterDetail?: (show: boolean) => void,
  showCommandLayoutMap?: boolean,
  setShowCommandLayoutMap?: (show: boolean) => void,
  isActionModalOpen?: boolean,
  setIsActionModalOpen?: (open: boolean) => void
}) {
  const titleNode = (
    <div className="flex items-center justify-center gap-4">
      <button 
        onClick={() => setCenterMapTab('network')} 
        className={`relative px-6 py-2.5 text-lg font-bold tracking-widest transition-all duration-300 glass-panel ios-squircle mirror-edge overflow-hidden group border ${
          centerMapTab === 'network' 
            ? 'text-cyan-100 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(34,211,238,0.3)] bg-cyan-500/20' 
            : 'text-slate-400 border-white/10 bg-white/5 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10'
        }`}
      >
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <span className="relative z-10 drop-shadow-md refractive-text">作业力量一张网</span>
      </button>

      <button 
        onClick={() => setCenterMapTab('command')} 
        className={`relative px-6 py-2.5 text-lg font-bold tracking-widest transition-all duration-300 glass-panel ios-squircle mirror-edge overflow-hidden group border ${
          centerMapTab === 'command' 
            ? 'text-red-100 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.5),inset_0_0_15px_rgba(239,68,68,0.3)] bg-red-500/20' 
            : 'text-slate-400 border-white/10 bg-white/5 hover:text-red-300 hover:border-red-500/50 hover:bg-red-500/10'
        }`}
      >
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <span className="relative z-10 drop-shadow-md refractive-text">指挥调度一张图</span>
      </button>

      <button 
        onClick={() => setCenterMapTab('effect')} 
        className={`relative px-6 py-2.5 text-lg font-bold tracking-widest transition-all duration-300 glass-panel ios-squircle mirror-edge overflow-hidden group border ${
          centerMapTab === 'effect' 
            ? 'text-green-100 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5),inset_0_0_15px_rgba(34,197,94,0.3)] bg-green-500/20' 
            : 'text-slate-400 border-white/10 bg-white/5 hover:text-green-300 hover:border-green-500/50 hover:bg-green-500/10'
        }`}
      >
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <span className="relative z-10 drop-shadow-md refractive-text">作业效果一张表</span>
      </button>
    </div>
  );

  const animationProps = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] }
  };

  let content;

  if (isActionModalOpen) {
    content = (
      <motion.div key="actionModal" {...animationProps} className="relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group  flex-[2.5]">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <ThreeYearActionModal onClose={() => setIsActionModalOpen?.(false)} />
      </motion.div>
    );
  } else if (showNationalCenterDetail) {
    content = (
      <motion.div key="nationalCenter" {...animationProps} className="relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group liquid-border-anim flex-[2.5]">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <CenterOverview onClose={() => setShowNationalCenterDetail?.(false)} />
      </motion.div>
    );
  } else if (nationalEngineeringTab !== null && nationalEngineeringTab !== undefined) {
    content = (
      <motion.div key={`nationalEngineering-${nationalEngineeringTab}`} {...animationProps} className="relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group liquid-border-anim flex-[2.5]">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <NationalEngineeringDetail 
          activeTab={nationalEngineeringTab} 
          setActiveTab={setNationalEngineeringTab}
          onClose={() => setNationalEngineeringTab?.(null)} 
        />
      </motion.div>
    );
  } else if (provincialCapacityTab !== null && provincialCapacityTab !== undefined) {
    content = (
      <motion.div key={`provincialCapacity-${provincialCapacityTab}`} {...animationProps} className="relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group liquid-border-anim flex-[2.5]">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <ProvincialCapacityDetail activeTab={provincialCapacityTab} onClose={() => setProvincialCapacityTab?.(null)} />
      </motion.div>
    );
  } else if (serviceBenefitsTab !== null && serviceBenefitsTab !== undefined) {
    content = (
      <motion.div key={`serviceBenefits-${serviceBenefitsTab}`} {...animationProps} className="relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group liquid-border-anim flex-[2.5]">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <SocialServicesTimeline activeTab={serviceBenefitsTab} onClose={() => setServiceBenefitsTab?.(null)} />
      </motion.div>
    );
  } else if (activeModernizationTab !== null && activeModernizationTab !== undefined) {
    content = (
      <motion.div key={`modernization-${activeModernizationTab}`} {...animationProps} className="relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group liquid-border-anim flex-[2.5]">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <ModernizationDetailPanel activeTab={activeModernizationTab} onClose={() => setActiveModernizationTab?.(null)} />
      </motion.div>
    );
  } else if (historyTab === '人影历程') {
    content = (
      <motion.div key="history1" {...animationProps} className="flex-[2.5] relative flex flex-col min-h-0">
        <button 
          onClick={() => setHistoryTab?.('中心历程')} 
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-cyan-500/50 text-cyan-100 hover:text-white rounded-full transition-all duration-300 z-50 backdrop-blur-md border border-white/20"
          title="返回地图"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </button>
        <Panel title={<span className="text-3xl font-bold text-red-500 tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">我国人影发展历程</span>} className="flex-1 relative" titleCenter>
          <div className="absolute inset-0 flex flex-col p-6 overflow-hidden">
            {/* Timeline Arrow */}
            <div className="relative w-full h-16 mt-6 mb-10">
              <div className="absolute top-1/2 left-0 w-[95%] h-8 bg-gradient-to-r from-blue-900/50 to-cyan-500/50 border-y border-cyan-400/30 -translate-y-1/2 shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>
              <div className="absolute top-1/2 right-0 w-0 h-0 border-y-[32px] border-y-transparent border-l-[40px] border-l-cyan-500/50 -translate-y-1/2 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
              
              {/* Timeline Nodes */}
              <div className="absolute top-1/2 left-[10%] -translate-y-1/2 -translate-x-1/2 bg-slate-900 text-cyan-100 px-6 py-2 rounded-full font-bold text-2xl shadow-[0_0_20px_rgba(34,211,238,0.6)] border-2 border-cyan-400 z-10">1958</div>
              <div className="absolute top-1/2 left-[35%] -translate-y-1/2 -translate-x-1/2 bg-slate-900 text-cyan-100 px-6 py-2 rounded-full font-bold text-2xl shadow-[0_0_20px_rgba(34,211,238,0.6)] border-2 border-cyan-400 z-10">1980</div>
              <div className="absolute top-1/2 left-[60%] -translate-y-1/2 -translate-x-1/2 bg-slate-900 text-cyan-100 px-6 py-2 rounded-full font-bold text-2xl shadow-[0_0_20px_rgba(34,211,238,0.6)] border-2 border-cyan-400 z-10">1987</div>
              <div className="absolute top-1/2 left-[85%] -translate-y-1/2 -translate-x-1/2 bg-slate-900 text-cyan-100 px-6 py-2 rounded-full font-bold text-2xl shadow-[0_0_20px_rgba(34,211,238,0.6)] border-2 border-cyan-400 z-10">2026</div>
            </div>

            {/* Text Boxes */}
            <div className="flex gap-4 w-full mb-6 flex-1">
              <div className="flex-1 glass-card border-cyan-500/30 p-5 shadow-lg text-slate-200 text-base flex flex-col gap-3 hover:bg-cyan-900/20 transition-colors">
                <p>1. 1958年，中国气象局决定开展人工影响局部天气试验研究</p>
                <p>2. 吉林开展<span className="text-red-400 font-bold text-lg drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]">第一次</span>飞机人工增雨</p>
                <p>3. 福建古田随机催化试验</p>
              </div>
              <div className="flex-1 glass-card border-cyan-500/30 p-5 shadow-lg text-slate-200 text-base flex flex-col gap-3 hover:bg-cyan-900/20 transition-colors">
                <p>1. 加强科学试验</p>
                <p>2. 新型作业装备引进和研发</p>
              </div>
              <div className="flex-1 glass-card border-cyan-500/30 p-5 shadow-lg text-slate-200 text-base flex flex-col gap-3 hover:bg-cyan-900/20 transition-colors">
                <p>1. 需求大大提升</p>
                <p>2. 科学试验增强，探测、作业装备技术提升</p>
                <p>3. 云降水数值模式应用</p>
                <p>4. 作业指挥体系优化改进</p>
              </div>
              <div className="flex-1 glass-card border-cyan-500/30 p-5 shadow-lg text-slate-200 text-base flex flex-col gap-3 hover:bg-cyan-900/20 transition-colors">
                <p>1. 新要求、高标准</p>
                <p>2. 转型发展，人影高质量发展</p>
              </div>
            </div>

            {/* Images */}
            <div className="flex gap-4 w-full h-56">
              <div className="flex-1 relative glass-card border-white/10 overflow-hidden group">
                <img src="https://picsum.photos/seed/vintage-plane/600/400" alt="吉林第一次飞机增雨作业" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/50 text-cyan-100 px-4 py-1.5 text-sm font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] whitespace-nowrap rounded-full">吉林第一次飞机增雨作业</div>
              </div>
              <div className="flex-1 relative glass-card border-white/10 overflow-hidden group">
                <img src="https://picsum.photos/seed/rocket-launcher/600/400" alt="人影火箭" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/50 text-cyan-100 px-4 py-1.5 text-sm font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] whitespace-nowrap rounded-full">人影火箭</div>
              </div>
              <div className="flex-1 relative glass-card border-white/10 overflow-hidden group">
                <img src="https://picsum.photos/seed/modern-plane/600/400" alt="高性能人影飞机" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/50 text-cyan-100 px-4 py-1.5 text-sm font-bold shadow-[0_0_15px_rgba(34,211,238,0.3)] whitespace-nowrap rounded-full">高性能人影飞机</div>
              </div>
            </div>
          </div>
        </Panel>
      </motion.div>
    );
  } else if (historyTab === '人影原理') {
    content = (
      <motion.div key="history2" {...animationProps} className="flex-[2.5] relative flex flex-col min-h-0">
        <button 
          onClick={() => setHistoryTab?.('中心历程')} 
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-cyan-500/50 text-cyan-100 hover:text-white rounded-full transition-all duration-300 z-50 backdrop-blur-md border border-white/20"
          title="返回地图"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        </button>
        <Panel title={<span className="text-3xl font-bold text-cyan-300 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">人影原理</span>} className="flex-1 relative" titleCenter>
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <WeatherModPrinciplesPanel />
          </div>
        </Panel>
      </motion.div>
    );
  } else if (showCommandLayoutMap) {
    content = (
      <motion.div key="commandLayoutMap" {...animationProps} className="relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group liquid-border-anim flex-[2.5]">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>
        <CommandLayoutMapPanel onClose={() => setShowCommandLayoutMap?.(false)} />
      </motion.div>
    );
  } else {
    content = (
      <motion.div key="map" {...animationProps} className="flex-[2.5] relative flex flex-col min-h-0">
        <Panel title={titleNode} className="flex-1 relative" titleCenter>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full h-full glass-card border-white/5 shadow-inner overflow-hidden bg-slate-900/50">
              {centerMapTab === 'network' ? (
                <img src="/images/0001.jpg" alt="作业力量一张网" className="w-full h-full object-cover" />
              ) : centerMapTab === 'command' ? (
                <img src="/images/0002.jpg" alt="指挥调度一张图" className="w-full h-full object-cover" />
              ) : (
                <img src="/images/0003.png" alt="作业效果一张表" className="w-full h-full object-cover" />
              )}
            </div>
          </div>
        </Panel>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {content}
    </AnimatePresence>
  );
}
// ==========================================
// View 2: 中心概况 (Center Overview Layout)
// ==========================================
function CenterOverviewView() {
  const [overviewTab, setOverviewTab] = useState<'history' | 'position' | 'duties' | 'org' | 'talent'>('history');
  const [scienceTab, setScienceTab] = useState<'history' | 'principles'>('history');
  const [tiangongTab, setTiangongTab] = useState<'工作专班' | '“天工”平台'>('“天工”平台');
  const [historyTab, setHistoryTab] = useState<'中心历程' | '人影历程' | '人影原理'>('中心历程');
  const [techSupportTab, setTechSupportTab] = useState('关键技术');
  const [nationalEngineeringTab, setNationalEngineeringTab] = useState<number | null>(null);
  const [provincialCapacityTab, setProvincialCapacityTab] = useState<number | null>(null);
  const [serviceBenefitsTab, setServiceBenefitsTab] = useState<string | null>(null);
  const [socialServiceTab, setSocialServiceTab] = useState<'交流合作' | '服务领域' | '重大保障'>('重大保障');
  const [centerMapTab, setCenterMapTab] = useState<'network' | 'command' | 'effect'>('network');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [showNationalCenterDetail, setShowNationalCenterDetail] = useState(false);
  const [showCommandLayoutMap, setShowCommandLayoutMap] = useState(false);
  const [activeModernizationTab, setActiveModernizationTab] = useState<number | null>(null);

  const clearAllDetails = () => {
    setNationalEngineeringTab(null);
    setProvincialCapacityTab(null);
    setServiceBenefitsTab(null);
    setShowNationalCenterDetail(false);
    setShowCommandLayoutMap(false);
    setActiveModernizationTab(null);
    setIsActionModalOpen(false);
    if (historyTab !== '中心历程') {
      setHistoryTab('中心历程');
    }
  };

  const handleSetNationalEngineeringTab = (tab: number | null) => {
    if (tab !== null) clearAllDetails();
    setNationalEngineeringTab(tab);
  };

  const handleSetProvincialCapacityTab = (tab: number | null) => {
    if (tab !== null) clearAllDetails();
    setProvincialCapacityTab(tab);
  };

  const handleSetServiceBenefitsTab = (tab: string | null) => {
    if (tab !== null) clearAllDetails();
    setServiceBenefitsTab(tab);
  };

  const handleSetShowNationalCenterDetail = (show: boolean) => {
    if (show) clearAllDetails();
    setShowNationalCenterDetail(show);
  };

  const handleSetShowCommandLayoutMap = (show: boolean) => {
    if (show) clearAllDetails();
    setShowCommandLayoutMap(show);
  };

  const handleSetActiveModernizationTab = (tab: number | null) => {
    if (tab !== null) clearAllDetails();
    setActiveModernizationTab(tab);
  };

  const handleSetIsActionModalOpen = (open: boolean) => {
    if (open) clearAllDetails();
    setIsActionModalOpen(open);
  };

  const handleSetHistoryTab = (tab: '中心历程' | '人影历程' | '人影原理') => {
    clearAllDetails();
    setHistoryTab(tab);
  };

  const handleSetCenterMapTab = (tab: 'network' | 'command' | 'effect') => {
    clearAllDetails();
    setCenterMapTab(tab);
  };

  // Personnel data moved to IndustryAcademiaPanel

  return (
    <div className="flex gap-4 h-full w-full">
      {/* Left Column - 3.2 */}
      <div className="flex flex-col gap-4 min-w-0" style={{ flex: 3.2 }}>
        
        {/* Top Wrapper - 2.5 Ratio to match CenterMapSection */}
        <div className="flex flex-col gap-4 flex-[2.5] min-h-0">
          {/* 1. 人影科普 */}
          <div className="glass-panel ios-squircle mirror-edge flex flex-col p-4 relative group liquid-border-anim flex-[1.2] min-h-0">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="layered-glass-icon w-8 h-8">
                  <Globe className="w-4 h-4 text-cyan-300" />
                </div>
                <h2 className="truncate text-lg font-bold refractive-text tracking-widest">人影科普</h2>
              </div>
              <div className="flex gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 backdrop-blur-md">
                <button onClick={() => { setScienceTab('history'); handleSetHistoryTab('人影历程'); }} className={`px-2 py-1 text-sm font-bold rounded-md transition-all duration-300 ${scienceTab === 'history' ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-cyan-300'}`}>人影历程</button>
                <button onClick={() => { setScienceTab('principles'); handleSetHistoryTab('人影原理'); }} className={`px-2 py-1 text-sm font-bold rounded-md transition-all duration-300 ${scienceTab === 'principles' ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.4)]' : 'text-slate-400 hover:text-cyan-300'}`}>人影原理</button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 relative flex flex-col gap-2">
              <div className="text-cyan-100/80 text-sm leading-relaxed px-2">
                {scienceTab === 'history' 
                  ? '探索我国人工影响天气事业从起步到现代化的辉煌历程，了解重大历史节点与突破。'
                  : '深入了解人工增雨、防雹等作业的科学原理与物理机制，揭开人影技术的神秘面纱。'}
              </div>
              
              <div className="flex-1 overflow-hidden relative">
                {scienceTab === 'history' ? (
                  <div className="flex flex-col h-full justify-center gap-2 px-2">
                    <div className="flex items-center justify-between relative w-full h-8">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-500/30 -translate-y-1/2"></div>
                      {[
                        { year: '1958', label: '起步' },
                        { year: '1980', label: '发展' },
                        { year: '1987', label: '提升' },
                        { year: '2026', label: '高质量' }
                      ].map((item, idx) => (
                        <div key={idx} className="relative flex flex-col items-center cursor-pointer group" onClick={() => handleSetHistoryTab('人影历程')}>
                          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)] group-hover:scale-150 transition-transform z-10"></div>
                          <div className="text-sm text-cyan-200 mt-1 font-bold">{item.year}</div>
                          <div className="text-sm text-cyan-100/70">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5 justify-center mt-2">
                    {['暖云催化', '冷云催化', '动力催化', '防雹机制', '消雾机制'].map((mech, idx) => (
                      <div key={idx} onClick={() => handleSetHistoryTab('人影原理')} className="px-2 py-1 bg-slate-900/20 border border-slate-700/30 rounded text-sm text-slate-200 hover:bg-slate-700/30 hover:text-white cursor-pointer transition-colors">
                        {mech}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-slate-400 text-sm font-bold animate-pulse text-center mt-auto">
                点击上方内容在右侧主屏幕查看详细
              </div>
            </div>
          </div>

          {/* 2. 中心概况 (定位、职责、历程、架构可切换) */}
          <div className="glass-panel ios-squircle mirror-edge flex flex-col p-4 relative group flex-[1.3] min-h-0 liquid-border-anim">
            <div className="flex items-center justify-between mb-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="layered-glass-icon w-8 h-8">
                  {overviewTab === 'position' ? <Plane className="w-4 h-4 text-slate-300" /> : overviewTab === 'duties' ? <ShieldCheck className="w-4 h-4 text-slate-300" /> : overviewTab === 'history' ? <History className="w-4 h-4 text-slate-300" /> : overviewTab === 'talent' ? <Users className="w-4 h-4 text-slate-300" /> : <Rocket className="w-4 h-4 text-slate-300" />}
                </div>
                <h2 className="truncate text-lg font-bold refractive-text tracking-widest">中心概况</h2>
              </div>
              <div className="flex flex-nowrap gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 backdrop-blur-md shrink-0">
                <button onClick={() => { setOverviewTab('history'); handleSetHistoryTab('中心历程'); }} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${overviewTab === 'history' ? 'bg-slate-700/60 text-slate-100 shadow-lg' : 'text-slate-400 hover:text-slate-300'}`}>历程</button>
                <button onClick={() => setOverviewTab('position')} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${overviewTab === 'position' ? 'bg-slate-700/60 text-slate-100 shadow-lg' : 'text-slate-400 hover:text-slate-300'}`}>定位</button>
                <button onClick={() => setOverviewTab('duties')} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${overviewTab === 'duties' ? 'bg-slate-700/60 text-slate-100 shadow-lg' : 'text-slate-400 hover:text-slate-300'}`}>职责</button>
                <button onClick={() => setOverviewTab('org')} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${overviewTab === 'org' ? 'bg-slate-700/60 text-slate-100 shadow-lg' : 'text-slate-400 hover:text-slate-300'}`}>架构</button>
                <button onClick={() => setOverviewTab('talent')} className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-300 whitespace-nowrap ${overviewTab === 'talent' ? 'bg-slate-700/60 text-slate-100 shadow-lg' : 'text-slate-400 hover:text-slate-300'}`}>人才</button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 relative">
              {overviewTab === 'position' ? (
                <div className="flex flex-row gap-2 w-full h-full">
                  {[
                    { text: "国家级人工影响天气业务中心", icon: <ShieldCheck className="w-5 h-5 text-slate-300 mb-2" />, onClick: () => handleSetShowNationalCenterDetail(true) },
                    { text: "跨区域联合作业协调指挥中心", icon: <Plane className="w-5 h-5 text-slate-300 mb-2" />, onClick: () => {
                      handleSetShowCommandLayoutMap(true);
                    } },
                    { text: "人影科研与技术装备研发基地", icon: <Cpu className="w-5 h-5 text-slate-300 mb-2" /> }
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 glass-card border-white/10 p-2 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-slate-500/50 transition-all duration-500 shadow-2xl relative overflow-hidden group/item ${item.onClick ? 'cursor-pointer' : 'cursor-default'}`}
                      onClick={item.onClick}
                    >
                      {/* Liquid Glass Highlight */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000"></div>
                      
                      <div className="relative z-10 flex flex-col items-center">
                        {item.icon}
                        <span className="text-slate-200 font-bold text-sm leading-tight tracking-wide drop-shadow-md">{item.text}</span>
                      </div>
                      
                      {/* Inner Glow */}
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>
                  ))}
                </div>
              ) : overviewTab === 'duties' ? (
                <div className="w-full h-full relative">
                  <AutoScrollList items={responsibilities} />
                </div>
              ) : overviewTab === 'history' ? (
                <div className="w-full h-full relative">
                  <CenterHistoryTimeline />
                </div>
              ) : overviewTab === 'org' ? (
                <div className="w-full h-full flex flex-col items-center justify-start overflow-y-auto no-scrollbar pb-2 pt-2">
                  <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-2 rounded-xl text-sm font-bold text-slate-200 shadow-lg z-10 text-center">
                    中国气象局人工影响天气中心
                  </div>
                  <div className="w-px h-5 bg-slate-700/50"></div>
                  <div className="w-[90%] border-t border-slate-700/50 flex justify-between relative">
                    <div className="w-px h-3 bg-slate-700/50 absolute left-0"></div>
                    <div className="w-px h-3 bg-slate-700/50 absolute left-1/2 -translate-x-1/2"></div>
                    <div className="w-px h-3 bg-slate-700/50 absolute right-0"></div>
                  </div>
                  <div className="flex justify-between w-full px-1 mt-3">
                    {/* Column 1 */}
                    <div className="flex flex-col items-center w-[31%] gap-1.5">
                      <div className="bg-white/5 border border-white/10 py-1 rounded-lg text-xs font-bold text-slate-300 w-full text-center shadow-sm">管理机构</div>
                      <div className="flex flex-col gap-1 w-full">
                        {['办公室', '业务科技处', '计划财务处', '人事处'].map(d => (
                          <div key={d} className="glass-card border-white/5 py-1 text-xs text-slate-400 text-center hover:bg-white/5 hover:border-slate-500/30 transition-colors cursor-default rounded-md">{d}</div>
                        ))}
                      </div>
                    </div>
                    {/* Column 2 */}
                    <div className="flex flex-col items-center w-[31%] gap-1.5">
                      <div className="bg-white/5 border border-white/10 py-1 rounded-lg text-xs font-bold text-slate-300 w-full text-center shadow-sm">业务处室</div>
                      <div className="flex flex-col gap-1 w-full">
                        {['灾害天气指挥室', '云降水物理室', '航空作业管理室', '效果评估室'].map(d => (
                          <div key={d} className="glass-card border-white/5 py-1 text-xs text-slate-400 text-center hover:bg-white/5 hover:border-slate-500/30 transition-colors cursor-default rounded-md">{d}</div>
                        ))}
                      </div>
                    </div>
                    {/* Column 3 */}
                    <div className="flex flex-col items-center w-[31%] gap-1.5">
                      <div className="bg-white/5 border border-white/10 py-1 rounded-lg text-xs font-bold text-slate-300 w-full text-center shadow-sm">科研团队</div>
                      <div className="flex flex-col gap-1 w-full">
                        {['重点实验室', '创新团队', '博士后工作站', '野外试验基地'].map(d => (
                          <div key={d} className="glass-card border-white/5 py-1 text-xs text-slate-400 text-center hover:bg-white/5 hover:border-slate-500/30 transition-colors cursor-default rounded-md">{d}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : overviewTab === 'talent' ? (
                <div className="w-full h-full flex items-center justify-center">
                  <TalentTeam />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* 4. 高质量发展成效与出海动态 - Flex-1 to match bottom row of center column */}
        <div className="glass-panel ios-squircle mirror-edge flex flex-col p-4 relative group flex-[1] min-h-0 liquid-border-anim">
          <div className="flex items-center gap-3 mb-3 shrink-0">
            <div className="layered-glass-icon w-8 h-8">
              <Globe className="w-4 h-4 text-cyan-300" />
            </div>
            <h2 className="truncate text-base font-bold refractive-text tracking-widest">高质量发展成效</h2>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-2 min-h-0">
            {[
              { title: '数值预报能力', icon: <Activity className="w-4 h-4 text-orange-400" />, bg: 'bg-orange-500/5', border: 'border-orange-500/20', hoverBg: 'hover:bg-orange-500/10', iconBg: 'bg-orange-500/20' },
              { title: '星空地一体化监测', icon: <Satellite className="w-4 h-4 text-emerald-400" />, bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', hoverBg: 'hover:bg-emerald-500/10', iconBg: 'bg-emerald-500/20' },
              { title: '安全高效装备', icon: <ShieldCheck className="w-4 h-4 text-blue-400" />, bg: 'bg-blue-500/5', border: 'border-blue-500/20', hoverBg: 'hover:bg-blue-500/10', iconBg: 'bg-blue-500/20' },
              { title: '实时精准指挥', icon: <Network className="w-4 h-4 text-cyan-400" />, bg: 'bg-cyan-500/5', border: 'border-cyan-500/20', hoverBg: 'hover:bg-cyan-500/10', iconBg: 'bg-cyan-500/20' },
              { title: '效果效益评估', icon: <BarChart2 className="w-4 h-4 text-purple-400" />, bg: 'bg-purple-500/5', border: 'border-purple-500/20', hoverBg: 'hover:bg-purple-500/10', iconBg: 'bg-purple-500/20' }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`glass-card ${item.border} ${item.bg} p-2 flex flex-col items-center justify-center text-center ${item.hoverBg} transition-colors group/item cursor-pointer`}
                onClick={() => {
                  handleSetActiveModernizationTab(i);
                }}
              >
                <div className={`mb-1.5 p-1.5 rounded-full ${item.iconBg} group-hover/item:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <span className="text-xs text-slate-200 font-medium leading-tight tracking-wide">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Column - 7.6 */}
      <div className="flex flex-col gap-4 min-w-0" style={{ flex: 7.6 }}>
        <CenterMapSection 
          historyTab={historyTab} 
          setHistoryTab={handleSetHistoryTab}
          nationalEngineeringTab={nationalEngineeringTab} 
          setNationalEngineeringTab={handleSetNationalEngineeringTab} 
          provincialCapacityTab={provincialCapacityTab} 
          setProvincialCapacityTab={handleSetProvincialCapacityTab} 
          serviceBenefitsTab={serviceBenefitsTab}
          setServiceBenefitsTab={handleSetServiceBenefitsTab}
          centerMapTab={centerMapTab}
          setCenterMapTab={handleSetCenterMapTab}
          activeModernizationTab={activeModernizationTab}
          setActiveModernizationTab={handleSetActiveModernizationTab}
          showNationalCenterDetail={showNationalCenterDetail}
          setShowNationalCenterDetail={handleSetShowNationalCenterDetail}
          showCommandLayoutMap={showCommandLayoutMap}
          setShowCommandLayoutMap={handleSetShowCommandLayoutMap}
          isActionModalOpen={isActionModalOpen}
          setIsActionModalOpen={handleSetIsActionModalOpen}
        />
        <div className="flex gap-4 flex-[1]">
          <Panel 
            title="国家工程" 
            className="flex-1 min-h-[180px]" 
          >
             <div className="w-full h-full bg-white/[0.02] rounded relative">
               <NationalEngineeringPanel activeTab={nationalEngineeringTab} setActiveTab={handleSetNationalEngineeringTab} />
             </div>
          </Panel>
          <Panel title="省级以下能力建设" className="flex-1 min-h-[180px] border-cyan-400 border-2 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
             <div className="w-full h-full bg-white/[0.02] rounded relative">
               <ProvincialCapacityPanel activeTab={provincialCapacityTab} setActiveTab={handleSetProvincialCapacityTab} />
             </div>
          </Panel>
          <Panel title="“十五五”重点工程项目" className="flex-1 min-h-[180px]">
            <FifteenthFiveYearPlanPanel />
          </Panel>
        </div>
      </div>

      {/* Right Column - 3.2 */}
      <div className="flex flex-col gap-4 min-w-0" style={{ flex: 3.2 }}>
        <div className="flex flex-col gap-4 flex-[2.5] min-h-0">
          <ComprehensiveSystemPanel className="flex-[1.2]" />
          <Panel 
            title="科技支撑" 
            className="flex-[0.8]" 
            extra={
              <div className="flex flex-nowrap gap-1 bg-white/5 p-0.5 rounded-xl border border-white/10 backdrop-blur-md shadow-xl shrink-0">
                {['关键技术', '创新团队', '协同创新', '外场实验'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setTechSupportTab(tab)} 
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all duration-300 whitespace-nowrap ${techSupportTab === tab ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.4)] border border-cyan-400/30' : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            }
          >
            <IndustryAcademiaPanel activeTab={techSupportTab} />
          </Panel>
        </div>

        {/* 社会服务 - Flex-1 to match bottom row of center column and left column */}
        <Panel 
          title="社会服务" 
          className="flex-[1] min-h-0"
          extra={
            <div className="flex flex-nowrap gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10 backdrop-blur-md shrink-0">
              {['交流合作', '服务领域', '重大保障'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setSocialServiceTab(tab as any)} 
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition-all duration-300 whitespace-nowrap ${socialServiceTab === tab ? 'bg-cyan-500/40 text-cyan-100 shadow-[0_0_10px_rgba(34,211,238,0.4)] border border-cyan-400/30' : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          }
        >
          {socialServiceTab === '重大保障' ? (
            <ServiceBenefitsPanel activeTab={serviceBenefitsTab} setActiveTab={handleSetServiceBenefitsTab} />
          ) : socialServiceTab === '交流合作' ? (
            <div className="w-full h-full flex flex-col p-2 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-2 gap-3 h-full">
                <div className="glass-card p-3 border-white/5 flex flex-col gap-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs mb-1 relative z-10">
                    <Globe className="w-4 h-4" />
                    国际交流与出海动态
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed relative z-10 space-y-1.5">
                    <p>• <span className="text-cyan-400 font-medium">国际合作：</span>积极参与世界气象组织（WMO）人工影响天气专家组工作，提升国际话语权。</p>
                    <p>• <span className="text-cyan-400 font-medium">技术出海：</span>推进人影技术与装备“走出去”，与阿联酋、沙特等国家开展双边技术合作与交流。</p>
                    <p>• <span className="text-cyan-400 font-medium">学术交流：</span>举办国际人工影响天气科学研讨会，分享中国经验，扩大国际影响力。</p>
                  </div>
                </div>
                <div className="glass-card p-3 border-white/5 flex flex-col gap-2 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 pointer-events-none"></div>
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1 relative z-10">
                    <Network className="w-4 h-4" />
                    部门协同与局校合作
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed relative z-10 space-y-1.5">
                    <p>• <span className="text-emerald-400 font-medium">部门联动：</span>与农业农村、应急管理、林草、水利等部门建立常态化信息共享与应急联动机制。</p>
                    <p>• <span className="text-emerald-400 font-medium">局校合作：</span>联合北京大学、南京信息工程大学等顶尖高校，开展核心技术联合攻关。</p>
                    <p>• <span className="text-emerald-400 font-medium">人才培养：</span>共建博士后工作站与实习基地，培养高层次复合型人影科技人才。</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col p-2 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-2 gap-2 h-full">
                {[
                  { title: '农业生产', desc: '抗旱防雹，保障粮食安全与重要农产品供给', icon: '🌾', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
                  { title: '生态修复', desc: '水源涵养、水土保持、植被恢复与石漠化治理', icon: '🌲', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                  { title: '应急救灾', desc: '森林草原防灭火、应对突发水污染事件', icon: '🔥', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
                  { title: '重大活动', desc: '国家级重大活动的天气保障与空气质量改善', icon: '⭐', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
                ].map((item, idx) => (
                  <div key={idx} className={`glass-card p-2 ${item.border} flex items-center gap-3 hover:${item.bg} transition-colors group`}>
                    <div className={`text-xl ${item.color} p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform`}>{item.icon}</div>
                    <div>
                      <div className={`text-xs font-bold ${item.color} mb-0.5`}>{item.title}</div>
                      <div className="text-slate-300 text-xs leading-tight">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Panel>
      </div>

      {/* Modals */}
    </div>
  );
}

function Panel({ 
  title, 
  children, 
  className = '', 
  titleCenter = false,
  extra
}: { 
  title: React.ReactNode, 
  children?: React.ReactNode, 
  className?: string, 
  titleCenter?: boolean,
  extra?: React.ReactNode
}) {
  return (
    <div className={`relative glass-panel ios-squircle mirror-edge flex flex-col min-h-0 overflow-hidden group liquid-border-anim ${className}`}>
      {/* Subtle liquid highlight */}
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none group-hover:translate-x-[5%] group-hover:translate-y-[5%] transition-transform duration-1000"></div>

      {/* Header */}
      <div className={`px-5 py-4 flex items-center justify-between shrink-0 relative z-10`}>
        <div className={`flex items-center ${titleCenter ? 'w-full justify-center' : ''}`}>
          {!titleCenter && (
            <div className="layered-glass-icon w-8 h-8 mr-2">
              <Activity className="w-4 h-4 text-cyan-300" />
            </div>
          )}
          <div className={`font-bold refractive-text tracking-widest truncate ${titleCenter ? 'text-xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'text-sm'}`}>{title}</div>
        </div>
        {extra && !titleCenter && (
          <div className="flex items-center">
            {extra}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pb-5 relative overflow-hidden flex flex-col min-h-0 z-10">
        {children}
      </div>
    </div>
  );
}
