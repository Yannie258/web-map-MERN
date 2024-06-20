import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [categoriesColor, setCategoriesColor] = useState(null);
  const [userDeleted, setUserDeleted] = useState(false); // State to track user deletion

  //userEffect doesn't support async/await
  //This ensures that the profile data is only fetched if the user information is not already available.
  useEffect(() => {
    if (!user && !userDeleted) {
      axios.get('/users/profile').then(({ data }) => {
        setUser(data);
        setIsLoading(true);
        setUserDeleted(false);
      })
    }

    if (!categories) {
      const colorMap = {
        School: '#ff9843',
        Kindergarden: '#ff6868',
        'Social child projects': '#86a7fc',
        'Social teenager projects': '#3468c0'
      };
      axios
        .get('/categories/all')
        .then(response => {
          // Assuming response.data is an array of places with longitude data
          setCategories(response.data);
          setCategoriesColor(colorMap);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    }
  }, [user, categories]);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading, categories, categoriesColor, userDeleted, setUserDeleted }}>
      {children}
    </UserContext.Provider>
  );
}
