import React, { useCallback, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ImagesZoom from './ImagesZoom';
import { backUrl } from '../config/config';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  console.log('images 입니당 : ', images);

  if (images.length === 1) {
    return (
      <>
        <img role='presentation' src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} style={{ border: '1px solid #f0f0f0' }} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <div style={{ border: '1px solid #f0f0f0' }}>
        <img role='presentation' style={{ width: '50%' }} src={`${backUrl}/${images[1].src}`} alt={images[1].src} onClick={onZoom} />
        <img role='presentation' style={{ width: '50%' }} src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  if (images.length === 0) {
    return (
      <>
        <div />
        <div />
      </>
    );
  }
  return (
    <div style={{ border: '1px solid #f0f0f0' }}>
      <div>
        <img role='presentation' style={{ width: '50%' }} src={`${backUrl}/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        <div role='presentation' style={{ display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle' }} onClick={onZoom}>
          <PlusOutlined />
          <br />
          {images.length - 1} 개의 사진 더보기
        </div>
      </div>
      <div>{showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}</div>
    </div>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
};

PostImages.defaultProps = {
  images: [],
};

export default PostImages;
