import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { Helmet } from 'react-helmet';

import Item from '../../components/itemBlock/Item';
import Sort from '../../components/Sort';
import Skeleton from '../../components/itemBlock/Skeleton';
import Services from '../../components/Services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './CatalogCategory.module.scss';
import { setData, removeData } from '../../redux/slices/categorySlice';
import { setMobFiltres } from '../../redux/slices/sortSlice';
import { disableMenu } from '../../redux/slices/dropMenuSlice';
import CatalogCategoryPagination from '../../components/Pagination';
import Filtres from '../../components/filters/Filtres';

function CatalogCategory() {
  const Service = new Services();
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { categories, data } = useAppSelector((state) => state.categories);
  const { currentSort } = useAppSelector((state) => state.sort);

  const { category } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [titlePage, setTitlePage] = useState<string>('');

  const searchURLParams = new URLSearchParams(location.search);
  const pageValue = parseInt(searchURLParams.get('page') || '1');
  const [page, setPage] = useState<number>(pageValue);
  const [mobCategory, setMobCategory] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState<number>(1);
  const [prevFilters, setPrevFilters] = useState<string>('');
  const [isNewLoading, setIsNewLoading] = useState<boolean>(true);

  const toUpHandler = () => {
    window.scroll({
      left: 0,
      top: 0,
    });
  };

  const handleWindowResize = () => {
    if (rootRef.current) {
      const newInnerWidth = rootRef.current.clientWidth;
      if (newInnerWidth > 950) {
        dispatch(setMobFiltres(false));
      }
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
    const searchURLParams = new URLSearchParams(location.search);
    const pageValue = parseInt(searchURLParams.get('page') || '1');
    setPage(pageValue);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const titles: { [key: string]: string } = {
      ПИРОТЕХНИКА: 'Купить страйкбольную гранату, мину, дымовую шашку, выстрел',
      ШАРЫ: 'Купить страйкбольные шары',
      ГАЗ: 'Купить страйкбольный газ',
      'ВНЕШНИЙ ТЮНИНГ':
        'Купить страйкбольный тюнинг, прицелы, свет, рукоятки, глушители, крепления',
      'СНАРЯЖЕНИЕ И ЗАЩИТА':
        'Купить страйкбольное снаряжение, защиту, балаклавы, аптечки, подсумки, карабины, ремни, шапки и шлема',
      МАГАЗИНЫ: 'Купить страйкбольные магазины, лоадеры',
      СВЯЗЬ: 'Купить страйкбольные рации, гарнитуру, антены, связь',
      'АКБ И ЭЛЕКТРОНИКА': 'Купить страйкбольную электронику, акб, зарядку, тестер, переходник',
      'РЕМОНТНЫЕ КОМПЛЕКТУЮЩИЕ': 'Купить страйкбольные ремонтные комплектующие, смазку, поршни',
      ВООРУЖЕНИЕ: 'Купить страйкбольное оружие, пистолет, автомат, гранатомет, чехол',
      ШЕВРОНЫ: 'Купить шевроны, вышивку',
    };
    function findTitleByValue(value: string) {
      const uppercasedValue = value.toUpperCase();

      const title = titles[uppercasedValue];
      return title || '';
    }
    const descriptions: { [key: string]: string } = {
      ПИРОТЕХНИКА:
        'Качественное страйкбольная пиротехника разных производитей и разного вида в магазине Sunrise. Огромный ассортимент и маленькие цены',
      ШАРЫ: 'Качественное страйкбольные шары разных производитей и разного веса в магазине Sunrise. Огромный ассортимент и маленькие цены',
      ГАЗ: 'Качественное страйкбольный газ в магазине Sunrise. Огромный ассортимент и маленькие цены',
      'ВНЕШНИЙ ТЮНИНГ':
        'Качественное страйкбольный внешний тюнинг на любой вкус в магазине Sunrise. Огромный ассортимент и маленькие цены',
      'СНАРЯЖЕНИЕ И ЗАЩИТА':
        'Купить страйкбольное снаряжение, защиту, балаклавы, аптечки, подсумки, карабины, ремни, шапки и шлема',
      МАГАЗИНЫ:
        'Вместительные и надежные магазины и лоадеры в лавке Sunrise. Огромный ассортимент и маленькие цены',
      СВЯЗЬ:
        'Качественные рации и различная связь в магазине Sunrise. Огромный ассортимент и маленькие цены',
      'АКБ И ЭЛЕКТРОНИКА':
        'ВСя необходимая электроника и акб запрос в магазине Sunrise. Огромный ассортимент и маленькие цены',
      'РЕМОНТНЫЕ КОМПЛЕКТУЮЩИЕ':
        'Страйкбольные ремонтные комплектующие на любой запрос в магазине Sunrise. Огромный ассортимент и маленькие цены',
      ВООРУЖЕНИЕ:
        'Качественное страйкбольное оружие в магазине Sunrise. Огромный ассортимент и маленькие цены',
      ШЕВРОНЫ:
        'Качественное шевроны в магазине Sunrise. Огромный ассортимент, возможность создать свой шеврон',
    };
    function findDescriptionByValue(value: string) {
      const uppercasedValue = value.toUpperCase();

      const des = descriptions[uppercasedValue];
      return des || '';
    }
    const keywords: { [key: string]: string } = {
      ПИРОТЕХНИКА:
        'купить страйкбольную гранату мину дымовую шашку выстрел в интернет-магазине нижний новгород airsoft цены продажа',
      ШАРЫ: 'купить страйкбольные шары в интернет-магазине нижний новгород airsoft цены продажа',
      ГАЗ: 'купить страйкбольный газ в интернет-магазине нижний новгород airsoft цены продажа',
      'ВНЕШНИЙ ТЮНИНГ':
        'купить страйкбольный тюнинг прицелы свет рукоятки глушители крепления в интернет-магазине нижний новгород airsoft цены продажа',
      'СНАРЯЖЕНИЕ И ЗАЩИТА':
        'купить страйкбольное снаряжение защиту балаклавы аптечки подсумки карабины ремни шапки и шлема в интернет-магазине нижний новгород airsoft цены продажа',
      МАГАЗИНЫ:
        'купить страйкбольный магазин лоадер лоудер в интернет-магазине нижний новгород airsoft цены продажа',
      СВЯЗЬ:
        'купить страйкбольные рации интернет-магазине нижний новгород airsoft гарнитуру антены связь цены продажа',
      'АКБ И ЭЛЕКТРОНИКА':
        'купить страйкбольную электронику интернет-магазине нижний новгород airsoft акб зарядку тестер переходник цены продажа',
      'РЕМОНТНЫЕ КОМПЛЕКТУЮЩИЕ':
        'купить ремонтные комплектующиев интернет-магазине нижний новгород airsoft смазку поршни цены продажа',
      ВООРУЖЕНИЕ:
        'купить страйкбольное оружие в интернет-магазине нижний новгород airsoft пистолеты пулеметы автоматы ножи цены продажа',
      ШЕВРОНЫ: 'купить шевроны вышивку в интернет-магазине нижний новгород airsoft',
    };
    function findKeywordsByValue(value: string) {
      const uppercasedValue = value.toUpperCase();

      const keyword = keywords[uppercasedValue];
      return keyword || '';
    }
    if (category) {
      const foundItem = categories.find((item) => item.category_link.includes(category));
      if (foundItem) {
        const foundTitle: string = foundItem.category_name;
        const titleForSet = findTitleByValue(foundTitle);
        const desForSet = findDescriptionByValue(foundTitle);
        const keywordForSet = findKeywordsByValue(foundTitle);

        setTitle(titleForSet);
        setDescription(desForSet);
        setKeywords(keywordForSet);
      }
    }
  }, [data]);

  useEffect(() => {
    const searchURLParams = new URLSearchParams(location.search);
    const pageValue = parseInt(searchURLParams.get('page') || '1');
    if (pageValue > 1 && categories.length > 0) {
      getData();
    }
    try {
    } catch (error) {
      console.error('An error occurred:');
    }
    window.scroll({
      left: 0,
      top: 0,
    });
  }, [location.search, categories, currentSort]);

  useEffect(() => {
    const searchURLParams = new URLSearchParams(location.search);
    const pageValue = searchURLParams.get('page');

    if (!pageValue && categories.length > 0) {
      setPage(1);
      if (page === 1) getData();
    }
  }, [category, categories, page, location.search, currentSort]);

  useEffect(() => {
    const searchURLParams = new URLSearchParams(location.search);
    const pageValue = parseInt(searchURLParams.get('page') || '1');
    setPage(pageValue);
    let filter: string = '';
    if (isNewLoading) {
      searchURLParams.forEach((value, key) => {
        if (key !== 'page' && key !== 'sort') {
          const decodedValue = value.replace(/\ /g, ',');
          filter += `${key.toLowerCase().replace(/\ /g, '_')} = ${
            decodedValue.includes('+') ? decodedValue.replace(/\+/g, ' ') : decodedValue
          }; `;
        }
      });
      if (filter) {
        setPrevFilters(filter);
        const params = new URLSearchParams(location.search);
        navigate(`/catalog/${category}?${params}`);
        setIsNewLoading(false);
      }
    }
    if (!isNewLoading) {
      searchURLParams.forEach((value, key) => {
        if (key !== 'page' && key !== 'sort') {
          const decodedValue = value.replace(/\ /g, ',');
          filter += `${key.toLowerCase().replace(/\ /g, '_')} = ${
            decodedValue.includes('+') ? decodedValue.replace(/\+/g, ' ') : decodedValue
          }; `;
        }
      });
      if (filter && prevFilters != filter) {
        setPrevFilters(filter);
        setPage(1);
        const params = new URLSearchParams(location.search);
        params.delete('page');
        navigate(`/catalog/${category}?${params}`);
      }
    }
  }, [location.search]);
  useEffect(() => {
    const searchURLParams = new URLSearchParams(location.search);
    const pageValue = parseInt(searchURLParams.get('page') || '1');
    setPage(pageValue);
    let filter: string = '';

    if (!isNewLoading) {
      searchURLParams.forEach((value, key) => {
        if (key !== 'page') {
          const decodedValue = value.replace(/\ /g, ',');
          filter += `${key.toLowerCase().replace(/\ /g, '_')} = ${
            decodedValue.includes('+') ? decodedValue.replace(/\+/g, ' ') : decodedValue
          }; `;
        }
      });
      if (prevFilters != filter) {
        setPrevFilters(filter);
        setPage(1);
        const params = new URLSearchParams(location.search);
        params.delete('page');
        navigate(`/catalog/${category}?${params}`);
      }
    }
  }, [currentSort]);

  const getData = async () => {
    if (category === 'newarrivals' || categories.some((item) => category === item.category_link)) {
      const searchURLParams = new URLSearchParams(location.search);
      let filter: string = '';

      searchURLParams.forEach((value, key) => {
        if (key !== 'page') {
          const decodedValue = value.replace(/\ /g, ',');
          filter += `${key.toLowerCase().replace(/\ /g, '_')} = ${
            decodedValue.includes('+') ? decodedValue.replace(/\+/g, ' ') : decodedValue
          }; `;
        }
      });

      dispatch(removeData());

      let title = '',
        description = '',
        keywords = '',
        titlePage = '';
      if (category === 'newarrivals') {
        title = 'Купить страйкбольные новинки';
        description =
          'Новый страйкбольный ассортимент в магазине Sunrise. Огромный выбор, маленькие цены';
        keywords =
          'купить страйкбольные новинки оружие шары в интернет-магазине нижний новгород airsoft';
        titlePage = 'Новинки';
      } else {
        const item = categories.find((item) => category === item.category_link);
        if (item) {
          titlePage = item.category_name;
        }
      }

      setTitle(title);
      setDescription(description);
      setKeywords(keywords);
      setTitlePage(titlePage);
      setIsLoading(true);

      const res = await Service.getData(
        category === 'newarrivals' ? '1. Все товары' : titlePage,
        page,
        undefined,
        undefined,
        undefined,
        undefined,
        filter && filter,
        currentSort,
      );

      if (res) {
        if (res.total) setTotalItems(res.total);
        if (!res.total) setTotalItems(12);
        if (res.items) dispatch(setData(res.items));
        setIsLoading(false);
      }
    }
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <FontAwesomeIcon onClick={toUpHandler} className={styles.arrowUp} icon={faArrowCircleUp} />
      <div className={styles.left}>
        <div className={styles.desktop}>
          <Sort />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.container}>
          <p>
            <Link className={styles.links} to="/catalog">
              Каталог
            </Link>{' '}
            / {titlePage}:
          </p>
          <Filtres />
          <div
            style={{
              display: data.length === 0 && !isLoading ? 'flex' : '',
              gap: data.length > 0 ? '' : '0',
            }}
            className={styles.products}>
            {isLoading ? (
              [...Array(12)].map((_, index) => (
                <div className={styles.items} key={index}>
                  <Skeleton key={index} />
                </div>
              ))
            ) : data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className={styles.items}>
                  <Item
                    mobCategory={mobCategory}
                    pathname={`/${item.categorylink}`}
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
                  color: '#8a8a8d',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 10px',
                }}>
                Ничего не найдено! Нажмите на кнопку сброса фильтров, чтобы увидеть ассортимент!
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
    </div>
  );
}

export default CatalogCategory;
