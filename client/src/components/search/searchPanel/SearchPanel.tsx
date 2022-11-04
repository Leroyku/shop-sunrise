import React from 'react';

import styles from './SearchPanel.module.scss';

import SearchItem from '../searchItem/SearchItem';
import { IItemList } from '../Search';

interface ISearchPanel {
  itemList: { items: IItemList[] };
  setSearchPanel: (searchPanel: boolean) => void;
}

const SearchPanel: React.FC<ISearchPanel> = ({ itemList, setSearchPanel }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {itemList.items.map((item, index) => {
          if (index >= 5) return;
          return <SearchItem setSearchPanel={setSearchPanel} key={item.image} item={item} />;
        })}
      </div>
    </div>
  );
};

export default SearchPanel;
