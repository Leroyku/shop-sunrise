import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import Item from '../../components/itemBlock/Item';
import Sort from '../../components/Sort';
import Skeleton from '../../components/itemBlock/Skeleton';
import Services from '../../components/Services';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';

import styles from './CatalogCategory.module.scss';

import { setSortArray, setCurrentItems } from '../../redux/slices/sortSlice';
import { IProducts, setData, setNewData, removeData } from '../../redux/slices/categorySlice';

function CatalogCategory() {
  const Service = new Services();

  const dispatch = useAppDispatch();
  const { categories, data } = useAppSelector((state) => state.categoryFull);
  const { sortLength, currentItems } = useAppSelector((state) => state.sort);

  const { category } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTrue, setIsTrue] = useState<boolean>(true);

  const [dataFull, setDataFull] = useState<{ items: IProducts[] }>({
    items: [],
  });
  const [locationGroup, setLocationGroup] = useState<number>();

  const [tilte, setTitle] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(false);

  const toUpHandler = () => {
    window.scroll({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    document.title = 'Каталог';

    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(() => {
    if (fetching) {
      if (isTrue) {
        Service.getGroupItems(locationGroup, offset).then((res) => {
          setOffset(offset + 9);

          dispatch(setData({ res }));
          if (res.items.length < 9) setIsTrue(false);
        });
      }
    }
    setFetching(false);
  }, [fetching]);

  useEffect(() => {
    dispatch(setCurrentItems({ data }));
  }, [data]);

  useEffect(() => {
    const pathname = window.location.pathname;
    categories.map((item) => {
      if (pathname.indexOf(item.href) != -1) {
        dispatch(removeData());
        setTitle(item.value);
        setLocationGroup(item.group);
        setOffset(9);
        setIsTrue(true);
        Service.getGroupItems(item.group).then((res) => {
          dispatch(setNewData({ res }));
          dispatch(setCurrentItems({ res }));
          setIsLoading(false);
        });
        Service.getAllItems(item.group).then((res) => {
          setDataFull(res);
        });
      }
    });
    window.scroll({
      left: 0,
      top: 0,
    });
  }, [category]);

  useEffect(() => {
    dispatch(setSortArray({ data, dataFull }));
  }, [sortLength]);

  return (
    <div className={styles.root}>
      <FontAwesomeIcon
        onClick={() => toUpHandler()}
        className={styles.arrowUp}
        icon={faArrowCircleUp}
      />
      <div className={styles.left}>
        <Sort category={category} />
      </div>
      <div className={styles.right}>
        <p>
          <Link className={styles.links} to="/catalog">
            Каталог
          </Link>{' '}
          / {tilte}:
        </p>
        <div className={styles.container}>
          {isLoading
            ? [...new Array(9)].map((_, index) => (
                <div className={styles.items} key={index}>
                  <Skeleton key={index} />
                </div>
              ))
            : currentItems.items.map((item) => (
                <div className={styles.items} key={item.id}>
                  <Item
                    pathname={`/${category}`}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.images}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogCategory;
