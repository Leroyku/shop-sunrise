import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';

import SearchPanel from './searchPanel/SearchPanel';
import Services from '../Services';

export type IItemList = {
  id: number;
  name: string;
  image: string;
};

const Search = () => {
  const Service = new Services();

  const [itemList, setItemList] = useState<{ items: IItemList[] }>({
    items: [],
  });
  const [value, setValue] = useState('');
  const [searchPanel, setSearchPanel] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchDebounce = useCallback(
    debounce((str: string) => {
      if (str) {
        Service.getSearch(str).then((res) => {
          setItemList(res);
        });
      }
    }, 1000),
    [],
  );

  const onChangeValue = (event: any) => {
    setValue(event.target.value);
    if (event.target.value != 0) {
      if (!searchPanel) setSearchPanel(true);
    } else {
      setSearchPanel(false);
    }
    searchDebounce(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const path = event.path || (event.composedPath && event.composedPath());
      if (!path.includes(searchRef.current)) {
        setSearchPanel(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={styles.root}>
      <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
      <input
        ref={inputRef}
        id="inputs"
        value={value}
        onChange={onChangeValue}
        className={styles.input}
        placeholder="Поиск..."
      />
      {searchPanel ? <SearchPanel setSearchPanel={setSearchPanel} itemList={itemList} /> : ''}
    </div>
  );
};

export default Search;
