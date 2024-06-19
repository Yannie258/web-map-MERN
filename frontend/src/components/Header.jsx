// @ts-nocheck
import { Tooltip, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../helpers/UserContext';

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

  const handleDirectToMap = () => {
    window.location.href = '/';
  };

  const handleDirectToAccount = () => {
    window.location.href = '/users/account';
  };

  return (
    <div>
      <header className="flex z-20 sm:flex-col bg-nav max-sm:justify-around justify-around flex-row border-2 p-2 border-indigo-200 border-b-indigo-500 shrink-0">
        <div className="mt-2 mb-4 flex flex-row gap-4 justify-between lg:mb-0 lg:mt-0 lg:items-center lg:gap-2">
          <Link to={'/'} className="flex items-center" onClick={handleDirectToMap}>
            <img src="/src/assets/map_logo.svg" alt="logo" />
            <div className="md:flex hover:shadow-lg">
              <div className="text-3xl font-bold text-primary">FEY.net</div>
              <span className="text-sm text-secondary underline">Forever young</span>
            </div>
          </Link>
          <div className="flex space-x-4 gap-2 justify-center lg:w-[24rem] max-w-sm flex-wrap">
            <div className="flex space-x-4">
              <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal mt-1 hover:underline ">
                <Link
                  to={'/'}
                  onClick={handleDirectToMap}
                  className="flex items-center text-lg text-brown-100 visited:text-brown-200 focus:underline"
                >
                  MAP
                </Link>
              </Typography>

              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 visited:text-brown-200 font-normal mt-1 hover:underline focus:text-white"
              >
                <Link
                  to={'/documentation'}
                  className="flex items-center text-lg text-brown-100 focus:underline visited:text-brown-200"
                >
                  DOCS
                </Link>
              </Typography>
            </div>
            <div>
              {user ? (
                <div className="flex flex-row items-center space-x-4">
                  <Link className="flex justify-center items-center rounded" onClick={handleDirectToAccount}>
                    <Tooltip content={`Hello, ${user.userName}`} className="bg-blue-gray-50 text-black">
                      <img className="w-10" src="/src/assets/user_icon.svg" alt="user" />
                    </Tooltip>
                  </Link>

                  <Link to={'/users/login'}>
                    <button
                      onClick={handleUserSignOut}
                      className="select-none rounded-lg bg-tertiary py-3 px-6 text-center align-middle 
                  font-sans text-xs sm:py-2 sm:px-1 sm:text-sm md:py-3 md:px-6 md:text-xs font-bold uppercase
                  text-black shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 
                  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                    >
                      Sign out
                    </button>
                  </Link>
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
                      className="select-none rounded-lg bg-tertiary py-3 px-6 text-center align-middle 
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
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
