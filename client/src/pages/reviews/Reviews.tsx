import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import ReviewItem from './items/ReviewItem';

import styles from './Reviews.module.scss';

function Reviews() {
  useEffect(() => {
    // document.title = 'Отзывы';
  }, []);
  return (
    <>
      <Helmet>
        <title>Отзывы о страйкбольной лавки Sunrise</title>
        <meta
          name="description"
          content="Страйкбольная лавка «SunRise» – это магазин страйкбольного оружия и экипировки. Мы осуществляем продажу страйкбольного оружия, комплектующих, расходников и снаряжения."
        />
        <meta name="keywords" content="Sunrise, Санрайз,Страйкбол, Airsoft отзывы" />
      </Helmet>
      <div className={styles.container}>
        <ReviewItem />
      </div>
    </>
  );
}

export default Reviews;
