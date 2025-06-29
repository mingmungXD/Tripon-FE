import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageCountModal from './modal';

const LocationAnalysis = ({ analysisResult, onBack }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem',
      maxWidth: '450px',
      margin: '2px auto',
      height: '100vh',
      fontFamily: '"Noto Sans KR", sans-serif',
      backgroundColor: '#ffffff'
    },
    backButton: {
      alignSelf: 'flex-start',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      marginBottom: '1rem',
      color: '#666'
    },
    imageCard: {
      width: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '1.5rem',
      aspectRatio: '3/4',
      backgroundColor: '#000000',
      position: 'relative'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover', 
      display: 'block'
    },
    resultText: {
      textAlign: 'center',
      marginBottom: '2rem',
      width: '100%'
    },
    smallText: {
      fontSize: '1.2rem',
      color: '#666',
      marginBottom: '0.3rem'
    },
    locationText: {
      fontSize: '1.1rem',
      color: '#333',
      marginTop: '0.2rem',
      '& span': {
        color: '#40E0D0',
        fontWeight: 'bold',
        fontSize: '1.3rem'
      }
    },
    highlightText: {
      color: '#40E0D0',
      fontWeight: 'bold',
      fontSize: '1.2rem'
    },
    confidenceText: {
      fontSize: '0.8rem',
      color: '#999',
      marginTop: '0.5rem',
      fontStyle: 'italic'
    },
    primaryButton: {
      width: '100%',
      backgroundColor: '#03A9F4',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      marginBottom: '1rem',
      textAlign: 'center'
    },
    secondaryButton: {
      width: '100%',
      backgroundColor: 'white',
      color: '#666',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      textAlign: 'center'
    },
    errorContainer: {
      textAlign: 'center',
      padding: '2rem',
      color: '#666'
    }
  };

  const handleCorrect = () => {
    setShowModal(true);
  };

  const handleIncorrect = () => {
    navigate('/feedback', { state: { isCorrect: false } });
  };

  // 예외 처리: analysisResult가 없는 경우
  if (!analysisResult) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <p>분석 결과를 불러올 수 없습니다.</p>
          <button style={styles.primaryButton} onClick={onBack}>
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }

  // 예외 처리: 이미지 URL이 없는 경우
  if (!analysisResult.imageUrl) {
    return (
      <div style={styles.container}>
        <div style={styles.errorContainer}>
          <p>이미지를 불러올 수 없습니다.</p>
          <button style={styles.primaryButton} onClick={onBack}>
            다시 시도하기
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.container}>
      {showModal && <ImageCountModal onClose={() => setShowModal(false)} />}
      
      <div style={styles.imageCard}>
        <img 
          src={analysisResult.imageUrl} 
          alt="여행 사진" 
          style={styles.image}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      
      <div style={styles.resultText}>
        <p style={styles.smallText}>
          이 나라는 <span style={styles.highlightText}>{analysisResult.country}</span>입니다.
        </p>
        <p style={styles.locationText}>
          <span>{analysisResult.city}</span> 같아요!
        </p>
        {analysisResult.confidence && (
          <p style={styles.confidenceText}>
            신뢰도: {analysisResult.confidence}/10
          </p>
        )}
      </div>
      
      <button 
        style={styles.primaryButton}
        onClick={handleCorrect}
      >
        맞췄어요!!
      </button>
      
      <button 
        style={styles.secondaryButton}
        onClick={handleIncorrect}
      >
        아쉽지만 아니에요
      </button>
    </div>
  );
};

export default LocationAnalysis;