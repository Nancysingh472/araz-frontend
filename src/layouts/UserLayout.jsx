import React from 'react';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';
import UserHeader from '../components/user/UserHeader';

const UserLayout = ({ children }) => {
  return (
    <div className="main-content">
      <UserHeader />
      <main>
        {' '}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
