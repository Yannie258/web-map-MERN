import axios from 'axios';
import { Routes, Route } from '../node_modules/react-router-dom/dist/index'
import './App.css'
import MainMap from './components/MainMap';
import LayoutPage from './pages/LayoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermAndConditionsPage from './pages/TermAndConditionsPage';
import { UserContextProvider } from './helpers/UserContext';
import { useEffect } from 'react';
import AccountPage from './pages/AccountPage';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/webmap/v1/users'; //backend url
axios.defaults.withCredentials= true;

function App() {
  return (
    //share context to other components
     <UserContextProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<MainMap />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/term-and-conditions" element={<TermAndConditionsPage />}></Route>
          <Route path="/account" element={<AccountPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  ); 
}

export default App
