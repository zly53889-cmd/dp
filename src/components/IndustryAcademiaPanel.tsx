import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function IndustryAcademiaPanel({ activeTab }: { activeTab: string }) {
  return (
    <div className="absolute inset-0 flex flex-col p-2">
      {/* Content Area */}
      <div className="flex-1 min-h-0 relative">
        {activeTab === '关键技术' && <KeyTechnologies />}
        {activeTab === '创新团队' && <InnovationTeam />}
        {activeTab === '协同创新' && <CollaborativeInnovation />}
        {activeTab === '外场实验' && <FieldExperiments />}
      </div>
    </div>
  );
}

export function TalentTeam() {
  const eduData = [
    {name:'博士', value:25, color:'#0891b2', dark:'#164e63'}, 
    {name:'硕士', value:45, color:'#2563eb', dark:'#1e3a8a'}, 
    {name:'本科及以下', value:30, color:'#4f46e5', dark:'#312e81'}
  ];
  const titleData = [
    {name:'正研级', value:15, color:'#059669', dark:'#064e3b'}, 
    {name:'副研级', value:35, color:'#0d9488', dark:'#134e4a'}, 
    {name:'中级', value:40, color:'#0284c7', dark:'#0c4a6e'}, 
    {name:'初级', value:10, color:'#4338ca', dark:'#3730a3'}
  ];
  const ageData = [
    {name:'35岁以下', value:45, color:'#d97706', dark:'#78350f'}, 
    {name:'36-45岁', value:35, color:'#ea580c', dark:'#7c2d12'}, 
    {name:'46岁以上', value:20, color:'#dc2626', dark:'#7f1d1d'}
  ];

  return (
    <div className="w-full h-full flex items-center justify-between px-1">
      {/* Chart 1: 学历 */}
      <div className="flex flex-col items-center w-[32%] h-full glass-card p-2 rounded-xl border border-slate-700/30">
        <div className="text-xs font-bold text-slate-300 mb-2">学历结构</div>
        <div className="w-full h-28 relative">
          <ResponsiveContainer>
            <PieChart>
              <defs>
                <filter id="glow-muted" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <Pie data={eduData} cx="50%" cy="50%" innerRadius={28} outerRadius={40} paddingAngle={4} cornerRadius={16} stroke="rgba(255,255,255,0.05)" strokeWidth={1} dataKey="value">
                {eduData.map((e, i) => <Cell key={i} fill={e.color} style={{ filter: 'url(#glow-muted)', opacity: 0.7 }} className="outline-none hover:opacity-100 transition-opacity duration-300" />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="text-base font-bold text-slate-200 leading-none">100%</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-2">
          {eduData.map((e, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }}></div>
              <span className="text-xs text-slate-400">{e.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart 2: 职称 */}
      <div className="flex flex-col items-center w-[32%] h-full glass-card p-2 rounded-xl border border-white/5">
        <div className="text-xs font-bold text-slate-300 mb-2">职称结构</div>
        <div className="w-full h-28 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={titleData} cx="50%" cy="50%" innerRadius={28} outerRadius={40} paddingAngle={4} cornerRadius={16} stroke="rgba(255,255,255,0.05)" strokeWidth={1} dataKey="value">
                {titleData.map((e, i) => <Cell key={i} fill={e.color} style={{ filter: 'url(#glow-muted)', opacity: 0.7 }} className="outline-none hover:opacity-100 transition-opacity duration-300" />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="text-base font-bold text-slate-200 leading-none">100%</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-2">
          {titleData.map((e, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }}></div>
              <span className="text-sm text-slate-400">{e.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart 3: 年龄 */}
      <div className="flex flex-col items-center w-[32%] h-full glass-card p-2 rounded-xl border border-white/5">
        <div className="text-xs font-bold text-slate-300 mb-2">年龄结构</div>
        <div className="w-full h-28 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={ageData} cx="50%" cy="50%" innerRadius={28} outerRadius={40} paddingAngle={4} cornerRadius={16} stroke="rgba(255,255,255,0.05)" strokeWidth={1} dataKey="value">
                {ageData.map((e, i) => <Cell key={i} fill={e.color} style={{ filter: 'url(#glow-muted)', opacity: 0.7 }} className="outline-none hover:opacity-100 transition-opacity duration-300" />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <div className="text-sm font-bold text-slate-200 leading-none">100%</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-2">
          {ageData.map((e, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: e.color }}></div>
              <span className="text-sm text-slate-400">{e.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KeyTechnologies() {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <line className="stroke-slate-700/40 stroke-[1.5] fill-none [stroke-dasharray:6_4] animate-[lineMove_5s_linear_infinite]" x1="50%" y1="50%" x2="50%" y2="15%" />
        <line className="stroke-slate-700/40 stroke-[1.5] fill-none [stroke-dasharray:6_4] animate-[lineMove_5s_linear_infinite]" x1="50%" y1="50%" x2="15%" y2="35%" />
        <line className="stroke-slate-700/40 stroke-[1.5] fill-none [stroke-dasharray:6_4] animate-[lineMove_5s_linear_infinite]" x1="50%" y1="50%" x2="85%" y2="35%" />
        <line className="stroke-slate-700/40 stroke-[1.5] fill-none [stroke-dasharray:6_4] animate-[lineMove_5s_linear_infinite]" x1="50%" y1="50%" x2="25%" y2="80%" />
        <line className="stroke-slate-700/40 stroke-[1.5] fill-none [stroke-dasharray:6_4] animate-[lineMove_5s_linear_infinite]" x1="50%" y1="50%" x2="75%" y2="80%" />
      </svg>

      {/* Core Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-slate-600 bg-[radial-gradient(circle,rgba(71,85,105,0.4)_0%,transparent_80%)] flex flex-col items-center justify-center text-center z-10 shadow-xl animate-pulse">
        <div className="text-sm font-bold text-slate-100 leading-tight">天空地一体化<br/>技术体系</div>
        <div className="text-xs text-slate-400 mt-1">CORE SYSTEM</div>
      </div>

      {/* Tech Cards */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-36 bg-[#062a4d]/85 border border-cyan-400/50 rounded p-2 z-10 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_15px_#22d3ee]">
        <h5 className="truncate m-0 mb-1 text-xs text-cyan-400 border-b border-cyan-400/20 pb-1 flex items-center gap-1">
          <span>●</span> 监测预警技术
        </h5>
        <p className="m-0 text-xs text-blue-100 leading-snug opacity-90">多源资料融合、云水资源监测、云微物理参数反演</p>
      </div>

      <div className="absolute top-[25%] left-[2%] w-36 bg-[#062a4d]/85 border border-cyan-400/50 rounded p-2 z-10 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_15px_#22d3ee]">
        <h5 className="truncate m-0 mb-1 text-xs text-cyan-400 border-b border-cyan-400/20 pb-1 flex items-center gap-1">
          <span>●</span> 数值模拟技术
        </h5>
        <p className="m-0 text-xs text-blue-100 leading-snug opacity-90">CMA-HMS模式研发、中尺度预报、催化过程模拟</p>
      </div>

      <div className="absolute top-[25%] right-[2%] w-36 bg-[#062a4d]/85 border border-cyan-400/50 rounded p-2 z-10 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_15px_#22d3ee]">
        <h5 className="truncate m-0 mb-1 text-xs text-cyan-400 border-b border-cyan-400/20 pb-1 flex items-center gap-1">
          <span>●</span> 指挥调度技术
        </h5>
        <p className="m-0 text-xs text-blue-100 leading-snug opacity-90">物联网监控、移动一体化指挥、智能作业计划</p>
      </div>

      <div className="absolute bottom-[10%] left-[5%] w-36 bg-[#062a4d]/85 border border-cyan-400/50 rounded p-2 z-10 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_15px_#22d3ee]">
        <h5 className="truncate m-0 mb-1 text-xs text-cyan-400 border-b border-cyan-400/20 pb-1 flex items-center gap-1">
          <span>●</span> 效果评估技术
        </h5>
        <p className="m-0 text-xs text-blue-100 leading-snug opacity-90">物理/统计检验、经济效益评估、量化评价体系</p>
      </div>

      <div className="absolute bottom-[10%] right-[5%] w-36 bg-[#062a4d]/85 border border-cyan-400/50 rounded p-2 z-10 transition-all duration-300 hover:bg-cyan-400/20 hover:border-cyan-400 hover:-translate-y-1 hover:shadow-[0_0_15px_#22d3ee]">
        <h5 className="truncate m-0 mb-1 text-xs text-cyan-400 border-b border-cyan-400/20 pb-1 flex items-center gap-1">
          <span>●</span> 核心装备技术
        </h5>
        <p className="m-0 text-xs text-blue-100 leading-snug opacity-90">大型无人机人影系统、高效催化剂、自动播撒</p>
      </div>
    </div>
  );
}

function InnovationTeam() {
  return (
    <div className="p-2 flex flex-col h-full">
      <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-l-4 border-amber-500 p-2 mb-3 shrink-0">
        <div className="text-amber-500 font-bold text-xs mb-1">✦ 中国气象局重点创新团队</div>
        <div className="text-xs text-white">云降水物理与人工影响天气团队 / 催化技术与装备团队</div>
      </div>
      
      <div className="flex-1 overflow-hidden bg-black/20 border border-cyan-400/10 rounded relative">
        <div className="absolute left-0 right-0 top-0 bottom-0 overflow-hidden">
          <div className="animate-[scrollUp_25s_linear_infinite] p-2 hover:[animation-play-state:paused] flex flex-col gap-4">
            <table className="w-full border-collapse text-sm mb-2">
              <thead>
                <tr>
                  <th className="w-1/2 text-cyan-400 text-left p-1.5 bg-cyan-400/10">中心创新团队</th>
                  <th className="text-cyan-400 text-left p-1.5 bg-cyan-400/10">核心研究方向</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">云室实验团队</td><td className="p-2 border-b border-white/5 text-blue-100">催化机理与微物理</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">数值模式团队</td><td className="p-2 border-b border-white/5 text-blue-100">CMA-HMS研发</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">效果评估团队</td><td className="p-2 border-b border-white/5 text-blue-100">多源评估算法</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">无人机保障团队</td><td className="p-2 border-b border-white/5 text-blue-100">空地协同与装备</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">三江源项目团队</td><td className="p-2 border-b border-white/5 text-blue-100">生态修复技术</td></tr>
              </tbody>
            </table>
            
            <table className="w-full border-collapse text-sm mb-2">
              <thead>
                <tr>
                  <th className="w-1/2 text-cyan-400 text-left p-1.5 bg-cyan-400/10">重大科研项目</th>
                  <th className="text-cyan-400 text-left p-1.5 bg-cyan-400/10">级别单位</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">大型无人机技术研究</td><td className="p-2 border-b border-white/5 text-blue-100">国家重点研发计划</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">云水资源高效利用</td><td className="p-2 border-b border-white/5 text-blue-100">自然基金重点项目</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">新型催化剂研制</td><td className="p-2 border-b border-white/5 text-blue-100">局级重点攻关项目</td></tr>
              </tbody>
            </table>

            {/* Duplicate for seamless scrolling */}
            <table className="w-full border-collapse text-sm mb-2">
              <thead>
                <tr>
                  <th className="w-1/2 text-cyan-400 text-left p-1.5 bg-cyan-400/10">中心创新团队</th>
                  <th className="text-cyan-400 text-left p-1.5 bg-cyan-400/10">核心研究方向</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">云室实验团队</td><td className="p-2 border-b border-white/5 text-blue-100">催化机理与微物理</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">数值模式团队</td><td className="p-2 border-b border-white/5 text-blue-100">CMA-HMS研发</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">效果评估团队</td><td className="p-2 border-b border-white/5 text-blue-100">多源评估算法</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">无人机保障团队</td><td className="p-2 border-b border-white/5 text-blue-100">空地协同与装备</td></tr>
                <tr><td className="p-2 border-b border-white/5 text-blue-100">三江源项目团队</td><td className="p-2 border-b border-white/5 text-blue-100">生态修复技术</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollaborativeInnovation() {
  return (
    <div className="p-2 flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar">
      <div className="bg-white/[0.02] border border-cyan-400/30 rounded-md p-3 border-l-4 border-l-cyan-400">
        <h4 className="truncate m-0 mb-1 text-xs text-white flex justify-between items-center">
          重大项目协同
          <span className="text-xs border border-cyan-400 text-cyan-400 px-1.5 py-0.5 rounded-full">国家级</span>
        </h4>
        <p className="text-xs text-[#a3c2db] m-0 leading-relaxed">联合22个部委，聚焦三江源生态保护、黄河流域增雨及国家重大活动消减雨保障。</p>
      </div>

      <div className="bg-white/[0.02] border border-cyan-400/30 rounded-md p-3 border-l-4 border-l-cyan-400">
        <h4 className="truncate m-0 mb-1 text-xs text-white flex justify-between items-center">
          技术研发协同
          <span className="text-xs border border-cyan-400 text-cyan-400 px-1.5 py-0.5 rounded-full">产研融合</span>
        </h4>
        <p className="text-xs text-[#a3c2db] m-0 leading-relaxed">联合中航、中天火箭、中科院大气物理所。突破大型无人机、新型催化剂等核心技术。</p>
      </div>

      <div className="bg-white/[0.02] border border-cyan-400/30 rounded-md p-3 border-l-4 border-l-cyan-400">
        <h4 className="truncate m-0 mb-1 text-xs text-white flex justify-between items-center">
          人才培养协同
          <span className="text-xs border border-cyan-400 text-cyan-400 px-1.5 py-0.5 rounded-full">局校合作</span>
        </h4>
        <p className="text-xs text-[#a3c2db] m-0 leading-relaxed">依托清华、南信大等高校，建立联合实验室与研究生培养基地，打造人影人才蓄水池。</p>
      </div>
    </div>
  );
}

function FieldExperiments() {
  const bases = [
    {
      name: "北方云降水野外科学试验基地",
      location: "华北地区",
      desc: "重点开展冷云催化、冬季地形云增雪、航空器积冰等外场观测与催化试验，支撑华北水资源安全与重大活动保障。",
      icon: "❄️"
    },
    {
      name: "南方云降水野外科学试验基地",
      location: "华南地区",
      desc: "聚焦暖云及混合云降水机制，开展对流云催化、暴雨及强对流天气精细化探测与人工影响天气试验。",
      icon: "🌧️"
    },
    {
      name: "西北干旱区地形云试验基地",
      location: "祁连山/天山",
      desc: "针对西北干旱半干旱区生态保护，开展复杂地形云水资源立体探测、大型无人机增雨雪及生态修复评估试验。",
      icon: "🏔️"
    },
    {
      name: "高山云雾物理试验站",
      location: "高海拔山区",
      desc: "利用独特高山地形，长期开展云雾微物理结构、气溶胶-云-降水相互作用及消雾技术的外场原位连续观测。",
      icon: "🌫️"
    }
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-y-auto no-scrollbar p-1">
      <div className="grid grid-cols-2 gap-3 h-full">
        {bases.map((base, i) => (
          <div key={i} className="glass-card border-cyan-500/20 p-3 flex flex-col gap-2 hover:bg-cyan-900/20 transition-colors group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-6xl opacity-5 group-hover:opacity-10 transition-opacity">{base.icon}</div>
            <div className="flex items-center gap-2 border-b border-cyan-500/30 pb-2 relative z-10">
              <span className="truncate text-2xl drop-shadow-md shrink-0">{base.icon}</span>
              <div className="min-w-0 flex-1">
                <div className="text-xs tracking-tight font-bold text-cyan-300 group-hover:text-cyan-100 transition-colors truncate" title={base.name}>{base.name}</div>
                <div className="text-xs text-cyan-500/80 truncate">{base.location}</div>
              </div>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed relative z-10">
              {base.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

