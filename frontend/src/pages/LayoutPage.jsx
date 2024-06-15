import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LayoutPage() {
  return (
    <div>
      <Header></Header>
      {/* Outlet should be used in parent route elements to render their child route elements */}
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default LayoutPage;
