
import Graphic from '@arcgis/core/Graphic.js';
import ArcGisMap from '@arcgis/core/Map.js';
import Point from '@arcgis/core/geometry/Point.js';
import MapView from '@arcgis/core/views/MapView.js';
import Search from '@arcgis/core/widgets/Search.js';
import { useContext, useEffect, useRef, useState } from 'react';
import FilterOption from '../components/FilterOption';
import { UserContext } from '../helpers/UserContext';
import SearchWidget from '../components/SearchWidget';

function Map() {
  const mapRef = useRef(null);
  const { user, categories, categoriesColor } = useContext(UserContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMap, setViewMap] = useState(null);

  const getSymbolColorForCategory = categoryName => {
    return categoriesColor[categoryName] || '#000000';
  };

  // Function to handle category selection
  const handleCategoryChange = categories => {
    setSelectedCategories(categories.map(category => category.value));
  };

  const handleSelectHomePlace = (event) => { 
    event.preventDefault();
    const selectedPlace = event.target.value;
    console.log('click search', selectedPlace);

  }

  useEffect(() => {
    if (!mapRef?.current || !categories || categories.length === 0) return;

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
              content: `
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
              
              `
            }
          });

          if (selectedCategories.length === 0 || selectedCategories.includes(category.name)) {
            view.graphics.add(pointGraphic);
          }
        }
      });
    };

    addGraphics();

    return () => view && view.destroy();
  }, [mapRef, categories, selectedCategories]);

  return (
    <div className="bg-amber-100 w-screen h-screen relative">
      <div className="filterContainer absolute z-10 bg-white top-4 left-12">
        {user &&
          <div className=''>
            <FilterOption handleCategoryChange={handleCategoryChange} />
            <SearchWidget view={viewMap} onSelectPlace={handleSelectHomePlace}></SearchWidget>
          </div>
          
        }
      </div>
      <div className="viewMap bg-amber-100" ref={mapRef}></div>
    </div>
  );
}

export default Map;
