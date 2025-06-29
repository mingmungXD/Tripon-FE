import React, { useRef } from 'react';

const styles = {
  uploadButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  input: {
    display: 'none'
  }
};

const UploadButton = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      onUpload(files);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/*"
        multiple
        style={styles.input}
      />
      <button onClick={handleClick} style={styles.uploadButton}>
        사진 업로드하기
      </button>
    </div>
  );
};

export default UploadButton;
