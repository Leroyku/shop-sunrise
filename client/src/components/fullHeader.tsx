import Header from './Header';
import HeaderInformation from './HeaderInformation';
import Categories from './Categories';
import Menu from './mobMenu/MobMenu';

import { useAppDispatch, useAppSelector } from '../utils/hook';
import { useInView } from 'react-intersection-observer';

interface IFullHeader {
  mobRef: React.RefObject<HTMLDivElement>;
}

const FullHeader: React.FC<IFullHeader> = ({ mobRef }) => {
  const dispatch = useAppDispatch();
  const { ref: categoriesRef, inView: categoriesIsVisible } = useInView();
  const links = ['/', '/about', '/constructor', '/reviews', '/delivery', '/contacts'];

  return (
    <>
      <Header categoriesIsVisible={categoriesIsVisible} mobRef={mobRef} />

      <Menu />
      <div ref={categoriesRef}>
        <HeaderInformation />
      </div>
      <div className="fullHeader_categories">
        <Categories categoriesIsVisible={categoriesIsVisible} links={links} mobRef={mobRef} />
      </div>
    </>
  );
};

export default FullHeader;
