<script>
  export let title = "";
  export let subTitle = "";
</script>

<div class="box has-text-centered columns m-2">
  <div class="column">
    <i style="font-size: 48px; color: purple;" class="fas fa-solid fa-wine-bottle"></i>
  </div>
  <div class="column">
    <div class="title is-5"> {title} </div>
    <div class="subtitle is-5"> {subTitle} </div>
  </div>
  <div class="column">
    <i class="fas fa-donate fa-3x" style="color:rgb(95, 96, 173)"></i>
    <div class="is-size-7">WineMark-Svelte 0.1</div>
  </div>
</div>