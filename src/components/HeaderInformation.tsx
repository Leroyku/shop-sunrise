import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faVk, faTelegram } from '@fortawesome/free-brands-svg-icons';

function HeaderInformation() {
  return (
    <div className="header-information">
      <Link to="/">
        <div className="company-name">
          <h1>SunRise</h1>
          <p>Страйкбольная лавка</p>
        </div>
      </Link>
      <div className="contacts">
        <div className="standart">
          <div className="standart__social">
            <p>Связь с нами:</p>

            <div className="social-icon">
              <a href="https://vk.com/airsoft_sunrise" target="_blank">
                <FontAwesomeIcon icon={faVk} />
              </a>
            </div>
            <div className="social-icon">
              <a href="/">
                <FontAwesomeIcon icon={faTelegram} />
              </a>
            </div>
          </div>
          <div className="standart__adress">
            <a href="mailto:sunrise-airsoft152@yandex.ru">
              <div className="standart__icon">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>sunrise-airsoft152@yandex.ru</p>
              </div>
            </a>
            <a href="tel:+79519018780">
              <div className="standart__icon">
                <FontAwesomeIcon icon={faPhone} />
                <p>
                  <span>+7 (951) 901-87-80</span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderInformation;
