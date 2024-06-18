# Webmap Application - A MERN Stack Application

This is a basic web application built using the MERN stack (MongoDB, Express.js, React, and Node.js).

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm are installed.
- MongoDB is installed and running.

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

```sh
npm install
```

### Setting Up Environment Variables

```sh
touch .env
```

### Add key to get access to ArgcGIS API

inside file .env add:

```sh
VITE_ARCGIS_KEY=AAPK068f033f411a491ea0ce16c156c385b2M6TFdFKxESw75XZz5466meiJmHTjMip_z5LAmavA0ZqWe4Ex6tcNufmt3SEm0snn
```

### Run

```sh
npm run dev
```

For production environments...

## Run App in browser

```sh
127.0.0.1:3000
```

## License

- [Yen Nguyen](https://www.linkedin.com/in/yen-nguyen-521997207/)
