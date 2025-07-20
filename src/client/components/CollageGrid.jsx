import React from 'react';
import '../styles/CollageGrid.css';

const CollageGrid = ({ images = [] }) => {
  const isSingleCollageImage = images.length === 1;
  const isEight = images.length > 4;

  if (isSingleCollageImage) {
    return (
      <div className="collage-single">
        <img
          src={images[0]}
          alt="collage"
          className="collage-full-image"
          onLoad={() => console.log('✅ collage image loaded:', images[0])}
          onError={(e) => {
            console.error('❌ collage image failed to load:', e.target.src);
            e.target.style.border = '3px solid red';
          }}
        />
      </div>
    );
  }

  return (
    <div className={`collage-grid ${isEight ? 'grid-8' : 'grid-4'}`}>
      {images.map((src, index) => (
        <div key={index} className="collage-cell">
          <img
            src={src}
            alt={`uploaded-${index}`}
            className="collage-image"
            onLoad={() => console.log(`✅ image ${index} loaded: ${src}`)}
            onError={(e) => {
              console.error(`❌ image ${index} failed to load`, e.target.src);
              e.target.style.border = '3px solid red';
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CollageGrid;