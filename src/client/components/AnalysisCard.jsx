// AnalysisCard.jsx

import React from 'react';
import './Analysiscard.css';

function AnalysisCard({ title, description }) {
  return (
    <div className="result-card">
      <div className="result-heading">✨당신의 여행 사진 속엔 어떤 성격이 숨어있을까요?</div>
      <div className="result-description">너는 남들과 섞이되 같아지지 않으려는 성향이 강하다. 무심한 듯 연출하고, 자연스러운 듯 계산된 너의 모습은 복잡하고도 매력적이다. 네 삶은 일상의 틀을 살짝 비틀어 자신만의 색을 입히는 방식으로 구성돼 있다. 겉으론 조용하지만, 안에는 하고 싶은 말과 보여주고 싶은 자신이 넘쳐나는 그런 사람. 딱 잘라 말해, 의식적인 무심함의 화신이다.</div>
      <div className="result-title">{title}</div>
    </div>
  );
}

export default AnalysisCard;
