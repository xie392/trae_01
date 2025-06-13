'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

type VisitorType = 'recruiter' | 'peer' | 'client' | 'student' | 'unknown';

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  type: VisitorType[];
}

interface RecommendationsProps {
  items: RecommendationItem[];
}

export default function Recommendations({ items }: RecommendationsProps) {
  const [visitorType, setVisitorType] = useState<VisitorType>('unknown');
  const [filteredItems, setFilteredItems] = useState<RecommendationItem[]>([]);
  const [selectedType, setSelectedType] = useState<VisitorType | 'all'>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // 模拟访客行为分析
  useEffect(() => {
    // 在实际应用中，这里可以根据用户的浏览行为、停留时间、点击模式等来判断访客类型
    // 这里使用简化的随机模拟
    const analyzeVisitor = () => {
      const types: VisitorType[] = ['recruiter', 'peer', 'client', 'student'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      // 模拟分析延迟
      setTimeout(() => {
        setVisitorType(randomType);
        setIsAnalyzing(false);
      }, 2000);
    };
    
    analyzeVisitor();
  }, []);
  
  // 根据访客类型过滤推荐内容
  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.type.includes(selectedType as VisitorType));
      setFilteredItems(filtered);
    }
  }, [items, selectedType]);
  
  // 初始推荐基于自动检测的访客类型
  useEffect(() => {
    if (!isAnalyzing && visitorType !== 'unknown') {
      setSelectedType(visitorType);
    }
  }, [isAnalyzing, visitorType]);
  
  // 动画效果
  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    
    if (section && cards && !isAnalyzing) {
      // 卡片动画
      const cardElements = cards.querySelectorAll('.recommendation-card');
      
      gsap.fromTo(
        cardElements,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );
    }
    
    return () => {
      // 清理ScrollTrigger
      if (gsap.ScrollTrigger) {
        gsap.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [isAnalyzing, filteredItems]);
  
  // 访客类型标签
  const visitorTypeLabels: Record<VisitorType | 'all', string> = {
    all: '全部内容',
    recruiter: '招聘者',
    peer: '同行开发者',
    client: '潜在客户',
    student: '学习者',
    unknown: '未知访客'
  };
  
  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">个性化推荐</h2>
        
        {isAnalyzing ? (
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-blue-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-xl">分析您的兴趣中...</span>
            </div>
          </div>
        ) : (
          <div className="text-center mb-16">
            <p className="text-xl mb-6">根据您的浏览行为，我们认为您可能是 <span className="font-bold text-blue-600 dark:text-blue-400">{visitorTypeLabels[visitorType]}</span></p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                onClick={() => setSelectedType('all')}
              >
                全部内容
              </button>
              
              {(['recruiter', 'peer', 'client', 'student'] as VisitorType[]).map(type => (
                <button 
                  key={type}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  onClick={() => setSelectedType(type)}
                >
                  {visitorTypeLabels[type]}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isAnalyzing && filteredItems.map((item) => (
            <a 
              key={item.id} 
              href={item.link}
              className="recommendation-card group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.type.map((type) => (
                    <span 
                      key={type} 
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                    >
                      {visitorTypeLabels[type]}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {!isAnalyzing && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">暂无符合条件的推荐内容</p>
          </div>
        )}
      </div>
    </section>
  );
}