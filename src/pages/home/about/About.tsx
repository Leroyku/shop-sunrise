import styles from './About.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faGaugeHigh, faPersonRifle } from '@fortawesome/free-solid-svg-icons';

const About: React.FC = () => {
  return (
    <div className={styles.root}>
      <h3>
        <FontAwesomeIcon className={styles.icons} icon={faFire} />
        Качество
      </h3>
      <p>
        Мы всегда следим за качеством продаваемых нами товаров, ведь забота о покупателе — наша
        первостепенная задача
      </p>
      <h3>
        <FontAwesomeIcon className={styles.icons} icon={faGaugeHigh} />
        Скорость
      </h3>
      <p>Оформление и доставка заказа всегда происходит в крайчайшие сроки</p>
      <h3>
        <FontAwesomeIcon className={styles.icons} icon={faPersonRifle} />
        Квалифицированный персонал
      </h3>
      <p>Профессиональные консультации, наши специалисты оперативно ответят на ваши вопросы</p>
    </div>
  );
};

export default About;
