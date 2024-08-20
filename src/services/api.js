import axios from 'axios';

const apiKey = process.env.VUE_APP_API_KEY;

console.log('API Key:', process.env.VUE_APP_API_KEY);


const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: apiKey,
    units: 'metric'
  },
});

export default api;
