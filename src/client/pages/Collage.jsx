import React, { useState, useRef } from 'react';
import CollageGrid from '../components/CollageGrid';
import AnalysisCard from '../components/AnalysisCard';
import '../styles/Collage.css';
import Indicator from '../components/Indicator';
import html2canvas from 'html2canvas';

const Collage = () => {
  const [page, setPage] = useState(0);
  const totalPages = 2;
  const touchStartX = useRef(null);

  const handleSave = () => {
    const collageElement = document.querySelector('.collage-grid');

    html2canvas(collageElement).then(canvas => {
      const link = document.createElement('a');
      link.download = 'tripon_collage.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const handleShare = async () => {
    const canvas = await html2canvas(document.querySelector('.collage-grid'));
    canvas.toBlob(async (blob) => {
      const file = new File([blob], 'tripon.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'TRIP:ON 여행 네컷',
          text: '여행 네컷을 확인해보세요요',
        });
      } else {
        alert('공유를 지원하지 않는 브라우저입니다.');
      }
    });
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    if (diff > 50 && page < totalPages - 1) setPage(page + 1);
    if (diff < -50 && page > 0) setPage(page - 1);
  };

  return (
    <div 
      className="collage-container" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src="/asset/logo.png" alt="logo" className="logo" />

      <div className="collage-wrapper">
        {page === 0 ? <CollageGrid page={page} /> : <AnalysisCard />}
        <Indicator total={totalPages} current={page} onClick={setPage} />
      </div>

      <div className="collage-controls">
        <button onClick={handleSave}>
          <img src="/asset/download.png" alt="download" className='download' />
        </button>
        <button onClick={handleShare}>
          <img src="/asset/kakao.png" alt="kakao" className='kakao' />
        </button>
        <button onClick={handleShare}>
          <img src="/asset/instagram.png" alt="instagram" className='instagram' />
        </button>
      </div>
    </div>
  );
};

export default Collage;
