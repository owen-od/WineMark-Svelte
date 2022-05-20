<script>
  import {push} from "svelte-spa-router";

  let email = ""
  let password = "";

  async function login() {
    push("/dashboard");
  }
</script>

<form on:submit|preventDefault={login}>
  <div class="field">
    <label class="label" for="email">Email</label>
    <input bind:value={email} class="input" id="email" type="text" placeholder="Enter email" name="email">
  </div>
  <div class="field">
    <label class="label" for="password">Password</label>
    <input bind:value={password} class="input" id="password" type="password" placeholder="Enter Password" name="password">
  </div>
  <div class="field is-grouped">
    <button class="button is-link">Log in</button>
  </div>
</form>