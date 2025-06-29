import React, { useState, useCallback, useMemo } from 'react';
import LocationAnalysis from './LocationAnalysis';

const API_CONFIG = {
  MODEL: "gpt-4o",
  MAX_TOKENS: 300,
  ENDPOINT: 'https://api.openai.com/v1/chat/completions'
};

const ERROR_MESSAGES = {
  API_KEY_MISSING: '현재 서비스 준비중입니다',
  API_KEY_INVALID: '현재 서비스 준비중입니다',
  API_RATE_LIMIT: '현재 서비스 준비중입니다',
  API_ERROR: '현재 서비스 준비중입니다',
  PARSE_ERROR: '현재 서비스 준비중입니다',
  INVALID_RESPONSE: '현재 서비스 준비중입니다',
  NO_FILE: '사진을 먼저 선택해주세요.'
};

const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const analyzeImageWithAPI = async (base64Image) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('API_KEY_MISSING');
  }

  const requestBody = {
    model: API_CONFIG.MODEL,
    messages: [{
      role: "user",
      content: [{
        type: "text",
        text: "이 여행 사진을 보고 촬영된 국가와 도시를 추론하고 한글로 주세요. 응답은 반드시 다음 JSON 형식으로만 해주세요. 마크다운이나 다른 형식은 사용하지 마세요: {\"country\": \"국가명\", \"city\": \"도시명\", \"confidence\": \"신뢰도(1-10)\"}"
      }, {
        type: "image_url",
        image_url: { url: base64Image }
      }]
    }],
    max_tokens: API_CONFIG.MAX_TOKENS
  };

  const response = await fetch(API_CONFIG.ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 401) throw new Error('API_KEY_INVALID');
    if (status === 429) throw new Error('API_RATE_LIMIT');
    throw new Error('API_ERROR');
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    const result = JSON.parse(content);
    if (!result.country || !result.city) {
      throw new Error('INVALID_RESPONSE');
    }
    return result;
  } catch {
    throw new Error('PARSE_ERROR');
  }
};

const Home = () => {
  const [files, setFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const styles = useMemo(() => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      maxWidth: '450px',
      margin: '0 auto',
      height: '100vh',
      fontFamily: '"Noto Sans KR", sans-serif'
    },
    titleContainer: {
      textAlign: 'center',
      marginBottom: '2rem',
      width: '100%'
    },
    titleHighlight: {
      color: '#888',
      fontSize: '1.1rem',
      marginBottom: '0.5rem'
    },
    titleQuestion: {
      color: '#333',
      fontSize: '1.5rem',
      fontWeight: '700',
      margin: '0'
    },
    uploadContainer: {
      width: '100%',
      marginBottom: '2rem'
    },
    uploadCard: {
      backgroundColor: '#8CD3E8',
      borderRadius: '12px',
      height: '30rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      cursor: files.length === 0 ? 'pointer' : 'default'
    },
    uploadPlaceholder: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    },
    plusIcon: {
      width: '5rem',
      height: '5rem',
      backgroundColor: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      color: '#8CD3E8',
      marginBottom: '1rem'
    },
    uploadText: {
      color: 'white',
      fontSize: '1rem',
      marginBottom: '0.3rem'
    },
    uploadLimit: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.9rem',
      margin: '0'
    },
    previewContainer: {
      width: '100%',
      height: '100%'
    },
    imagePreview: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    instructionContainer: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    instructionText: {
      color: '#666',
      fontSize: '1rem',
      lineHeight: '1.5'
    },
    buttonContainer: {
      display: 'flex',
      width: '100%',
      gap: '1rem'
    },
    primaryButton: {
      flex: '1',
      backgroundColor: isAnalyzing ? '#ccc' : '#039BE5',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: isAnalyzing || files.length === 0 ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s'
    },
    secondaryButton: {
      flex: '1',
      backgroundColor: 'white',
      color: '#666',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: isAnalyzing ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s'
    },
    loadingText: {
      color: '#666',
      fontSize: '0.9rem',
      textAlign: 'center',
      margin: '2rem'
    },
    errorText: {
      color: '#e53e3e',
      fontSize: '0.9rem',
      textAlign: 'center',
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#fed7d7',
      borderRadius: '8px'
    },
    serviceUnavailableText: {
      color: '#666',
      fontSize: '1rem',
      textAlign: 'center',
      marginTop: '1rem',
      padding: '1.5rem',
      backgroundColor: '#f7fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }
  }), [isAnalyzing, files.length]);

  const handleAddPhoto = useCallback(() => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.multiple = false;
    fileInput.onchange = (e) => {
      if (e.target.files.length > 0) {
        setFiles(Array.from(e.target.files));
        setAnalysisResult(null);
        setError(null);
      }
    };
    fileInput.click();
  }, []);

  const handleReset = useCallback(() => {
    setFiles([]);
    setAnalysisResult(null);
    setError(null);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (files.length === 0) {
      setError(ERROR_MESSAGES.NO_FILE);
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const compressedFile = await compressImage(files[0]);
      const base64Image = await convertToBase64(compressedFile);
      
      const result = await analyzeImageWithAPI(base64Image);
      
      setAnalysisResult({
        ...result,
        imageUrl: URL.createObjectURL(files[0])
      });
    } catch (error) {
      const errorMessage = ERROR_MESSAGES[error.message] || ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  }, [files]);

  if (analysisResult) {
    return (
      <LocationAnalysis 
        analysisResult={analysisResult}
        onBack={() => setAnalysisResult(null)}
      />
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <p style={styles.titleHighlight}>✨ 당신의 여행 사진 속엔</p>
        <p style={styles.titleQuestion}>어떤 성격이 숨어있을까요?</p>
      </div>
      
      <div style={styles.uploadContainer}>
        <div style={styles.uploadCard} onClick={files.length === 0 ? handleAddPhoto : undefined}>
          {files.length === 0 ? (
            <div style={styles.uploadPlaceholder}>
              <div style={styles.plusIcon}>+</div>
              <p style={styles.uploadText}>여행사진을 1장 선택해주세요</p>
              <p style={styles.uploadLimit}>(3:4 권장)</p>
            </div>
          ) : (
            <div style={styles.previewContainer}>
              <img 
                src={URL.createObjectURL(files[0])} 
                alt="Preview" 
                style={styles.imagePreview} 
              />
            </div>
          )}
        </div>
      </div>
      
      <div style={styles.instructionContainer}>
        <p style={styles.instructionText}>
          AI가 사진 속 장소를 추측하고,
          <br />
          당신만의 여행 캐릭터까지 분석해드려요.
        </p>
      </div>
      
      {error && (
        <div style={error === ERROR_MESSAGES.API_ERROR ? styles.serviceUnavailableText : styles.errorText}>
          {error}
        </div>
      )}
      
      {isAnalyzing && (
        <div style={styles.loadingText}>
          🤖 AI가 사진을 분석하고 있어요...
        </div>
      )}
      
      <div style={styles.buttonContainer}>
        <button 
          style={styles.secondaryButton} 
          onClick={handleReset}
          disabled={isAnalyzing}
        >
          다시 선택
        </button>
        <button 
          style={styles.primaryButton} 
          onClick={handleConfirm}
          disabled={isAnalyzing || files.length === 0}
        >
          {isAnalyzing ? '분석 중...' : '분석하기'}
        </button>
      </div>
    </div>
  );
};

export default Home;