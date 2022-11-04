import React from 'react';
import { useAppDispatch } from '../../../utils/hook';

import styles from './itemCart.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleMinus, faCirclePlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { addItem, minusItem, removeItem } from '../../../redux/slices/cartSlice';

import { CartItem } from '../../../redux/slices/cartSlice';

const ItemCart: React.FC<CartItem> = ({ id, name, price, count, image }) => {
  const dispatch = useAppDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };
  const onClickMinus = () => {
    dispatch(minusItem(id));
  };
  const onClickRemove = () => {
    if (window.confirm('Удалить товар?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img className={styles.img} src={image} alt={`${id}`} />
      </div>
      <div className={styles.itemTitle}>
        <p>{name}</p>
      </div>
      <div className={styles.math}>
        <FontAwesomeIcon onClick={onClickMinus} className={styles.decrease} icon={faCircleMinus} />
        <p>{count}</p>
        <FontAwesomeIcon onClick={onClickPlus} className={styles.increase} icon={faCirclePlus} />
      </div>
      <div className={styles.price}>
        <p>{price} ₽</p>
      </div>
      <div className={styles.delete}>
        <FontAwesomeIcon onClick={onClickRemove} className={styles.xmark} icon={faCircleXmark} />
      </div>
    </div>
  );
};

export default ItemCart;
