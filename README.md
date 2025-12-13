# WTWR (What to Wear?)

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Description

WTWR is a weather-based clothing suggestion application that helps users decide what to wear based on current weather conditions. The app fetches live weather data from the OpenWeatherMap API and provides personalized clothing recommendations based on temperature and weather conditions.

## Technologies and Tools

### Frontend

- React
- React Router
- Context API
- JavaScript (ES6+)
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Celebrate / Joi validation
- PM2 (process manager)
- Nginx (reverse proxy)

### APIs & Services

- OpenWeatherMap API
- Google Cloud VM
- Let’s Encrypt (SSL)

## Fronted Domain

https://appwtwr.jumpingcrab.com

## Backend Domain(API)

https://api.appwtwr.jumpingcrab.com

## Example endpoint

https://api.appwtwr.jumpingcrab.com/items

## Crash Test Route (for PM2 testing)

To test PM2 automatic restart, open the following URL:

https://api.appwtwr.jumpingcrab.com/crash-test

This route intentionally crashes the server.  
PM2 should automatically restart the app afterward.

## Frontend GitHub Repository

https://github.com/Rubbs/se_project_react.git

## Backend GitHub Repository

(https://github.com/Rubbs/se_project_express.git)

## Features

- User authentication (sign up / sign in / log out)
- JWT-protected routes
- Weather-based clothing recommendations
- Add, delete, like, and unlike clothing items
- User profile editing
- Responsive design
- Secure backend with centralized error handling
- Full frontend ↔ backend integration

## Demo

Sing up, https://loom.com/i/93575e7899a24302bb7bad7ea621419f
Log in, https://loom.com/i/2fee60d362344a4eb62e76fc9f05680d
