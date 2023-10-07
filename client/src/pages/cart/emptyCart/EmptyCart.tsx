import React from 'react';
import { Helmet } from 'react-helmet';

import emptyCart from '../../../assets/img/cart/cart-is-empty.svg';
import styles from './EmptyCart.module.scss';

const EmptyCart = () => {
  return (
    <div className={styles.root}>
      <Helmet>
        <title>Корзина страйкбольной лавки SunRise</title>
        <meta
          name="description"
          content="Страйкбольная лавка «SunRise» – это магазин страйкбольного оружия и экипировки. Мы осуществляем продажу страйкбольного оружия, комплектующих, расходников и снаряжения."
        />
        <meta name="keywords" content="Sunrise, Санрайз,Страйкбол, Airsoft" />
      </Helmet>
      <h2>Корзина пустая 😥</h2>
      <h4>
        Вероятней всего, Вы не добавили ни одного товара.
        <br />
        Для того, чтобы заказать нашу продукцию, перейдите на главную страницу или выберите товары
        из каталога.
      </h4>
      <img className={styles.img} src={emptyCart} alt="emptyCart" />
    </div>
  );
};

export default EmptyCart;
