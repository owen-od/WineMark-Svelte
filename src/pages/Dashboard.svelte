<script>
  import MainNavigator from "./components/MainNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import PlacemarkForm from "./components/PlacemarkForm.svelte";
  import DashboardMap from "./components/DashboardMap.svelte";
  import PlacemarksByRegion from "./components/PlacemarksByRegion.svelte";

  let dashboardMap = null;
  let placemarksChart = null;

  function placemarkAdded(event) {
    placemarksChart.refreshChart();
    dashboardMap.addMarker(event.detail.placemark);
  }
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar title={"Winemark Inc."} subTitle={"Dashboard"}/>
  </div>
  <div class="column">
    <MainNavigator/>
  </div>
</div>

<section class="box">
  <h3 class="title is-3 has-text-centered" id="dashboard-map-heading">French Edition</h3>
</section>
<section class="box">
  <DashboardMap bind:this={dashboardMap}/>
</section>

<section class="box">
  <PlacemarksByRegion bind:this={placemarksChart}/>
</section>

<section class="box">
  <PlacemarkForm on:message={placemarkAdded}/>
</section>