import React from 'react';
import { FaPlay } from 'react-icons/fa'; // Импортируйте иконку пуска или другую иконку по вашему выбору

import styles from './MiniImage.module.scss';

interface IMiniImage {
  image: string;
  isSelected: boolean;
  onClick: () => void;
  video: boolean;
}

const MiniImage: React.FC<IMiniImage> = ({ image, isSelected, onClick, video }) => {
  return (
    <div className={isSelected ? styles.selected : styles.imageWrapper} onClick={onClick}>
      <div className={styles.container}>
        {video ? (
          <div className={styles.playIcon}>
            <FaPlay />
          </div>
        ) : (
          <img className={styles.img} src={image} alt="" />
        )}
      </div>
    </div>
  );
};

export default MiniImage;
