import React from 'react';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hook';

import Menu from './dropMenu/Menu';
import CatMenu from './dropMenu/CatMenu';
import MobMenu from './mobMenu/MobMenu';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faStarHalfStroke,
  faLocationDot,
  faAddressBook,
  faWrench,
  faCircleInfo,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';

import { switchActiveMenu, disableMenu, disableCatalog } from '../redux/slices/dropMenuSlice';

interface ICategories {
  links: string[];
  categoriesIsVisible: boolean;
  mobRef: React.RefObject<HTMLDivElement>; // Add mobRef as a prop
}

const Categories: React.FC<ICategories> = ({ links, categoriesIsVisible, mobRef }) => {
  const { categoryMenu, mobMenu } = useAppSelector((state) => state.dropMenu);

  const dispatch = useAppDispatch();
  const catRef = useRef<HTMLDivElement>(null);

  const nav = [
    { name: 'Главная', iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faHouse} /> },

    {
      name: 'О магазине',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faCircleInfo} />,
    },
    {
      name: 'Каталог',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faFolderOpen} />,
    },
    {
      name: 'Конструктор шевронов',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faWrench} />,
    },
    {
      name: 'Отзывы',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faStarHalfStroke} />,
    },
    {
      name: 'Доставка и опт',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faLocationDot} />,
    },
    {
      name: 'Контакты',
      iconCategorie: <FontAwesomeIcon className="cat-icon" icon={faAddressBook} />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());

      if (!path.includes(catRef.current)) {
        dispatch(disableCatalog());
      }
    };

    if (categoriesIsVisible) {
      document.body.addEventListener('click', handleClickOutside);
    }
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, [categoriesIsVisible]);

  return (
    <div className="categories">
      {/* <div
        ref={catRef}
        onClick={() => {
          dispatch(switchActiveMenu({ categoriesIsVisible }));
        }}
        className="catalog">
        <FontAwesomeIcon className="bars" icon={faBars} />
        Каталог
        <div className={categoryMenu ? 'dropMenuAct' : 'dropMenu'}>
          <Menu />
        </div>
      </div> */}
      <ul className="ulCat">
        {nav.map((value, index) => (
          <NavLink className="links" end to={links[index]} key={index}>
            {value.iconCategorie}
            <span>{value.name}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
