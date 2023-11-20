# WorldWise

React SPA that lets the user to save the list of cities/countries he visited previously

## Features

- Simple navigation that tracks what page you're currently on;
- The app screen with the visited cities on the left;
- The app screen with the map on the right side;

## Details

- Navigation in SPA is handled by React Router;
- In the App itself, once the city is clicked, the id (state) is passed in URL;
- Stylesheets are written using CSS Modules;
- Cities are fetched from fake API using json-server (Must run "npm run server" for app to work);
- State is managed by Context API custom component;
- Map is rendered with Leaflet API;
