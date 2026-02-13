// API配置
const API_CONFIG = {
  // 智谱AI API配置
  CHAT: {
    API_KEY: '4622524be02c461ca169160d9f01669d.YlDaSBLuxodfrtvQ',
    API_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
  },
  DRAW: {
    API_KEY: '4e3c3ce38ddd41d29c13e09870cd6da8.Z85j4GcZyTseJwRl',
    API_URL: 'https://open.bigmodel.cn/api/paas/v4/images/generations'
  },
  ASSESSMENT: {
    API_KEY: '98fddaa6837f4f44b74b77833b41eeb5.v3VlXWgal9CMoGWz',
    API_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
  },
  EXPLANATION: {
    API_KEY: '51735ef366ad4902911491584419ced1.YpdtFYPuUlDO49AE',
    API_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
  },
  TUTOR: {
    API_KEY: '3104bb3761dc4d388a382384185487ce.19ZLebuxco6OVUGm',
    API_URL: 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
  },
  CORRECTION: {
    API_KEY: 'sk-lhqxeyguslqefacpoooxacftrijzrzuthxdqklonzrlaguer',
    API_URL: 'https://api.siliconflow.cn/v1/chat/completions'
  },
  BAIDU_OCR: {
    API_KEY: 'your-api-key', // 请替换为实际的API Key
    SECRET_KEY: 'your-secret-key', // 请替换为实际的Secret Key
    TOKEN_URL: 'https://aip.baidubce.com/oauth/2.0/token',
    API_URL: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic'
  }
};

// 获取百度OCR API token
const getBaiduToken = async (apiKey, secretKey) => {
  const tokenUrl = API_CONFIG.BAIDU_OCR.TOKEN_URL;
  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: apiKey,
    client_secret: secretKey
  });
  
  try {
    const response = await fetch(`${tokenUrl}?${params.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    if (!response.ok) {
      throw new Error(`获取token失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('获取百度OCR token失败:', error);
    throw error;
  }
};

// 智谱AI聊天API
const callChatAPI = async (message) => {
  const { API_KEY, API_URL } = API_CONFIG.CHAT;
  
  try {
    const requestData = {
      model: 'glm-4.7-flash',
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      thinking: {
        type: 'enabled'
      },
      max_tokens: 65536,
      temperature: 1.0
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'AI暂时无法回答，请稍后重试';
  } catch (error) {
    console.error('调用聊天API失败:', error);
    throw error;
  }
};

// 智谱AI绘画API
const callDrawAPI = async (prompt) => {
  const { API_KEY, API_URL } = API_CONFIG.DRAW;
  
  try {
    const requestData = {
      model: 'cogview-3-flash',
      prompt: prompt.trim(),
      size: '1280x1280'
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.[0]?.url || '';
  } catch (error) {
    console.error('调用绘画API失败:', error);
    throw error;
  }
};

// 智谱AI出题测评API
const callAssessmentAPI = async (grade, subject, difficulty) => {
  const { API_KEY, API_URL } = API_CONFIG.ASSESSMENT;
  
  try {
    const requestData = {
      model: 'glm-4.6v-flash',
      messages: [
        {
          role: 'user',
          content: `请为${grade}的${subject}学科生成5道${difficulty}难度的题目。每道题目需要包含题目内容、选项（如果是选择题）、正确答案。请按照以下格式返回：\n\n题目1：\n内容：...\n选项：A. ... B. ... C. ... D. ...\n答案：...\n\n题目2：\n内容：...\n选项：A. ... B. ... C. ... D. ...\n答案：...\n\n以此类推，共5道题目。`
        }
      ],
      thinking: {
        type: 'enabled'
      }
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('调用测评API失败:', error);
    throw error;
  }
};

// 智谱AI解析API
const callExplanationAPI = async (question, userAnswer, correctAnswer, options) => {
  const { API_KEY, API_URL } = API_CONFIG.EXPLANATION;
  
  try {
    const requestData = {
      model: 'glm-4.7-flash',
      messages: [
        {
          role: 'user',
          content: `题目：${question}\n选项：${options ? options.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join(' ') : '无'}\n正确答案：${correctAnswer}\n用户答案：${userAnswer}\n请详细解析这道题，说明正确答案的原因和其他选项的错误之处。`
        }
      ],
      thinking: {
        type: 'enabled'
      },
      max_tokens: 65536,
      temperature: 1.0
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('调用解析API失败:', error);
    throw error;
  }
};

// 智谱AI答疑API
const callTutorAPI = async (question) => {
  const { API_KEY, API_URL } = API_CONFIG.TUTOR;
  
  try {
    const requestData = {
      model: 'glm-4.1v-thinking-flash',
      messages: [
        {
          role: 'user',
          content: `你是一个专业的AI辅导老师，擅长解答各种学科问题。\n\n${question}`
        }
      ],
      stream: false,
      temperature: 1
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('调用答疑API失败:', error);
    throw error;
  }
};

// 百度OCR API
const callBaiduOCRAPI = async (imageBase64, token) => {
  const { API_URL } = API_CONFIG.BAIDU_OCR;
  
  try {
    const requestData = new URLSearchParams({
      image: imageBase64
    });

    const response = await fetch(`${API_URL}?access_token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestData.toString()
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error_msg || `API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('调用百度OCR API失败:', error);
    throw error;
  }
};

// SiliconFlow批改API
const callCorrectionAPI = async (question, options, userAnswer) => {
  const { API_KEY, API_URL } = API_CONFIG.CORRECTION;
  
  try {
    const requestData = {
      model: 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
      messages: [
        { role: 'system', content: '你是一个批改老师，负责批改学生的作业和试卷，只分满分和不满分，如果不满分要给出错误解释' },
        { role: 'user', content: `请批改这道题目：\n${question}\n${options.map(opt => opt).join('\n')}\n学生答案：${userAnswer || '未作答'}\n请判断是否满分，如果不满分请给出错误解释` }
      ]
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    console.error('调用批改API失败:', error);
    throw error;
  }
};
