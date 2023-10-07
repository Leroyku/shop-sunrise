import React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import styles from './MobMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHouse,
  faStarHalfStroke,
  faLocationDot,
  faAddressBook,
  faFolderOpen,
  faWrench,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { disableMenu } from '../../redux/slices/dropMenuSlice';

const MobMenu: React.FC<any> = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const { mobMenu } = useAppSelector((state) => state.dropMenu);
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const toUpHandler = () => {
    window.scroll({
      left: 0,
      top: 0,
    });
  };
  const nav = [
    { name: 'Главная', iconCategory: <FontAwesomeIcon className={styles.icons} icon={faHouse} /> },
    {
      name: 'О магазине',
      iconCategory: <FontAwesomeIcon className={styles.icons} icon={faCircleInfo} />,
    },
    {
      name: 'Конструктор шевронов',
      iconCategory: <FontAwesomeIcon className={styles.icons} icon={faWrench} />,
    },
    {
      name: 'Отзывы',
      iconCategory: <FontAwesomeIcon className={styles.icons} icon={faStarHalfStroke} />,
    },
    {
      name: 'Доставка и опт',
      iconCategory: <FontAwesomeIcon className={styles.icons} icon={faLocationDot} />,
    },
    {
      name: 'Контакты',
      iconCategory: <FontAwesomeIcon className={styles.icons} icon={faAddressBook} />,
    },
    {
      name: 'Каталог',
      iconCategory: <FontAwesomeIcon className={styles.icons} icon={faFolderOpen} />,
    },
  ];

  const links = ['/', '/about', '/constructor', '/reviews', '/delivery', '/contacts', '/catalog'];

  return (
    <div className={mobMenu ? styles.menu : styles.none}>
      <ul>
        {nav.map((value: any, index: any) => (
          <div
            onClick={() => {
              setDropdownOpen(false);
              toUpHandler();
            }}
            className={styles.menuItem}
            key={index}>
            {value.iconCategory}
            <NavLink className={styles.itemLinks} end to={links[index]}>
              {value.name}
            </NavLink>
          </div>
        ))}
      </ul>

      {/* <div
        className={styles.menuItem}
        // onClick={(e) => {
        //   e.stopPropagation();
        //   toggleDropdown();
        // }}>
      >
        <FontAwesomeIcon className={styles.icons} icon={faBars} />
        <div className={styles.itemLinks}>
          Каталог <div className={styles.dropdownIcon}></div>
        </div>
      </div> */}
      {/* <ul className={`${dropdownOpen ? styles.expandedMenu : styles.none}`}>
        {categories.map((item, index) => (
          <Link
            onClick={() => {
              toggleDropdown();
              dispatch(disableMenu());
            }}
            className={styles.categories}
            to={`/catalog${item.href}`}
            key={index + 123}>
            {item.value}
          </Link>
        ))}
      </ul> */}
    </div>
  );
};

export default MobMenu;
