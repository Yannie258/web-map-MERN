//import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './helpers/UserContext';
import AccountPage from './pages/AccountPage';
import Documentation from './pages/Documentation';
import LayoutPage from './pages/LayoutPage';
import LoginPage from './pages/LoginPage';
import MainMap from './pages/MainMapPage';
import RegisterPage from './pages/RegisterPage';
import TermAndConditionsPage from './pages/TermAndConditionsPage';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api/webmap/v1'; //backend url
axios.defaults.withCredentials = true;

// Set up an interceptor to handle token expiration
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      if (error.response.data.message === 'Token expired, please log in again') {
        alert('You must be logged in again');
        // Redirect to the login page
        return <Navigate to={'/users/login'} />;
      }
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    //share context to other components
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<MainMap />}></Route>
          <Route path="/users/login" element={<LoginPage />}></Route>
          <Route path="/users/register" element={<RegisterPage />}></Route>
          <Route path="/term-and-conditions" element={<TermAndConditionsPage />}></Route>
          <Route path="/users/:id" element={<AccountPage />}></Route>
          <Route path="/terms-and-condition" element={<TermAndConditionsPage />}></Route>
          <Route path="/documentation" element={<Documentation />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
