import React from 'react';
import { useEffect } from 'react';

import ReviewItem from './items/ReviewItem';

import styles from './Reviews.module.scss';

function Reviews() {
  useEffect(() => {
    document.title = 'Отзывы';
  }, []);
  return (
    <div className={styles.container}>
      <ReviewItem />
    </div>
  );
}

export default Reviews;
