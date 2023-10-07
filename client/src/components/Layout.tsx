import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAppDispatch, useAppSelector } from '../utils/hook';

import Header from './Header';
import Menu from './mobMenu/MobMenu';
import HeaderInformation from './HeaderInformation';
import Categories from './Categories';
import FullHeader from './fullHeader';
import MobBottomMenu from './mobBottomMenu/MobBottomMenu';
import Footer from './footer/Footer';

import { Outlet } from 'react-router-dom';

import Services from '../components/Services';
import { setCategories } from '../redux/slices/categorySlice';
import { setMobFiltres } from '../redux/slices/sortSlice';

function Layout() {
  const Service = new Services();
  const {} = useAppSelector((state) => state.categories);
  const { mobFiltres } = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  const mobRef = useRef<HTMLDivElement>(null);
  const { ref: categoriesRef, inView: categoriesIsVisible } = useInView();
  const links = ['/', '/about', '/catalog', '/constructor', '/reviews', '/delivery', '/contacts'];

  useEffect(() => {
    Service.getCategories().then((res) => {
      dispatch(setCategories({ categories: res }));
    });
  }, []);

  return (
    <div className="layout">
      {!mobFiltres && (
        <>
          <Header categoriesIsVisible={categoriesIsVisible} mobRef={mobRef} />
          <MobBottomMenu mobRef={mobRef} />
        </>
      )}
      {mobFiltres && (
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            zIndex: '99999',
            width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0c0c0c',
          }}
          onClick={() => dispatch(setMobFiltres(false))}>
          <span
            style={{
              color: '#0c0c0c',
              backgroundColor: '#fa9017',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px',
              width: '90%',
              borderRadius: '5px',
            }}>
            Применить
          </span>
        </div>
      )}

      <Menu />
      <div className="content">
        <div ref={categoriesRef}>
          <HeaderInformation />
        </div>
        <div className="fullHeader_categories">
          <Categories categoriesIsVisible={categoriesIsVisible} links={links} mobRef={mobRef} />
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
