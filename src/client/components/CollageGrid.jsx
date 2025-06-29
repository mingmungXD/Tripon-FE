import React from 'react';
import '../styles/CollageGrid.css';

const sampleImages = [
  '/asset/000.jpg',
  '/asset/001.jpg',
  '/asset/002.png',
  '/asset/003.png',
];

const CollageGrid = ({ images = sampleImages }) => {
  const imageCount = images.length;
  const isEight = imageCount > 4;

  return (
    <div className={`collage-grid ${isEight ? 'grid-8' : 'grid-4'}`}>
      {images.map((src, index) => (
        <div key={index} className="collage-cell">
          <img src={src} alt={`uploaded ${index}`} className="collage-image" />
        </div>
      ))}
    </div>
  );
};

export default CollageGrid;
