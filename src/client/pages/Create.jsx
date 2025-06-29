import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CreateCollage = () => {
  const location = useLocation();
  const imageCount = location.state?.imageCount;

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleAddImage = (e) => {
    const selected = Array.from(e.target.files);
    const total = files.length + selected.length;

    if (total > imageCount) {
      alert(`최대 ${imageCount}장까지 업로드할 수 있습니다.`);
      return;
    }

    setFiles(prev => [...prev, ...selected]);

    const newPreviews = selected.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const getPresignedUrl = async (filename) => {
    const res = await fetch(
      `http://localhost:3001/api/presign?filename=${encodeURIComponent(filename)}`
    );
    const data = await res.json();
    return data.url;
  };

  const uploadToS3 = async (file) => {
    const url = await getPresignedUrl(file.name);
    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file
    });
    return url.split('?')[0];
  };

  const createCollage = async () => {
    if (files.length === 0) {
      alert("업로드할 이미지가 없습니다.");
      return;
    }

    setIsUploading(true);
    try {
      const uploadedUrls = await Promise.all(
        files.map(file => uploadToS3(file))
      );
      console.log("✅ 업로드된 이미지 URL:", uploadedUrls);
      alert("모든 이미지 업로드 완료!");
    } catch (err) {
      console.error("❌ 업로드 실패:", err);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🖼️ 이미지 업로드 ({files.length}/{imageCount})</h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleAddImage}
        disabled={files.length >= imageCount}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '1rem', gap: '1rem' }}>
        {previews.map((url, index) => (
          <img key={index} src={url} alt="preview" width={150} height={150} style={{ objectFit: 'cover', borderRadius: '8px' }} />
        ))}
      </div>
      <button
        onClick={createCollage}
        disabled={isUploading || files.length === 0}
        style={{ marginTop: '1.5rem' }}
      >
        {isUploading ? "업로드 중..." : "업로드하기"}
      </button>
    </div>
  );
};

export default CreateCollage;