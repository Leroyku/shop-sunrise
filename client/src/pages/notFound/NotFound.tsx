import React from 'react';
import { useEffect } from 'react';

import emptyPage from '../../assets/img/notfound/cbl.svg';
import styles from './notFound.module.scss';

function NotFound() {
  useEffect(() => {
    document.title = 'Страница не найдена';
  }, []);
  return (
    <div className={styles.root}>
      <h2>Ничего не найдено 😥</h2>
      <h4>
        У нас нет такой страницы на сайте.
        <br />
        Для того, чтобы заказать нашу продукцию, перейдите на главную страницу или выберите товары
        из каталога.
      </h4>
      <img className={styles.img} src={emptyPage} alt="emptyPage" />
    </div>
  );
}

export default NotFound;
