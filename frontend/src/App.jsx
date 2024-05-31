import axios from 'axios';
import { Route, Routes } from '../node_modules/react-router-dom/dist/index';
import './App.css';
import { UserContextProvider } from './helpers/UserContext';
import AccountPage from './pages/AccountPage';
import LayoutPage from './pages/LayoutPage';
import LoginPage from './pages/LoginPage';
import MainMap from './pages/MainMapPage';
import RegisterPage from './pages/RegisterPage';
import TermAndConditionsPage from './pages/TermAndConditionsPage';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/webmap/v1'; //backend url
axios.defaults.withCredentials = true;

function App() {
  return (
    //share context to other components
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<MainMap />}></Route>
          <Route path="/users/login" element={<LoginPage />}></Route>
          <Route path="/users/register" element={<RegisterPage />}></Route>
          <Route path="/users/term-and-conditions" element={<TermAndConditionsPage />}></Route>
          <Route path="/users/account" element={<AccountPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
