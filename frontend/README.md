# Webmap Application - A MERN Stack Application

This is a basic web application built using the MERN stack (MongoDB, Express.js, React, and Node.js).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm are installed.
- MongoDB is installed and running.
- git bash

## Tech

This app uses a number of open source projects to work:

- [ReactJS](https://react.dev/) - Create interfaces by combining components
- [TailwindCSS](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML
- [Vite](https://vitejs.dev/) - a build tool to provide a faster and leaner development experience for modern web projects

## Libraries

This app uses also some open libraries:
| Library | Link |
| ------ | ------ |
| ArcGIS API for Javascripts | https://developers.arcgis.com/javascript/latest/ |
| Material-tailwind | https://www.material-tailwind.com/ |
| Axios | https://axios-http.com/ |

## Installation for frontend

Install the dependencies and devDependencies and start the server.
- Open git bah inside frontend directory and then run:

```sh
npm install
```

### Setting Up Environment Variables

create .env file:

```sh
touch .env
```

### Add key to get access to ArgcGIS API

inside file .env add your ArcGIS API Key:

> Note: to get API Key, you need to create an account in [ArcGIS Developers](https://developers.arcgis.com/),
> assign API SDK for Javascripts and set an [API Key](https://developers.arcgis.com/api-keys/)

```sh
VITE_ARCGIS_KEY=<Your_API_KEY>
```

## Run

```sh
npm run dev
```

### Run App in browser

```sh
127.0.0.1:3000
```

## License

- [Yen Nguyen](https://www.linkedin.com/in/yen-nguyen-521997207/)
- Git Repo: https://github.com/Yannie258/web-map-MERN
