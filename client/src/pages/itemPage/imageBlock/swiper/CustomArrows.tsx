import React from 'react';

interface CustomArrowProps {
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  currentSlide?: number;
  slideCount?: number;
  mobW: boolean;
}

const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick, currentSlide, mobW }) => {
  const isBeginning = currentSlide === 0;
  return (
    <div
      className={`custom-arrow custom-prev-arrow ${isBeginning ? 'hidden' : ''}`}
      onClick={onClick}>
      {mobW ? '◀' : '\u25B2'}
    </div>
  );
};

const CustomNextArrow: React.FC<CustomArrowProps> = ({
  onClick,
  currentSlide,
  slideCount,
  mobW,
}) => {
  const isEnd = currentSlide === (slideCount as number) - 4; //
  return (
    <div className={`custom-arrow custom-next-arrow ${isEnd ? 'hidden' : ''}`} onClick={onClick}>
      {mobW ? '▶' : '\u25BC'}
    </div>
  );
};

export { CustomPrevArrow, CustomNextArrow };
