import React from 'react';

import emptyCart from '../../../assets/img/cart/cart-is-empty.svg';
import styles from './EmptyCart.module.scss';

const EmptyCart = () => {
  return (
    <div className={styles.root}>
      <h2>Козина пустая 😥</h2>
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
