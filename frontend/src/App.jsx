import axios from 'axios';
import { Routes, Route } from '../node_modules/react-router-dom/dist/index'
import './App.css'
import MainMap from './components/MainMap';
import LayoutPage from './pages/LayoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermAndConditionsPage from './pages/TermAndConditionsPage';
import { UserContextProvider } from './helpers/UserContext';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/webmap/v1/users';
axios.defaults.withCredentials= true;

function App() {
  return (
     <UserContextProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<MainMap />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/term-and-conditions" element={<TermAndConditionsPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  ); 
}

export default App
