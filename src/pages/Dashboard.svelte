<script>
  import MainNavigator from "./components/MainNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import PlacemarkForm from "./components/PlacemarkForm.svelte";
  import DashboardMap from "./components/DashboardMap.svelte";
  import PlacemarksByRegion from "./components/PlacemarksByRegion.svelte";
  import PlacemarksByUser from "./components/PlacemarksByUser.svelte";
  import PlacemarksByMonth from "./components/PlacemarksByMonth.svelte"

  let dashboardMap = null;
  let placemarksChart = null;
  let monthsChart = null;
  let usersChart = null;
  let chart = "placemarkChart";

  async function placemarkAdded(event) {
    dashboardMap.addMarker(event.detail.placemark);
    if (chart == "placemarkChart") { // currnently throws error if chart refresh not in if-else statement
      placemarksChart.refreshChart();
    } else if (chart == "monthsChart") {
      monthsChart.refreshChart();
    } else {
      usersChart.refreshChart();
    }
  }

  function showRegion() {
    chart = "placemarkChart";
  }
  function showUsers() {
    chart = "userChart";
  }
  function showMonths() {
    chart = "monthsChart";
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
<section class="box" id="dashboard-map-heading">
  <h3 class="title is-3 has-text-centered" id="dashboard-map-text">French Edition</h3>
</section>
<section class="box">
  <DashboardMap bind:this={dashboardMap}/>
</section>
</section>

<section class="box">
  <button class="button is-info is-rounded is-outlined" on:click={showRegion}>By Region</button>
  <button class="button is-rounded" on:click={showUsers}>By User</button>
  <button class="button is-danger is-rounded is-outlined" on:click={showMonths}>By Month</button>
  <hr>
  {#if chart == "placemarkChart"}
    <PlacemarksByRegion bind:this={placemarksChart}/>
  {:else if chart == "monthsChart"}
    <PlacemarksByMonth bind:this={monthsChart}/>
  {:else}
    <PlacemarksByUser bind:this={usersChart}/>
  {/if}
</section>

<section class="box">
  <PlacemarkForm on:message={placemarkAdded}/>
</section>

<style>
  #dashboard-map-heading{
    font-family: 'Poiret One', cursive;
    background: linear-gradient(90deg, #002395, #FFFFFF, #ED2939);
    margin-bottom: 1rem;
}

  #dashboard-map-text {
    color:blue;
  }
  
</style>