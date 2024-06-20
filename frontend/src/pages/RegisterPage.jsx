// @ts-nocheck

import { Button, Input } from '@material-tailwind/react';
import axios from 'axios';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { checkUserExists } from '../helpers/utilsMethods';

function RegisterPage() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToMainPage, setRedirectToMainPage] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState();
  const [passwordValueMatched, setPasswordValueMatched] = useState(true);
  const [showPasswords, setShowPasswords] = useState(false);
  const [showPasswordsConfirm, setShowPasswordsConfirm] = useState(false);

  const UserRegister = async e => {
    e.preventDefault();
    try {
      await axios.post('/users/register', {
        userName,
        email,
        password
      });
      setRedirectToMainPage(true);
    } catch (error) {
      alert('Login failed, please try again');
    }
  };

  const handleUserNameChange = async(e) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    try {
      const exists = await checkUserExists('userName', newUserName);
      setIsUserRegistered(exists);
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };
  
  const handleUserEmailChange = async (e) => {
    const newUserEmail = e.target.value;
    setEmail(newUserEmail);
    try {
      const exists = await checkUserExists('email', newUserEmail);
      setIsEmailRegistered(exists);
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handlePasswordChange = (e) => { 
    const registerPassword = e.target.value;
    setPassword(registerPassword);
  }

  const handleConfirmPasswordChange = (e) => { 
    const registerConfirmPassword = e.target.value;
    setConfirmPassword(registerConfirmPassword);
    setPasswordValueMatched(registerConfirmPassword === password);
  }

  const onClickOnEyeIconPassword = (e) => {
    e.preventDefault();
    setShowPasswords(!showPasswords);
  };

  const onClickOnEyeIconInConfirmPassword = (e) => {
    e.preventDefault();
    setShowPasswordsConfirm(!showPasswordsConfirm);
  };

  if (redirectToMainPage) {
    return <Navigate to={'/users/login'} />;
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto my-auto lg:py-0 md:py-12">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" action="#" onSubmit={UserRegister}>
            <div>
              <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your username
              </label>
              <Input
                label="Your username"
                type="text"
                name="text"
                id="userName"
                value={userName}
                onChange={handleUserNameChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="your username"
                required
              />
              {isUserRegistered && <p className="text-sm text-red-500 ">*user is already registered</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <Input
                label="Your email"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleUserEmailChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              {isEmailRegistered && <p className="text-sm text-red-500 ">*email is already registered</p>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative flex w-full max-w-[24rem]">
                <Input
                  label="*****"
                  type={showPasswords ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  containerProps={{
                    className: 'min-w-0'
                  }}
                />
                <Button
                  size="sm"
                  color="white"
                  onClick={onClickOnEyeIconPassword}
                  className="!absolute cursor-pointer right-1 top-1 rounded"
                >
                  <img
                    className="w-4 hover:cursor-pointer"
                    src={showPasswords ? '/src/assets/eye_on.svg' : '/src/assets/eye_off.svg'}
                  />
                </Button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <div className="relative flex w-full max-w-[24rem]">
                <Input
                  label="*****"
                  type={showPasswordsConfirm ? 'text' : 'password'}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  onChange={handleConfirmPasswordChange}
                  className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  containerProps={{
                    className: 'min-w-0'
                  }}
                />
                <Button
                  onClick={onClickOnEyeIconInConfirmPassword}
                  size="sm"
                  color="white"
                  className="!absolute !cursor-pointer right-1 top-1 rounded"
                >
                  <img
                    className="w-4"
                    src={showPasswordsConfirm ? '/src/assets/eye_on.svg' : '/src/assets/eye_off.svg'}
                    alt="eye-off"
                  />
                </Button>
              </div>

              {!passwordValueMatched && <p className="text-sm text-red-500 ">*password confirm does not match </p>}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{' '}
                  <Link
                    className="font-medium text-blue-600 hover:underline dark:text-gray-500"
                    to="/terms-and-condition"
                  >
                    Terms and Conditions <span className="text-red-400">* </span>
                  </Link>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Create an account
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to={'/users/login'} className="font-medium text-blue-600 hover:underline dark:text-gray-500">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;


