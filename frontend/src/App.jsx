import { Routes, Route } from '../node_modules/react-router-dom/dist/index'
import './App.css'
import MainMap from './components/MainMap';
import LayoutPage from './pages/LayoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermAndConditionsPage from './pages/TermAndConditionsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<MainMap />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/term-and-conditions" element={<TermAndConditionsPage />}></Route>
      </Route>
    </Routes>
  ); 
}

export default App
