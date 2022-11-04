import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Catalog.module.scss';
import { useAppSelector } from '../../utils/hook';

function Catalog() {
  const { categories } = useAppSelector((state) => state.categoryFull);

  useEffect(() => {
    document.title = 'Каталог';
  }, []);

  return (
    <div className={styles.root}>
      {categories.map((item, index) => (
        <Link key={index} to={`/catalog${item.href}`}>
          <div className={styles.item}>
            <div className={styles.image}>
              <img className={styles.img} src={item.images} alt={item.href} />
            </div>
            <div className={styles.bottom}>
              <h2>{item.value}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Catalog;
