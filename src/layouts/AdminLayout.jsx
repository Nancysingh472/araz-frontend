import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="main-content">
      <Header />
      <main>
        {' '}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
