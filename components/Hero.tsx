'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  name: string;
  title: string;
  summary: string;
  profileImage: string;
}

export default function Hero({ name, title, summary, profileImage }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 初始化GSAP动画
    const section = sectionRef.current;
    const heading = headingRef.current;
    const image = imageRef.current;
    
    if (section && heading && image) {
      // 创建视差效果
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      // 添加动画效果
      tl.to(heading, { y: 100, opacity: 0.5 })
        .to(image, { y: -50, scale: 0.9 }, 0);
      
      // 初始动画
      gsap.from(heading, { 
        y: 50, 
        opacity: 0, 
        duration: 1, 
        delay: 0.2 
      });
      
      gsap.from(image, { 
        y: 30, 
        opacity: 0, 
        duration: 1, 
        delay: 0.4 
      });
    }
    
    return () => {
      // 清理ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <h1 ref={headingRef} className="text-5xl md:text-7xl font-bold mb-6">{name}</h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">{title}</h2>
          <p className="text-lg md:text-xl mb-8 max-w-lg">{summary}</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
              查看作品集
            </button>
            <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-full font-medium transition-colors">
              联系我
            </button>
          </div>
        </div>
        
        <div ref={imageRef} className="relative">
          <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src={profileImage} 
              alt="个人照片" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}