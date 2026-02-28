// 学习计划页面渲染函数
function renderStudyPlanPage(studyPlanState, setStudyPlanState, handleGenerateStudyPlan, handleInputChange, resetStudyPlanState) {
  const { input, isGenerating, result, error } = studyPlanState;

  return React.createElement('section', { className: 'ai-chat' }, [
    React.createElement('div', { className: 'ai-chat-container' }, [
      React.createElement('div', { className: 'ai-chat-header' }, '学习计划生成'),
      
      // 输入区域
      React.createElement('div', { style: { padding: '1.75rem' } }, [
        // 错误提示
        error && React.createElement('div', {
          style: {
            color: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid #f44336',
            borderRadius: 'var(--border-radius)',
            padding: '1rem',
            marginBottom: '1.5rem'
          }
        }, error),
        
        // 输入提示
        React.createElement('div', {
          style: {
            marginBottom: '1.5rem'
          }
        }, [
          React.createElement('h3', {
            style: {
              color: 'var(--text-color)',
              marginBottom: '1rem'
            }
          }, '输入学习需求'),
          React.createElement('p', {
            style: {
              color: 'var(--text-secondary-color)',
              marginBottom: '1.5rem'
            }
          }, '请描述你的学习目标、时间安排、学科需求等信息，AI将为你生成个性化的学习计划')
        ]),
        
        // 输入框
        React.createElement('div', {
          style: {
            marginBottom: '1.5rem'
          }
        }, [
          React.createElement('textarea', {
            value: input,
            onChange: handleInputChange,
            placeholder: '例如：我是一名高二学生，想在3个月内提高数学成绩，每天有2小时学习时间，请为我制定一个详细的学习计划...',
            style: {
              width: '100%',
              height: '200px',
              padding: '1rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius)',
              fontSize: '1rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }
          }),
          React.createElement('button', {
            onClick: handleGenerateStudyPlan,
            disabled: !input.trim() || isGenerating,
            style: {
              width: '100%',
              padding: '1rem',
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: !input.trim() || isGenerating ? 'not-allowed' : 'pointer',
              opacity: !input.trim() || isGenerating ? 0.6 : 1,
              transition: 'var(--transition)',
              marginTop: '1rem'
            }
          }, isGenerating ? '生成中...' : '生成学习计划')
        ]),
        
        // 结果区域
        result && React.createElement('div', {
          style: {
            marginTop: '2rem',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: 'var(--border-radius)',
            padding: '2rem'
          }
        }, [
          React.createElement('h3', {
            style: {
              color: 'var(--text-color)',
              marginBottom: '1.5rem'
            }
          }, '生成的学习计划'),
          React.createElement('div', {
            style: {
              color: 'var(--text-color)',
              lineHeight: '1.8'
            }
          }, [
            // 解析并渲染AI生成的内容
            ...result.split('\n').map((line, index) => {
              if (line.trim()) {
                if (line.startsWith('# ')) {
                  return React.createElement('h4', {
                    key: index,
                    style: {
                      color: 'var(--text-color)',
                      marginBottom: '1rem',
                      marginTop: '1.5rem'
                    }
                  }, line.substring(2));
                } else if (line.startsWith('## ')) {
                  return React.createElement('h5', {
                    key: index,
                    style: {
                      color: 'var(--text-color)',
                      marginBottom: '0.75rem',
                      marginTop: '1.25rem'
                    }
                  }, line.substring(3));
                } else if (line.startsWith('- ')) {
                  return React.createElement('div', {
                    key: index,
                    style: {
                      marginBottom: '0.5rem',
                      marginLeft: '1.5rem'
                    }
                  }, [
                    React.createElement('span', {
                      style: {
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--primary-color)',
                        borderRadius: '50%',
                        marginRight: '8px',
                        marginTop: '6px',
                        verticalAlign: 'top'
                      }
                    }),
                    React.createElement('span', null, line.substring(2))
                  ]);
                } else {
                  return React.createElement('p', {
                    key: index,
                    style: {
                      marginBottom: '1rem'
                    }
                  }, line);
                }
              }
              return React.createElement('br', { key: index });
            })
          ]),
          
          // 重新生成按钮
          React.createElement('button', {
            onClick: resetStudyPlanState,
            style: {
              marginTop: '2rem',
              padding: '0.875rem 2rem',
              backgroundColor: 'var(--surface-color)',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--border-radius)',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }
          }, '重新生成学习计划')
        ])
      ])
    ])
  ]);
}