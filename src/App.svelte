<script>
  import Main from "./pages/Main.svelte"
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Router from "svelte-spa-router";
  import Dashboard from "./pages/Dashboard.svelte";
  import Placemark from "./pages/Placemark.svelte";
  import {PlacemarkService} from "./services/PlacemarkService.js";
  import { setContext } from "svelte";

  setContext("PlacemarkService", new PlacemarkService("http://localhost:4000"));

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/main": Main,
    "/dashboard": Dashboard,
    "/logout": Main,
    "/placemark/:placemark": Placemark
  }
</script>

<div class="container">
  <Router {routes}/>
</div>