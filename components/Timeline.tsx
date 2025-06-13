'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: string;
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  title?: string;
}

export default function Timeline({ items, title = '项目经历' }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const timeline = timelineRef.current;
    const itemsContainer = itemsRef.current;
    
    if (timeline && itemsContainer) {
      // 获取所有时间轴项
      const timelineItems = itemsContainer.querySelectorAll('.timeline-item');
      const line = timeline.querySelector('.timeline-line');
      
      // 创建时间轴线条动画
      if (line) {
        gsap.fromTo(
          line,
          { height: 0 },
          {
            height: '100%',
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timeline,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 0.5,
            },
          }
        );
      }
      
      // 为每个时间轴项创建动画
      timelineItems.forEach((item, index) => {
        const isEven = index % 2 === 0;
        const direction = isEven ? 1 : -1;
        
        gsap.fromTo(
          item,
          { 
            x: 50 * direction, 
            opacity: 0 
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
    
    return () => {
      // 清理ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items]);
  
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">{title}</h2>
        
        <div ref={timelineRef} className="relative">
          {/* 时间轴线 */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-500 h-0 z-0"></div>
          
          <div ref={itemsRef} className="relative z-10">
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={item.id} className="timeline-item flex justify-center mb-12">
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:mr-auto' : 'md:ml-auto'} ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">{item.date}</div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                      
                      {item.tags && item.tags.length > 0 && (
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                          {item.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* 时间点 */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-20">
                    {item.icon ? (
                      <span className="text-white text-sm">{item.icon}</span>
                    ) : (
                      <span className="w-3 h-3 bg-white rounded-full"></span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}