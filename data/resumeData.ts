// 个人简历数据

export const personalInfo = {
  name: '张三',
  title: '高级前端开发工程师',
  summary: '拥有5年前端开发经验，专注于创建高性能、交互丰富的Web应用。熟悉React、Next.js、TypeScript和现代前端工具链，热衷于用户体验设计和前端性能优化。',
  profileImage: '/images/profile.jpg',
  contact: {
    email: 'example@example.com',
    phone: '+86 123 4567 8910',
    location: '北京市朝阳区',
    github: 'https://github.com/example',
    linkedin: 'https://linkedin.com/in/example',
  }
};

export const skills = [
  { name: 'React', level: 95, category: '前端框架' },
  { name: 'Next.js', level: 90, category: '前端框架' },
  { name: 'Vue.js', level: 85, category: '前端框架' },
  { name: 'TypeScript', level: 92, category: '编程语言' },
  { name: 'JavaScript', level: 98, category: '编程语言' },
  { name: 'HTML/CSS', level: 95, category: '网页技术' },
  { name: 'Tailwind CSS', level: 90, category: '样式工具' },
  { name: 'GSAP', level: 85, category: '动画' },
  { name: 'Three.js', level: 80, category: '3D技术' },
  { name: 'WebGL', level: 75, category: '3D技术' },
  { name: 'Node.js', level: 85, category: '后端技术' },
  { name: 'GraphQL', level: 80, category: 'API技术' },
  { name: 'REST API', level: 90, category: 'API技术' },
  { name: 'Git', level: 95, category: '开发工具' },
  { name: 'Webpack', level: 85, category: '构建工具' },
  { name: 'Docker', level: 75, category: '部署工具' },
  { name: 'Jest', level: 85, category: '测试工具' },
  { name: 'Cypress', level: 80, category: '测试工具' },
];

