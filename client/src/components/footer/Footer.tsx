import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import styles from './Footer.module.scss';

const Footer = () => {
  const location = useLocation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [clickMenu, setClickMenu] = useState(false);
  const [clickFAQ, setClickFAQ] = useState(false);
  const [clickSocials, setClickSocials] = useState(false);
  const [isCatalogPage, setIsCatalogPage] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (rootRef.current) {
        const newInnerWidth = rootRef.current.clientWidth;
        if (newInnerWidth < 740) setIsSmallScreen(true);
        if (newInnerWidth > 740) setIsSmallScreen(false);
      }
    };
    const checkCatalogPage = () => {
      setIsCatalogPage(window.location.pathname.includes('/catalog'));
    };
    checkCatalogPage();
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const catalogPageRegex = /^\/catalog\/\w+\/\d+$/;
    const catalogCategoriesPageRegex = /^\/catalog\/\w+/;
    const catalogSearchPageRegex = '/search';

    setIsCatalogPage(
      catalogPageRegex.test(location.pathname) ||
        catalogCategoriesPageRegex.test(location.pathname) ||
        location.pathname.includes(catalogSearchPageRegex),
    );
  }, [location]);

  const nav = [
    { name: 'Главная' },
    {
      name: 'О магазине',
    },
    {
      name: 'Конструктор шевронов',
    },
    {
      name: 'Отзывы',
    },
    {
      name: 'Доставка и опт',
    },
    {
      name: 'Контакты',
    },
    {
      name: 'Каталог',
    },
  ];
  const links = ['/', '/about', '/constructor', '/reviews', '/delivery', '/contacts', '/catalog'];
  const faq = [
    {
      name: 'Про наш магазин',
    },

    {
      name: 'Где прочитать отзывы',
    },
    {
      name: 'Стоимость доставки и оптовые заказы',
    },
    {
      name: 'Как с нами связаться',
    },
  ];
  const faqLinks = ['/about', '/reviews', '/delivery', '/contacts'];
  const socials = [
    {
      name: 'ВКонтакте',
    },

    {
      name: 'YouTube',
    },
    {
      name: 'Telegram',
    },
  ];
  const socialsLinks = [
    'https://vk.com/airsoft_sunrise',
    'https://www.youtube.com/@Sunrise_airsoft_store',
    'https://t.me/+79506249285',
  ];

  const toUpHandler = () => {
    window.scroll({
      left: 0,
      top: 0,
    });
  };

  return (
    <footer
      ref={rootRef}
      style={{ paddingBottom: isSmallScreen ? (isCatalogPage ? '130px' : '') : '' }}
      className={styles.root}>
      <div className={styles.container}>
        <div className={styles.menu}>
          <p
            className={styles.name}
            onClick={() => {
              if (isSmallScreen) setClickMenu(!clickMenu);
            }}>
            Меню <span>{isSmallScreen ? (clickMenu ? '\u25B2' : '\u25BC') : ''}</span>
          </p>
          {isSmallScreen ? (
            clickMenu ? (
              <nav className={styles.links}>
                {nav.map((value: any, index: any) => (
                  <React.Fragment key={index}>
                    {value.iconCategory}
                    <NavLink
                      onClick={() => {
                        toUpHandler();
                        if (isSmallScreen) setClickMenu(!clickMenu);
                      }}
                      className={styles.link}
                      end
                      to={links[index]}>
                      {value.name}
                    </NavLink>
                  </React.Fragment>
                ))}
              </nav>
            ) : (
              <></>
            )
          ) : (
            <nav className={styles.links}>
              {nav.map((value: any, index: any) => (
                <React.Fragment key={index}>
                  {value.iconCategory}
                  <NavLink
                    onClick={() => {
                      toUpHandler();
                    }}
                    className={styles.link}
                    end
                    to={links[index]}>
                    {value.name}
                  </NavLink>
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
        <div className={styles.menu}>
          <p
            className={styles.name}
            onClick={() => {
              if (isSmallScreen) setClickFAQ(!clickFAQ);
            }}>
            FAQ: Часто задаваемые вопросы{' '}
            <span>{isSmallScreen ? (clickFAQ ? '\u25B2' : '\u25BC') : ''}</span>
          </p>
          {isSmallScreen ? (
            clickFAQ ? (
              <div className={styles.links}>
                {faq.map((value: any, index: any) => (
                  <React.Fragment key={index}>
                    {value.iconCategory}
                    <NavLink
                      onClick={() => {
                        toUpHandler();
                        if (isSmallScreen) setClickFAQ(!clickFAQ);
                      }}
                      className={styles.link}
                      end
                      to={faqLinks[index]}>
                      {value.name}
                    </NavLink>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className={styles.links}>
              {faq.map((value: any, index: any) => (
                <React.Fragment key={index}>
                  {value.iconCategory}
                  <NavLink
                    onClick={() => {
                      toUpHandler();
                    }}
                    className={styles.link}
                    end
                    to={faqLinks[index]}>
                    {value.name}
                  </NavLink>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        <div className={styles.menu}>
          <p
            className={styles.name}
            onClick={() => {
              if (isSmallScreen) setClickSocials(!clickSocials);
            }}>
            Мы в соц. сетях <span>{isSmallScreen ? (clickSocials ? '\u25B2' : '\u25BC') : ''}</span>
          </p>
          {isSmallScreen ? (
            clickSocials ? (
              <div className={styles.links}>
                {socials.map((value: any, index: any) => (
                  <React.Fragment key={index}>
                    {value.iconCategory}
                    <Link
                      onClick={() => {
                        toUpHandler();
                        if (isSmallScreen) setClickSocials(!clickSocials);
                      }}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      to={socialsLinks[index]}>
                      {value.name}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <></>
            )
          ) : (
            <div className={styles.links}>
              {socials.map((value: any, index: any) => (
                <React.Fragment key={index}>
                  {value.iconCategory}
                  <Link
                    onClick={() => {
                      toUpHandler();
                    }}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    to={socialsLinks[index]}>
                    {value.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
