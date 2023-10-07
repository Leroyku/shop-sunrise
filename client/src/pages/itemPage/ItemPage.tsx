import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { Helmet } from 'react-helmet';

import { Scrollbars } from 'react-custom-scrollbars-2';

import Services from '../../components/Services';
import ItemSkeleton from './itemSkeleton';
import ItemSlider from '../../components/slider/Slider';
import ImageBlock from './imageBlock/ImageBlock';

import { addItem, removeItem, minusItem } from '../../redux/slices/cartSlice';

import styles from './ItemPage.module.scss';

interface Product {
  category: string;
  categorylink: string;
  description: string;
  images: string[];
  name: string;
  price: number;
  product_id: string;
  stock: number;
  updated: string;
  video: string;
  meta: string;
  [key: string]: string | number | string[];
}

function ItemPage() {
  const dispatch = useAppDispatch();

  let { category, id } = useParams();
  const { categories } = useAppSelector((state) => state.categories);

  const cartAdded = useAppSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const Service = new Services();

  const [contentHeight, setContentHeight] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryLink, setCategoryLink] = useState<string>('');
  const [itemLink, setItemLink] = useState<string>('');
  const scrollbarsRef = useRef<Scrollbars>(null);
  const desRef = useRef<HTMLDivElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [miniImages, setMiniImages] = useState<string[]>([]);
  const [mobW, setMobW] = useState<boolean>(false);
  const [mobWH, setMobWH] = useState<number>(400);
  const [slidesCount, setSlidesCount] = useState<number>(4);
  const [mobVersion, setMobVersion] = useState<boolean>(false);

  const [group, setGroup] = useState<string>('');
  const [characteristic, setCharacteristic] = useState<string>('');
  const [data, setData] = useState<Product>({
    category: '',
    categorylink: '',
    description: '',
    images: [],
    name: '',
    price: 0,
    product_id: '',
    stock: 0,
    updated: '',
    video: '',
    meta: '',
  });

  useEffect(() => {
    categories.map((item) => {
      if (item.category_link === category) {
        Service.getData(item.category_name, undefined, undefined, String(id)).then((res) => {
          setData(res[0]);
          generateCharacteristicFromKeys(res[0]);
          setIsLoading(false);
        });
        setCategoryName(item.category_name);
        setCategoryLink(`/catalog/${item.category_link}?sort=price-asc`);
        setItemLink(`/${item.category_link}`);
        setGroup(item.category_name);
      }
    });
    window.scroll({
      left: 0,
      top: 0,
    });
    if (scrollbarsRef.current) {
      scrollbarsRef.current.scrollToTop();
    }
  }, [id, categories]);

  const handleWindowResize = () => {
    if (rootRef.current) {
      const newInnerWidth = rootRef.current.clientWidth;

      if (newInnerWidth <= 740) {
        setMobW(true);
      } else {
        setMobW(false);
      }

      if (newInnerWidth <= 520) {
        setMobW(true);
        setMobVersion(true);
      } else {
        setMobVersion(false);
      }

      if (newInnerWidth <= 400) {
        setSlidesCount(3);
      } else {
        setSlidesCount(4);
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
    // if (data.name) document.title = data.name;
    if (data.video) {
      setSelectedImageIndex(1);
      setMiniImages([data.video, ...data.images]);
    }
    if (!data.video) {
      setSelectedImageIndex(0);
      setMiniImages([...data.images]);
    }

    setContentHeight(0);
  }, [data]);

  useEffect(() => {
    if (desRef.current) {
      setContentHeight(desRef.current.offsetHeight);
    }
  }, [contentHeight, desRef.current]);
  function generateCharacteristicFromKeys(obj: Product) {
    const formattedKeys = Object.keys(obj)
      .filter((key) => /[а-яА-Я]/.test(key))
      .map((key) => {
        const words = key.split('_');
        const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        const formattedKey = formattedWords.join(' ');

        return `${formattedKey}: ${obj[key]}`;
      })
      .join('\n');

    setCharacteristic(formattedKeys);
  }

  const onClickAdd = () => {
    const name = data.name;
    const price = data.price;
    const image = data.images;
    const stock = data.stock;
    const category = categoryLink;

    const item = {
      id: id,
      name,
      price,
      image,
      stock,
      category,
    };

    dispatch(addItem(item));
  };
  const onClickRemove = () => {
    dispatch(removeItem(id));
  };

  const onClickPlus = () => {
    if (cartAdded?.count !== undefined && cartAdded.count < 10) {
      dispatch(addItem({ id }));
    }
  };
  const onClickMinus = () => {
    if (cartAdded?.count === 1) {
      dispatch(removeItem(id));
    }
    dispatch(minusItem(id));
  };

  return (
    <div ref={rootRef} className={styles.root}>
      {data.meta && data.description && (
        <Helmet>
          <title>{data.meta.split('Заголовок: ')[1].trim().split('Ключи: ')[0].trim()}</title>
          <meta name="description" content={data.description.replace(/\n/g, ' ').slice(0, 160)} />
          <meta name="keywords" content={data.meta?.split('Ключи: ')[1].trim()} />
        </Helmet>
      )}
      <p className={styles.path}>
        <Link className={styles.links} to="/catalog">
          Каталог /{' '}
        </Link>
        <Link className={styles.links} to={categoryLink}>
          {categoryName}
        </Link>{' '}
        / {data.name}
      </p>
      <div className={styles.container}>
        {isLoading ? (
          <ItemSkeleton mobWH={mobWH - 50} mobW={mobW} />
        ) : (
          <>
            <div className={styles.left}>
              <ImageBlock
                slidesCount={slidesCount}
                mobW={mobW}
                miniImages={miniImages}
                selectedImageIndex={selectedImageIndex}
                setSelectedImageIndex={setSelectedImageIndex}
                data={data}
              />
            </div>
            <div className={styles.right}>
              <div className={styles.characteristic}>
                {characteristic &&
                  characteristic.split('\n').map((line, index) => {
                    const [left, right] = line.split(':');
                    return (
                      <div key={index} className={styles.lines}>
                        <span className={styles.leftL}>{left}:</span>{' '}
                        <span className={styles.rightL}>{right}</span> <br />
                      </div>
                    );
                  })}
              </div>
              <div className={styles.priceBlock}>
                <h2>{data.price} ₽</h2>
                <div className={styles.priceBlockBottom}>
                  <div className={styles.cartBut}>
                    {+data.stock <= 0 ? (
                      <p className={styles.none}>Товара нет в наличии</p>
                    ) : cartAdded ? (
                      <>
                        <Link to="/cart">
                          <div style={{ width: 'fit-content' }} className={styles.cart}>
                            В корзину
                          </div>
                        </Link>
                        <div className={styles.math}>
                          <span onClick={onClickMinus} className={styles.decrease}>
                            -
                          </span>

                          <p>{cartAdded?.count}</p>
                          <span onClick={onClickPlus} className={styles.increase}>
                            +
                          </span>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={cartAdded ? onClickRemove : onClickAdd}
                        className={styles.cart}>
                        Добавить в корзину
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className={styles.des}>
        <span style={{ fontSize: '18px' }}>
          Описание:
          <br />
        </span>
        {data?.description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            <span className={styles.lines}>{line}</span>
            <br />
          </React.Fragment>
        ))}
      </div>
      <h2 className={styles.btTitle}>С этим покупают:</h2>
      <div className={styles.bottom}>
        <ItemSlider mobVersion={mobVersion} groupId={group} pathname={itemLink} />
      </div>
    </div>
  );
}

export default ItemPage;
