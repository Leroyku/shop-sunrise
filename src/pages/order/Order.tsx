import React from 'react';
import { useEffect } from 'react';

import order from '../../assets/img/orders/done.svg';
import styles from './Order.module.scss';

const Order = () => {
  useEffect(() => {
    document.title = 'Заказ';
  }, []);
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <h1>Спасибо за заказ!</h1>
        <h3>
          В ближайшее время наш сотрудник свяжется с Вами.
          <br />
          Это необходимо для уточнения данных и оплаты товара.
          <br />
          Спасибо за понимание!
        </h3>
      </div>
      <img className={styles.img} src={order} alt="order" />
    </div>
  );
};

export default Order;
