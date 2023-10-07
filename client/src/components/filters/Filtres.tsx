import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import Sort from '../Sort';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSliders } from '@fortawesome/free-solid-svg-icons';

import { setCurrentSort, setMobFiltres } from '../../redux/slices/sortSlice';

import styles from './Filtres.module.scss';

const Filtres: React.FC = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { currentSort, mobFiltres } = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  const sortingOptions = [
    { value: 'price-asc', label: 'сначала дешёвые' },
    { value: 'price-desc', label: 'сначала дорогие' },
    { value: 'alphabetical', label: 'по алфавиту' },
    { value: 'newest', label: 'по новизне' },
  ];

  const searchURLParams = new URLSearchParams(location.search);
  const sortValue = searchURLParams.get('sort');

  const [selectedSortingName, setSelectedSortingName] = useState<string>(() => {
    for (const key of sortingOptions) {
      if (key.value === sortValue) {
        return key.label;
      }
    }
    return '';
  });

  const [dropSorting, setDropSorting] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleWindowResize = () => {
    if (rootRef.current) {
      const newInnerWidth = rootRef.current.clientWidth;
      if (newInnerWidth <= 430) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  };
  useEffect(() => {
    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    for (const key of sortingOptions) {
      if (key.value === sortValue) {
        dispatch(setCurrentSort(key.value));
        setSelectedSortingName(key.label);
      }
    }
  }, [category]);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (mobFiltres) {
        e.preventDefault();
      }
    };

    if (mobFiltres) {
      document.body.style.overflow = 'hidden';
      document.body.addEventListener('scroll', handleScroll, { passive: false });
    } else {
      document.body.style.overflow = 'auto';
      document.body.removeEventListener('scroll', handleScroll);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.removeEventListener('scroll', handleScroll);
    };
  }, [mobFiltres]);

  return (
    <div ref={rootRef} className={styles.root}>
      <div style={{ position: 'relative' }}>
        <div onClick={() => setDropSorting(!dropSorting)} className={styles.sorting}>
          {isMobile ? '' : 'Сортировка:'}
          {currentSort && (
            <span style={{ marginLeft: isMobile ? '0' : '' }} className={styles.selectedOption}>
              {selectedSortingName}
            </span>
          )}
          <FontAwesomeIcon className={styles.icons} icon={faSort} />
        </div>
        {dropSorting && (
          <div className={styles.sortingOptions}>
            {sortingOptions.map((option) => (
              <label key={option.value} className={styles.sortingOption}>
                <input
                  type="radio"
                  name="sorting"
                  value={option.value}
                  checked={currentSort === option.value}
                  onChange={(e) => {
                    dispatch(setCurrentSort(option.value));
                    setSelectedSortingName(option.label);
                    const params = new URLSearchParams(location.search);
                    params.set('sort', option.value);
                    const newUrl = `/catalog/${category}?${params.toString()}`;
                    window.history.pushState(null, '', newUrl);
                  }}
                  onClick={(e) => {
                    setDropSorting(!dropSorting);
                  }}
                />{' '}
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>
      <div>
        <div onClick={() => dispatch(setMobFiltres(true))} className={styles.filtres}>
          Фильтры <FontAwesomeIcon className={styles.icons} icon={faSliders} />
        </div>
        {mobFiltres && (
          <>
            <div className={styles.mobFiltres}>
              <div className={styles.close}>
                <span
                  onClick={() => {
                    navigate(`/catalog/${category}?sort=${currentSort}`);
                  }}>
                  Сбросить фильтры
                </span>
                <span onClick={() => dispatch(setMobFiltres(false))}>Свернуть</span>
              </div>
              <Sort />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Filtres;
