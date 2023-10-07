import styles from './About.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faGaugeHigh, faPersonRifle, faShop } from '@fortawesome/free-solid-svg-icons';

const About: React.FC = () => {
  return (
    <div className={styles.root}>
      <div>
        <h4>
          <FontAwesomeIcon className={styles.icons} icon={faShop} />
          Страйкбольная лавка «SunRise»
        </h4>
        <p>
          Страйкбольная лавка «SunRise» – это магазин страйкбольного оружия и экипировки. Мы
          осуществляем продажу страйкбольного оружия, комплектующих, расходников и снаряжения. Наши
          пункты выдачи заказов находятся в городах Нижний Новгород и Дзержинск.
        </p>
      </div>
      <div>
        <h4>
          <FontAwesomeIcon className={styles.icons} icon={faFire} />
          Качество
        </h4>
        <p>
          Мы всегда следим за качеством продаваемых нами товаров, ведь забота о покупателе — наша
          первостепенная задача
        </p>
      </div>
      <div>
        <h4>
          <FontAwesomeIcon className={styles.icons} icon={faGaugeHigh} />
          Скорость
        </h4>
        <p>Оформление и доставка заказа всегда происходит в крайчайшие сроки</p>
      </div>
      <div>
        <h4>
          <FontAwesomeIcon className={styles.icons} icon={faPersonRifle} />
          Квалифицированный персонал
        </h4>
        <p>Профессиональные консультации, наши специалисты оперативно ответят на ваши вопросы</p>
      </div>
    </div>
  );
};

export default About;
