import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import Item from '../../components/itemBlock/Item';
import Skeleton from '../../components/itemBlock/Skeleton';
import Services from '../../components/Services';

import { IProducts } from '../../redux/slices/categorySlice';

interface SwiperCarouselProps {
  groupId?: string;
  pathname?: string;
  fullD?: boolean;
  mobVersion?: boolean;
}
type INewArrivals = {
  total: number;
  items: IProducts[];
};

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({
  pathname,
  groupId,
  fullD,
  mobVersion,
}) => {
  const { categories } = useAppSelector((state) => state.categories);
  const Service = new Services();
  const itemWidth = mobVersion ? 145 : 230;

  const parentRef = useRef<HTMLDivElement | null>(null);

  const [visibleItems, setVisibleItems] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [spaceBetween, setSpaceBetween] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [data, setData] = useState<IProducts[]>([]);

  // const categories: { [key: string]: string } = {
  //   ПИРОТЕХНИКА: 'pyrotechnics',
  //   ШАРЫ: 'balls',
  //   ГАЗ: 'gas',
  //   'ВНЕШНИЙ ТЮНИНГ': 'tuning',
  //   'СНАРЯЖЕНИЕ И ЗАЩИТА': 'equipment',
  //   МАГАЗИНЫ: 'magazines',
  //   СВЯЗЬ: 'radio',
  //   'АКБ И ЭЛЕКТРОНИКА': 'battery',
  //   'РЕМОНТНЫЕ КОМПЛЕКТУЮЩИЕ': 'sparepart',
  //   ВООРУЖЕНИЕ: 'weapon',
  //   ШЕВРОНЫ: 'chevrons',
  // };

  useEffect(() => {
    if (groupId)
      Service.getData(groupId, undefined, true).then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, [groupId]);
  // useEffect(() => {
  //   if (fullD) {
  //     Service.getNewArrivals(1, true).then((res: INewArrivals) => {
  //       setData(res.items);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [categories]);

  useEffect(() => {
    const calculateVisibleItems = () => {
      if (parentRef.current) {
        const containerWidth = parentRef.current.offsetWidth;

        let calculatedVisibleItems = Math.floor(containerWidth / (itemWidth + 10));

        let calculatedSpaceBetween =
          calculatedVisibleItems > 1
            ? (containerWidth - calculatedVisibleItems * itemWidth) / (calculatedVisibleItems - 1)
            : 0;
        if (calculatedVisibleItems === 1) {
          calculatedSpaceBetween = (containerWidth - itemWidth) / 2;
        } else {
          calculatedSpaceBetween = Math.max(calculatedSpaceBetween, 10);
        }

        if (calculatedVisibleItems < 1) {
          calculatedVisibleItems = 1;
        }

        setVisibleItems(calculatedVisibleItems);
        setSpaceBetween(calculatedSpaceBetween);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleItems();
    });

    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [itemWidth, spaceBetween, mobVersion]);

  const handleNextSlide = () => {
    if (visibleItems === 1) {
      const nextSlide = currentSlide + 1;
      const maxSlide = data.length - 1;
      setCurrentSlide(nextSlide > maxSlide ? maxSlide : nextSlide);
    } else {
      setCurrentSlide((prev) => Math.min(prev + 1, data.length - visibleItems));
    }
  };

  const handlePrevSlide = () => {
    if (visibleItems === 1) {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '10px',
      }}>
      <div ref={parentRef} style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
          <button
            onClick={handlePrevSlide}
            style={{
              position: 'absolute',
              left: -15,
              height: mobVersion ? '40px' : '70px',
              background: '#161616',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '0 10px 10px 0',
              border: 'none',
              outline: 'none',
              zIndex: 1,
              cursor: 'pointer',
              visibility: currentSlide === 0 ? 'hidden' : 'visible',
            }}>
            <IoIosArrowBack size={mobVersion ? 20 : 40} style={{ color: 'rgb(250, 144, 23)' }} />
          </button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',

              transform: `translateX(-${
                currentSlide * (itemWidth + (visibleItems === 1 ? spaceBetween * 2 : spaceBetween))
              }px)`,
              transition: 'transform 0.3s ease',
            }}>
            {isLoading
              ? [...new Array(9)].map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: `${itemWidth}px`,
                      marginRight: index === data.length - 1 ? 0 : `${spaceBetween}px`,
                      marginLeft: visibleItems === 1 ? `${spaceBetween}px` : '0',
                    }}>
                    <Skeleton mobHome={mobVersion} />
                  </div>
                ))
              : data.map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      width: `${itemWidth}px`,
                      marginRight: index === data.length - 1 ? 0 : `${spaceBetween}px`,
                      marginLeft: visibleItems === 1 ? `${spaceBetween}px` : '0',
                    }}>
                    <Item
                      pathname={`/${item.categorylink}`}
                      mobHome={mobVersion}
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.images}
                      stock={item.stock}
                    />
                  </div>
                ))}
          </div>

          <button
            onClick={handleNextSlide}
            style={{
              position: 'absolute',
              right: -15,
              height: mobVersion ? '40px' : '70px',
              display: 'flex',
              alignItems: 'center',
              background: '#161616',
              padding: '5px',
              borderRadius: '10px 0 0 10px',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              visibility: currentSlide === data.length - visibleItems ? 'hidden' : 'visible',
            }}>
            <IoIosArrowForward size={mobVersion ? 20 : 40} style={{ color: 'rgb(250, 144, 23)' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwiperCarousel;
