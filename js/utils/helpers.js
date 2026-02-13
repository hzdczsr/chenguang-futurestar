// 解析题目函数
const parseQuestions = (content) => {
  const questions = [];
  const questionMatches = content.match(/题目\d+：[\s\S]*?(?=题目\d+：|$)/g);

  if (questionMatches) {
    questionMatches.forEach((match, index) => {
      // 提取题目内容
      const contentMatch = match.match(/内容：([\s\S]*?)(?=选项：|答案：|$)/);
      const questionContent = contentMatch ? contentMatch[1].trim() : '';

      // 提取选项
      const optionsMatch = match.match(/选项：([\s\S]*?)(?=答案：|$)/);
      let options = [];
      if (optionsMatch) {
        // 改进选项解析逻辑
        const optionsText = optionsMatch[1].trim();
        // 匹配每个选项，格式如：A. 选项内容
        const optionMatches = optionsText.match(/[A-D]\.\s*([^A-D]+)/g);
        if (optionMatches) {
          options = optionMatches.map(opt => opt.replace(/^[A-D]\.\s*/, '').trim());
        } else {
          // 如果解析失败，尝试简单分割
          options = optionsText.split(/\s*[A-D]\.\s*/).filter(opt => opt);
        }
      }

      // 提取答案
      const answerMatch = match.match(/答案：(.*?)(?=\n|$)/);
      const correctAnswer = answerMatch ? answerMatch[1].trim() : '';

      if (questionContent && correctAnswer) {
        questions.push({
          id: index + 1,
          content: questionContent,
          options: options.length > 0 ? options : null,
          correctAnswer: correctAnswer
        });
      }
    });
  }

  return questions;
};

// 解析OCR结果为题目列表
const parseOCRToQuestions = (ocrText) => {
  // 简单的题目解析逻辑，实际应用中可能需要更复杂的解析
  const lines = ocrText.split('\n').filter(line => line.trim());
  const questions = [];
  let currentQuestion = null;
  
  lines.forEach(line => {
    if (line.match(/^\d+\.|^题目\d+/)) {
      // 新题目开始
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        id: questions.length + 1,
        content: line.trim(),
        options: [],
        userAnswer: '',
        correctAnswer: ''
      };
    } else if (currentQuestion && line.match(/^[A-D]\./)) {
      // 选项
      currentQuestion.options.push(line.trim());
    } else if (currentQuestion) {
      // 题目内容或答案
      currentQuestion.content += ' ' + line.trim();
    }
  });
  
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  return questions;
};

// 从base64 URL中提取数据部分
const extractBase64Data = (base64Url) => {
  return base64Url.split(',')[1];
};

// 解析批改结果
const parseCorrectionResult = (correctionResult) => {
  const isFullScore = correctionResult.includes('满分') || correctionResult.includes('正确');
  const explanation = isFullScore ? '' : correctionResult;
  
  return {
    isFullScore,
    explanation
  };
};

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// 生成唯一ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// 验证邮箱格式
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// 验证手机号格式
const validatePhone = (phone) => {
  const re = /^1[3-9]\d{9}$/;
  return re.test(phone);
};

// 截断文本
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// 防抖函数
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// 节流函数
const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
