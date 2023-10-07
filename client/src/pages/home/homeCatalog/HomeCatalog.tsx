import React from 'react';
import Slider from 'react-slick'; // Make sure to import 'react-slick'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../utils/hook';

import { CustomNextArrow, CustomPrevArrow } from './CustomArrows';

import styles from './HomeCatalog.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick-home.scss';
interface IHomeCatalog {
  sizeCount: number;
}
const HomeCatalog: React.FC<IHomeCatalog> = ({ sizeCount }) => {
  const { categories } = useAppSelector((state) => state.categories);
  const settings = {
    infinite: true,
    speed: 100,
    slidesToShow: sizeCount,
    slidesToScroll: sizeCount,
  };

  return (
    <div className={styles.root}>
      {categories && (
        <Slider
          {...settings}
          prevArrow={<CustomPrevArrow />}
          nextArrow={<CustomNextArrow sizeCount={sizeCount} />}>
          {categories.map((item, index) => (
            <Link
              style={{ maxWidth: '90px' }}
              key={index}
              to={`/catalog/${item.category_link}?sort=price-asc`}>
              <div className={styles.item}>
                <div className={styles.image}>
                  <img className={styles.img} src={String(item.category_photo)} alt="" />
                </div>
                <div className={styles.bottom}>
                  <p>{item.category_name}</p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default HomeCatalog;
