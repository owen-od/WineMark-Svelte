<script>
  // @ts-ignore
import MainNavigator from "./components/MainNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import PlacemarkForm from "./components/PlacemarkForm.svelte";
  import PlacemarkList from "./components/PlacemarkList.svelte";
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
  <h1 class="title is-3 has-text-centered">Placemarks to date</h1>
  <PlacemarkList/>
 </section>
<section class="box">
  <PlacemarkForm/>
</section>