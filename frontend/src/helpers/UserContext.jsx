import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log('context', user);
  //userEffect doesn't support async/await
  //This ensures that the profile data is only fetched if the user information is not already available.
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
        setIsLoading(true);
      });
    }
  }, []);
  return <UserContext.Provider value={{ user, setUser, isLoading }}>{children}</UserContext.Provider>;
}
