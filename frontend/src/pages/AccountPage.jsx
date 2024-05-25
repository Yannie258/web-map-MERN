// @ts-nocheck
import { useContext } from 'react';
import { UserContext } from '../helpers/UserContext';
// @ts-ignore
import { Navigate } from 'react-router-dom';
// @ts-ignore
import { Button, Card, CardBody, CardFooter, Typography , Input} from '@material-tailwind/react';

function AccountPage() {
  // @ts-ignore
  const { isLoading, user } = useContext(UserContext);
  console.log('user account', user);
  if (!isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoading && !user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
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
                  value={user.userName}
                  className="pr-20"
                  containerProps={{
                    className: 'min-w-0'
                  }}
                />

                <Button
                  size="sm"
                  color={user.userName ? 'white' : 'blue-gray'}
                  disabled={!user.userName}
                  className="!absolute right-1 top-1 rounded"
                >
                  <img src="src/assets/edit.svg" alt="edit" className='w-4' />
                </Button>
              </div>
              <div className="mt-5 relative flex w-full max-w-[24rem]">
                <Input
                  type="text"
                  label="Email"
                  value={user.email}
                  className="pr-20"
                  containerProps={{
                    className: 'min-w-0'
                  }}
                />

                <Button
                  size="sm"
                  color={user.userName ? 'white' : 'blue-gray'}
                  disabled={!user.userName}
                  className="!absolute right-1 top-1 rounded"
                >
                  <img src="src/assets/edit.svg" alt="edit" className='w-4' />
                </Button>
              </div>

    
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-3 flex space-x-3">
          <Button color="blue" size="lg" fullWidth={true}>
            Save
          </Button>
          <Button size="lg" color="red" fullWidth={true}>
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AccountPage;
