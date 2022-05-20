<script>
  import vineyard from "/src/assets/vineyard.jpg";
  import WelcomeNavigator from "./components/WelcomeNavigator.svelte";
  import TitleBar from "./components/TitleBar.svelte";
  import SignupForm from "./components/SignupForm.svelte";
</script>

<div class="columns is-vcentered">
  <div class="column is-two-thirds">
    <TitleBar subTitle={"Sign up"} title={"WineMark Inc."}/>
  </div>
  <div class="column">
    <WelcomeNavigator/>
  </div>
</div>

<div class="columns is-vcentered">
  <div class="column">
    <div class="box">
      <h1 class="title">Sign Up</h1>
      <SignupForm/>
    </div>
  </div>
  <div class="column">
    <img alt="homer" src="{vineyard}">
  </div>
</div>