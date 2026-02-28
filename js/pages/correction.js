// LaTeX公式转换函数 - 将LaTeX转换为用户可读的形式
function renderLatexToReadable(text) {
  if (!text || typeof text !== 'string') return text;
  
  // 常见LaTeX命令到Unicode符号的映射
  const latexSymbols = {
    '\\alpha': 'α', '\\beta': 'β', '\\gamma': 'γ', '\\delta': 'δ', '\\epsilon': 'ε',
    '\\zeta': 'ζ', '\\eta': 'η', '\\theta': 'θ', '\\iota': 'ι', '\\kappa': 'κ',
    '\\lambda': 'λ', '\\mu': 'μ', '\\nu': 'ν', '\\xi': 'ξ', '\\pi': 'π',
    '\\rho': 'ρ', '\\sigma': 'σ', '\\tau': 'τ', '\\upsilon': 'υ', '\\phi': 'φ',
    '\\chi': 'χ', '\\psi': 'ψ', '\\omega': 'ω',
    '\\Gamma': 'Γ', '\\Delta': 'Δ', '\\Theta': 'Θ', '\\Lambda': 'Λ', '\\Xi': 'Ξ',
    '\\Pi': 'Π', '\\Sigma': 'Σ', '\\Phi': 'Φ', '\\Psi': 'Ψ', '\\Omega': 'Ω',
    '\\infty': '∞', '\\partial': '∂', '\\nabla': '∇', '\\pm': '±', '\\mp': '∓',
    '\\times': '×', '\\div': '÷', '\\cdot': '·', '\\ast': '∗', '\\star': '⋆',
    '\\leq': '≤', '\\geq': '≥', '\\neq': '≠', '\\approx': '≈', '\\equiv': '≡',
    '\\sim': '∼', '\\propto': '∝', '\\subset': '⊂', '\\supset': '⊃', '\\in': '∈',
    '\\notin': '∉', '\\cup': '∪', '\\cap': '∩', '\\emptyset': '∅', '\\forall': '∀',
    '\\exists': '∃', '\\neg': '¬', '\\land': '∧', '\\lor': '∨', '\\Rightarrow': '⇒',
    '\\Leftarrow': '⇐', '\\Leftrightarrow': '⇔', '\\rightarrow': '→', '\\leftarrow': '←',
    '\\leftrightarrow': '↔', '\\sum': '∑', '\\prod': '∏', '\\int': '∫', '\\oint': '∮',
    '\\sqrt': '√', '\\frac': '', '\\over': '/', '\\sqrt': '√',
    '\\angle': '∠', '\\perp': '⊥', '\\parallel': '∥', '\\triangle': '△', '\\circ': '∘',
    '\\degree': '°', '\\prime': '′', '\\dots': '…', '\\ldots': '…', '\\cdots': '⋯',
    '\\vdots': '⋮', '\\ddots': '⋱', '\\because': '∵', '\\therefore': '∴',
    '\\sin': 'sin', '\\cos': 'cos', '\\tan': 'tan', '\\cot': 'cot', '\\sec': 'sec',
    '\\csc': 'csc', '\\log': 'log', '\\ln': 'ln', '\\lg': 'lg', '\\exp': 'exp',
    '\\lim': 'lim', '\\max': 'max', '\\min': 'min', '\\sup': 'sup', '\\inf': 'inf'
  };
  
  let result = text;
  
  // 处理块级公式 $$...$$
  result = result.replace(/\$\$([^$]+)\$\$/g, (match, formula) => {
    let processed = formula;
    Object.keys(latexSymbols).forEach(key => {
      processed = processed.split(key).join(latexSymbols[key]);
    });
    processed = processed.replace(/\\left\s*\(/g, '(').replace(/\\right\s*\)/g, ')');
    processed = processed.replace(/\\left\s*\[/g, '[').replace(/\\right\s*\]/g, ']');
    processed = processed.replace(/\\left\s*\\{/g, '{').replace(/\\right\s*\\}/g, '}');
    processed = processed.replace(/\\left\s*\|/g, '|').replace(/\\right\s*\|/g, '|');
    processed = processed.replace(/\\text\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\\mathrm\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\\mathbf\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\^([^{}\s]+)/g, '⁽$1⁾');
    processed = processed.replace(/\_\{([^}]*)\}/g, '₍$1₎');
    processed = processed.replace(/\_([^{}\s]+)/g, '₍$1₎');
    processed = processed.replace(/\^\{([^}]*)\}/g, '⁽$1⁾');
    processed = processed.replace(/\\[a-zA-Z]+/g, '');
    processed = processed.replace(/\\/g, '');
    return '\n【公式】' + processed.trim() + '【/公式】\n';
  });
  
  // 处理行内公式 $...$
  result = result.replace(/\$([^$]+)\$/g, (match, formula) => {
    let processed = formula;
    Object.keys(latexSymbols).forEach(key => {
      processed = processed.split(key).join(latexSymbols[key]);
    });
    processed = processed.replace(/\\left\s*\(/g, '(').replace(/\\right\s*\)/g, ')');
    processed = processed.replace(/\\left\s*\[/g, '[').replace(/\\right\s*\]/g, ']');
    processed = processed.replace(/\\left\s*\\{/g, '{').replace(/\\right\s*\\}/g, '}');
    processed = processed.replace(/\\left\s*\|/g, '|').replace(/\\right\s*\|/g, '|');
    processed = processed.replace(/\\text\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\\mathrm\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\\mathbf\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\^([^{}\s]+)/g, '⁽$1⁾');
    processed = processed.replace(/\_\{([^}]*)\}/g, '₍$1₎');
    processed = processed.replace(/\_([^{}\s]+)/g, '₍$1₎');
    processed = processed.replace(/\^\{([^}]*)\}/g, '⁽$1⁾');
    processed = processed.replace(/\\[a-zA-Z]+/g, '');
    processed = processed.replace(/\\/g, '');
    return processed.trim();
  });
  
  // 处理 \[...\] 格式
  result = result.replace(/\\\[([^\]]+)\\\]/g, (match, formula) => {
    let processed = formula;
    Object.keys(latexSymbols).forEach(key => {
      processed = processed.split(key).join(latexSymbols[key]);
    });
    processed = processed.replace(/\\text\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\^\{([^}]*)\}/g, '⁽$1⁾');
    processed = processed.replace(/\_\{([^}]*)\}/g, '₍$1₎');
    processed = processed.replace(/\\[a-zA-Z]+/g, '');
    processed = processed.replace(/\\/g, '');
    return '\n【公式】' + processed.trim() + '【/公式】\n';
  });
  
  // 处理 \(...\) 格式
  result = result.replace(/\\\(([^)]+)\\\)/g, (match, formula) => {
    let processed = formula;
    Object.keys(latexSymbols).forEach(key => {
      processed = processed.split(key).join(latexSymbols[key]);
    });
    processed = processed.replace(/\\text\s*\{([^}]*)\}/g, '$1');
    processed = processed.replace(/\^\{([^}]*)\}/g, '⁽$1⁾');
    processed = processed.replace(/\_\{([^}]*)\}/g, '₍$1₎');
    processed = processed.replace(/\\[a-zA-Z]+/g, '');
    processed = processed.replace(/\\/g, '');
    return processed.trim();
  });
  
  return result;
}

