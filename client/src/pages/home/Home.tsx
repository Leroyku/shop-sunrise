import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import { Link } from 'react-router-dom';

import { setCurrentSort } from '../../redux/slices/sortSlice';

import { Helmet } from 'react-helmet';

import VkWidjet from './vkWidget/VkWidget';
import About from './about/About';

import Slider from '../../components/Carousel';
import ItemSlider from '../../components/slider/Slider';

import HomeCatalog from './homeCatalog/HomeCatalog';

import styles from './Home.module.scss';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const { currentSort } = useAppSelector((state) => state.sort);

  const [sizeCount, setSizeCount] = useState<number>(8);
  const [mobVersion, setMobVersion] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const handleWindowResize = () => {
    if (rootRef.current) {
      const newInnerWidth = rootRef.current.clientWidth;
      if (newInnerWidth >= 770) {
        setSizeCount(8);
      }
      if (newInnerWidth <= 770) {
        setSizeCount(7);
      }
      if (newInnerWidth <= 650) {
        setSizeCount(5);
      }
      if (newInnerWidth <= 520) {
        setSizeCount(4);
        setMobVersion(true);
      }
      if (newInnerWidth >= 520) {
        setMobVersion(false);
      }

      if (newInnerWidth <= 400) {
        setSizeCount(3);
      }
      // if (newInnerWidth <= 360) {
      //   setSizeCount(2);
      // }
    }
  };
  useEffect(() => {
    // document.title = 'SunRise';

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.container}>
      <Helmet>
        <title>Страйкбольная лавка SunRise</title>
        <meta
          name="description"
          content="Страйкбольная лавка «SunRise» – это магазин страйкбольного оружия и экипировки в городах Нижний Новгород и Дзержинск. Мы осуществляем продажу страйкбольного оружия, комплектующих, расходников и снаряжения."
        />
        <meta
          name="keywords"
          content="Sunrise, Санрайз,Страйкбол, Airsoft, Нижний новгород, Дзержинск"
        />
      </Helmet>
      <div className={styles.sides}>
        <div className={styles.left}>
          <div style={{ minHeight: '620px' }} className={styles.smallBlock}>
            <VkWidjet />
          </div>
          <div className={styles.smallBlock}>
            <About />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.blockC}>
            <Slider />
          </div>
          <div style={{ minHeight: '105px' }} className={styles.block}>
            <HomeCatalog sizeCount={sizeCount} />
          </div>
          <div style={{ flexGrow: '1' }} className={styles.block}>
            <div className={styles.title}>
              <Link to="/catalog/newarrivals?sort=newest">
                <h2>Новинки:</h2>
                <p>Все товары...</p>
              </Link>
            </div>
            <ItemSlider mobVersion={mobVersion} groupId={'1. Все товары'} />
          </div>
        </div>
      </div>

      {categories.map((item, index) => {
        if (
          item.category_name != 'Газ' &&
          item.category_name != 'Акб и электроника' &&
          item.category_name != 'Ремонтные комплектующие' &&
          item.category_name != 'Связь' &&
          item.category_name != 'Магазины'
        )
          return (
            <div
              key={index}
              style={{ marginBottom: index === categories.length - 1 ? '0' : '3px' }}
              className={styles.block}>
              <div className={styles.title}>
                <Link to={`/catalog/${item.category_link}?sort=price-asc`}>
                  <h2>{item.category_name}:</h2>
                  <p>Все товары...</p>
                </Link>
              </div>
              <ItemSlider
                mobVersion={mobVersion}
                groupId={item.category_name}
                pathname={`/${item.category_link}`}
              />
            </div>
          );
      })}
    </div>
  );
};

export default Home;
