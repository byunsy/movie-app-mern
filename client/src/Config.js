// Server Routes
export const USER_SERVER = "/api/users";
export const API_URL = "https://api.themoviedb.org/3/";
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/";

// Acquire movie API key from key.js
const key = require("./key");
export const API_KEY = key.MOVIE_API;
