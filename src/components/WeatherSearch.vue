<template>
  <div class="container mt-5">
    <h1 class="text-center">Weather Dashboard</h1>
    <div class="input-group mb-3">
      <input v-model="city" type="text" class="form-control" placeholder="Enter city name" @keyup.enter="getWeather" />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button" @click="getWeather">Search</button>
      </div>
    </div>
    <div v-if="loading" class="text-center mt-3">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="weather && !loading" class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">{{ weather.name }}, {{ weather.sys.country }}</h5>
        <p class="card-text">
          Temperature: {{ weather.main.temp }} °C<br/>
          Weather: {{ weather.weather[0].description }}<br/>
          Humidity: {{ weather.main.humidity }}%<br/>
          Wind Speed: {{ weather.wind.speed }} m/s
        </p>
      </div>
    </div>
    <WeatherForecast v-if="weather && !loading" :city="weather.name" />
  </div>
</template>

<script>
import api from '../services/api';
import WeatherForecast from './WeatherForecast.vue';

export default {
  data() {
    return {
      city: '',
      weather: null,
      loading: false,
    };
  },
  methods: {
    async getWeather() {
      this.loading = true;
      try {
        const response = await api.get('/weather', {
          params: {
            q: this.city,
          },
        });
        this.weather = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('City not found! Please try again.');
      } finally {
        this.loading = false;
      }
    },
  },
  components: {
    WeatherForecast,
  },
};
</script>
