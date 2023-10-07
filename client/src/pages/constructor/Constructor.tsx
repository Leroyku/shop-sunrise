import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './Constructor.module.scss';

const Constructor = () => {
  return (
    <div className={styles.root}>
      <Helmet>
        <title>Конструктор шевронов</title>
        <meta
          name="description"
          content="Страйкбольная лавка «SunRise» – это магазин страйкбольного оружия и экипировки. Мы осуществляем продажу страйкбольного оружия, комплектующих, расходников и снаряжения."
        />
        <meta name="keywords" content="Sunrise, Санрайз,Страйкбол, Airsoft, шеврон, шевроны" />
      </Helmet>
      Скоро здесь что-то будет 😉
    </div>
  );
};

export default Constructor;
