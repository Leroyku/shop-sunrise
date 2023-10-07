import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useAppSelector, useAppDispatch } from '../../utils/hook';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import styles from './Search.module.scss';

import SearchPanel from './searchPanel/SearchPanel';
import Services from '../Services';
import { versionSwitcher, setItemListAndQuery } from '../../redux/slices/searchSlice';

export type IItemList = {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
  categorylink: string;
  updated: string;
};

interface ISearch {
  rootRef: React.RefObject<HTMLDivElement>;
}

const Search: React.FC<ISearch> = ({ rootRef }) => {
  const Service = new Services();
  const dispatch = useAppDispatch();

  const { mobVersion, query } = useAppSelector((state) => state.search);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [itemList, setItemList] = useState<IItemList[]>([]);
  const [value, setValue] = useState('');
  const [searchPanel, setSearchPanel] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickIcon = (event: any) => {
    if (collapsed) {
      dispatch(versionSwitcher({ hand: false }));
    }
  };

  const searchDebounce = useCallback(
    debounce((str: string) => {
      if (str) {
        Service.getData('1. Все товары', undefined, undefined, undefined, str, true).then((res) => {
          setItemList(res);
        });
      }
    }, 300),
    [],
  );

  const onChangeValue = (event: any) => {
    setValue(event.target.value);
    if (event.target.value != 0 && document.activeElement === inputRef.current) {
      if (!searchPanel) setSearchPanel(true);
    } else {
      setSearchPanel(false);
    }
    searchDebounce(event.target.value);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      if (rootRef.current) {
        const newInnerWidth = rootRef.current.clientWidth;
        if (newInnerWidth <= 740) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
          dispatch(versionSwitcher({ hand: true }));
        }
      }
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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

  useEffect(() => {
    if (collapsed && mobVersion) {
      inputRef.current?.focus();
    } else {
      setSearchPanel(false);
    }
  }, [collapsed, mobVersion]);

  return (
    <div
      ref={searchRef}
      style={{
        width: collapsed && mobVersion ? '100%' : '',

        marginRight: collapsed && !mobVersion ? '10px' : '0',
      }}
      className={styles.root}>
      <div
        onClick={onClickIcon}
        style={{
          height: collapsed ? (mobVersion ? '0' : '47px') : '0',
        }}
        className={styles.iconDiv}>
        {mobVersion ? (
          <FontAwesomeIcon
            style={{
              position: collapsed ? 'absolute' : 'relative',
              left: collapsed ? '12px' : '0',
              top: collapsed ? '11px' : '0',
              marginRight: collapsed ? '11px' : '0',
            }}
            className={styles.icon}
            icon={faX}
          />
        ) : (
          <FontAwesomeIcon
            style={{
              position: 'absolute',
              left: '12px',
              top: '11px',
            }}
            className={styles.icon}
            icon={faMagnifyingGlass}
          />
        )}
      </div>
      <input
        style={{ color: '#fb9118', display: collapsed ? (mobVersion ? 'flex' : 'none') : 'flex' }}
        ref={inputRef}
        id="inputs"
        value={value}
        onFocus={onChangeValue}
        onChange={onChangeValue}
        className={styles.input}
        placeholder="Шары, гранаты, шевроны..."
      />
      {searchPanel && (
        <SearchPanel
          value={value}
          collapsed={collapsed}
          setSearchPanel={setSearchPanel}
          itemList={itemList}
        />
      )}
    </div>
  );
};

export default Search;
