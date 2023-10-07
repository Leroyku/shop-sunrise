import React from 'react';
import { useAppSelector } from '../../../utils/hook';

import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';

function Sidebar() {
  const { categories } = useAppSelector((state) => state.categories);

  return (
    <div className={styles.sidebar}>
      {/* <ul>
        {categories.map((item, index) => (
          <Link to={`/catalog${item.href}`} key={index}>
            <li key={index} className="">
              {item.value}
            </li>
          </Link>
        ))}
      </ul> */}
    </div>
  );
}

export default Sidebar;
