import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, ArrowLeft, Calendar } from 'lucide-react';

const timelineData = [
  {
    year: '2021',
    title: '2021年重大服务',
    subtitle: '军地联合指挥体系，精准开展消减雨、增雪作业',
    color: 'text-slate-300',
    dotColor: 'bg-slate-500',
    cards: [
      {
        title: '建党百年保障',
        content: <><span className="text-slate-200 font-bold">采用新技术、利用新资料</span>，给出复杂降水作业设计参量，催化模拟预估和实时效果评估指导后续<span className="text-slate-200 font-bold">作业更客观</span>，下达作业指令<span className="text-slate-200 font-bold">更精准</span>。</>,
        imagePlaceholder: '建党百年保障期间北京降水旱分布图',
        imageSrc: 'https://picsum.photos/seed/rain1/400/300'
      },
      {
        title: '西安十四运保障',
        content: <><span className="text-slate-200 font-bold">老中青同心聚力，首次开展</span>飞机液氮催化模拟和效果预估，<span className="text-slate-200 font-bold">首次在“天镜厅”</span>综合展示人影保障服务。</>,
        imagePlaceholder: '“十四运”人影作业预案建议',
        imageSrc: 'https://picsum.photos/seed/plane1/400/300'
      },
      {
        title: '冬奥会保障',
        content: <><span className="text-slate-200 font-bold">连续7年</span>开展冬季降雪云系综合观测，<span className="text-slate-200 font-bold">首次行业部门牵头</span>建立重大活动军地联合人影指挥作业体系，提升<span className="text-slate-200 font-bold">复杂地形</span>固定目标区增雪服务保障技术能力。</>,
        imagePlaceholder: '冬季降雪云系综合观测设备分布',
        imageSrc: 'https://picsum.photos/seed/snow1/400/300'
      }
    ]
  },
  {
    year: '2022',
    title: '2022年南方高温抗旱重大服务',
    subtitle: '服务成效显著，得到央视新闻频道、财经频道、科技日报等中央媒体的持续报导，引起社会广泛关注',
    color: 'text-slate-300',
    dotColor: 'bg-slate-500',
    cards: [
      {
        title: '抗旱增雨协同作业',
        content: <>围绕南方极端高温干旱，加密会商研讨技术，在四川<span className="text-slate-200 font-bold">首次开展2架大型无人机</span>协同抗旱增雨作业，<span className="text-slate-200 font-bold">首次调配3架高性能增雨飞机</span>开展增蓄型增雨，成效显著。</>,
        imagePlaceholder: '多架飞机协同作业及媒体报道',
        imageSrc: 'https://picsum.photos/seed/drone1/400/300'
      }
    ]
  },
  {
    year: '2023',
    title: '2023年重大服务',
    subtitle: '圆满完成多项国家级重大活动人影保障及生态修复任务',
    color: 'text-slate-300',
    dotColor: 'bg-slate-500',
    cards: [
      {
        title: '成都大运会',
        content: <>密切关注天气，研判作业条件、滚动监测预警，及时发布国家级专项服务指导产品，<span className="text-slate-200 font-bold">参加人影专题会商发言13次；圆满完成成都大运会开闭幕式</span>人影保障服务。</>,
        imagePlaceholder: '大运会开幕式卫星云图',
        imageSrc: 'https://picsum.photos/seed/satellite1/400/300'
      },
      {
        title: '杭州亚运会',
        content: <>期间共组织8架飞机飞行<span className="text-slate-200 font-bold">作业21架次</span>；地面火箭<span className="text-slate-200 font-bold">作业21次</span>，发射火箭弹<span className="text-slate-200 font-bold">906枚</span>；闭幕式期间，共飞行<span className="text-slate-200 font-bold">7架次</span>，累计时长约<span className="text-slate-200 font-bold">24小时</span>。圆满完成杭州亚运会人影保障。</>,
        imagePlaceholder: '中心专家在亚运气象中心现场保障',
        imageSrc: 'https://picsum.photos/seed/meeting1/400/300'
      },
      {
        title: '上海进博会',
        content: <>承担进博会期间的人影<span className="text-slate-200 font-bold">改善空气质量</span>试验保障任务，<span className="text-slate-200 font-bold">增加降水约1084.1-1319.1万吨</span>，为缓解华东地区污染提供有效帮助。</>,
        imagePlaceholder: '飞机作业区域与降水量影响区',
        imageSrc: 'https://picsum.photos/seed/map1/400/300'
      }
    ]
  },
  {
    year: '2024',
    title: '2024年重大服务',
    subtitle: '跨区域、多机型协同作业，全面提升防灾减灾救灾能力',
    color: 'text-slate-300',
    dotColor: 'bg-slate-500',
    cards: [
      {
        title: '四川雅江增雨灭火',
        content: <><span className="text-slate-200 font-bold">调配两架高性能增雨飞机</span>，协调<span className="text-slate-200 font-bold">无人机</span>支援开展增雨作业，并派出<span className="text-slate-200 font-bold">3名技术人员</span>赶赴飞机外场共实施增雨作业<span className="text-slate-200 font-bold">飞行11小时</span>，作业后火区周边<span className="text-slate-200 font-bold">出现小到中雪</span>。</>,
        imagePlaceholder: '两架高性能增雨飞机、无人机开展增雨灭火',
        imageSrc: 'https://picsum.photos/seed/fire1/400/300'
      },
      {
        title: '华北、黄淮增雨抗旱',
        content: <>针对北方地区旱情 and 高森林火险，协调多地共组织飞机人工增雨作<span className="text-slate-200 font-bold">业211架次</span>，开展地面增雨作<span className="text-slate-200 font-bold">业3000次</span>，作业影响面积约<span className="text-slate-200 font-bold">71.1万平方公里</span>。</>,
        imagePlaceholder: '针对作业方案开展多轮联合会商研判',
        imageSrc: 'https://picsum.photos/seed/drought1/400/300'
      },
      {
        title: '丹江口水库汇水区增蓄',
        content: <>调度青海1架空中国王350赴湖北；联合中国科学院大气所，组织湖北、河南、陕西三省<span className="text-slate-200 font-bold">开展3次空地联合探测和增雨作业</span>。</>,
        imagePlaceholder: '召开丹江口增蓄服务调研推进会',
        imageSrc: 'https://picsum.photos/seed/lake1/400/300'
      }
    ]
  },
  {
    year: '2025',
    title: '2025年“春雨”和“谷雨”行动',
    subtitle: '大范围、跨区域、多波次、多机联合增雨（雪）作业',
    color: 'text-slate-300',
    dotColor: 'bg-slate-500',
    cards: [
      {
        title: '组织实施与作业情况',
        content: <>
          <div className="mb-1"><span className="text-slate-300 font-bold">组织实施：</span>3-5月，军地协同、国省联动，联合<span className="text-slate-200 font-bold">13省（区、市）</span>开展大范围、跨区域、多波次、多机联合增雨（雪）作业。</div>
          <div><span className="text-slate-300 font-bold">作业情况：</span><span className="text-slate-200 font-bold">投入23架人影飞机</span>和地面作业力量，组织开展飞机作业<span className="text-slate-200 font-bold">150余架次</span>、地面作业<span className="text-slate-200 font-bold">3000余次</span>。</div>
        </>,
        imagePlaceholder: '“春雨”和“谷雨”行动作业区域示意图',
        imageSrc: 'https://picsum.photos/seed/map2/400/300'
      },
      {
        title: '时空接续作业方案',
        content: <>制定详细的时空接续作业方案，明确不同机型（无人机、高性能飞机、运十二等）在不同高度（8100米以下、7500-4200米、4200米以下）的接续作业策略，实现长时间、大范围覆盖。</>,
        imagePlaceholder: '时空接续作业方案及不同机型高度示意图',
        imageSrc: 'https://picsum.photos/seed/plane2/400/300'
      },
      {
        title: '作业效果与复盘分析',
        content: <>
          <div className="mb-1"><span className="text-slate-300 font-bold">作业效果：</span>人工增雨（雪）累计<span className="text-slate-200 font-bold">增加降水约8.5亿吨</span>，保障春播春耕，助力全年粮食稳产增产。</div>
          <div><span className="text-slate-300 font-bold">复盘分析：</span><span className="text-slate-200 font-bold">总结</span>指挥调度、多机协同、跨域作业的机制、流程与技术要求，为常态化开展体系化作业积累经验。</div>
        </>,
        imagePlaceholder: '“春雨”行动增雨量分布及组织技术复盘',
        imageSrc: 'https://picsum.photos/seed/chart1/400/300'
      }
    ]
  }
];

