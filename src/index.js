"use strict";

import './styles/main.scss';
import Home from './pages/Home.js'
import Game from './pages/Play.js'
import Utils from './services/Utils.js'


// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  '/': Home
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

  // Lazy load view element:
  const content = null || document.querySelector('#app');

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL()

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404
  content.innerHTML = await page.render();
  await page.after_render();

  let startButton = document.querySelector('#play');
  startButton.addEventListener('click', Game);

}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);


