import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../utils/hook';

import logo from '../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import Search from './search/Search';

function Header() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Shop logo" />
          </div>
        </Link>
        <div className="header__sides">
          <Search />
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <FontAwesomeIcon icon={faCartShopping} />
              <span>{items.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