export function SocialServicesTimeline({ activeTab, onClose }: { activeTab?: string | null, onClose?: () => void }) {
  const [expandedYears, setExpandedYears] = useState<string[]>(timelineData.map(item => item.year));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const exactScrollTop = useRef(0);
  const [isHovering, setIsHovering] = useState(false);

  const toggleYear = (year: string) => {
    setExpandedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  useEffect(() => {
    if (activeTab) {
      setExpandedYears([activeTab]);
    }
  }, [activeTab]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || activeTab) return; // Disable auto-scroll in detail view

    let animationId: number;
    
    // Sync initial scroll position
    exactScrollTop.current = container.scrollTop;
    
    const scrollStep = () => {
      if (!isHovering) {
        exactScrollTop.current += 0.5; // Auto-scroll speed
        container.scrollTop = exactScrollTop.current;
        
        // If reached the bottom, reset to top
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 1) {
          container.scrollTop = 0;
          exactScrollTop.current = 0;
        }
      } else {
        // Sync exactScrollTop with manual scrolling while hovering
        exactScrollTop.current = container.scrollTop;
      }
      animationId = requestAnimationFrame(scrollStep);
    };

    animationId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovering, activeTab]);

  const displayData = activeTab ? timelineData.filter(item => item.year === activeTab) : timelineData;

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-950/40 backdrop-blur-xl overflow-hidden">
      {onClose && (
        <div className="flex items-center justify-between px-8 py-6 border-b border-cyan-500/30 bg-cyan-300/10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Calendar className="w-7 h-7 text-cyan-400" />
            </div>
            <div>
              <h2 className="truncate text-xl font-bold text-white tracking-wider">服务效益</h2>
              <p className="text-xs text-cyan-400/60 font-medium mt-0.5 tracking-widest uppercase">Service Benefits Timeline</p>
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
      )}

      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 overflow-y-auto no-scrollbar p-8 bg-transparent"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => setIsHovering(false)}
        >
          <div className="flex flex-col gap-10 relative z-10">
            {/* Vertical Solid Line - Now relative to the content wrapper so it scrolls correctly */}
            <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-white/10 z-0"></div>
            
            {displayData.map((item) => {
            const isExpanded = expandedYears.includes(item.year);
            
            return (
              <div key={item.year} className="flex flex-col">
                {/* Year Node Header */}
                <div 
                  className="flex items-center gap-6 cursor-pointer group"
                  onClick={() => toggleYear(item.year)}
                >
                  {/* Node Dot */}
                  <div className={`w-5 h-5 rounded-full ${item.dotColor} border-4 border-slate-900 shadow-[0_0_10px_rgba(59,130,246,0.8)] relative z-10 group-hover:scale-125 transition-transform duration-300`}></div>

                  {/* Title & Subtitle */}
                  <div className="flex-1 flex items-baseline gap-4">
                    <h3 className={`text-lg font-bold ${item.color} tracking-wide`}>{item.title}</h3>
                    <span className={`text-xs font-medium ${item.color} italic opacity-80`}>{item.subtitle}</span>
                    <div className="ml-auto text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pl-14 pr-4 pt-6 pb-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                          {item.cards.map((card, idx) => (
                            <div key={idx} className="glass-card border-slate-700/30 rounded-xl overflow-hidden hover:border-slate-500/50 transition-all duration-500 group flex flex-col h-full shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                              {/* Card Header & Content */}
                              <div className="p-4 flex-1">
                                <h4 className="font-bold text-slate-200 text-xs mb-2 flex items-center gap-2">
                                  <div className="w-2 h-2 bg-slate-500 shadow-sm shrink-0"></div>
                                  {card.title}:
                                </h4>
                                <div className="text-xs text-slate-200 leading-relaxed pl-4">
                                  {card.content}
                                </div>
                              </div>
                              
                              {/* Image Placeholder / Actual Image */}
                              <div className="h-40 bg-white/5 border-t border-white/5 m-4 mt-0 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:bg-white/10 transition-colors">
                                <img 
                                  src={card.imageSrc} 
                                  alt={card.imagePlaceholder} 
                                  referrerPolicy="no-referrer"
                                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity z-20"
                                  onError={(e) => {
                                    // Fallback to placeholder if image not found
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] z-0"></div>
                                <div className="absolute top-2 right-2 bg-black/40 border border-white/10 px-2 py-1 rounded text-slate-300 text-xs font-medium z-30 shadow-lg backdrop-blur-md max-w-[80%] text-right truncate">
                                  {card.imagePlaceholder}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
