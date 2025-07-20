import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import CollageGrid from '../components/CollageGrid';
import '../styles/Loading.css';

const Loading = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const airplaneRef = useRef(null);
  const pathRef = useRef(null);
  const files = location.state?.files;

  const [imagePreviews, setImagePreviews] = useState([]);

  // 🔹 1. 안전하게 blob URL 만들기
  useEffect(() => {
    if (files?.length) {
      const urls = files.map(file => URL.createObjectURL(file));
      setImagePreviews(urls);

      return () => {
        urls.forEach(url => URL.revokeObjectURL(url)); // cleanup
      };
    }
  }, [files]);

  // 🔹 2. 이미지 로딩 감지 후 캡처 및 S3 업로드
  useEffect(() => {
    const generateCollage = async () => {
      if (!imagePreviews.length) return;

      const waitForImagesToLoad = () => {
        const imgs = document.querySelectorAll('.collage-grid img');
        return Promise.all(
          Array.from(imgs).map(
            img =>
              new Promise(resolve => {
                if (img.complete) resolve();
                else {
                  img.onload = resolve;
                  img.onerror = () => {
                    console.warn('⚠️ 이미지 로딩 실패:', img.src);
                    resolve();
                  };
                }
              })
          )
        );
      };

      await new Promise(res => requestAnimationFrame(res));
      await waitForImagesToLoad();

      const collageElement = document.querySelector('.collage-grid');
      if (!collageElement) {
        console.error('❌ .collage-grid not found');
        return;
      }

      const canvas = await html2canvas(collageElement);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const filename = `collage-${Date.now()}.png`;

      try {
        const presignRes = await fetch(
          `${process.env.REACT_APP_API_URL}/api/presign?filename=${filename}`
        );
        const { url } = await presignRes.json();

        await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'image/png' },
          body: blob,
        });

        const collageUrl = url.split('?')[0];
        navigate('/collage', { state: { collageImages: [collageUrl] } });
      } catch (err) {
        console.error('콜라주 업로드 실패:', err);
        alert('콜라주 업로드 중 오류가 발생했습니다.');
      }
    };

    generateCollage();
  }, [imagePreviews, navigate]);

  // 🔹 3. 비행기 애니메이션
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

      path.animate([{ width: '0' }, { width: '450px' }], {
        duration: 3000,
        fill: 'forwards',
        easing: 'ease-in-out',
      });
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
        <div ref={pathRef} className="airplane-path" />
      </div>
      <h2 className="logo-text">TRIP:ON</h2>
      <div className="loading-text">여행 네컷을 생성중입니다.</div>

      {/* 👀 숨기지 말고 이미지 잘 뜨는지 확인하고 싶으면 zIndex 주고 보여도 됨 */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <CollageGrid images={imagePreviews} />
      </div>
    </div>
  );
};

export default Loading;
