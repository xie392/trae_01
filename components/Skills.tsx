'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  // 按类别分组技能
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
  
  useEffect(() => {
    const section = sectionRef.current;
    const radar = radarRef.current;
    const skillsList = skillsRef.current;
    
    if (section && radar && skillsList) {
      // 雷达图动画
      const radarTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        }
      });
      
      radarTl.from(radar, {
        scale: 0.5,
        opacity: 0,
        rotation: -45,
        duration: 1
      });
      
      // 技能列表动画
      const skillItems = skillsList.querySelectorAll('.skill-item');
      
      skillItems.forEach((item, index) => {
        const progressBar = item.querySelector('.progress-bar');
        const progressValue = item.querySelector('.progress-value');
        
        if (progressBar && progressValue) {
          gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          })
          .from(item, {
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.1
          })
          .to(progressBar, {
            width: progressValue.getAttribute('data-value') + '%',
            duration: 1,
            ease: 'power2.out'
          }, '-=0.2');
        }
      });
    }
    
    return () => {
      // 清理ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // 生成雷达图数据点
  const generateRadarPoints = () => {
    const categories = Object.keys(skillsByCategory);
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    // 计算每个类别的平均技能水平
    const categoryAverages = categories.map(category => {
      const categorySkills = skillsByCategory[category];
      const average = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
      return { category, average };
    });
    
    // 计算每个点的坐标
    return categoryAverages.map((item, index) => {
      const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
      const pointRadius = (radius * item.average) / 100;
      const x = centerX + pointRadius * Math.cos(angle);
      const y = centerY + pointRadius * Math.sin(angle);
      return { x, y, category: item.category, value: item.average };
    });
  };
  
  const radarPoints = generateRadarPoints();
  const radarPolygonPoints = radarPoints.map(point => `${point.x},${point.y}`).join(' ');
  
  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">专业技能</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 雷达图 */}
          <div ref={radarRef} className="mx-auto">
            <svg width="300" height="300" viewBox="0 0 300 300">
              {/* 背景网格 */}
              <circle cx="150" cy="150" r="120" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="150" cy="150" r="90" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="150" cy="150" r="60" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="150" cy="150" r="30" fill="none" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* 轴线 */}
              {Object.keys(skillsByCategory).map((category, index) => {
                const angle = (Math.PI * 2 * index) / Object.keys(skillsByCategory).length - Math.PI / 2;
                const x = 150 + 120 * Math.cos(angle);
                const y = 150 + 120 * Math.sin(angle);
                return (
                  <g key={category}>
                    <line 
                      x1="150" 
                      y1="150" 
                      x2={x} 
                      y2={y} 
                      stroke="#e5e7eb" 
                      strokeWidth="1" 
                    />
                    <text 
                      x={150 + 140 * Math.cos(angle)} 
                      y={150 + 140 * Math.sin(angle)} 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      className="text-xs font-medium fill-gray-600 dark:fill-gray-300"
                    >
                      {category}
                    </text>
                  </g>
                );
              })}
              
              {/* 数据多边形 */}
              <polygon 
                points={radarPolygonPoints} 
                fill="rgba(59, 130, 246, 0.2)" 
                stroke="#3b82f6" 
                strokeWidth="2" 
              />
              
              {/* 数据点 */}
              {radarPoints.map((point, index) => (
                <circle 
                  key={index} 
                  cx={point.x} 
                  cy={point.y} 
                  r="4" 
                  fill="#3b82f6" 
                />
              ))}
            </svg>
          </div>
          
          {/* 技能列表 */}
          <div ref={skillsRef} className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="progress-bar h-full bg-blue-500 rounded-full w-0"
                  >
                    <span 
                      className="progress-value hidden" 
                      data-value={skill.level}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}