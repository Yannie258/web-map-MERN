import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView.js';
import ArcGisMap from '@arcgis/core/Map.js';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    console.log('object',mapRef)
    if (!mapRef?.current) return;

    const map = new ArcGisMap({
      basemap: 'streets-navigation-vector',
    });

    const view = new MapView({
      map: map, // References a Map instance
      container: mapRef.current, // References the ID of a DOM element
      center: [12.9214, 50.8278], // Sets the center point of the view
      zoom: 12 // Sets the zoom level of the view
    });
    return () => view && view.destroy();
  }, [mapRef]);
  
  // Create a MapView instance (for 2D viewing)
  
  return (
    <div className='bg-amber-100 w-screen h-screen'>
      
      <div className="viewMap bg-amber-100" ref={mapRef}></div>;
    </div>
  ); 
}

export default Map
