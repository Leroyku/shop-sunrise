import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hook';

import { addItem, removeItem } from '../../redux/slices/cartSlice';

interface IItem {
  name: string;
  price: number;
  image: string;
  id: number;
  pathname: string;
}

const Item: React.FC<IItem> = ({ name, price, image, id, pathname }) => {
  const dispatch = useAppDispatch();
  const cartAdded = useAppSelector((state) => state.cart.items.find((obj) => obj.id === id));

  const onClickAdd = () => {
    const item = {
      id,
      name,
      price,
      image,
    };
    dispatch(addItem(item));
  };

  const onClickRemove = () => {
    dispatch(removeItem(id));
  };

  return (
    <div className="item-block">
      <Link to={`/catalog${pathname}/${id}`}>
        <div className="item-block__bg">
          <img className="item-block__image" src={image} alt="Pizza" />
        </div>
      </Link>
      <Link to={`/catalog${pathname}/${id}`}>
        <h4 className="item-block__title">{name}</h4>
      </Link>
      <div className="item-block__bottom">
        <div className="item-block__price">{price} ₽</div>
        <button
          onClick={cartAdded ? onClickRemove : onClickAdd}
          className="button button--outline button--add">
          <span>{cartAdded ? '✓' : '+'}</span>
        </button>
      </div>
    </div>
  );
};

export default Item;
