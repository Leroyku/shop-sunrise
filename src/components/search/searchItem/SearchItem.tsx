import React from 'react';
import { Link } from 'react-router-dom';

import styles from './SearchItem.module.scss';
import { IItemList } from '../Search';

interface ISearchItem {
  item: IItemList;
  setSearchPanel: (searchPanel: boolean) => void;
}

const SearchItem: React.FC<ISearchItem> = ({ item, setSearchPanel }) => {
  return (
    <Link onClick={() => setSearchPanel(false)} to={`${item.id}`}>
      <div className={styles.root}>
        <div className={styles.image}>
          <img className={styles.img} src={item.image} alt={item.image} />
        </div>
        <p>{item.name}</p>
      </div>
    </Link>
  );
};

export default SearchItem;
