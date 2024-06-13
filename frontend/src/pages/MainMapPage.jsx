import Graphic from '@arcgis/core/Graphic.js';
import ArcGisMap from '@arcgis/core/Map.js';
import esriConfig from '@arcgis/core/config.js';
import Point from '@arcgis/core/geometry/Point.js';
import MapView from '@arcgis/core/views/MapView.js';
import Tooltip from '@material-tailwind/react/components/Tooltip';
import { useContext, useEffect, useRef, useState } from 'react';
import FilterOption from '../components/FilterOption';
import RoutingAndDirectionWidget from '../components/RoutingAndDirectionWidget';
import SearchWidget from '../components/SearchWidget';
import { createPopupContent } from '../helpers/PopUpConfig';
import { UserContext } from '../helpers/UserContext';

function Map() {
  const mapRef = useRef(null);
  const { user, setUser, categories, categoriesColor } = useContext(UserContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMap, setViewMap] = useState(null);
  const [selectedHomeAddress, setSelectedHomeAddress] = useState(false);
  const [forwardDirection, setForwardDirection] = useState(false);
  const [openRoute, setOpenRoute] = useState(false);

  // @ts-ignore
  esriConfig.apiKey = import.meta.env.VITE_ARCGIS_KEY;
  const apiKey = esriConfig.apiKey;
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

  const handleSideBarButton = e => {
    e.preventDefault();
    console.log('open', forwardDirection);
    setForwardDirection(!forwardDirection);
  };

  const removeHomeAddress = () => {
    setUser(prevUser => ({
      ...prevUser,
      homeAddress: null
    }));
  };

  const map = new ArcGisMap({
    basemap: 'arcgis/navigation'
  });

  useEffect(() => {
    if (!mapRef?.current || !categories) return;
    // @ts-ignore
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
    // console.log('test', user);
    if (!user) return;

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
              content: createPopupContent(category, user) // pass user context
            }
          });

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
            width: '30px',
            height: '30px'
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
      }

      if (user && user.homeAddress) {
        console.log('user', user);
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
            width: '30px',
            height: '30px'
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
      }
    };

    addGraphics();

    return () => view && view.destroy();
  }, [mapRef, categories, selectedCategories, user]);

  return (
    <div className="bg-amber-100 w-screen h-screen relative">
      <div className="filterContainer absolute z-10 bg-white top-4 left-12">
        {user && (
          <div className="relative">
            <FilterOption handleCategoryChange={handleCategoryChange} />
            <div className="fixed top-48 left-4 z-20 bg-white rounded">
              <Tooltip content={!openRoute ? 'show route' : 'hide route'}>
                <button onClick={e => setOpenRoute(!openRoute)}>
                  <img
                    className="w-8 h-6"
                    src={openRoute ? 'src/assets/sidebar-left.svg' : 'src/assets/sidebar-right.svg'}
                    alt=""
                  />
                </button>
              </Tooltip>
            </div>

            {user.homeAddress && user.favourite && openRoute && (
              <div>
                <div className="fixed top-1/2 right-2 z-20 bg-white rounded">
                  <Tooltip content={forwardDirection ? 'Route to favourite' : 'Route back home'}>
                    <button className="top-4 z-20 rounded" onClick={handleSideBarButton}>
                      <img className="w-8 h-8" src="src/assets/switch.svg" alt="collapse_side_bar" />
                    </button>
                  </Tooltip>
                </div>

                <RoutingAndDirectionWidget
                  view={viewMap}
                  map={map}
                  apiKey={apiKey}
                  forwardDirection={forwardDirection}
                />
              </div>
            )}
          </div>
        )}
        <SearchWidget view={viewMap} onSelectPlace={handleSelectHomePlace}></SearchWidget>
      </div>
      <div className="viewMap bg-amber-100" ref={mapRef}></div>
    </div>
  );
}

export default Map;
