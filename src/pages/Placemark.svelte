<script>
  import {getContext, onMount} from 'svelte'
  import MainNavigator from "./components/MainNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import PlacemarkMap from './components/PlacemarkMap.svelte';
  import { push } from "svelte-spa-router";
  import WeatherMap from './components/WeatherMap.svelte';

  const placemarkService = getContext("PlacemarkService");

  let placemarkMap = null;
  let weatherMap = null;

  export let params;
  
  let placemark = {};
  let region = {};
  let vintages = [];
  let grapes = [];
  let weather = null;
  let pressure, temp, windSpeed, windDirection, conditions, humidity;


  onMount(async () => {
    placemark = await placemarkService.getPlacemark(params.placemark);
    region = await placemarkService.getRegion(placemark.region);
    vintages = region.vintages;
    grapes = region.grapes;
    placemarkMap.addMarker(placemark);
    weather = await getWeather(placemark);
    pressure = weather.pressure;
    temp = weather.temp;
    windSpeed = weather.windSpeed;
    windDirection = weather.windDirection;
    humidity = weather.humidity;
    conditions = weather.conditions;
    weatherMap.addMarker(placemark, temp);
  });

  function deletePlacemark() {
    placemarkService.deletePlacemark(placemark._id);
    console.log("delete " + placemark._id);
    push("/dashboard");
  }

  async function getWeather(placemark) {
    let lat = placemark.latitude;
    let lng = placemark.longitude;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=9782ce4340037cde393220f4fe748998`;
    const response = await fetch(requestUrl);
    const result = await response.json();
    const reading = {
      temp: result.current.temp,
      windSpeed: result.current.wind_speed,
      pressure: result.current.pressure,
      windDirection: result.current.wind_deg, 
      humidity: result.current.humidity,
      conditions: result.current.weather[0].description,
    };
    return reading;
  }
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar title={"Winemark Inc."} subTitle={"Placemark"}/>
  </div>
  <div class="column">
    <MainNavigator/>
  </div>
</div>

<section class="section has-text-centered" id="place-description">
  <div class="title has-text-centered">
    <p>
      {placemark.name}
    </p>
  </div>
  <section class="block">
    {placemark.description}
  </section>
</section>

<section class="box">
  <div class="columns is-vcentered">
    <div class="column is-four-fifths">
      <PlacemarkMap bind:this={placemarkMap}/>
    </div>
    <div class="column is-one-fifth has-text-centered">
      <h3 class="title is-3">{region.name} Region</h3>
      <table class="table mx-auto is-striped">
        <thead>
          <tr>
            <th>Best Vintages</th>
          </tr>
        </thead>
        <tbody>
          {#each vintages as vintage}
          <tr>
            <th>{vintage}</th>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<div class="section">
  <div class="columns is-mobile">
    <div class="column is-three-fifths is-offset-one-fifth has-text-centered">
      <h3 class="title is-3">Grape varieties of the {region.name} region</h3><hr>
      <ul id="grape-list">
        {#each grapes as grape}
        <li><br>{grape}</li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<div class="columns is-vcentered">
  <div class="column is-one-half">
    <section class="box">
      <h3 class="title is-4 has-text-centered">Current Weather Conditions</h3> 
      <hr>
      <h4 class="title is-5 has-text-centered">{conditions}</h4> 
      <i style="font-size: 24px; color: orange; float: left; padding-right: 1em; " class="fas fa-solid fa-temperature-high"></i>
      <p>Temperature: {temp} C</p>
      <i style="font-size: 24px; color: blue; float: left; padding-right: 1em; " class="fas fa-solid fa-water"></i>
      <p>Humidity: {humidity} %</p>
      <i style="font-size: 24px; color: purple; float: left; padding-right: 1em; " class="fas fa-solid fa-arrow-down"></i>
      <p>Pressure: {pressure} hpa</p>
      <i style="font-size: 24px; color: red; float: left; padding-right: 1em; " class="fas fa-solid fa-compass"></i>
      <p>Wind Direction: {windDirection}°</p>
      <i style="font-size: 24px; color: grey; float: left; padding-right: 1em; " class="fas fa-solid fa-wind"></i>
      <p>Wind Speed: {windSpeed} mph</p>
    </section>
  </div>
  <div class="column is-one-half">
    <WeatherMap bind:this={weatherMap}/>
  </div>
</div>

<hr>
<div class="columns is-mobile">
  <div class="column is-half is-offset-one-quarter has-text-centered">
    <button class="button is-danger" on:click={deletePlacemark}> Delete Placemark </button>
  </div>
</div>

<style>
  #grape-list{
    list-style-type: '🍇';
    list-style-position: inside;
    text-align: center;
    font-size: 120%;
  }
  
</style>