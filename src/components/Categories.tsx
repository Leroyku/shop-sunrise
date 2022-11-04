import React from 'react';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hook';

import Menu from './dropMenu/Menu';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faStarHalfStroke,
  faLocationDot,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';

import { switchActiveMenu, disableMenu } from '../redux/slices/dropMenuSlice';

interface ICategories {
  links: string[];
  categoriesIsVisible: boolean;
}

const Categories: React.FC<ICategories> = ({ links, categoriesIsVisible }) => {
  const { categoryMenu } = useAppSelector((state) => state.dropMenu);

  const dispatch = useAppDispatch();
  const catRef = useRef<HTMLDivElement>(null);

  const nav = [
    { name: 'Главная', iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faHouse} /> },

    {
      name: 'Отзывы',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faStarHalfStroke} />,
    },
    {
      name: 'Доставка и оптовые заказы',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faLocationDot} />,
    },
    {
      name: 'Контакты',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faAddressBook} />,
    },
  ];

  const setClassName = (index: number) => {
    let setName = 'links';
    setName += index === 0 ? ' first-li ' : '';
    setName += index === 3 ? ' last-li ' : '';
    return setName;
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());

      if (!path.includes(catRef.current)) {
        dispatch(disableMenu());
      }
    };

    if (categoriesIsVisible) {
      document.body.addEventListener('click', handleClickOutside);
    }
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [categoriesIsVisible]);

  return (
    <div className="categories">
      <div
        ref={catRef}
        onClick={() => {
          dispatch(switchActiveMenu({ categoriesIsVisible }));
        }}
        className="catalog">
        <FontAwesomeIcon className="bars" icon={faBars} />
        Каталог
      </div>

      <ul className="ulCat">
        {nav.map((value, index) => (
          <NavLink className={setClassName(index)} end to={links[index]} key={index}>
            {value.iconCategorie}
            {value.name}
          </NavLink>
        ))}
      </ul>
      <div className={categoryMenu ? 'dropMenuAct' : 'dropMenu'}>
        <Menu />
      </div>
    </div>
  );
};

export default Categories;
