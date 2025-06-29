import React from 'react';
import '../styles/Indicator.css';

const Indicator = ({ total = 2, current = 0, onClick = () => {} }) => {
  return (
    <div className="indicator-container">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`indicator-dot ${index === current ? 'active' : ''}`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
};

export default Indicator;