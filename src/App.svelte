<script>
  import Main from "./pages/Main.svelte"
  import Login from "./pages/Login.svelte"
  import Signup from "./pages/Signup.svelte"
  import Router from "svelte-spa-router";
import Dashboard from "./pages/Dashboard.svelte";

  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/main": Main,
    "/dashboard": Dashboard,
    "/logout": Main
  }
</script>

<div class="container">
  <Router {routes}/>
</div>