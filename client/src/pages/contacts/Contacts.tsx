import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faVk, faTelegram, faViber, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import styles from './Contacts.module.scss';
import service from '../../assets/img/contacts/service.svg';
import media from '../../assets/img/contacts/media.png';

import Services from '../../components/Services';

const Contacts: React.FC = () => {
  const Service = new Services();

  useEffect(() => {
    document.title = 'Контакты';
  }, []);
  interface ISubmitData {
    firstName: string;
    email: string;
    comment: string;
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISubmitData>({ mode: 'onSubmit' });

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    const req = {
      name: data.firstName,
      email: data.email,
      comment: data.comment,
    };

    Service.sendMessage(req, 2);
    reset();
  });

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.block}>
            <div className={styles.text}>
              <h2>Мессенджеры</h2>
              <p>Воспользуйтесь удобным для Вас способом, чтобы связаться с нами</p>
              <div className={styles.medias}>
                <a href="">
                  <FontAwesomeIcon icon={faVk} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faTelegram} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faViber} />
                </a>
                <a href="">
                  <FontAwesomeIcon icon={faEnvelope} />
                </a>
              </div>
            </div>
            <img className={styles.image} src={media} alt="media" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.block}>
            <div className={styles.text}>
              <h2>Возникли трудности?</h2>
              <p>Наши сотрудники ответят на все Ваши вопросы</p>
              <div className={styles.button}>
                <a href="https://vk.com/im?media=&sel=739581589" target="_blank">
                  Задать вопрос
                </a>
              </div>
            </div>
            <img className={styles.image} src={service} alt="service" />
          </div>
        </div>
      </div>
      <div className={styles.blockСonnection}>
        <div className={styles.formBlock}>
          <form className={styles.form} onSubmit={onSubmit} action="">
            <h2>Связь с нами</h2>
            <div className={styles.inputsBlock}>
              <div className={styles.sides}>
                <label className={styles.labels}>
                  Ваше имя:
                  <input
                    placeholder="Ваше имя"
                    className={styles.inputs}
                    {...register('firstName', {
                      required: 'Поле обязательно к заполнению',
                    })}
                  />
                </label>
                <div>
                  {errors?.firstName && <p className={styles.errors}>{errors.firstName.message}</p>}
                </div>
              </div>
              <div className={styles.sides}>
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
                <div>
                  {errors?.email && <p className={styles.errors}>{errors.email.message}</p>}
                </div>
              </div>
            </div>

            <label className={styles.labels}>
              Комментарий:
              <textarea
                className={styles.textareas}
                id="textareas"
                cols={30}
                rows={10}
                {...register('comment', {
                  required: 'Поле обязательно к заполнению',
                })}></textarea>
            </label>

            <div>
              {errors?.comment && <p className={styles.errors}>{errors.comment.message}</p>}
            </div>
            <div className={styles.buttonBlock}>
              <button className={styles.buttonSend} type="submit">
                Отправить сообщение
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
