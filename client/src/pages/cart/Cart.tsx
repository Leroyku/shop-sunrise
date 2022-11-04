import React from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import styles from './Cart.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import ItemCart from './itemCart/ItemCart';
import FormCart from './formCart/FormCart';
import EmptyCart from './emptyCart/EmptyCart';

import { clearItems } from '../../redux/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const [done, setDone] = useState<boolean>(false);

  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems());
    }
  };

  useEffect(() => {
    document.title = 'Корзина';
    setDone(false);
    window.scroll({
      left: 0,
      top: 0,
    });
  }, []);

  if (done) {
    return <Navigate to="/order" />;
  }

  if (!totalPrice) {
    return <EmptyCart />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.up}>
          <div className={styles.title}>
            <FontAwesomeIcon icon={faShoppingCart} /> Корзина
          </div>
          <div onClick={onClickClear} className={styles.deleteAll}>
            <FontAwesomeIcon icon={faTrashCan} /> Очистить корзину
          </div>
        </div>
        {items.map((item) => (
          <ItemCart key={item.id} {...item} />
        ))}
        <p className={styles.bottom}>Общая сумма: {totalPrice} ₽</p>
      </div>
      <div className={styles.right}>
        <FormCart setDone={setDone} />
      </div>
    </div>
  );
};

export default Cart;
