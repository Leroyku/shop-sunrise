import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faVk } from '@fortawesome/free-brands-svg-icons';

import styles from './Delivery.module.scss';
import truck from '../../assets/img/delivery/truck.svg';
import trolley from '../../assets/img/orders/trolley.svg';
import storage from '../../assets/img/orders/storage.svg';

function Delivery() {
  useEffect(() => {
    // document.title = 'Доставка';
  }, []);
  return (
    <div className={styles.container}>
      <Helmet>
        <title>Заказать доставку страйкбольного снаряжения, оружия, шаров и оптовые закупки</title>
        <meta
          name="description"
          content="Способы и цена доставки из страйкбольной лавки Sunrise. Оптовые закупки"
        />
        <meta
          name="keywords"
          content="Sunrise Санрайз Страйкбол Airsoft опт оптовые закупки доставка"
        />
      </Helmet>
      <div className={styles.blockUp}>
        <div className={styles.left}>
          <div className={styles.text}>
            <h2>Самовывозом по адресу</h2>

            <p>-г.Нижний Новгород (ул.Юбилейная 41)</p>
            <p>В заранее согласованное время</p>
          </div>

          <div className={styles.text}>
            <h2>Доставка до двери в пределах Нижнего Новгорода</h2>

            <p>-г.Нижний Новгород</p>
            <p>Автозавод(150 рублей)</p>
            <p>Верхняя и нижняя части города (250 рублей)</p>
            <p>
              Отправка заказа производится в течении 1-3 рабочих дней со дня поступления оплаты на
              наш счет.
            </p>
          </div>
        </div>
        <div className={styles.rightUp}>
          <img src={truck} alt="truck" />
        </div>
      </div>

      <div className={styles.center}>
        <h2>Доставка по территории РФ транспортной компанией (СДЕК)</h2>

        <p>
          При обработке Вашего заказа, наши менеджеры подберут для Вас оптимальный способ доставки и
          рассчитают примерную стоимость. Если у Вас есть предпочтения по компании отправки,
          напишите об этом в графе «комментарии». Отправка заказа производится в течении 1-3 рабочих
          дней со дня поступления оплаты на наш счет.
        </p>
      </div>
      <div className={styles.block}>
        <div className={styles.leftB}>
          <img className={styles.image} src={storage} alt="storage" />
          <img className={styles.image} src={trolley} alt="trolley" />
        </div>
        <div className={styles.right}>
          <h1>Оптовые заказы</h1>
          <h2>По вопросам оптовых закупок обращаться на почту:</h2>
          <a className={styles.links} href="mailto:sunrise-airsoft152@yandex.ru">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>sunrise-airsoft152@yandex.ru</p>
          </a>

          <div className={styles.vkIcon}>
            <h2>
              Либо в личные сообщения ВКонтакте:
              <a href="https://vk.com/krot52" target="_blank">
                <FontAwesomeIcon icon={faVk} />
              </a>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
