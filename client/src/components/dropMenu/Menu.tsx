import React from 'react';

import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import styles from './Menu.module.scss';

import { disableMenu } from '../../redux/slices/dropMenuSlice';

const Menu: React.FC<any> = () => {
  const { categories } = useAppSelector((state) => state.categories);
  const { currentSort } = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.menuActive}>
      <div className={styles.content}>
        <ul className={styles.desktop}>
          {categories.map((item, index) => (
            <Link
              className={styles.catalogLinks}
              to={`/catalog/${item.category_link}?sort=${currentSort}`}
              key={index}>
              <img src={item.category_photo} alt="" />
              <span>{item.category_name}</span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
