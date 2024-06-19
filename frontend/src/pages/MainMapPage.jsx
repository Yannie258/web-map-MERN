import Graphic from '@arcgis/core/Graphic.js';
import ArcGisMap from '@arcgis/core/Map.js';
import esriConfig from '@arcgis/core/config.js';
import MapView from '@arcgis/core/views/MapView.js';
import Tooltip from '@material-tailwind/react/components/Tooltip';
import { useContext, useEffect, useRef, useState } from 'react';
import FilterOption from '../components/FilterOption';
import RoutingAndDirectionWidget from '../components/RoutingAndDirectionWidget';
import SearchWidget from '../components/SearchWidget';
import { createPopupContent } from '../helpers/PopUpConfig';
import { createPopUpFavourite } from '../helpers/PopUpFavourite';
import { createPopUpHome } from '../helpers/PopUpHome';
import { UserContext } from '../helpers/UserContext';

function Map() {
  const mapRef = useRef(null);
  // @ts-ignore
  const { user, setUser, categories, categoriesColor } = useContext(UserContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMap, setViewMap] = useState(null);
  const [selectedHomeAddress, setSelectedHomeAddress] = useState(false);
  const [forwardDirection, setForwardDirection] = useState(false);
  const [openRoute, setOpenRoute] = useState(false);

  // console.log('main map',user)
  // console.log('categories',categories)
  // @ts-ignore
  esriConfig.apiKey = import.meta.env.VITE_ARCGIS_KEY;
  const apiKey = esriConfig.apiKey;
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
    view
      .when(() => {
        const addGraphics = () => {
          if (!viewMap || !categories) {
            return;
          }
          view.graphics.removeAll();
          let pointGraphic;
          categories.forEach(category => {
            if (category.geometry && category.geometry.coordinates && category.geometry.coordinates.length >= 2) {
              const [longitude, latitude] = category.geometry.coordinates;
              const point = {
                type: 'point',
                x: longitude,
                y: latitude,
                spatialReference: {
                  wkid: 4326
                }
              };
              // console.log('checkpoint', point);
              const markerSymbol = {
                type: 'simple-marker',
                color: getSymbolColorForCategory(category.name),
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              };

              pointGraphic = new Graphic({
                geometry: user ? point : null,
                symbol: markerSymbol,
                popupTemplate: {
                  title: category.name, //category name
                  // @ts-ignore
                  content: createPopupContent(category, user) // pass user context
                }
              });

              if (selectedCategories.length === 0 || selectedCategories.includes(category.name)) {
                console.log('add');
                view.graphics.add(pointGraphic);
              }
            }
          });
          // Log the number of graphics added

          // Add a graphic for the home address from user context
          //when favourite is vailable, display symbol favourite
          // back end user profile may send an emty object of favourite or home address, if statement can pass, we need to set more condition for Object.keys
          if (user.favourite.address) {
            console.log('favourite', user.favourite);
            const favouritePoint = {
              type: 'point',
              x: user.favourite.favouriteLongitude,
              y: user.favourite.favouriteLatitude,
              spatialReference: {
                wkid: 4326
              }
            };
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
                // @ts-ignore
                content: createPopUpFavourite(user)
              }
            });
            view.graphics.addMany([favouriteGraphic, pointGraphic]);
          }

          if (user.homeAddress.address) {
            const homePoint = {
              type: 'point',
              x: user.homeAddress.homeLongitude,
              y: user.homeAddress.homeLatitude,
              spatialReference: {
                wkid: 4326
              }
            };
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
                // @ts-ignore
                content: createPopUpHome(user)
              }
            });
            view.graphics.add(homeGraphic);
          }
        };
        addGraphics();
      })
      .catch(err => {
        console.error('MapView failed to initialize:', err);
      });

    return () => view && view.destroy();
  }, [mapRef, categories, selectedCategories, user]);

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
  };

  const handleSideBarButton = e => {
    e.preventDefault();
    // console.log('open', forwardDirection);
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

  return (
    <div className="bg-amber-100 w-screen h-screen relative">
      <div className="filterContainer absolute z-10 bg-white top-4 left-12">
        {user && (
          <div className="relative">
            <FilterOption handleCategoryChange={handleCategoryChange} />
            {user.homeAddress.address && user.favourite && (
              <div className="fixed top-64 left-4 z-20 bg-white rounded">
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
            )}

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