export const projects = [
  {
    id: 'project-1',
    title: '电商平台重构',
    description: '使用Next.js和TypeScript重构大型电商平台，提升性能和用户体验',
    image: '/images/project1.jpg',
    technologies: [
      { name: 'Next.js', icon: '/icons/nextjs.svg' },
      { name: 'TypeScript', icon: '/icons/typescript.svg' },
      { name: 'Redux', icon: '/icons/redux.svg' },
      { name: 'Tailwind CSS', icon: '/icons/tailwind.svg' },
      { name: 'GraphQL', icon: '/icons/graphql.svg' },
    ],
    demoUrl: 'https://example.com/demo1',
    codeUrl: 'https://github.com/example/project1',
    details: `
      <h3>项目背景</h3>
      <p>为大型电商客户重构其老旧的电商平台，原平台使用jQuery开发，存在性能问题和维护困难。</p>
      
      <h3>我的职责</h3>
      <ul>
        <li>负责前端架构设计和技术选型</li>
        <li>实现产品列表、详情页和购物车等核心功能</li>
        <li>优化首屏加载时间和交互体验</li>
        <li>实现响应式设计，支持多种设备</li>
      </ul>
      
      <h3>技术亮点</h3>
      <ul>
        <li>使用Next.js实现SSR和静态生成，提升SEO和首屏加载速度</li>
        <li>通过GraphQL优化数据获取，减少不必要的请求</li>
        <li>实现图片懒加载和骨架屏，优化用户体验</li>
        <li>使用Redux管理全局状态，确保数据一致性</li>
        <li>集成支付系统和物流跟踪功能</li>
      </ul>
      
      <h3>成果</h3>
      <p>重构后的平台首屏加载时间减少60%，转化率提升25%，移动端用户停留时间增加40%。</p>
    `,
  },
  {
    id: 'project-2',
    title: '3D产品展示平台',
    description: '基于Three.js的3D产品展示平台，支持产品360度旋转和自定义配置',
    image: '/images/project2.jpg',
    technologies: [
      { name: 'React', icon: '/icons/react.svg' },
      { name: 'Three.js', icon: '/icons/threejs.svg' },
      { name: 'WebGL', icon: '/icons/webgl.svg' },
      { name: 'GSAP', icon: '/icons/gsap.svg' },
    ],
    demoUrl: 'https://example.com/demo2',
    codeUrl: 'https://github.com/example/project2',
    details: `
      <h3>项目背景</h3>
      <p>为家具制造商开发3D产品展示平台，允许用户在购买前查看产品的360度视图并自定义配置。</p>
      
      <h3>我的职责</h3>
      <ul>
        <li>负责3D模型的加载和渲染</li>
        <li>实现产品旋转、缩放和材质更换功能</li>
        <li>优化3D模型加载性能</li>
        <li>设计直观的用户界面</li>
      </ul>
      
      <h3>技术亮点</h3>
      <ul>
        <li>使用Three.js实现3D模型渲染和交互</li>
        <li>实现模型的渐进式加载，优先显示低精度模型</li>
        <li>使用GSAP创建流畅的动画和过渡效果</li>
        <li>实现材质和颜色的实时更换</li>
        <li>优化移动设备上的性能和交互</li>
      </ul>
      
      <h3>成果</h3>
      <p>该平台上线后，产品页面停留时间增加了120%，产品详情页转化率提升35%。</p>
    `,
  },
  {
    id: 'project-3',
    title: '数据可视化仪表盘',
    description: '企业级数据分析仪表盘，支持实时数据更新和自定义图表',
    image: '/images/project3.jpg',
    technologies: [
      { name: 'Vue.js', icon: '/icons/vue.svg' },
      { name: 'D3.js', icon: '/icons/d3.svg' },
      { name: 'Socket.io', icon: '/icons/socketio.svg' },
      { name: 'Node.js', icon: '/icons/nodejs.svg' },
    ],
    demoUrl: 'https://example.com/demo3',
    codeUrl: 'https://github.com/example/project3',
    details: `
      <h3>项目背景</h3>
      <p>为金融科技公司开发实时数据分析仪表盘，用于监控交易数据和市场趋势。</p>
      
      <h3>我的职责</h3>
      <ul>
        <li>设计和实现仪表盘界面</li>
        <li>开发各类数据可视化图表</li>
        <li>实现实时数据更新功能</li>
        <li>设计用户自定义仪表盘功能</li>
      </ul>
      
      <h3>技术亮点</h3>
      <ul>
        <li>使用Vue.js构建响应式用户界面</li>
        <li>通过D3.js创建复杂的交互式图表</li>
        <li>使用Socket.io实现实时数据更新</li>
        <li>实现图表拖拽和调整大小功能</li>
        <li>支持数据导出和报告生成</li>
      </ul>
      
      <h3>成果</h3>
      <p>该仪表盘帮助客户将数据分析时间减少50%，提高了决策效率，并成为公司的核心产品之一。</p>
    `,
  },
];

export const timelineItems = [
  {
    id: 'experience-1',
    date: '2021 - 至今',
    title: 'ABC科技有限公司 - 高级前端开发工程师',
    description: '负责公司核心产品的前端架构设计和开发，带领5人前端团队，推动前端技术栈升级和最佳实践。',
    icon: '🚀',
    tags: ['React', 'Next.js', 'TypeScript', 'Team Lead'],
  },
  {
    id: 'experience-2',
    date: '2019 - 2021',
    title: 'XYZ互联网公司 - 前端开发工程师',
    description: '参与电商平台和内容管理系统的开发，负责性能优化和用户体验改进。',
    icon: '💻',
    tags: ['Vue.js', 'Webpack', 'Less', 'RESTful API'],
  },
  {
    id: 'experience-3',
    date: '2018 - 2019',
    title: '创新创业公司 - 全栈开发工程师',
    description: '作为早期团队成员，参与产品从0到1的开发过程，负责前端界面和部分后端API的实现。',
    icon: '🔧',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    id: 'education-1',
    date: '2014 - 2018',
    title: '计算机科学与技术 - 北京大学',
    description: '主修计算机科学与技术，辅修人工智能。参与多个校园技术项目，获得优秀毕业生称号。',
    icon: '🎓',
    tags: ['计算机科学', '人工智能', '优秀毕业生'],
  },
];

