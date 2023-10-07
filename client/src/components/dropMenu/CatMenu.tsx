import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faStarHalfStroke,
  faLocationDot,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';

const CatMenu: React.FC<any> = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const nav = [
    { name: 'Главная', iconCategorie: <FontAwesomeIcon className={styles.cIcon} icon={faHouse} /> },

    {
      name: 'Отзывы',
      iconCategorie: <FontAwesomeIcon className={styles.cIcon} icon={faStarHalfStroke} />,
    },
    {
      name: 'Доставка и опт',
      iconCategorie: <FontAwesomeIcon className={styles.cIcon} icon={faLocationDot} />,
    },
    {
      name: 'Контакты',
      iconCategorie: <FontAwesomeIcon className={styles.cIcon} icon={faAddressBook} />,
    },
  ];

  const links = ['/', '/reviews', '/delivery', '/contacts'];

  return (
    <div className={styles.menuActive}>
      <div className={styles.content}>
        <ul className={styles.mob}>
          {nav.map((value: any, index: any) => (
            <NavLink className={styles.catalogLinks} end to={links[index]} key={index}>
              {value.iconCategorie}
              {value.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CatMenu;
