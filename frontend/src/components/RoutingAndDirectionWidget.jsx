import Graphic from '@arcgis/core/Graphic';
import * as route from '@arcgis/core/rest/route.js';
import FeatureSet from '@arcgis/core/rest/support/FeatureSet';
import RouteParameters from '@arcgis/core/rest/support/RouteParameters.js';
import { useContext, useEffect } from 'react';
import { UserContext } from '../helpers/UserContext';

function RoutingAndDirectionWidget({ view, apiKey, map }) {
  // @ts-ignore
  // point the URL to a valid routing service
  const routeUrl = 'https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World';
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!view || !view.ui) return;

    let originPoint = null;
    let destinationPoint = null;

    // get an origin and destination
    view.on('click', event => {
      if (view.graphics.length === 0) {
        addGraphic('origin', event.mapPoint);
      } else if (view.graphics.length === 1) {
        addGraphic('destination', event.mapPoint);
        getRoute();
      } else {
        view.graphics.removeAll();
        addGraphic('origin', event.mapPoint);
      }
    });

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

    function getRoute(origin, destination) {
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: view.graphics.toArray()
        }),
        returnDirections: true
      });

      route
        .solve(routeUrl, routeParams)
        .then(function (data) {
          data.routeResults.forEach(function (result) {
            result.route.symbol = {
              type: 'simple-line',
              color: [5, 150, 255],
              width: 3
            };
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

              direction.innerHTML =
                i +
                '. ' +
                result.attributes.text +
                ' (' +
                distanceInMeters +
                ' m in ' +
                timeInMinutes +
                ' min driving truck)';
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

    // Rest of the code...
  }, [view, apiKey]);

  return null; // Widget doesn't render anything directly
}

export default RoutingAndDirectionWidget;
