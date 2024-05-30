import axios from 'axios';
import { Routes, Route } from '../node_modules/react-router-dom/dist/index'
import MainMap from './components/MainMap';
import './App.css'
import LayoutPage from './pages/LayoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermAndConditionsPage from './pages/TermAndConditionsPage';
import { UserContextProvider } from './helpers/UserContext';
import { useEffect } from 'react';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/webmap/v1'; //backend url
axios.defaults.withCredentials= true;

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

export default App
