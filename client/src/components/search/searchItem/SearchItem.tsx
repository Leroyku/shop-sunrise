import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../utils/hook';

import styles from './SearchItem.module.scss';
import { IItemList } from '../Search';

import {
  setItemListAndQuery,
  versionSwitcher,
  clearItemListAndQuery,
} from '../../../redux/slices/searchSlice';

interface ISearchItem {
  item: IItemList;
  setSearchPanel: (searchPanel: boolean) => void;
  collapsed: boolean;
  value: string;
}

const SearchItem: React.FC<ISearchItem> = ({ item, setSearchPanel, collapsed, value }) => {
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const regex = new RegExp(value, 'gi');

  return (
    <Link
      onClick={() => {
        setSearchPanel(false);
        if (collapsed) dispatch(versionSwitcher({ hand: false }));
      }}
      to={`catalog/${item.categorylink}/${item.id}`}>
      <div className={styles.root}>
        <div className={styles.image}>
          <img className={styles.img} src={item.images[0]} alt={item.images[0]} />
        </div>
        <p>
          {item.name.split(regex).map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span style={{ color: 'rgb(251, 145, 24)' }}>
                  {item.name.match(regex)![index - 1]}
                </span>
              )}
              {part}
            </React.Fragment>
          ))}
        </p>
      </div>
    </Link>
  );
};

export default SearchItem;
