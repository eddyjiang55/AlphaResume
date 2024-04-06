import React from 'react';
import './SimpleGallery.module.css'; // 确保你有这个CSS文件

function SimpleGallery() {
  return (
    <div className="gallery">
      <div className="item"><img src="https://via.placeholder.com/150" alt="Placeholder" /></div>
      <div className="item"><img src="https://via.placeholder.com/150" alt="Placeholder" /></div>
      <div className="item"><img src="https://via.placeholder.com/150" alt="Placeholder" /></div>
      <div className="item"><img src="https://via.placeholder.com/150" alt="Placeholder" /></div>
    </div>
  );
}

export default SimpleGallery;
