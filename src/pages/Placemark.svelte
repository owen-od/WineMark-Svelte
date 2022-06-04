<script>
  import {getContext, onMount, createEventDispatcher} from 'svelte'
  import MainNavigator from "./components/MainNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import PlacemarkMap from './components/PlacemarkMap.svelte';
  import { push } from "svelte-spa-router";
  import WeatherMap from './components/WeatherMap.svelte';
  import { Splide, SplideSlide } from '@splidejs/svelte-splide';
  import '@splidejs/svelte-splide/css';

  const placemarkService = getContext("PlacemarkService");

  export let params;

  let placemarkMap = null;
  let weatherMap = null;
  let placemark = {};
  let region = {};
  let vintages = [];
  let grapes = [];
  let images = [];
  let weather = null;
  let pressure, temp, windSpeed, windDirection, conditions, humidity;

  onMount(async () => {
    placemark = await placemarkService.getPlacemark(params.placemark);
    region = await placemarkService.getRegion(placemark.region);
    images = placemark.img;
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

  const dispatch = createEventDispatcher();
  const cloudName = "dtpedvn00";
  const unsignedUploadPreset = "go5dq0iv";
  export let multiple = false;
  let uploadedFiles = [];

  function handleUpload(event) {
    if (multiple) {
      for (let file = 0; file < event.target.files.length; file++) {
        uploadFile(event.target.files[file], event.target.files.length);
      }
    } else {
      uploadFile(event.target.files[0], 1);
    }
  }

  async function uploadFile(file, length) {
    var formdata = new FormData();
    formdata.append("file", file, file.name);
    formdata.append("upload_preset", unsignedUploadPreset);
    formdata.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
    var url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    var response = await fetch(url, {
      method: "POST",
      body: formdata,
    });
    response = await response.json();
    const currentPlacemark = await placemarkService.getPlacemark(placemark._id);
    images.unshift(response.url); // add new image to beginning of image array so it updates on page
    images = images; // trigger update to array
    currentPlacemark.img = response.url // assign image string to placemark arrau to be uplaoded to db
    await placemarkService.uploadImage(currentPlacemark); // upload image to placemark object in db
    emitData(response, length);
  }

  function emitData(info, length) {
    if (length == 1) {
      dispatch("upload", info.url);
    } else {
      uploadedFiles.push(info.url);
      if (length === uploadedFiles.length) {
        dispatch("upload", uploadedFiles);
      }
    }
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

<hr>
<h3 class="title is-3 has-text-centered">La Météo</h3>
<hr>
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
<h3 class="title is-3 has-text-centered">The Gallery</h3>
<hr>
<div class="columns is-mobile">
  <div class="column is-half is-offset-one-quarter has-text-centered">
    <div class="box">
      <h3 class="title is-3">Mark your visit with a photo</h3>
      <hr/>
      <div class="card">
        <div class="card-image">
          <figure class="image is-256x256">
            <Splide options={ { height: '30vh', width: '50vw', heightRatio: 0.5 } } aria-label="Current Placemark Images">
              {#if images.length > 0}
                {#each images as image}
                  <SplideSlide>
                    <img src={image} alt="placemark image in image carousel">
                  </SplideSlide>
                {/each}
              {/if}
            </Splide>
          </figure>
        </div>
        <div class="card-content">
          <input
            type="file"
            name="file"
            accept="image/x-png,image/jpeg,application/pdf"
            on:change={handleUpload}
            {multiple}
          />
        </div>
      </div>
    </div>
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