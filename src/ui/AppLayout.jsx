import React from 'react';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <div>
        <Header />
      </div>
      <div className="overflow-scroll">
        <main className="mx-w-3xl mx-auto">
          <Outlet />
        </main>
        <CartOverview />
      </div>
    </div>
  );
}

export default AppLayout;
