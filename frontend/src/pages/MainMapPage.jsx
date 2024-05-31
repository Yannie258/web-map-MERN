import Graphic from '@arcgis/core/Graphic.js';
import ArcGisMap from '@arcgis/core/Map.js';
import Point from '@arcgis/core/geometry/Point.js';
import MapView from '@arcgis/core/views/MapView.js';
import { useContext, useEffect, useRef, useState } from 'react';
import FilterOption from '../components/FilterOption';
import Search from '@arcgis/core/widgets/Search.js';
import { UserContext } from '../helpers/UserContext';

function Map() {
  const mapRef = useRef(null);
  // @ts-ignore
  const { categories, categoriesColor } = useContext(UserContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const getSymbolColorForCategory = categoryName => {
    return categoriesColor[categoryName] || '#000000';
  };

  // Function to handle category selection
  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    // console.log('object', mapRef);
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
        top: 0 // Zoom button position
      }
    });

    const searchWidget = new Search({
      view: view
      // source:[]
    });
    // Adds the search widget below other elements in
    // the top left corner of the view
    view.ui.add(searchWidget, {
      position: 'top-right',
      index: 2
    });

    console.log('object', categories);

    const addGraphics = () => {
      view.graphics.removeAll();
      categories.forEach(category => {
        if (category.geometry && category.geometry.coordinates) {
          const point = new Point({
            longitude: category.geometry.coordinates[0],
            latitude: category.geometry.coordinates[1]
          });

          const pointGraphic = new Graphic({
            geometry: point,
            symbol: {
              type: 'simple-marker',
              color: getSymbolColorForCategory(category.name),
              outline: {
                color: [255, 255, 255],
                width: 1
              }
            }
          });

          if (!selectedCategory || category.name === selectedCategory) {
            view.graphics.add(pointGraphic);
          }
        }
      });
    };

    addGraphics();

    return () => view && view.destroy();
  }, [mapRef, categories,selectedCategory]);

  // Create a MapView instance (for 2D viewing)

  return (
    <div className="bg-amber-100 w-screen h-screen relative">
      <div className="filterContainer absolute z-10 bg-white top-20 right-1">
        <FilterOption handleCategoryChange={handleCategoryChange}></FilterOption>
      </div>
      <div className="viewMap bg-amber-100" ref={mapRef}></div>;
    </div>
  );
}

export default Map;
