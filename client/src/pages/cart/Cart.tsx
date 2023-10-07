import React from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import styles from './Cart.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import ItemCart from './itemCart/ItemCart';
import FormCart from './formCart/FormCart';
import EmptyCart from './emptyCart/EmptyCart';
import CustomModal from './modal/CustomModal';

import { clearItems } from '../../redux/slices/cartSlice';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice, promocodeRes } = useAppSelector((state) => state.cart);

  const [done, setDone] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  // const [discount, setDiscount] = useState<boolean>(false);

  const onClickClear = () => {
    setShowModal(true);
  };

  const handleConfirmClear = () => {
    dispatch(clearItems());
    setShowModal(false);
  };

  const handleCancelClear = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // document.title = 'Корзина';
    setDone(false);
    window.scroll({
      left: 0,
      top: 0,
    });
  }, []);

  useEffect(() => {
    const json = JSON.stringify(promocodeRes);
    localStorage.setItem('promocode', json);
  }, [promocodeRes]);

  useEffect(() => {
    if (promocodeRes.proms.length > 0) {
      const promocodeValue = promocodeRes.proms[0].value;

      if (promocodeValue.includes('%')) {
        const percentMatch = promocodeValue.match(/^(\d+)/);

        if (percentMatch) {
          const discount = totalPrice * (+percentMatch[0] / 100);
          setDiscountedPrice(totalPrice - discount);
        }
      } else if (promocodeValue.includes('р')) {
        const discountValue = parseFloat(promocodeValue);
        setDiscountedPrice(totalPrice - discountValue);
        if (totalPrice - discountValue < 0) setDiscountedPrice(0);
      }
    }
  }, [totalPrice, promocodeRes]);

  if (done) {
    return <Navigate to="/order" />;
  }

  if (!totalPrice) {
    return <EmptyCart />;
  }

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
      <div className={styles.left}>
        <div className={styles.up}>
          <div className={styles.title}>
            <FontAwesomeIcon icon={faShoppingCart} /> Корзина
          </div>
          <div onClick={onClickClear} className={styles.deleteAll}>
            <FontAwesomeIcon icon={faTrashCan} /> Очистить корзину
          </div>
          {showModal && (
            <CustomModal
              message="Очистить корзину?"
              onConfirm={handleConfirmClear}
              onCancel={handleCancelClear}
            />
          )}
        </div>
        {items.map((item, index) => (
          <ItemCart
            key={item.id}
            isLastItem={index === items.length - 1}
            index={index}
            item={item}
          />
        ))}
        <p className={styles.bottom}>
          Общая сумма:{' '}
          {promocodeRes.proms.length > 0 ? (
            <span>{discountedPrice} ₽</span>
          ) : (
            <span>{totalPrice} ₽</span>
          )}
        </p>
        {promocodeRes.proms.length > 0 && (
          <div className={styles.discount}>с промокодом на {promocodeRes.proms[0].value}</div>
        )}
      </div>
      <div className={styles.right}>
        <FormCart setDone={setDone} />
      </div>
    </div>
  );
};

export default Cart;
