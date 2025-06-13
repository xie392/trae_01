'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import Recommendations from '../components/Recommendations';
import SkillGame from '../components/SkillGame';
import { SkeletonLoader } from '../components/SkeletonLoader';

// 动态导入3D背景组件，避免SSR问题
const ParticleBackground = dynamic(
  () => import('../components/ParticleBackground'),
  { ssr: false, loading: () => <div className="fixed inset-0 -z-10 bg-gradient-to-b from-blue-900 to-blue-950" /> }
);

// 导入数据
import { personalInfo, skills, projects, timelineItems, codingChallenges, recommendations } from '../data/resumeData';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟内容加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* 3D粒子背景 */}
      <ParticleBackground />

      {/* 骨架屏加载 */}
      <SkeletonLoader isLoading={isLoading}>
        {/* 英雄区域 */}
        <Hero 
          name={personalInfo.name}
          title={personalInfo.title}
          summary={personalInfo.summary}
          profileImage={personalInfo.profileImage}
        />

        {/* 技能展示 */}
        <Skills skills={skills} />

        {/* 项目展示 */}
        <Projects projects={projects} />

        {/* 时间轴 */}
        <Timeline items={timelineItems} />

        {/* 技能评估游戏 */}
        <SkillGame challenges={codingChallenges as any} />

        {/* 个性化推荐 */}
        <Recommendations items={recommendations as any} />
      </SkeletonLoader>
    </div>
  );
}
