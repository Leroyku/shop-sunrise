import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../utils/hook';

import logo from '../assets/img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';

import Search from './search/Search';
import Menu from './dropMenu/Menu';
import { menuSwitcher, categoriesSwitcher } from '../redux/slices/dropMenuSlice';
interface HeaderProps {
  mobRef: React.RefObject<HTMLDivElement>;
  categoriesIsVisible: boolean;
}
function Header({ mobRef, categoriesIsVisible }: HeaderProps) {
  const { mobVersion } = useAppSelector((state) => state.search);
  const { headerMenu } = useAppSelector((state) => state.dropMenu);
  const dispatch = useAppDispatch();

  const { items, totalPrice, promocodeRes } = useAppSelector((state) => state.cart);
  const isMounted = useRef(false);
  const [mobW, setMobW] = useState<boolean>(false);
  const [mobW2, setMobW2] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    dispatch(categoriesSwitcher());
  };

  const handleMouseLeave = () => {
    setHovered(false);
    dispatch(categoriesSwitcher());
  };

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (rootRef.current) {
        const newInnerWidth = rootRef.current.clientWidth;
        if (newInnerWidth < 1150) {
          setMobW(true);
        } else {
          setMobW(false);
        }
      }
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
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

  return (
    <header ref={rootRef} className="header">
      <div className="container">
        {mobVersion ? (
          <></>
        ) : (
          <div className="header__sideL">
            {/* <div
              ref={mobRef}
              onClick={(e) => {
                // e.stopPropagation();
                dispatch(menuSwitcher());
              }}
              className="header__menu">
              <FontAwesomeIcon icon={faBars} />
              <div style={{ marginLeft: '10px', color: 'rgba(251, 145, 24, 0.2)' }}>|</div>
            </div> */}

            <div
              onMouseEnter={!mobW ? handleMouseEnter : undefined}
              onMouseLeave={!mobW ? handleMouseLeave : undefined}
              className="header__logo">
              <FontAwesomeIcon className="bars" icon={faBars} />
              <Link to="/">
                <h2 className="logo__h2">Sunrise</h2>
              </Link>
              <div className={headerMenu ? 'dropMenuAct' : 'dropMenu'}>
                <Menu />
              </div>
            </div>
          </div>
        )}

        <div className="header__sideR">
          <Search rootRef={rootRef} />
          {mobVersion ? (
            <></>
          ) : (
            <div className="header__cart">
              <Link to="/cart" className="button button--cart">
                <span>{promocodeRes.proms.length > 0 ? discountedPrice : totalPrice} ₽</span>
                <div className="button__delimiter"></div>

                <FontAwesomeIcon icon={faCartShopping} />
                <span>{items.length}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
