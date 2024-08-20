<template>
    <div v-if="forecast" class="container mt-5">
      <h2 class="text-center">5-Day Forecast for {{ forecast.city.name }}</h2>
      <div class="d-flex mainDiv">
        <div class="" v-for="(day, index) in forecast?.list" :key="index">
          <div class="card" v-if="index % 8 === 0">
            <div class="card-body text-center">
              <h5 class="card-title">{{ formatDate(day.dt_txt) }}</h5>
              <p class="card-text">
                <img :src="'http://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png'" alt="Weather Icon">
                <br/>
                {{ day.main.temp }} °C
                <br/>
                {{ day.weather[0].description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    props: ['city'],
    data() {
      return {
        forecast: null,
      };
    },
    async created() {
      await this.getForecast();
    },
    methods: {
      async getForecast() {
        try {
          const response = await api.get('/forecast', {
            params: {
              q: this.city,
            },
          });
          this.forecast = response.data;
        } catch (error) {
          console.error('Error fetching forecast data:', error);
          alert('Error fetching forecast data! Please try again.');
        }
      },
      formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        });
      },
    },
    watch: {
      city: 'getForecast',
    },
  };
  </script>

  <style scoped>
  .mainDiv{
    margin-top: 30px;
    gap: 10px;
  }
  </style>
  