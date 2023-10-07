import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../utils/hook';
import { Helmet } from 'react-helmet';

import Item from '../../components/itemBlock/Item';
import Services from '../../components/Services';
import CatalogCategoryPagination from '../../components/Pagination';
import Skeleton from '../../components/itemBlock/Skeleton';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

import { setItemListAndQuery } from '../../redux/slices/searchSlice';
import { IProducts, setData, removeData } from '../../redux/slices/categorySlice';

const SearchPage: React.FC = () => {
  const Service = new Services();
  const location = useLocation();
  const navigate = useNavigate();

  const searchURLParams = new URLSearchParams(location.search);
  const pageValue = parseInt(searchURLParams.get('page') || '1');

  const dispatch = useAppDispatch();

  const { query, items } = useAppSelector((state) => state.search);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { categories, data } = useAppSelector((state) => state.categories);

  const rootRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [mobCategory, setMobCategory] = useState<boolean>(false);

  const [page, setPage] = useState<number>(pageValue);
  const [totalItems, setTotalItems] = useState<number>(12);

  const itemsPerPage = 12;

  const toUpHandler = () => {
    window.scroll({
      left: 0,
      top: 0,
    });
  };
  const handleWindowResize = () => {
    if (rootRef.current) {
      const newInnerWidth = rootRef.current.clientWidth;

      if (newInnerWidth <= 500) {
        setMobCategory(true);
      } else {
        setMobCategory(false);
      }
      if (newInnerWidth <= 330) {
        setMobCategory(false);
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
    if (query) {
      setSearchParams((prevSearchParams) => ({
        ...prevSearchParams,
        query: query,
        page: page.toString(),
      }));
    }
  }, [query, searchURLParams.get('query'), categories]);
  useEffect(() => {
    const searchURLParams = new URLSearchParams(location.search);
    const str = searchURLParams.get('query');
    if (str) {
      const pageValue = parseInt(searchURLParams.get('page') || '1');

      setPage(pageValue);
      setIsLoading(true);
      toUpHandler();
      dispatch(removeData());

      getSearch(str);
    }
  }, [searchURLParams.get('query'), page, categories]);

  const getSearch = (str: string) => {
    Service.getData('1. Все товары', page, undefined, undefined, str).then((res) => {
      if (res.total) setTotalItems(res.total);
      if (res.items) dispatch(setData(res.items));

      setIsLoading(false);

      if (Math.ceil(res.total / 12) < page || res.length === 0) {
        setTotalItems(1);
        setPage(1);
        const searchURLValue = searchURLParams.get('query');
        navigate(`/search/?query=${searchURLValue}`);
      }
    });
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <Helmet>
        <title>Поиск по ассортименты страйкбольной лавки SunRise</title>
        <meta
          name="description"
          content="Страйкбольная лавка «SunRise» – это магазин страйкбольного оружия и экипировки. Мы осуществляем продажу страйкбольного оружия, комплектующих, расходников и снаряжения."
        />
        <meta name="keywords" content="Sunrise, Санрайз,Страйкбол, Airsoft, поиск" />
      </Helmet>
      <div className={styles.innerContainer}>
        <h2 className={styles.name}>
          Поиск по фразе: <span>{searchURLParams.get('query')}</span>
        </h2>
        <div
          style={{ display: data.length === 0 && !isLoading ? 'flex' : '' }}
          className={styles.container}>
          <FontAwesomeIcon
            onClick={toUpHandler}
            className={styles.arrowUp}
            icon={faArrowCircleUp}
          />
          {isLoading ? (
            [...Array(12)].map((_, index) => (
              <div className={styles.items} key={index}>
                <Skeleton key={index} />
              </div>
            ))
          ) : data.length > 0 ? (
            data.map((item) => (
              <div className={styles.items} key={item.id}>
                <Item
                  mobCategory={mobCategory}
                  pathname={`/${item.categorylink}`}
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.images}
                  stock={item.stock}
                />
              </div>
            ))
          ) : (
            <div
              style={{
                width: '100%',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fb9118',
                fontSize: '18px',
              }}>
              Ничего не найдено!
            </div>
          )}
        </div>
      </div>
      <CatalogCategoryPagination
        page={page}
        setPage={setPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
    </div>
  );
};

export default SearchPage;
