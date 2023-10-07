import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const prom = localStorage.getItem('promocode');
  const items = data ? JSON.parse(data) : [];
  const promocodeRes = prom ? JSON.parse(prom) : { proms: [] };
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    promocodeRes,
    totalPrice,
  };
};
