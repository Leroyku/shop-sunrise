import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Sidebar from './sidebar/Sidebar';
import VkWidjet from './vkWidget/VkWidget';
import About from './about/About';

import Slider from '../../components/Carousel';
import Item from '../../components/itemBlock/Item';
import Skeleton from '../../components/itemBlock/Skeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Services from '../../components/Services';

import styles from './Home.module.scss';
import './HomeSwiper.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home: React.FC = () => {
  const Service = new Services();

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMagazines, setIsLoadingMagazines] = useState(true);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);

  interface IData {
    id: number;
    price: number;
    name: string;
    images: string;
  }

  const [dataBalls, setDataBalls] = useState<{
    items: IData[];
  }>({
    items: [],
  });
  const [dataMagazines, setDataMagazines] = useState<{
    items: IData[];
  }>({
    items: [],
  });
  const [dataEquipment, setDataEquipment] = useState<{
    items: IData[];
  }>({
    items: [],
  });
  useEffect(() => {
    document.title = 'SunRise';

    Service.getGroupItems(1).then((res) => {
      setDataBalls(res);
      setIsLoading(false);
    });
    Service.getGroupItems(6).then((res) => {
      setDataMagazines(res);
      setIsLoadingMagazines(false);
    });
    Service.getGroupItems(2).then((res) => {
      setDataEquipment(res);
      setIsLoadingEquipment(false);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.block}>
          <Sidebar />
        </div>
        <div className={styles.smallBlock}>
          <VkWidjet />
        </div>
        <div className={styles.smallBlock}>
          <About />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.block}>
          <Slider />
        </div>
        <div className={styles.block}>
          <div className={styles.title}>
            <Link to="/catalog/balls">
              <h2>Шары:</h2>
            </Link>
          </div>
          <Swiper
            modules={[Navigation]}
            simulateTouch={false}
            spaceBetween={12}
            slidesPerView={3}
            navigation
            loop={true}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              1150: {
                slidesPerView: 3,
              },
            }}>
            {isLoading
              ? [...new Array(3)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <Skeleton />
                  </SwiperSlide>
                ))
              : dataBalls.items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Item
                      pathname="/balls"
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.images}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
        <div className={styles.block}>
          <div className={styles.title}>
            <Link to="/catalog/pyrotechnics">
              <h2>Пиротехника:</h2>
            </Link>
          </div>

          <Swiper
            modules={[Navigation]}
            simulateTouch={false}
            spaceBetween={12}
            slidesPerView={3}
            navigation
            loop={true}>
            {isLoadingEquipment
              ? [...new Array(3)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <Skeleton />
                  </SwiperSlide>
                ))
              : dataEquipment.items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Item
                      pathname="/pyrotechnics"
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.images}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>

        <div className={styles.block}>
          <div className={styles.title}>
            <Link to="/catalog/magazines">
              <h2>Магазины и лоудеры:</h2>
            </Link>
          </div>
          <Swiper
            modules={[Navigation]}
            simulateTouch={false}
            spaceBetween={12}
            slidesPerView={3}
            navigation
            loop={true}>
            {isLoadingMagazines
              ? [...new Array(3)].map((_, index) => (
                  <SwiperSlide key={index}>
                    <Skeleton />
                  </SwiperSlide>
                ))
              : dataMagazines.items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Item
                      pathname="/magazines"
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.images}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Home;
