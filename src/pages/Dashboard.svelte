<script>
  import MainNavigator from "./components/MainNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import PlacemarkForm from "./components/PlacemarkForm.svelte";
  import DashboardMap from "./components/DashboardMap.svelte";
  import PlacemarksByRegion from "./components/PlacemarksByRegion.svelte";
  import PlacemarksByUser from "./components/PlacemarksByUser.svelte";

  let dashboardMap = null;
  let placemarksChart = null;
  let usersChart = null;
  let chart = "placemarkChart";

  async function placemarkAdded(event) {
    dashboardMap.addMarker(event.detail.placemark);
    if (chart == "placemarkChart") { // currnently throws error if chart refresh not in if-else statement
      placemarksChart.refreshChart();
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
  <button class="button is-danger" on:click={showRegion}>By Region</button>
  <button class="button is-info" on:click={showUsers}>By User</button>
  <hr>
  {#if chart == "placemarkChart"}
    <PlacemarksByRegion bind:this={placemarksChart}/>
  {:else}
    <PlacemarksByUser bind:this={usersChart}/>
  {/if}
</section>

<section class="box">
  <PlacemarkForm on:message={placemarkAdded}/>
</section>