// AI批改页面渲染函数
function renderCorrectionPage(correctionState, setCorrectionState, handleImageUpload, handleCorrection, resetCorrectionState) {
  const { 
    image, 
    isUploading, 
    uploadError, 
    isCorrecting, 
    correctionResults, 
    correctionError 
  } = correctionState;

  return React.createElement('section', { className: 'ai-chat' }, [
    React.createElement('div', { className: 'ai-chat-container' }, [
      React.createElement('div', { className: 'ai-chat-header' }, 'AI批改'),
      
      // 图片上传区域
      !image ? (
        React.createElement('div', { style: { padding: '1.75rem' } }, [
          // 错误提示
          uploadError && React.createElement('div', {
            style: {
              color: '#f44336',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid #f44336',
              borderRadius: 'var(--border-radius)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }
          }, uploadError),
          
          // 上传提示
          React.createElement('div', {
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 'var(--border-radius)',
              padding: '3rem',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }
          }, [
            React.createElement('div', {
              style: {
                fontSize: '4rem',
                marginBottom: '1.5rem'
              }
            }, '📷'),
            React.createElement('h3', {
              style: {
                color: 'var(--text-color)',
                marginBottom: '1rem'
              }
            }, '上传图片'),
            React.createElement('p', {
              style: {
                color: 'var(--text-secondary-color)',
                marginBottom: '2rem'
              }
            }, '请上传作业或试卷的图片，AI将自动识别并批改'),
            
            // 上传按钮
            React.createElement('div', {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
              }
            }, [
              React.createElement('label', {
                style: {
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                },
                htmlFor: 'image-upload'
              }, '选择图片'),
              React.createElement('input', {
                type: 'file',
                id: 'image-upload',
                accept: 'image/*',
                capture: 'camera',
                onChange: handleImageUpload,
                style: {
                  display: 'none'
                }
              }),
              React.createElement('p', {
                style: {
                  color: 'var(--text-secondary-color)',
                  fontSize: '0.9rem'
                }
              }, '支持 JPG、PNG 格式，最大 10MB')
            ])
          ])
        ])
      ) : (
        // 处理中或结果展示区域
        React.createElement('div', { style: { padding: '1.75rem' } }, [
          // 上传的图片预览
          React.createElement('div', {
            style: {
              textAlign: 'center',
              marginBottom: '1.5rem'
            }
          }, [
            React.createElement('img', {
              src: image,
              alt: '上传的图片',
              style: {
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: 'var(--border-radius)',
                boxShadow: 'var(--shadow-md)'
              }
            })
          ]),
          

          
          // 批改中
          isCorrecting && React.createElement('div', {
            style: {
              backgroundColor: 'rgba(0, 120, 212, 0.1)',
              border: '1px solid var(--primary-color)',
              borderRadius: 'var(--border-radius)',
              padding: '1.5rem',
              marginBottom: '1.5rem'
            }
          }, [
            React.createElement('div', { className: 'loading' }, [
              '正在进行AI批改',
              React.createElement('div', { className: 'loading-dots' }, [
                React.createElement('div', { className: 'loading-dot' }),
                React.createElement('div', { className: 'loading-dot' }),
                React.createElement('div', { className: 'loading-dot' })
              ])
            ]),
            React.createElement('p', {
              style: {
                color: 'var(--text-secondary-color)',
                marginTop: '1rem'
              }
            }, 'AI正在分析题目，请耐心等待...')
          ]),
          
          // 批改错误
          correctionError && React.createElement('div', {
            style: {
              color: '#f44336',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid #f44336',
              borderRadius: 'var(--border-radius)',
              padding: '1rem',
              marginBottom: '1.5rem'
            }
          }, correctionError),
          
          // 批改结果
          correctionResults.length > 0 && React.createElement('div', {
            style: {
              marginBottom: '1.5rem'
            }
          }, [
            React.createElement('h3', {
              style: {
                color: 'var(--text-color)',
                marginBottom: '1.5rem'
              }
            }, '批改结果'),
            ...correctionResults.map((result, index) => (
              React.createElement('div', {
                key: index,
                style: {
                  backgroundColor: result.isFullScore ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 165, 0, 0.1)',
                  border: `1px solid ${result.isFullScore ? '#4CAF50' : '#ffa500'}`,
                  borderRadius: 'var(--border-radius)',
                  padding: '1.5rem',
                  marginBottom: '1rem'
                }
              }, [
                React.createElement('h4', {
                  style: {
                    color: result.isFullScore ? '#4CAF50' : '#ffa500',
                    marginBottom: '0.75rem'
                  }
                }, `题目 ${result.questionId}: ${result.isFullScore ? '满分' : '不满分'}`),
                React.createElement('div', {
                  style: {
                    color: 'var(--text-color)',
                    marginBottom: '1rem',
                    fontSize: '0.95rem',
                    whiteSpace: 'pre-wrap'
                  }
                }, renderLatexToReadable(result.questionContent)),
                result.explanation && React.createElement('div', {
                  style: {
                    color: 'var(--text-secondary-color)',
                    fontSize: '0.9rem',
                    backgroundColor: result.isFullScore ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 165, 0, 0.1)',
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    borderLeft: `4px solid ${result.isFullScore ? '#4CAF50' : '#ffa500'}`,
                    whiteSpace: 'pre-wrap'
                  }
                }, [
                  React.createElement('strong', null, result.isFullScore ? '批改结果：' : '错误解释：'),
                  React.createElement('br'),
                  renderLatexToReadable(result.explanation)
                ])
              ])
            )),
            
            // 重新批改按钮
            React.createElement('button', {
              onClick: resetCorrectionState,
              style: {
                width: '100%',
                padding: '0.875rem',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--border-radius)',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                marginTop: '1.5rem'
              }
            }, '重新批改')
          ])
        ])
      )
    ])
  ]);
}
