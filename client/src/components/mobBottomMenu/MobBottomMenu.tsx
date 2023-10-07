import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../utils/hook';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCartShopping, faList, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import { menuSwitcher, disableMobMenu } from '../../redux/slices/dropMenuSlice';

import styles from './MobBottomMenu.module.scss';

interface IMobBottomMenu {
  mobRef: React.RefObject<HTMLDivElement>;
}

const MobBottomMenu: React.FC<IMobBottomMenu> = ({ mobRef }) => {
  const location = useLocation();
  const { mobMenu } = useAppSelector((state) => state.dropMenu);
  const { items, totalPrice, promocodeRes } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [selectedDiv, setSelectedDiv] = useState<string>('');
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);

  useEffect(() => {
    const loc = location.pathname;
    if (!mobMenu) {
      if (loc === '/') setSelectedDiv('home');
      if (loc.includes('catalog') || loc.includes('search')) setSelectedDiv('catalog');
      if (loc.includes('reviews') || loc.includes('delivery') || loc.includes('contacts'))
        setSelectedDiv('menu');
      if (loc.includes('cart')) setSelectedDiv('cart');
    }
  }, [location, mobMenu]);

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
    } else {
      setDiscountedPrice(0);
    }
  }, [totalPrice, promocodeRes]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());

      if (!path.includes(mobRef.current)) {
        dispatch(disableMobMenu());
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const toUpHandler = () => {
    window.scroll({
      left: 0,
      top: 0,
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={`${styles.iconContainer} ${selectedDiv === 'home' ? styles.selected : ''}`}>
          <Link
            to={`/`}
            onClick={() => {
              setSelectedDiv('home');
              toUpHandler();
            }}>
            <div className={`${styles.item} ${selectedDiv === 'home' ? styles.selected : ''}`}>
              <FontAwesomeIcon className={styles.icon} icon={faHouse} />
              Главная
            </div>
          </Link>
        </div>
        <div ref={mobRef} className={`${styles.iconContainer} `}>
          <div
            className={`${styles.item} ${selectedDiv === 'menu' ? styles.selected : ''}`}
            onClick={() => {
              setSelectedDiv('menu');
              dispatch(menuSwitcher());
            }}>
            <FontAwesomeIcon className={styles.icon} icon={faList} />
            Меню
          </div>
        </div>
        <div className={`${styles.iconContainer} `}>
          <Link
            to={`/catalog`}
            onClick={() => {
              setSelectedDiv('catalog');
              toUpHandler();
            }}>
            <div className={`${styles.item} ${selectedDiv === 'catalog' ? styles.selected : ''}`}>
              <FontAwesomeIcon className={styles.icon} icon={faFolderOpen} />
              Каталог
            </div>
          </Link>
        </div>
        <div className={`${styles.iconContainer} `}>
          <Link
            to={`/cart`}
            onClick={() => {
              setSelectedDiv('cart');
              toUpHandler();
            }}>
            <div className={`${styles.item} ${selectedDiv === 'cart' ? styles.selected : ''}`}>
              <FontAwesomeIcon className={styles.icon} icon={faCartShopping} />
              {items.length > 0 ? (
                <span>{promocodeRes.proms.length > 0 ? discountedPrice : totalPrice}</span>
              ) : (
                'Корзина'
              )}
              {items.length > 0 ? <div className={styles.cartCounter}>{items.length}</div> : <></>}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobBottomMenu;
