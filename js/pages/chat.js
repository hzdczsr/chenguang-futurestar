// AI对话页面渲染函数
const renderChatPage = (messages, inputValue, isLoading, setInputValue, handleSendMessage, handleKeyPress, messagesEndRef) => {
  return React.createElement('section', { className: 'ai-chat', id: 'ai-chat' }, [
    React.createElement('div', { className: 'ai-chat-container' }, [
      React.createElement('div', { className: 'ai-chat-header' }, 'AI智能对话'),
      React.createElement('div', { className: 'ai-chat-messages' }, [
        messages.length === 0 ? (
          React.createElement('div', { className: 'message ai' }, '你好！我是辰光未来星的AI助手，有什么可以帮助你的吗？')
        ) : (
          messages.map(message => (
            React.createElement('div', { key: message.id, className: `message ${message.role}` }, message.content)
          ))
        ),
        isLoading && (
          React.createElement('div', { className: 'message ai' }, [
            React.createElement('div', { className: 'loading' }, [
              'AI正在思考',
              React.createElement('div', { className: 'loading-dots' }, [
                React.createElement('div', { className: 'loading-dot' }),
                React.createElement('div', { className: 'loading-dot' }),
                React.createElement('div', { className: 'loading-dot' })
              ])
            ])
          ])
        ),
        // 用于滚动到最新消息的元素
        React.createElement('div', { ref: (el) => { if (el) el.scrollIntoView({ behavior: 'smooth' }); } })
      ]),
      React.createElement('div', { className: 'ai-chat-input' }, [
        React.createElement('input', {
          type: 'text',
          value: inputValue,
          onChange: (e) => setInputValue(e.target.value),
          onKeyPress: handleKeyPress,
          placeholder: '输入你的问题...',
          disabled: isLoading
        }),
        React.createElement('button', {
          onClick: handleSendMessage,
          disabled: isLoading
        }, '发送')
      ])
    ])
  ]);
};
