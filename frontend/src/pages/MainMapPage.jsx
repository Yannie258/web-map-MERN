import Graphic from '@arcgis/core/Graphic.js';
import ArcGisMap from '@arcgis/core/Map.js';
import Point from '@arcgis/core/geometry/Point.js';
import MapView from '@arcgis/core/views/MapView.js';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import FilterOption from '../components/FilterOption';
import SearchWidget from '../components/SearchWidget';
import { UserContext } from '../helpers/UserContext';

function Map() {
  const mapRef = useRef(null);
  const { user, setUser, categories, categoriesColor } = useContext(UserContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMap, setViewMap] = useState(null);
  const [selectedHomeAddress, setSelectedHomeAddress] = useState(false);

  const getSymbolColorForCategory = categoryName => {
    return categoriesColor[categoryName] || '#000000';
  };

  // Function to handle category selection
  const handleCategoryChange = categories => {
    setSelectedCategories(categories.map(category => category.value));
  };

  const handleSelectHomePlace = event => {
    event.preventDefault();
    const selectedPlace = event.target.value;
    console.log('click search', selectedPlace);
  };

  const removeHomeAddress = () => {
    setUser(prevUser => ({
      ...prevUser,
      homeAddress: null
    }));
  };

  const createPopupContent = category => {
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
    <ul>
      <li><b>Category:</b> ${category.name}</li>
      <li><b>Name:</b> ${category.properties.BEZEICHNUNG}</li>
      <li><b>Carry on:</b> ${category.properties.TRAEGER}</li>
      <li><b>Address:</b> ${category.properties.STRASSE}</li>
      <li><span>${category.properties.PLZ} ${category.properties.ORT}</span></li>
      <li><b>Contact:</b> ${category.properties.TELEFON}</li>
      <li><b>Web:</b> ${category.properties?.WWW}</li>
      <li><b>Email:</b> ${category.properties?.EMAIL}</li>
      <li><b>Longitude:</b> ${category.geometry.coordinates[0]}</li>
      <li><b>Latitude:</b> ${category.geometry.coordinates[1]}</li>

    </ul>
    <button id='add-button'>Add favourite</button>
  `;
    // Add event listener for the button
    const addButton = popupContent.querySelector('#add-button');
    addButton.addEventListener('click', async () => {
      // Handle removing the favorite here
      console.log('add favorite clicked', category);
      // Call your remove function here, e.g., removeFavorite(categoryId);
      try {
        const res = await axios.put(`/users/account/edit/${user._id}`, {
          favourite: {
            category: category.name,
            //XY - Longitude-0, Latitude-1
            favouriteLongitude: category.geometry.coordinates[0], //|
            favouriteLatitude: category.geometry.coordinates[1]
          }
        });
        // console.log('result: ', res);
        alert('add home successfully');
        window.location.href = '/';
      } catch (error) {
        console.error(error);
      }
    });

    return popupContent;
  };

  useEffect(() => {
    if (!mapRef?.current || !categories || categories.length === 0 || !user) return;

    const map = new ArcGisMap({
      basemap: 'streets-navigation-vector'
    });

    const view = new MapView({
      map: map, // References a Map instance
      container: mapRef.current, // References the ID of a DOM element
      center: [12.9214, 50.8278], // Sets the center point of the view in Chemnitz
      zoom: 12, // Sets the zoom level of the view
      padding: {
        top: 40 // Zoom button position
      }
    });
    setViewMap(view);
    console.log('test', user);

    const addGraphics = () => {
      view.graphics.removeAll();
      categories.forEach(category => {
        if (category.geometry && category.geometry.coordinates) {
          const point = new Point({
            longitude: category.geometry.coordinates[0],
            latitude: category.geometry.coordinates[1]
          });

          const pointGraphic = new Graphic({
            geometry: user ? point : null,
            symbol: {
              // @ts-ignore
              type: 'simple-marker',
              color: getSymbolColorForCategory(category.name),
              outline: {
                color: [255, 255, 255],
                width: 1
              }
            },
            popupTemplate: {
              title: category.name, //category name
              // @ts-ignore
              content: createPopupContent(category)
            }
          });
          // more info to annothrt providers:
          //https://nominatim.openstreetmap.org/reverse?format=json&lat=40.714224&lon=-73.961452
          //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

          if (selectedCategories.length === 0 || selectedCategories.includes(category.name)) {
            view.graphics.add(pointGraphic);
          }
        }
      });

      // Add a graphic for the home address from user context
      if (user && user.favourite) {
        console.log(user);
        const favouritePoint = new Point({
          longitude: user.favourite.favouriteLongitude,
          latitude: user.favourite.favouriteLatitude
        });
        const favouriteGraphic = new Graphic({
          geometry: favouritePoint,
          symbol: {
            // @ts-ignore
            type: 'picture-marker',
            url: 'src/assets/favourite.svg', // Replace with your home icon URL
            width: '24px',
            height: '24px'
          },

          popupTemplate: {
            title: 'Favourite Address',
            content: `
              <ul>
            
                <li><b>Longitude:</b> ${user.favourite.favouriteLongitude}</li>
                <li><b>Latitude:</b> ${user.favourite.favouriteLatitude}</li>
              </ul>
              <button id='remove-button'>remove</button>
            `
          }
        });
        view.graphics.add(favouriteGraphic);
       
      };

      if (user && user.homeAddress) {
        console.log(user);
        const homePoint = new Point({
          longitude: user.homeAddress.homeLongitude,
          latitude: user.homeAddress.homeLatitude
        });
        const homeGraphic = new Graphic({
          geometry: homePoint,
          symbol: {
            // @ts-ignore
            type: 'picture-marker',
            url: 'src/assets/home.svg', // Replace with your home icon URL
            width: '24px',
            height: '24px'
          },
          
          popupTemplate: {
            title: 'Home Address',
            content: `
              <ul>
                <li><b>Address:</b> ${user.homeAddress.address}</li>
                <li><b>Longitude:</b> ${user.homeAddress.homeLongitude}</li>
                <li><b>Latitude:</b> ${user.homeAddress.homeLatitude}</li>
              </ul>
              <button id='remove-button'>remove</button>
            `
          }
        });
        view.graphics.add(homeGraphic);
        //   // Add event listener for the remove button
        //   view.popup.on('trigger-action', (event) => {
        //     if (event.action.id === 'remove-home') {
        //       // Handle removing the home address
        //       console.log('Remove home address clicked');
        //       removeHomeAddress();
        //     }
        //   });
        // }
      };
    }

    addGraphics();

    return () => view && view.destroy();
  }, [mapRef, categories, selectedCategories, user]);

  return (
    <div className="bg-amber-100 w-screen h-screen relative">
      <div className="filterContainer absolute z-10 bg-white top-4 left-12">
        {user && (
          <div className="">
            <FilterOption handleCategoryChange={handleCategoryChange} />
            <SearchWidget view={viewMap} onSelectPlace={handleSelectHomePlace}></SearchWidget>
          </div>
        )}
      </div>
      <div className="viewMap bg-amber-100" ref={mapRef}></div>
    </div>
  );
}

export default Map;
