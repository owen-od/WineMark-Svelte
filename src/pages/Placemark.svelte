<script>
  import {getContext, onMount} from 'svelte'
  import MainNavigator from "./components/MainNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import PlacemarkMap from './components/PlacemarkMap.svelte';

  const placemarkService = getContext("PlacemarkService");

  let placemarkMap = null;

  export let params;
  
  let placemark = {};
  let region = {};
  let vintages = [];
  let grapes = [];

  onMount(async () => {
    placemark = await placemarkService.getPlacemark(params.placemark);
    region = await placemarkService.getRegion(placemark.region);
    vintages = region.vintages;
    grapes = region.grapes;
    placemarkMap.addMarker(placemark);
  });

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
      <PlacemarkMap bind:this={placemarkMap} placemark={placemark}/>
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

<style>
  #grape-list{
    list-style-type: '🍇';
    list-style-position: inside;
    text-align: center;
    font-size: 120%;
}
</style>