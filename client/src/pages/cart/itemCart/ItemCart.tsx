import React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../../../utils/hook';
import { Link } from 'react-router-dom';

import styles from './itemCart.module.scss';

import CustomModal from '../modal/CustomModal';
import { addItem, minusItem, removeItem } from '../../../redux/slices/cartSlice';

import { CartItem } from '../../../redux/slices/cartSlice';

interface IItemCart {
  item: CartItem;
  index: number;
  isLastItem: boolean;
}

const ItemCart: React.FC<IItemCart> = ({ index, item, isLastItem }) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const { id, name, price, count, image, stock, category } = item;

  const onClickPlus = () => {
    dispatch(addItem({ id }));
  };
  const onClickMinus = () => {
    if (count === 1) {
      setShowModal(true);
    }
    dispatch(minusItem(id));
  };

  const onClickClear = () => {
    setShowModal(true);
  };

  const handleConfirmClear = () => {
    dispatch(removeItem(id));
    setShowModal(false);
  };

  const handleCancelClear = () => {
    setShowModal(false);
  };

  const priceHandler = () => {
    if (count > 1)
      return (
        <>
          <p>{price * count} ₽</p>
          <span>{price} за 1 шт.</span>
        </>
      );
    if (count === 1) return <div>{price} ₽</div>;
  };

  return (
    <div className={`${styles.item} ${isLastItem ? '' : styles.borderBottom}`}>
      <div className={styles.sideL}>
        <Link to={`${category}/${id}`}>
          <div className={styles.image}>
            <img className={styles.img} src={image[0]} alt={`${id}`} />
          </div>
        </Link>
        <div className={styles.itemTitle}>
          <div className={styles.itemTitleUp}>
            <Link to={`${category}/${id}`}>
              <p>{name}</p>
            </Link>
          </div>
          <div className={styles.itemTitleBottom}>
            <Link to={`${category}/${id}`}>
              <p>К товару</p>
            </Link>
            <p onClick={onClickClear}>Удалить</p>
          </div>
        </div>
      </div>
      <div className={styles.sideR}>
        <div className={styles.price}>{priceHandler()}</div>
        <div className={styles.math}>
          <div onClick={onClickMinus} className={styles.decrease}>
            -
          </div>

          <p>{count}</p>
          <div onClick={onClickPlus} className={styles.increase}>
            +
          </div>
        </div>

        {showModal && (
          <CustomModal
            message="Удалить товар?"
            onConfirm={handleConfirmClear}
            onCancel={handleCancelClear}
          />
        )}
      </div>
    </div>
  );
};

export default ItemCart;
