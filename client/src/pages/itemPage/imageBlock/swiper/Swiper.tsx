import React from 'react';
import Slider from 'react-slick'; // Make sure to import 'react-slick'

import { CustomPrevArrow, CustomNextArrow } from './CustomArrows';
import MiniImage from '../../miniImage/MiniImage';
import styles from './Swiper.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick.scss';

interface ISwiper {
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

const Swiper: React.FC<ISwiper> = ({
  mobW,
  miniImages,
  selectedImageIndex,
  setSelectedImageIndex,
  data,
  slidesCount,
}) => {
  const mI = [
    'https://sunrise.na4u.ru/images/00246.png',
    'https://sunrise.na4u.ru/images/00246.png',
    'https://sunrise.na4u.ru/images/00246.png',
  ];

  const settings = {
    infinite: false,
    speed: 100,
    slidesToShow: slidesCount,
    slidesToScroll: 1,
    vertical: mobW ? false : true,
  };
  const { video } = data;
  return miniImages.length > 0 ? (
    <div className={mobW ? styles.swiperH : styles.swiperV}>
      <Slider
        {...settings}
        prevArrow={<CustomPrevArrow mobW={mobW} />}
        nextArrow={<CustomNextArrow mobW={mobW} />}>
        {miniImages.map((item: string, index: number) => (
          <MiniImage
            video={video === '' ? false : index === 0 ? true : false}
            key={index}
            image={item}
            isSelected={index === selectedImageIndex}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </Slider>
    </div>
  ) : (
    <></>
  );
};

export default Swiper;
