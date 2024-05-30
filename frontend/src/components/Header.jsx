// @ts-nocheck
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from '../../node_modules/react-router-dom/dist/index';
import { UserContext } from '../helpers/UserContext';
import { Tooltip, Button } from '@material-tailwind/react';
import axios from 'axios';

function Header() {
  const { user, setUser, isLoading, setIsLoading } = useContext(UserContext);
  
  const handleUserSignOut = async () => {
    try {
      // Invalidate session on the server side
      const response = await axios.post('/users/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        // Clear cookies on the client side
        document.cookie.split(';').forEach(c => {
          document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        });

        setUser(null);
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    }
    return <Navigate to={'/users/login'} />;
  };

  return (
    <div>
      <header className="flex max-sm:justify-around justify-between border-2 p-2 border-indigo-200 border-b-indigo-500">
        <Link to={'/'} className="flex items-center">
          <img src="/src/assets/map_logo.svg" alt="logo" />
          <div className="md:flex">
            <div className="text-3xl font-bold">FEY.net</div>
            <span className="text-sm underline">Forever young</span>
          </div>
        </Link>
        {/* <div className="my-2 flex flex-row space-x-2">{!!user && <span>{user.user.userName}</span>}</div> */}

        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link className="flex justify-center items-center rounded" to={'/account'}>
                <Tooltip content={`Hello, ${user.userName}`} className="bg-blue-gray-50 text-black">
                  <img className="w-10" src="/src/assets/user_icon.svg" alt="user" />
                </Tooltip>
              </Link>

              <Tooltip content="Logout" className="bg-blue-gray-50 text-black">
                <button onClick={handleUserSignOut}>
                  <img className="w-5" src="/src/assets/logout.svg" alt="logout" />
                </button>
              </Tooltip>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to={'/users/login'}>
                <button
                  className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle 
                  font-sans text-xs sm:py-2 sm:px-1 sm:text-sm md:py-3 md:px-6 md:text-xs font-bold uppercase
                  text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Sign in
                </button>
              </Link>
              <Link to={'/users/register'}>
                <button
                  className="select-none rounded-lg bg-gray-100 py-3 px-6 text-center align-middle 
                  font-sans text-xs sm:py-2 sm:px-1 sm:text-sm md:py-3 md:px-6 md:text-xs font-bold uppercase
                  text-black shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
