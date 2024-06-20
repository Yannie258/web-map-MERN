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
      const name = result.name; // Adjust based on your data structure

      const content = document.createElement('div');
      if (user) {
        content.innerHTML = `
        <div>
          <h2>${name}</h2>    
          <button id="add-home-button">Add home</button>
        </div>
      `;

        // Attach click event listener to the button after the popup is opened
        content.querySelector('#add-home-button').addEventListener('click', async () => {
          try {
            if (user) {
              await axios.put(`/users/${user._id}`, {
                homeAddress: {
                  address: result.feature.attributes.StAddr + ' '+ result.feature.attributes.City,
                  // @ts-ignore
                  homeLongitude: result.feature.geometry.longitude,
                  // @ts-ignore
                  homeLatitude: result.feature.geometry.latitude
                }
              });
              //alert('add home successfully');
              window.location.href = '/';
            }
          } catch (error) {
            console.error('Error updating user address:', error);
            alert('Error in updating user address!');
          }
          //it does not work with normal button onclick event
          // therefore we have to change to this approach
          
        });
      }   

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
