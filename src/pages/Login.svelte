<script>
  import grapes from "/src/assets/grapes.jpg";
  import WelcomeNavigator from "./components/WelcomeNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import LoginForm from "./components/LoginForm.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar title={"WineMark Inc."} subTitle={"Please Log In"}/>
  </div>
  <div class="column">
    <WelcomeNavigator/>
  </div>
</div>

<div class="columns is-vcentered">
  <div class="column">
    <figure class="image is-2by1">
      <img alt="grpaes" src="{grapes}">
    </figure>
  </div>
  <div class="column">
    <div class="box">
      <h1 class="title">Log in</h1>
      <LoginForm/>
    </div>
  </div>
</div>