import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Loading.css';

const Loading = () => {
  const navigate = useNavigate();
  const airplaneRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/collage');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  useEffect(() => {
    const airplane = airplaneRef.current;
    const path = pathRef.current;

    if (airplane && path) {
      airplane.animate(
        [
          { transform: 'translate(0, 0)' },
          { transform: 'translate(150px, -30px)' },
          { transform: 'translate(300px, 10px)' },
          { transform: 'translate(450px, -20px)' },
        ],
        {
          duration: 3000,
          fill: 'forwards',
          easing: 'ease-in-out',
        }
      );

      path.animate(
        [
          { width: '0' },
          { width: '450px' },
        ],
        {
          duration: 3000,
          fill: 'forwards',
          easing: 'ease-in-out',
        }
      );
    }
  }, []);

  return (
    <div className="loading-container">
      <div className="airplane-wrapper">
        <img
          src="/asset/Airplane_icon.png"
          alt="airplane"
          ref={airplaneRef}
          className="airplane-icon"
        />
        <div
          ref={pathRef}
          className="airplane-path"
        ></div>
      </div>
      <h2 className="logo-text">TRIP:ON</h2>
      <div className="loading-text">여행 네컷을 생성중입니다.</div>
    </div>
  );
};

export default Loading;