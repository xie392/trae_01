'use client';

import { useState, useEffect } from 'react';

interface SkeletonLoaderProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export function SkeletonLoader({ children, isLoading: propIsLoading, className = '' }: SkeletonLoaderProps) {
  const [isLoading, setIsLoading] = useState(propIsLoading !== undefined ? propIsLoading : true);
  
  useEffect(() => {
    if (propIsLoading !== undefined) {
      setIsLoading(propIsLoading);
    } else {
      // 如果没有提供isLoading属性，则在组件挂载后自动设置为false
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 默认1.5秒后显示内容
      
      return () => clearTimeout(timer);
    }
  }, [propIsLoading]);
  
  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <div className="animate-pulse">
          {/* 骨架屏内容 */}
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-4/6 mb-6"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/4"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

// 项目卡片骨架屏
export function ProjectCardSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
        <div className="flex space-x-2 mb-4">
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
}

// 技能条骨架屏
export function SkillBarSkeleton() {
  return (
    <div className="animate-pulse mb-4">
      <div className="flex justify-between mb-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
    </div>
  );
}

// 推荐卡片骨架屏
export function RecommendationCardSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
        <div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
    </div>
  );
}