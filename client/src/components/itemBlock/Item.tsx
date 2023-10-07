import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { addItem, removeItem, minusItem } from '../../redux/slices/cartSlice';

import noImage from '../../assets/img/noimage/no-image.svg';

interface IItem {
  name: string;
  price: number;
  image: string[];
  id: number | string;
  pathname?: string;
  stock: number | string;
  mobCategory?: boolean;
  mobHome?: boolean;
}

const Item: React.FC<IItem> = ({
  name,
  price,
  image,
  id,
  pathname,
  stock,
  mobCategory,
  mobHome,
}) => {
  const dispatch = useAppDispatch();
  const cartAdded = useAppSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const numInvisibleBlocks = Math.min(5, image.length);
  const invisibleBlockWidth = mobHome ? 145 / image.length : 250 / image.length;

  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const [addedItem, setAddedItem] = useState<boolean>(false);

  useEffect(() => {
    if (cartAdded && cartAdded.count) setAddedItem(true);

    if (!cartAdded) setAddedItem(false);
  }, [cartAdded, cartAdded?.count]);

  const onClickAdd = () => {
    const category = `/catalog${pathname}`;
    const item = {
      id,
      name,
      price,
      image,
      stock,
      category,
    };
    dispatch(addItem(item));
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
    <div className={mobCategory ? 'item-block-mob' : `item-block ${mobHome && 'mini-block'}`}>
      <Link to={`/catalog${pathname}/${id}`}>
        <div
          className={
            mobCategory
              ? 'item-block__imageBlock item-block-mob__imageBlock'
              : `item-block__imageBlock ${mobHome && 'mini-imageBlock'}`
          }>
          <div
            className={
              mobCategory ? 'item-block-mob__bg' : `item-block__bg ${mobHome && 'mini-bg'}`
            }>
            <img
              className={
                mobCategory
                  ? 'item-block-mob__image'
                  : `item-block__image ${mobHome && 'mini-image'}`
              }
              src={image[hoveredIndex] || noImage}
              alt=""
            />
          </div>
          {image.length > 1 && (
            <div className="invisible-blocks-container">
              {[...Array(numInvisibleBlocks)].map((_, index) => (
                <div
                  key={index}
                  className="invisible-block"
                  style={{ width: `${invisibleBlockWidth}%` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(0)}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
      <div className="dots">
        <>
          {[...Array(numInvisibleBlocks)].map((_, index) => (
            <div
              key={index}
              className="dot"
              style={{ backgroundColor: hoveredIndex === index ? '#fb9118' : '#8a8a8d' }}></div>
          ))}
        </>
      </div>
      <div
        className={
          mobCategory ? 'item-block-mob__price' : `item-block__price ${mobHome && 'mini-price'}`
        }>
        {price} ₽
      </div>
      <Link to={`/catalog${pathname}/${id}`}>
        <h4
          className={
            mobCategory ? 'item-block-mob__title' : `item-block__title ${mobHome && 'mini-title'}`
          }>
          {name}
        </h4>
      </Link>
      <div
        className={
          mobCategory ? 'item-block-mob__bottom' : `item-block__bottom ${mobHome && 'mini-bottom'}`
        }>
        {+stock <= 0 ? (
          <div className="item-block__no">Нет в наличии</div>
        ) : addedItem ? (
          <>
            <Link to="/cart">
              <div
                style={{ width: 'fit-content' }}
                className={mobCategory ? 'cart cart-mob' : `cart ${mobHome && 'mini-none'}`}>
                В корзину
              </div>
            </Link>
            <div className={`math ${mobHome && 'mini-math'}`}>
              <span onClick={onClickMinus} className={`decrease ${mobHome && 'mini-decrease'}`}>
                -
              </span>
              <div>{cartAdded?.count}</div>
              <span onClick={onClickPlus} className={`increase ${mobHome && 'mini-increase'}`}>
                +
              </span>
            </div>
          </>
        ) : (
          <button
            onClick={onClickAdd}
            className={
              mobCategory
                ? 'button button--outline button--add button-mob'
                : `button button--outline button--add ${mobHome && 'mini-button-add'}`
            }>
            <span>{mobHome ? 'В корзину' : 'Добавить в корзину'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
