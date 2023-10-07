import React from 'react';

import Video from '../video/Video';
import Swiper from './swiper/Swiper';

import styles from './ImageBlock.module.scss';

interface IImageBlock {
  mobW: boolean;
  miniImages: string[];
  slidesCount: number;
  selectedImageIndex: number;
  setSelectedImageIndex: React.Dispatch<React.SetStateAction<number>>;
  data: {
    category: string;
    categorylink: string;
    description: string;
    images: string[];
    name: string;
    price: number;
    product_id: string;
    stock: number;
    updated: string;
    video: string;
    [key: string]: string | number | string[];
  };
}

const ImageBlock: React.FC<IImageBlock> = ({
  mobW,
  miniImages,
  selectedImageIndex,
  setSelectedImageIndex,
  data,
  slidesCount,
}) => {
  const { video, images, price } = data;

  return (
    <>
      {!mobW && (
        <Swiper
          slidesCount={slidesCount}
          mobW={mobW}
          miniImages={miniImages}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={setSelectedImageIndex}
          data={data}
        />
      )}

      <div className={styles.image}>
        {video === '' ? (
          <img
            className={styles.img}
            src={images[video ? selectedImageIndex - 1 : selectedImageIndex]}
            alt="У меня нет фотки :("
          />
        ) : selectedImageIndex === 0 ? (
          <Video video={video} />
        ) : (
          <img
            className={styles.img}
            src={images[video ? selectedImageIndex - 1 : selectedImageIndex]}
            alt="У меня нет фотки :("
          />
        )}
      </div>

      {mobW && (
        <>
          <Swiper
            slidesCount={slidesCount}
            mobW={mobW}
            miniImages={miniImages}
            selectedImageIndex={selectedImageIndex}
            setSelectedImageIndex={setSelectedImageIndex}
            data={data}
          />

          <h2 className={styles.h2Price}>
            <span>Стоимость:</span> {price} ₽
          </h2>
        </>
      )}
    </>
  );
};

export default ImageBlock;
