import Search from '@arcgis/core/widgets/Search.js';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { UserContext } from '../helpers/UserContext';

function SearchWidget({ view, onSelectPlace }) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!view || !view.ui) return;

    const searchWidget = new Search({
      view: view
    });

    view.ui.add(searchWidget, {
      position: 'top-right',
      index: 1
    });

    searchWidget.on('select-result', e => {
      const result = e.result;
      console.log('search', result);
      const name = result.name; // Adjust based on your data structure

      const content = document.createElement('div');
      content.innerHTML = `
        <div>
          <h2>${name}</h2>
        
          <button id="add-button">Add</button>
        </div>
      `;

      // Attach click event listener to the button after the popup is opened
      content.querySelector('#add-button').addEventListener('click', async () => {
        console.log('Button clicked');
        try {
          // console.log('user', user)
          if (user) {
            const response = await axios.put(`/users/account/edit/${user._id}`, {
              homeAddress: {
                address: result.feature.attributes.StAddr + result.feature.attributes.City,
                // @ts-ignore
                homeLongitude: result.feature.geometry.longitude,
                // @ts-ignore
                homeLatitude: result.feature.geometry.latitude
              }
            });
            // console.log(response.data);
            alert('add home successfully');
            window.location.href = '/';
          }
        } catch (error) {
          console.error('Error updating user address:', error);
        }
        //it does not work with normal button onclick event
        // therefore we have to cahnge to this approach
        // TODO: get address and coordinators and send request to update user infor
        //same with favourite feature
        //design css
      });

      view.popup.open({
        title: `${result.name}`,
        content: content,
        location: result.feature.geometry
      });
    });

    return () => {
      if (searchWidget) {
        view.ui?.remove(searchWidget);
      }
    };
  }, [view, onSelectPlace]);

  return <div></div>;
}

export default SearchWidget;
