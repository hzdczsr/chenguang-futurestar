// AI绘画页面渲染函数
const renderDrawPage = (drawPrompt, drawImage, isDrawing, drawError, setDrawPrompt, handleDrawImage) => {
  return React.createElement('section', { className: 'ai-chat' }, [
    React.createElement('div', { className: 'ai-chat-container' }, [
      React.createElement('div', { className: 'ai-chat-header' }, 'AI绘画'),
      
      // 绘画提示词输入区域
      React.createElement('div', { className: 'ai-chat-input' }, [
        React.createElement('input', {
          type: 'text',
          value: drawPrompt,
          onChange: (e) => setDrawPrompt(e.target.value),
          placeholder: '输入你的绘画描述，例如：一只可爱的小猫咪，坐在阳光明媚的窗台上，背景是蓝天白云',
          disabled: isDrawing
        }),
        React.createElement('button', {
          onClick: handleDrawImage,
          disabled: isDrawing || !drawPrompt.trim()
        }, isDrawing ? '生成中...' : '生成')
      ]),
      
      // 绘画结果显示区域
      React.createElement('div', { style: { padding: '1.75rem' } }, [
        // 错误提示
        drawError && React.createElement('div', {
          style: {
            color: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid #f44336',
            borderRadius: 'var(--border-radius)',
            padding: '1rem',
            marginBottom: '1rem'
          }
        }, drawError),
        
        // 加载状态
        isDrawing && React.createElement('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 'var(--border-radius)'
          }
        }, [
          React.createElement('div', { className: 'loading' }, [
            'AI正在绘画',
            React.createElement('div', { className: 'loading-dots' }, [
              React.createElement('div', { className: 'loading-dot' }),
              React.createElement('div', { className: 'loading-dot' }),
              React.createElement('div', { className: 'loading-dot' })
            ])
          ]),
          React.createElement('p', {
            style: {
              color: 'var(--text-secondary-color)',
              marginTop: '1rem',
              textAlign: 'center'
            }
          }, '请耐心等待，AI正在创作你的作品...')
        ]),
        
        // 生成的图像
        drawImage && React.createElement('div', {
          style: {
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 'var(--border-radius)',
            padding: '1.5rem'
          }
        }, [
          React.createElement('h3', {
            style: {
              color: 'var(--text-color)',
              marginBottom: '1rem'
            }
          }, '生成结果'),
          React.createElement('img', {
            src: drawImage,
            alt: 'AI生成的图像',
            style: {
              maxWidth: '100%',
              maxHeight: '600px',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--shadow-lg)'
            }
          }),
          React.createElement('div', {
            style: {
              marginTop: '1.5rem'
            }
          }, [
            React.createElement('button', {
              style: {
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                padding: '0.6rem 1.2rem',
                marginRight: '0.5rem',
                cursor: 'pointer'
              },
              onClick: () => setDrawPrompt('')
            }, '重新生成'),
            React.createElement('a', {
              href: drawImage,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: {
                backgroundColor: 'var(--surface-color)',
                color: 'var(--text-color)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius)',
                padding: '0.6rem 1.2rem',
                textDecoration: 'none',
                display: 'inline-block'
              }
            }, '下载图像')
          ])
        ]),
        
        // 提示信息
        !drawImage && !isDrawing && !drawError && React.createElement('div', {
          style: {
            color: 'var(--text-secondary-color)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 'var(--border-radius)',
            padding: '2rem',
            textAlign: 'center'
          }
        }, [
          React.createElement('div', {
            style: {
              fontSize: '3rem',
              marginBottom: '1rem'
            }
          }, '🎨'),
          React.createElement('h3', {
            style: {
              color: 'var(--text-color)',
              marginBottom: '1rem'
            }
          }, 'AI绘画功能'),
          React.createElement('p', null, '输入详细的描述，AI将为你生成精美的图像。\n描述越详细，生成的图像越符合你的预期。')
        ])
      ])
    ])
  ]);
};
