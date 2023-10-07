import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import styles from './Catalog.module.scss';
import { useAppSelector } from '../../utils/hook';

function Catalog() {
  const { categories } = useAppSelector((state) => state.categories);
  const { currentSort } = useAppSelector((state) => state.sort);

  return (
    <div className={styles.root}>
      <Helmet>
        <title>Каталог</title>
        <meta
          name="description"
          content="Страйкбольное снаряжение, вооружение, пиротехника, шары, газ, внешний тюнинг и ремонт, запчасти, магазины, лоадеры, рации и связь, акб, электроника, шевроны"
        />
        <meta
          name="keywords"
          content="Sunrise, Санрайз,Страйкбол, Airsoft, Страйкбольное снаряжение, Вооружение, Пиротехника, Шары, Газ, Внешний тюнинг и ремонт, Запчасти, Магазины, Лоадеры, Рации и связь, Акб, Электроника, Шевроны"
        />
      </Helmet>
      <div className={styles.container}>
        {categories.map((item, index) => (
          <Link key={index} to={`/catalog/${item.category_link}?sort=${currentSort}`}>
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
      </div>
    </div>
  );
}

export default Catalog;
