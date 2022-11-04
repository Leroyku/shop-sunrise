import styles from './ReviewItem.module.scss';

import stars from '../../../assets/img/reviews/review.svg';

function ReviewItem() {
  return (
    <div className={styles.items}>
      <div className={styles.card}>
        <div className={styles.icontent}>
          <div className={styles.image}>
            <img
              src="https://sun9-82.userapi.com/impg/DaCf0p0ejuBUN7VUUZgFtBZLNGPCvKWgxs9rJw/SVXxgPmXYNA.jpg?size=1280x853&quality=95&sign=0ebb02bfb3cffd8f07da80823d950756&type=album"
              alt=""
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.ccontent}>
          <h2 className={styles.name}>Никита Белков</h2>
          <p className={styles.description}>
            Заказал пару патчей на новую плитоноску, качество огонь, изготовили быстро, ещё и цены
            очень низкие. Всем рекомендую!
          </p>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.icontent}>
          <div className={styles.image}>
            <img
              src="https://sun1-85.userapi.com/impg/_KtGtRoKDxzEl3oDDE9d3vH9JLm5xHu2Q_Hp_Q/0Ti0igVlpZQ.jpg?size=607x1080&quality=95&sign=d8fc25559aa0f2a8f5d4beb8a799065e&type=album"
              alt=""
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.ccontent}>
          <h2 className={styles.name}>Юрий Степушов</h2>
          <p className={styles.description}>
            Всегда заказываю расходники у Алексея, одни положительные эмоции, в который раз все по
            красоте, спасибо, что есть такой мини-магазинчик!
          </p>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.icontent}>
          <div className={styles.image}>
            <img
              src="https://sun1-15.userapi.com/s/v1/ig2/-KugNZabfjy3n-lVEQL7jFA7AbY-Vnvk9SXo3JuNHrPLEBm_KcHssy8ZP6HYOKUXpiDljGxM2QGLze4QKtnIFZ1M.jpg?size=200x200&quality=96&crop=291,134,1093,1093&ava=1"
              alt=""
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.ccontent}>
          <h2 className={styles.name}>Андрей Желобков</h2>
          <p className={styles.description}>
            Закупаемся у ребят всей командой. Шары, пиротехника, всё, что нужно, всегда можно тут
            найти и по хорошим ценам. Так держать, развития вам и больше клиентов!
          </p>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.icontent}>
          <div className={styles.image}>
            <img
              src="https://sun1-20.userapi.com/impg/OgcbxpBiCoxqMafTMUFiDVXxQstHp0iGwNw8Ww/JQG3UiR4rP8.jpg?size=1440x2160&quality=96&sign=37d3e31ed146ba64ed6642cd402083d0&type=album"
              alt=""
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.ccontent}>
          <h2 className={styles.name}>Руслан Маратович</h2>
          <p className={styles.description}>
            Хочу выразить огромную благодарность от всей команды Bikini Bottom. Шиврон получился
            шикарным, чётким в изображении, а самое главное, в кратчайшие сроки.
          </p>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.icontent}>
          <div className={styles.image}>
            <img
              src="https://sun1-23.userapi.com/s/v1/ig2/mVHVUzRGRtKSX0vlXcAz7N5y1LMO7sim9OGvXmaE4yuVcEOofPV7Dq-8FiFcHFykrY0379lVCFyS3o3OPAW_-i7g.jpg?size=200x200&quality=96&crop=37,0,863,863&ava=1"
              alt=""
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.ccontent}>
          <h2 className={styles.name}>Владимир Партизан</h2>
          <p className={styles.description}>
            Покупаю периодически шары и разные ништяки, продавец проверен временем и качеством. Цены
            не ломит, говорит как есть, а не втюхивает. В общем рекомендую!
          </p>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.icontent}>
          <div className={styles.image}>
            <img
              src="https://sun1-14.userapi.com/s/v1/ig2/WatnRzNg78uiOeOI84uEaXbby-jCKIYBkk7jVWjCPJKlAGa94lMzE3yuzO7gLdhGpvYa3ceun2JPKkcPStikjYw3.jpg?size=200x200&quality=95&crop=360,509,1207,1207&ava=1"
              alt=""
              className={styles.img}
            />
          </div>
        </div>

        <div className={styles.ccontent}>
          <h2 className={styles.name}>Антон SLIM Робуль</h2>
          <p className={styles.description}>
            Всем советую попробовать у ребят армейский дым РГД-П пока по очень вкусной цене, даже
            оптом я видел по 350 продают, у них же брал по 300 руб.
          </p>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.left}>
          <p className={styles.title}>
            Вы можете прочитать остальные отзывы или оставить свой в нашей группе ВКонтакте
          </p>

          <div className={styles.button}>
            <a href="https://vk.com/topic-208008042_48121278" target="_blank">
              Узнать подробности
            </a>
          </div>
        </div>

        <img src={stars} alt="" className={styles.gif} />
      </div>
    </div>
  );
}

export default ReviewItem;
