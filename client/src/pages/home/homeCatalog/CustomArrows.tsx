import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import styles from './CustomArrows.module.scss';

interface CustomArrowProps {
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  currentSlide?: number;
  slideCount?: number;
  sizeCount?: number;
}

const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <IoIosArrowBack className={`${styles.customPrevArrow}`} size={40} />
    </div>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <IoIosArrowForward className={`${styles.customNextArrow}`} size={40} />
    </div>
  );
};

export { CustomPrevArrow, CustomNextArrow };
