import Header from './Header';
import StickyHeader from './stickyHeader/StickyHeader';
import HeaderInformation from './HeaderInformation';
import Categories from './Categories';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../utils/hook';
import { useInView } from 'react-intersection-observer';

import { disableMenu } from '../redux/slices/dropMenuSlice';

function FullHeader() {
  const { categories } = useAppSelector((state) => state.categoryFull);
  const dispatch = useAppDispatch();

  const { ref: categoriesRef, inView: categoriesIsVisible } = useInView();

  const links = ['/', '/reviews', '/delivery', '/contacts'];

  useEffect(() => {
    dispatch(disableMenu());
  }, [categoriesIsVisible]);

  return (
    <>
      <div className={categoriesIsVisible ? '' : 'app__header__sticky'}>
        {categoriesIsVisible ? <Header /> : <StickyHeader />}
      </div>
      <div ref={categoriesRef}>
        <HeaderInformation />
      </div>
      <div>
        <Categories categoriesIsVisible={categoriesIsVisible} links={links} />
      </div>
    </>
  );
}

export default FullHeader;
