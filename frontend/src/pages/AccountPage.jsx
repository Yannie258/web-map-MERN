// @ts-nocheck
import { useContext, useState } from 'react';
import { UserContext } from '../helpers/UserContext';
// @ts-ignore
import axios from 'axios';
import { Navigate } from 'react-router-dom';
// @ts-ignore
import { Button, Card, CardBody, CardFooter, Input, Typography } from '@material-tailwind/react';

function AccountPage() {
  // @ts-ignore
  const { isLoading, user, setUser, userDeleted, setUserDeleted } = useContext(UserContext);
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [isEditingUserEmail, setIsEditingUserEmail] = useState(false);
  const [userName, setUserName] = useState(user?.userName);
  const [userEmail, setUserEmail] = useState(user?.email);
  const [redirectToMainPage, setRedirectToMainPage] = useState(false);

  // console.log('user account', user);
  if (!isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoading && !user) {
    return <Navigate to={'/users/login'} />;
  }

  const handleEditUserName = e => {
    e.preventDefault();
    setIsEditingUserName(!isEditingUserName);
    //start from old name
    setUserName(e.target.value);
  };

  const handleEditUserEmail = e => {
    e.preventDefault();
    setIsEditingUserEmail(!isEditingUserEmail);
    //start from old name
    setUserEmail(e.target.value);
  };

  const handleSubmitAccountChange = async e => {
    e.preventDefault();
    // Check if userName and userEmail are unchanged
    if (userName === user.userName && userEmail === user.email) {
      alert('No changes made');
      return;
    }
    try {
      const { data } = await axios.put(`/users/${user._id}`, {
        email: userEmail,
        userName: userName
      });
      setUser(data);
      alert('Edit successful');
      setRedirectToMainPage(true);
    } catch (error) {
      console.log('Edit Error: ' + error);
      alert('Edit failed, please try again');
    }
  };

  const handleDeleteUserAccount = async e => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await axios.delete(`/users/${user._id}`);
        setUser(null);
        alert('Delete successful');
        setRedirectToMainPage(true);
        setUserDeleted(true);
      } catch (error) {
        alert('Delete failed, please try again');
      }
    }
  };

  if (redirectToMainPage) {
    console.log('navigate');
    return <Navigate to={'/'} />;
  }

  return (
    <div>
      <form onSubmit={handleSubmitAccountChange}>
        <Card className="mt-20 w-96">
          <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
            User Account
          </Typography>

          <CardBody>
            <div className="divide-y divide-gray-200 mt-4">
              <div>
                <div className="relative flex w-full max-w-[24rem]">
                  <Input
                    type="text"
                    label="Username"
                    value={userName}
                    className="pr-20"
                    disabled={!isEditingUserName}
                    onChange={e => setUserName(e.target.value)}
                    required
                  />
                  {!isEditingUserName ? (
                    <Button
                      size="sm"
                      color={user.userName === userName ? 'white' : 'blue-gray'}
                      onClick={handleEditUserName}
                      className="!absolute right-1 top-1 rounded"
                    >
                      <span>edit</span>
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                <div className="mt-5 relative flex w-full max-w-[24rem]">
                  <Input
                    type="email"
                    label="Email"
                    value={userEmail}
                    disabled={!isEditingUserEmail}
                    className="pr-20"
                    onChange={e => setUserEmail(e.target.value)}
                    required
                  />

                  {!isEditingUserEmail ? (
                    <Button
                      size="sm"
                      color={user.email === userEmail ? 'white' : 'blue-gray'}
                      onClick={handleEditUserEmail}
                      className="!absolute right-1 top-1 rounded"
                    >
                      <span>edit</span>
                    </Button>
                  ) : (
                    ''
                  )}
                </div>

                <div className="mt-5 relative flex w-full max-w-[24rem]">
                  <Input
                    variant="static"
                    label="Home"
                    placeholder="Home Address"
                    value={user?.homeAddress ? user.homeAddress.address : 'Home Address was not set'}

                  />
                </div>

                <div className="mt-5 relative flex w-full max-w-[24rem]">
                  <Input
                    variant="static"
                    label="Favourite Category"
                    placeholder="favourite"
                    value={user?.favourite ? `${user.favourite.category}` : 'Favourite was not set'}
                  />
                </div>

                <div className="mt-5 relative flex w-full max-w-[24rem]">
                  <Input
                    variant="static"
                    label="Favourite Address"
                    placeholder="Static"
                    value={user?.favourite ? `${user.favourite.address}` : 'Favourite was not set'}
                  />
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter className="pt-3 flex space-x-3">
            <Button color="blue" size="lg" fullWidth={true} type="submit">
              Save
            </Button>
            <Button size="lg" color="red" fullWidth={true} onClick={handleDeleteUserAccount}>
              Delete
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default AccountPage;
