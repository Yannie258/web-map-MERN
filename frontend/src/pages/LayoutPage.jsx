import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

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
