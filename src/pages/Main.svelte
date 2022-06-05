<script>
  import WelcomeNavigator from "./components/WelcomeNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import {getContext} from "svelte";

  const placemarkService = getContext("PlacemarkService");
  placemarkService.logout();
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar title={"Winemark Inc."} subTitle={"Main page"}/>
  </div>
  <div class="column">
    <WelcomeNavigator/>
  </div>
</div>

<section class="hero is-link is-fullheight-with-navbar" id="main-hero">
  <div class="hero-body container">
    <div class="container has-text-centered">
      <h1 class="title" id="main-hero-title">WineMark</h1>
      <h2 class="subtitle" id="main-hero-subtitle">Mark the magic of discovery</h2>
    </div>
  </div>
</section>

<style>
  #main-hero {
    background-image: url(../assets/vineyard2.jpg);
    background-position: center;
    background-size: cover;
    background-color: #cccccc;
    box-shadow: inset 0 0 0 1000px rgba(0,0,0,.2);
}

#main-hero-title {
    position: relative;
    margin-bottom: 70vh;
    /*bottom: 26rem;*/
    color: purple;
    font-family: 'Poiret One', cursive;
    font-size: 450%;
}

#main-hero-subtitle {
    position: relative;
    bottom: 69vh;
    /*bottom: 26rem;*/
    color: purple;
    font-family: 'Poiret One', cursive;
    font-size: 250%;
    font-style: italic;
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
    #main-hero-title {
        /*bottom: 26rem;*/
        color: purple;
        font-family: 'Poiret One', cursive;
        font-size: 450%;
    }

    #main-hero-subtitle {
        /*bottom: 26rem;*/
        color: purple;
        font-family: 'Poiret One', cursive;
        font-size: 250%;
        font-style: italic;
    }
  }
</style>