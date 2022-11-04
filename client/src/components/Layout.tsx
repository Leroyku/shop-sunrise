import FullHeader from './fullHeader';

import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <FullHeader />

      <Outlet />

      <footer>2022</footer>
    </>
  );
}

export default Layout;
