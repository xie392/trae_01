'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  code: string;
  solution: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

interface SkillGameProps {
  challenges: Challenge[];
}

export default function SkillGame({ challenges }: SkillGameProps) {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [results, setResults] = useState<Array<{ passed: boolean; input: string; expected: string; actual: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  
  // 初始化第一个挑战
  useEffect(() => {
    if (challenges.length > 0 && !currentChallenge) {
      const firstChallenge = challenges[0];
      setCurrentChallenge(firstChallenge);
      setUserCode(firstChallenge.code);
    }
  }, [challenges, currentChallenge]);
  
  // 动画效果
  useEffect(() => {
    const section = sectionRef.current;
    const editor = editorRef.current;
    
    if (section && editor) {
      gsap.from(editor, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      });
    }
    
    return () => {
      // 清理ScrollTrigger
      if (gsap.ScrollTrigger) {
        gsap.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  // 成功动画
  useEffect(() => {
    if (showSuccess && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
      
      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        gsap.to(successRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          onComplete: () => setShowSuccess(false)
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);
  
  // 运行代码
  const runCode = () => {
    if (!currentChallenge || isRunning) return;
    
    setIsRunning(true);
    const testResults: Array<{ passed: boolean; input: string; expected: string; actual: string }> = [];
    
    try {
      // 创建一个安全的执行环境
      const executeCode = new Function('input', userCode);
      
      // 运行测试用例
      currentChallenge.testCases.forEach(testCase => {
        try {
          const actual = executeCode(testCase.input);
          const expected = JSON.parse(testCase.expectedOutput);
          const passed = JSON.stringify(actual) === JSON.stringify(expected);
          
          testResults.push({
            passed,
            input: testCase.input,
            expected: JSON.stringify(expected),
            actual: JSON.stringify(actual)
          });
        } catch (error) {
          testResults.push({
            passed: false,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: `错误: ${(error as Error).message}`
          });
        }
      });
      
      setResults(testResults);
      
      // 检查是否所有测试都通过
      const allPassed = testResults.every(result => result.passed);
      if (allPassed) {
        setCompletedChallenges(prev => {
          if (!prev.includes(currentChallenge.id)) {
            return [...prev, currentChallenge.id];
          }
          return prev;
        });
        setShowSuccess(true);
      }
    } catch (error) {
      setResults([{
        passed: false,
        input: '代码执行',
        expected: '有效的JavaScript代码',
        actual: `错误: ${(error as Error).message}`
      }]);
    } finally {
      setIsRunning(false);
    }
  };
  
  // 选择挑战
  const selectChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setUserCode(challenge.code);
    setResults([]);
  };
  
  // 查看解决方案
  const viewSolution = () => {
    if (currentChallenge) {
      setUserCode(currentChallenge.solution);
    }
  };
  
  // 重置代码
  const resetCode = () => {
    if (currentChallenge) {
      setUserCode(currentChallenge.code);
      setResults([]);
    }
  };
  
  if (!currentChallenge) return null;
  
  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">技能评估</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 挑战列表 */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">JavaScript 挑战</h3>
              <div className="space-y-3">
                {challenges.map((challenge) => {
                  const isCompleted = completedChallenges.includes(challenge.id);
                  const isActive = currentChallenge?.id === challenge.id;
                  
                  return (
                    <button
                      key={challenge.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                      onClick={() => selectChallenge(challenge)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{challenge.title}</span>
                        {isCompleted && (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {challenge.difficulty === 'easy' && '简单'}
                        {challenge.difficulty === 'medium' && '中等'}
                        {challenge.difficulty === 'hard' && '困难'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* 代码编辑器和结果 */}
          <div className="lg:col-span-3">
            <div ref={editorRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* 挑战说明 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-2">{currentChallenge.title}</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p>{currentChallenge.description}</p>
                </div>
              </div>
              
              {/* 代码编辑器 */}
              <div className="p-6 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <textarea
                  className="w-full h-64 p-4 font-mono text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  spellCheck="false"
                />
                
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    onClick={runCode}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        运行中...
                      </>
                    ) : (
                      <>运行代码</>
                    )}
                  </button>
                  
                  <button
                    className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    onClick={resetCode}
                  >
                    重置代码
                  </button>
                  
                  <button
                    className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    onClick={viewSolution}
                  >
                    查看解决方案
                  </button>
                </div>
              </div>
              
              {/* 测试结果 */}
              {results.length > 0 && (
                <div className="p-6">
                  <h4 className="text-lg font-bold mb-4">测试结果</h4>
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg ${result.passed ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800' : 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {result.passed ? (
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className="font-medium">
                            {result.passed ? '通过' : '失败'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-1">输入:</div>
                            <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded">{result.input}</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">预期输出:</div>
                            <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded">{result.expected}</div>
                          </div>
                          <div>
                            <div className="font-medium mb-1">实际输出:</div>
                            <div className="font-mono bg-white dark:bg-gray-800 p-2 rounded">{result.actual}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 成功提示 */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div 
            ref={successRef} 
            className="bg-green-500 text-white px-8 py-6 rounded-xl shadow-2xl flex items-center gap-4"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-xl font-bold">挑战成功!</h3>
              <p>恭喜你通过了所有测试用例</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}