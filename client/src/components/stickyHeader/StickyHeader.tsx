import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';

import Search from '../search/Search';
import Menu from '../dropMenu/Menu';

import { switchActiveMenu, disableMenu } from '../../redux/slices/dropMenuSlice';

function StickyHeader() {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const { headerMenu } = useAppSelector((state) => state.dropMenu);
  const dispatch = useAppDispatch();

  const isMounted = useRef(false);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());

      if (!path.includes(catRef.current)) {
        dispatch(disableMenu());
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="header" style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
      <div className="container">
        <div className="header__sides">
          <Link to="/">
            <div className="header__logo">
              <img width="38" src={logo} alt="Shop logo" />
            </div>
          </Link>
          <div
            ref={catRef}
            onClick={() => dispatch(switchActiveMenu({ categoriesIsVisible: false }))}
            className="catalog">
            <FontAwesomeIcon className="bars" icon={faBars} />
            Каталог
          </div>
          <div className={headerMenu ? 'dropMenuHeaderAct' : 'dropMenu'}>
            <Menu />
          </div>
        </div>
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

export default StickyHeader;
