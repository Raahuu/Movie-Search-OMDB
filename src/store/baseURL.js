import axios from "axios";

const instance = axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`,
});

export default instance;
