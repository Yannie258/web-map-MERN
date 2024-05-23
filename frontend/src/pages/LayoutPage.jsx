import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainMap from '../components/MainMap';
import { Outlet } from '../../node_modules/react-router-dom/dist/index';

function LayoutPage() {
  return (
    <div>
      <Header></Header>
      {/* Outlet should be used in parent route elements to render their child route elements */}
      <Outlet></Outlet>
    </div>
  );
}

export default LayoutPage;
