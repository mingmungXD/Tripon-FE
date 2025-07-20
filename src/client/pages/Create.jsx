import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateCollage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageCount = location.state?.imageCount;
  const firstImageFile = location.state?.firstImageFile;

  const firstPreview = firstImageFile ? URL.createObjectURL(firstImageFile) : null;
  const [files, setFiles] = useState(firstImageFile ? [firstImageFile] : []);
  const [previews, setPreviews] = useState(firstPreview ? [firstPreview] : []);

  const handleAddImage = (e) => {
    const selected = Array.from(e.target.files);
    const total = files.length + selected.length;

    if (total > imageCount) {
      alert(`최대 ${imageCount}장까지 업로드할 수 있습니다.`);
      return;
    }

    setFiles((prev) => [...prev, ...selected]);
    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleCreateCollage = () => {
    if (files.length !== imageCount) {
      alert(`${imageCount}장의 이미지를 모두 선택해주세요.`);
      return;
    }

    navigate('/loading', { state: { files } });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🖼️ 이미지 선택 ({files.length}/{imageCount})</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddImage}
        disabled={files.length >= imageCount}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem', gap: '1rem' }}>
        {previews.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`preview-${index}`}
            width={150}
            height={150}
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        ))}
      </div>
      <button
        onClick={handleCreateCollage}
        disabled={files.length !== imageCount}
        style={{ marginTop: '1.5rem' }}
      >
        여행 네컷 만들기
      </button>
    </div>
  );
};

export default CreateCollage;