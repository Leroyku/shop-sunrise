import React from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import styles from './Menu.module.scss';

import { disableMenu } from '../../redux/slices/dropMenuSlice';

function Menu() {
  const { categories } = useAppSelector((state) => state.categoryFull);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.menuActive}>
      <div className={styles.content}>
        <ul>
          {categories.map((item, index) => (
            <Link
              onClick={() => dispatch(disableMenu())}
              to={`/catalog${item.href}`}
              key={index + 123}>
              <li
                className={
                  index === 0
                    ? styles.firstItem
                    : index + 1 === categories.length
                    ? styles.lastItem
                    : ''
                }>
                {index + 1}. {item.value}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
