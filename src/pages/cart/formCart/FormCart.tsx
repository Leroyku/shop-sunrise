import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../utils/hook';

import Services from '../../../components/Services';
import RadioForCart from './Radio';

import styles from './formCart.module.scss';

import { clearItems } from '../../../redux/slices/cartSlice';
// import { set } from 'immer/dist/internal';

interface IFormCart {
  setDone: (done: boolean) => void;
}

const FormCart: React.FC<IFormCart> = ({ setDone }) => {
  const dispatch = useAppDispatch();

  const Service = new Services();

  const [justify, setJustify] = useState<string>('Самовывоз');

  const { items, totalPrice } = useAppSelector((state) => state.cart);

  const [delivery, setDelivery] = useState<boolean>(false);

  interface ISubmitData {
    firstName: string;
    email: string;
    telephone: string;
    comment: string;
    address: string;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISubmitData>({ mode: 'onSubmit' });

  const onSubmit = handleSubmit((data) => {
    const req = {
      price: totalPrice,
      name: data.firstName,
      email: data.email,
      tel: data.telephone,
      delivery: justify,
      address: data.address ? data.address : '',
      comment: data.comment,
      items: items,
    };

    Service.sendMessage(req, 1);
    reset();
    dispatch(clearItems());
    setDone(true);
  });

  useEffect(() => {
    setDone(false);
    const phone = document.querySelector('input[data-tel-input]');
    if (phone) {
      phone.addEventListener('input', onPhoneInput);
      phone.addEventListener('keydown', onPhoneKeyDown);
    }

    return () => {
      if (phone) {
        phone.removeEventListener('input', onPhoneInput);
        phone.removeEventListener('keydown', onPhoneKeyDown);
      }
    };
  }, []);

  const getInputNumbersValue = (input: EventTarget & HTMLInputElement) => {
    return input.value.replace(/\D/g, '');
  };

  const onPhoneInput = (e: any) => {
    const input = e.target;
    let inputValue = getInputNumbersValue(input);
    let formattedInputValue = '';
    let selectionStart = input.selectionStart;

    if (!inputValue) return (input.value = '');

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputValue;
      }
      return;
    }

    if (['7', '8', '9'].indexOf(inputValue[0]) > -1) {
      if (inputValue[0] == '9') inputValue = '7' + inputValue;
      const firstSymbols = inputValue[0] == '8' ? '8' : '+7';
      formattedInputValue = firstSymbols + ' ';
      if (inputValue.length > 1) {
        formattedInputValue += '(' + inputValue.substring(1, 4);
      }
      if (inputValue.length >= 5) {
        formattedInputValue += ') ' + inputValue.substring(4, 7);
      }
      if (inputValue.length >= 8) {
        formattedInputValue += '-' + inputValue.substring(7, 9);
      }
      if (inputValue.length >= 10) {
        formattedInputValue += '-' + inputValue.substring(9, 11);
      }
    } else {
      formattedInputValue = input.value = '+' + inputValue.substring(0, 16);
    }

    input.value = formattedInputValue;
  };

  const onPhoneKeyDown = (e: any) => {
    const input = e.target;
    if (e.keyCode == 8 && getInputNumbersValue(input).length == 1) input.value = '';
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={onSubmit} action="">
        <label className={styles.labels}>
          Ваше имя:
          <input
            placeholder="ФИО"
            className={styles.inputs}
            {...register('firstName', {
              required: 'Поле обязательно к заполнению',
            })}
          />
        </label>
        <div>
          {errors?.firstName && <p className={styles.errors}>{errors.firstName.message}</p>}
        </div>
        <label className={styles.labels}>
          Ваш e-mail:
          <input
            type="email"
            placeholder="example@example.com"
            className={styles.inputs}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
            })}
          />
        </label>
        <div>{errors?.email && <p className={styles.errors}>{errors.email.message}</p>}</div>
        <label className={styles.labels}>
          Ваш телефон:
          <input
            data-tel-input
            type="tel"
            placeholder="+7 (___) ___ - __ - __"
            className={styles.inputs}
            {...register('telephone', {
              required: 'Поле обязательно к заполнению',
            })}
          />
        </label>
        <div>
          {errors?.telephone && <p className={styles.errors}>{errors.telephone.message}</p>}
        </div>
        <label className={styles.labels}>
          <RadioForCart setDelivery={setDelivery} justify={justify} setJustify={setJustify} />
        </label>
        {delivery ? (
          <>
            <label className={styles.labels}>
              Адрес доставки:
              <input
                placeholder="г. Нижний Новгород, ул. Ситнова, д.9..."
                className={styles.inputs}
                {...register('address', {
                  required: 'Поле обязательно к заполнению',
                })}
              />
            </label>
            <div>
              {errors?.address && <p className={styles.errors}>{errors.address.message}</p>}
            </div>
          </>
        ) : (
          <label className={styles.labels}>
            Самовывоз производится по адресам:
            <p>
              -г.Дзержинск (ул.Ситнова 4) <br />
              -г.Нижний Новгород (ул.Пермякова 32) <br />В заранее согласованное время
            </p>
          </label>
        )}
        <label className={styles.labels}>
          Комментарий:
          <textarea
            className={styles.textareas}
            id="textareas"
            cols={30}
            rows={3}
            {...register('comment', {
              required: false,
            })}></textarea>
        </label>
        <button className={styles.button} type="submit">
          Оформить заказ
        </button>
      </form>
    </div>
  );
};

export default FormCart;
