import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hook';

import Services from '../../../components/Services';
import CustomModal from '../modal/CustomModal';

import { addPromocode } from '../../../redux/slices/cartSlice';

import styles from './Promocode.module.scss';

const Promocode: React.FC = () => {
  const Service = new Services();

  const dispatch = useAppDispatch();
  const { promocodeRes, totalPrice } = useAppSelector((state) => state.cart);

  const [check, setCheck] = useState<boolean>(false);
  const [promocode, setPromocode] = useState<string>('');
  const [promocodeE, setPromocodeE] = useState<boolean>(false);

  type resPromType = {
    id: number;
    promocode: string;
    stock: string;
    value: string;
  };
  const [response, setResponse] = useState<{ proms: resPromType[] }>({ proms: [] });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    if (check) {
      Service.getPromocode(promocode)
        .then((res) => {
          setResponse({ proms: res.items });
          setCheck(false);

          if (
            res.items.length != 0 &&
            (res.items[0].stock > 0 || res.items[0].stock === 'infinity')
          ) {
            setPromocodeE(true);
            setMsg(`Промокод на ${res.items[0].value}`);
          }

          if (res.items.length === 0 || +res.items[0]?.stock === 0) {
            setPromocodeE(false);
            setMsg(`Такого промокода нет!`);
          }
          if (promocodeRes.proms.length > 0) {
            setMsg(`У вас уже применен промокод на ${promocodeRes.proms[0].value}!`);
            setPromocodeE(false);
          }
          const promocodeValue = res.items[0].value;
          if (promocodeValue.includes('р')) {
            const discountValue = parseFloat(promocodeValue);
            if (totalPrice < discountValue) {
              setPromocodeE(false);
              setMsg(
                `Этот промокод можно применить, когда сумма заказа ${discountValue} или больше!`,
              );
            }
          }

          setShowModal(true);
        })
        .catch((error) => {
          setPromocodeE(false);
          setMsg(`Такого промокода нет!`);
          setShowModal(true);
        });
    }
  }, [check, promocode]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(event.target.value);
  };

  const handleCheckButtonClick = () => {
    if (promocode) {
      setCheck(true);
    }
  };

  const handleConfirmClear = () => {
    const hasValidPromocode =
      response.proms.length !== 0 &&
      (+response.proms[0].stock > 0 || response.proms[0].stock === 'infinity');

    if (hasValidPromocode) {
      const promocodeValue = response.proms[0].value;
      const discountValue = parseFloat(promocodeValue);

      if (promocodeValue.includes('р') && totalPrice >= discountValue) {
        if (promocodeRes.proms.length === 0) {
          dispatch(addPromocode({ prom: response }));
        }
      } else if (promocodeRes.proms.length === 0 && !promocodeValue.includes('р')) {
        dispatch(addPromocode({ prom: response }));
      }
    }
    setPromocodeE(false);
    setShowModal(false);
  };
  const handleCancelClear = () => {
    setPromocodeE(false);
    setShowModal(false);
  };

  return (
    <div className={styles.root}>
      Промокод:
      <div className={styles.container}>
        <input
          type="text"
          value={promocode}
          onChange={handleInputChange}
          placeholder="Введите промокод"
        />
        <div onClick={handleCheckButtonClick}>Проверить</div>
      </div>
      {showModal && (
        <CustomModal
          promocodeE={promocodeE}
          promocode={true}
          message={msg}
          onConfirm={handleConfirmClear}
          onCancel={handleCancelClear}
        />
      )}
    </div>
  );
};

export default Promocode;