export const codingChallenges = [
  {
    id: 'challenge-1',
    title: '数组去重',
    description: '实现一个函数，去除数组中的重复元素，返回一个新数组。',
    difficulty: 'easy',
    code: `function removeDuplicates(arr) {
  // 在这里实现你的代码
  // 返回去重后的数组
  return [];
}`,
    solution: `function removeDuplicates(arr) {
  return [...new Set(arr)];
}`,
    testCases: [
      {
        input: '[1, 2, 2, 3, 4, 4, 5]',
        expectedOutput: '[1, 2, 3, 4, 5]',
      },
      {
        input: '["a", "b", "a", "c", "c"]',
        expectedOutput: '["a", "b", "c"]',
      },
      {
        input: '[true, false, true, true]',
        expectedOutput: '[true, false]',
      },
    ],
  },
  {
    id: 'challenge-2',
    title: '回文检查',
    description: '实现一个函数，检查给定的字符串是否为回文（正着读和倒着读都一样）。忽略大小写、空格和标点符号。',
    difficulty: 'medium',
    code: `function isPalindrome(str) {
  // 在这里实现你的代码
  // 返回 true 或 false
  return false;
}`,
    solution: `function isPalindrome(str) {
  // 移除非字母数字字符并转为小写
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  // 反转字符串并比较
  return cleanStr === cleanStr.split('').reverse().join('');
}`,
    testCases: [
      {
        input: '"A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
      },
      {
        input: '"race a car"',
        expectedOutput: 'false',
      },
      {
        input: '"Was it a car or a cat I saw?"',
        expectedOutput: 'true',
      },
    ],
  },
  {
    id: 'challenge-3',
    title: '斐波那契数列',
    description: '实现一个函数，返回斐波那契数列的第n个数。斐波那契数列的前两个数是0和1，之后的每个数都是前两个数的和。',
    difficulty: 'hard',
    code: `function fibonacci(n) {
  // 在这里实现你的代码
  // 返回斐波那契数列的第n个数
  return 0;
}`,
    solution: `function fibonacci(n) {
  // 使用动态规划避免递归导致的性能问题
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
}`,
    testCases: [
      {
        input: '0',
        expectedOutput: '0',
      },
      {
        input: '1',
        expectedOutput: '1',
      },
      {
        input: '10',
        expectedOutput: '55',
      },
      {
        input: '20',
        expectedOutput: '6765',
      },
    ],
  },
];

export const recommendations = [
  {
    id: 'rec-1',
    title: '前端架构设计实践',
    description: '探讨大型前端项目的架构设计、状态管理和性能优化策略',
    image: '/images/rec1.jpg',
    link: '/blog/frontend-architecture',
    type: ['recruiter', 'peer'],
  },
  {
    id: 'rec-2',
    title: '我的项目案例集',
    description: '精选项目案例展示，包含详细的技术方案和成果数据',
    image: '/images/rec2.jpg',
    link: '/portfolio',
    type: ['recruiter', 'client'],
  },
  {
    id: 'rec-3',
    title: 'Three.js 3D交互实现指南',
    description: '从零开始学习如何使用Three.js创建交互式3D场景',
    image: '/images/rec3.jpg',
    link: '/blog/threejs-guide',
    type: ['peer', 'student'],
  },
  {
    id: 'rec-4',
    title: '前端性能优化实战',
    description: '分享我在大型项目中应用的前端性能优化技巧和工具',
    image: '/images/rec4.jpg',
    link: '/blog/performance-optimization',
    type: ['peer', 'student'],
  },
  {
    id: 'rec-5',
    title: '我能为您的项目做什么',
    description: '了解我的技能和服务如何帮助您的业务取得成功',
    image: '/images/rec5.jpg',
    link: '/services',
    type: ['client'],
  },
  {
    id: 'rec-6',
    title: '前端学习路线图',
    description: '为初学者和中级开发者提供的前端技术学习路线和资源推荐',
    image: '/images/rec6.jpg',
    link: '/blog/learning-path',
    type: ['student'],
  },
];