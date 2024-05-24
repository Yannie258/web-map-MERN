import { Link } from '../../node_modules/react-router-dom/dist/index';

function Header() {
  return (
    <div>
      <header className="flex max-sm:justify-around justify-between border-2 p-2 border-indigo-200 border-b-indigo-500">
        <a href="" className="flex items-center">
          <img src="/src/assets/map_logo.svg" alt="logo" />
          <div className="md:flex">
            <div className="text-3xl font-bold">FEY.net</div>
            <span className="text-sm underline">Forever young</span>
          </div>
        </a>
        <div className="my-2 flex flex-row space-x-2">
          <Link to={'/login'}>
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

          {/* Route to Loginpage when click to button */}
          <Link to={'/register'}>
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
      </header>
    </div>
  );
}

export default Header;
