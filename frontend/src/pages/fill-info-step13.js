import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

const HomePage = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState('');

  const images = [
    '/img/result-1.jpg',
    '/img/result-2.png',
    '/img/result-3.png',
    '/img/result-4.png'
  ];

  return (
    <div>
      <Navbar />
      <div className="secondNavbar">
        {/* 保留路由跳转按钮逻辑 */}
      </div>
      <div className='background'>
        <div className="form-container">
          {/* 表单和其他内容 */}
          <div className="template-container">
            {images.map((image, index) => (
              <div key={index} className="image-container" onClick={() => setSelectedImage(image)}>
                <img
                  src={image}
                  alt={`Result ${index + 1}`}
                  className={`image ${selectedImage === image ? 'selected' : ''}`}
                />
              </div>
            ))}
          </div>
          {/* 其他表单内容 */}
        </div>
        <div className='tip-info'>
          <div className="form-heading">
            <h2>预览</h2>
          </div>
          <div className="tip-context">
            {selectedImage && <img src={selectedImage} alt="Preview" />}
          </div>
        </div>
      </div>
      {/* 样式略 */}
    </div>
  );
};

export default HomePage;
