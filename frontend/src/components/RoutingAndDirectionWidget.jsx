import Graphic from '@arcgis/core/Graphic';
import * as route from '@arcgis/core/rest/route.js';
import FeatureSet from '@arcgis/core/rest/support/FeatureSet';
import RouteParameters from '@arcgis/core/rest/support/RouteParameters.js';
import { useContext, useEffect } from 'react';
import { UserContext } from '../helpers/UserContext';

function RoutingAndDirectionWidget({ view, apiKey, map, forwardDirection }) {
  // @ts-ignore
  // point the URL to a valid routing service
  const routeUrl = 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World';
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!view || !view.ui || !user) return;
    const { homeAddress, favourite } = user;
    //if (!homeAddress || !favourite) return;

    const originPoint = {
      type: 'point',
      longitude: forwardDirection ? favourite.favouriteLongitude : homeAddress.homeLongitude,
      latitude: forwardDirection ? favourite.favouriteLatitude : homeAddress.homeLatitude
    };

    const destinationPoint = {
      type: 'point',
      longitude: forwardDirection ? homeAddress.homeLongitude : favourite.favouriteLongitude,
      latitude: forwardDirection ? homeAddress.homeLatitude : favourite.favouriteLatitude
    };

    function addGraphic(type, point) {
      const graphic = new Graphic({
        symbol: {
          type: 'simple-marker',
          color: type === 'origin' ? 'white' : 'black',
          size: '8px'
        },
        geometry: point
      });
      view.graphics.add(graphic);
    }

    function getRoute() {
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: [new Graphic({ geometry: originPoint }), new Graphic({ geometry: destinationPoint })]
        }),
        returnDirections: true
      });
      route
        .solve(routeUrl, routeParams)
        .then(function (data) {
          // Clear previous route graphics
          view.graphics.forEach(graphic => {
            if (graphic.attributes && graphic.attributes.route) {
              view.graphics.remove(graphic);
            }
          });

          data.routeResults.forEach(function (result) {
            result.route.symbol = {
              type: 'simple-line',
              color: forwardDirection ? 'blue' : 'red',
              width: 3
            };
            result.route.attributes = { route: true }; // Tag the route graphic
            view.graphics.add(result.route);
          });

          // Display directions
          if (data.routeResults.length > 0) {
            const directions = document.createElement('ol');
            const totalDistance = document.createElement('p');
            const totalTime = document.createElement('p');

            directions.classList = 'esri-widget esri-widget--panel esri-directions__scroller';
            directions.style.marginTop = '0';
            directions.style.padding = '15px 15px 15px 30px';
            const features = data.routeResults[0].directions.features;

            let accumulatedDistance = 0;
            let accumulatedTime = 0;

            // Show each direction
            features.forEach(function (result, i) {
              const direction = document.createElement('li');
              const distanceInMeters = Math.round(result.attributes.length * 1609.34); // Convert miles to meters
              const timeInMinutes = result.attributes.time.toFixed(2); // Time in minutes

              accumulatedDistance += distanceInMeters;
              accumulatedTime += parseFloat(timeInMinutes);

              let text;
              if (i === 0) {
                text = `Start at ${
                  forwardDirection ? 'favourite' : 'home'
                } (${distanceInMeters} m in ${timeInMinutes} min driving truck)`;
              } else if (i === features.length - 1) {
                text = `End at ${
                  forwardDirection ? 'home' : 'favourite'
                } (${distanceInMeters} m in ${timeInMinutes} min driving truck)`;
              } else {
                text = `${i}. ${result.attributes.text} (${distanceInMeters} m in ${timeInMinutes} min driving truck)`;
              }

              direction.innerHTML = text;
              directions.appendChild(direction);
            });

            totalDistance.innerHTML = 'Total Distance: ' + (accumulatedDistance / 1000).toFixed(2) + ' km';
            totalTime.innerHTML = 'Total Time: ' + accumulatedTime.toFixed(2) + ' min';

            view.ui.empty('top-right');
            view.ui.add(directions, 'top-right');
            view.ui.add(totalDistance, 'top-right');
            view.ui.add(totalTime, 'top-right');
          }
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }

    // Clear previous route graphics
    view.graphics.forEach(graphic => {
      if (graphic.attributes && graphic.attributes.route) {
        view.graphics.remove(graphic);
      }
    });

    // Add graphics to the map
    addGraphic('origin', originPoint);
    addGraphic('destination', destinationPoint);

    // Get the route
    getRoute();

    // Clean up effect
    return () => {
      // Clear only route graphics and UI elements
      view.graphics.forEach(graphic => {
        if (graphic.attributes && graphic.attributes.route) {
          view.graphics.remove(graphic);
        }
      });
      view.ui.empty('top-right');
    };

    // Rest of the code...
  }, [view, apiKey, forwardDirection]);

  return null; // Widget doesn't render anything directly
}

export default RoutingAndDirectionWidget;
