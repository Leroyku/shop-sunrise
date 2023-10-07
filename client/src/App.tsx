import './scss/app.scss';

import React from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/home/Home';
import Reviews from './pages/reviews/Reviews';
import Delivery from './pages/delivery/Delivery';
import Contacts from './pages/contacts/Contacts';
import Catalog from './pages/catalog/Catalog';
import CatalogCategory from './pages/catalogCategory/CatalogCategory';
import ItemPage from './pages/itemPage/ItemPage';
import Cart from './pages/cart/Cart';
import Order from './pages/order/Order';
import NotFound from './pages/notFound/NotFound';
import Search from './pages/search/Search';
import About from './pages/about/About';
import Constructor from './pages/constructor/Constructor';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="about" element={<About />} />
          <Route path="constructor" element={<Constructor />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:category" element={<CatalogCategory />} />
          <Route path="catalog/:category/:id" element={<ItemPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
