// 首页渲染函数
const renderHomePage = (handleNavClick) => {
  return React.createElement(React.Fragment, null, [
    // 英雄区域
    React.createElement('section', { className: 'hero' }, [
      React.createElement('h1', null, '智能学习，点亮未来'),
      React.createElement('p', null, '辰光未来星 - 您的个性化AI学习助手，让学习更高效、更有趣'),
      React.createElement('div', { className: 'hero-buttons' }, [
        React.createElement('button', {
          className: 'btn btn-primary',
          onClick: () => handleNavClick('features')
        }, '探索功能'),
        React.createElement('button', {
          className: 'btn btn-secondary',
          onClick: () => handleNavClick('chat')
        }, '立即对话')
      ])
    ]),

    // 功能区域预览
    React.createElement('section', { className: 'features', id: 'features' }, [
      React.createElement('h2', null, '核心功能'),
      React.createElement('div', { className: 'features-grid' }, [
        React.createElement('div', { className: 'feature-card' }, [
          React.createElement('div', { className: 'feature-icon' }, '💬'),
          React.createElement('h3', null, 'AI智能问答'),
          React.createElement('p', null, '基于智谱AI的强大对话能力，为您提供专业、准确的学习解答'),
          React.createElement('button', {
            className: 'feature-btn',
            onClick: () => handleNavClick('features')
          }, '了解更多')
        ]),
        React.createElement('div', { className: 'feature-card' }, [
          React.createElement('div', { className: 'feature-icon' }, '🎨'),
          React.createElement('h3', null, 'AI绘画'),
          React.createElement('p', null, '使用先进的AI绘画技术，将您的创意变为现实'),
          React.createElement('button', {
            className: 'feature-btn',
            onClick: () => handleNavClick('draw')
          }, '了解更多')
        ]),
        React.createElement('div', { className: 'feature-card' }, [
          React.createElement('div', { className: 'feature-icon' }, '✨'),
          React.createElement('h3', null, 'AI批改'),
          React.createElement('p', null, '快速批改作业和试卷，提供详细的分析和建议'),
          React.createElement('button', {
            className: 'feature-btn',
            onClick: () => handleNavClick('correction')
          }, '立即批改')
        ]),
        React.createElement('div', { className: 'feature-card' }, [
          React.createElement('div', { className: 'feature-icon' }, '📅'),
          React.createElement('h3', null, '学习计划'),
          React.createElement('p', null, '智能制定个性化学习计划，根据您的学习目标和时间安排，优化学习路径'),
          React.createElement('button', {
            className: 'feature-btn',
            onClick: () => handleNavClick('study-plan')
          }, '了解更多')
        ])
      ])
    ])
  ]);
};
