import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import { addItem, removeItem } from '../../redux/slices/cartSlice';

import Services from '../../components/Services';
import Item from '../../components/itemBlock/Item';
import Skeleton from '../../components/itemBlock/Skeleton';
import ItemSkeleton from './itemSkeleton';

import styles from './ItemPage.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ItemPage() {
  const dispatch = useAppDispatch();

  let { category, id } = useParams();
  const { categories } = useAppSelector((state) => state.categoryFull);
  const cartAdded = useAppSelector((state) =>
    state.cart.items.find((obj) => obj.id === Number(id)),
  );
  const Service = new Services();

  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryLink, setCategoryLink] = useState<string>('');
  const [itemLink, setItemLink] = useState<string>('');

  interface IDataGroup {
    pathname: string;
    key: string;
    id: number | string;
    name: string;
    price: number;
    images: string;
  }

  const [dataGroup, setDataGroup] = useState<{ items: IDataGroup[] }>({ items: [] });
  const [data, setData] = useState({
    id: '',
    name: '',
    price: '',
    old_price: '',
    stock: '',
    images: '',
    sort: '',
    variant_name: '',
    description: '',
  });

  useEffect(() => {
    Service.getItem(id).then((res) => {
      setData(res.items[0]);
      setIsLoading(false);
    });
    categories.map((item) => {
      if (item.href.indexOf(category ? category : '') != -1) {
        setCategoryName(item.value);
        setCategoryLink(`/catalog${item.href}`);
        setItemLink(item.href);
        Service.getGroupItems(item.group).then((res) => {
          setDataGroup(res);
        });
      }
    });
    window.scroll({
      left: 0,
      top: 0,
    });
  }, [id]);
  useEffect(() => {
    document.title = 'Товары';
  }, []);

  const onClickAdd = () => {
    const name = data.name;
    const price = data.price;
    const image = data.images;

    const item = {
      id,
      name,
      price,
      image,
    };

    dispatch(addItem(item));
  };

  const onClickRemove = () => {
    dispatch(removeItem(Number(id)));
  };

  return (
    <div className={styles.root}>
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
          <ItemSkeleton />
        ) : (
          <>
            <div className={styles.left}>
              <div className={styles.image}>
                <img className={styles.img} src={data.images} alt="item image" />
              </div>
            </div>
            <div className={styles.right}>
              <h2>
                <span>Стоимость:</span> {data.price} ₽
              </h2>
              <p>
                <span>Описание:</span> {data.description}
              </p>
              <button onClick={cartAdded ? onClickRemove : onClickAdd} className={styles.cart}>
                {cartAdded ? '✓' : '+'}
              </button>
            </div>
          </>
        )}
      </div>
      <h2 className={styles.btTitle}>С этим покупают:</h2>
      <div className={styles.bottom}>
        <Swiper
          modules={[Navigation]}
          simulateTouch={false}
          spaceBetween={11}
          slidesPerView={4}
          navigation
          loop={true}>
          {isLoading
            ? [...new Array(4)].map((_, index) => (
                <SwiperSlide key={index}>
                  <Skeleton />
                </SwiperSlide>
              ))
            : dataGroup.items.map((item) => (
                <SwiperSlide key={item.id}>
                  <Item
                    pathname={itemLink}
                    key={item.id}
                    id={Number(item.id)}
                    name={item.name}
                    price={item.price}
                    image={item.images}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ItemPage;
