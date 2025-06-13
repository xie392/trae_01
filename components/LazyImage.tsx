'use client';

import { useState, useEffect, useRef } from 'react';
import Image, { ImageProps } from 'next/image';

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  threshold?: number;
  placeholder?: string;
  blurEffect?: boolean;
  fadeIn?: boolean;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  threshold = 0.1,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=',
  blurEffect = true,
  fadeIn = true,
  className = '',
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 使用IntersectionObserver检测图片是否进入视口
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [threshold]);
  
  // 处理图片加载完成事件
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  // 构建类名
  const imageClasses = [
    className,
    fadeIn && !isLoaded ? 'opacity-0' : 'opacity-100',
    fadeIn ? 'transition-opacity duration-500' : '',
  ].filter(Boolean).join(' ');
  
  return (
    <div ref={imgRef} className="relative overflow-hidden">
      {/* 占位图或模糊效果 */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: blurEffect ? 'blur(10px)' : 'none',
          }}
        />
      )}
      
      {/* 实际图片 */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          onLoad={handleImageLoad}
          {...props}
        />
      )}
    </div>
  );
}