<script>
  import {createEventDispatcher, getContext, onMount} from "svelte";
  import {user} from "../../stores.js"

  const placemarkService = getContext("PlacemarkService");
  const dispatch = createEventDispatcher();

  let name = "";
  let latitude = "";
  let longitude = "";
  let region = "";
  let description = "";

  let message = "";

  let regionList = [];
  onMount(async () => {
    regionList = await placemarkService.getRegions()
  });

  async function addPlacemark() {
    if (name && latitude && longitude && region && description) {
      const placemark = {
        name: name,
        latitude: latitude,
        longitude: longitude,
        region: region, 
        description: description,
        userid: $user._id,
      };
      const newPlacemark = await placemarkService.addPlacemark(placemark);
      if (!newPlacemark) {
        message = "An error occured - placemark not added";
        return;
      }
        message = `Great - ${name} has been added as a placemark`
        dispatch("message", {
          placemark: newPlacemark, // need to use returned placemark to have id for url in marker
        });
      } else {
        message = "Please fill in all the details";
      }
    }
</script>

<div class="container">
  <div class ="box">
    <h3 class="title is-3 has-text-centered" id="add-placemark-heading">Mark your terroir</h3>
    <form on:submit|preventDefault={addPlacemark}>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label" for="name">Placemark Name</label> <input bind:value={name} class="input" type="text" placeholder="Enter place name" name="name">
        </div>
        <div class="field">
          <label class="label" for="latitude">Latitude</label>
          <input bind:value={latitude} class="input" type="number" placeholder="Enter latitude" step="0.0000001" max="90" min="-90" name="latitude">
        </div>
        <div class="field">
        <label class="label" for="longitude">Longitude</label> 
        <input bind:value={longitude} class="input" type="number" placeholder="Enter Longitude" step="0.0000001" max="180" min="-180" name="longitude">
      </div>
        </div>
      </div>
      <div class="field">
      <label class="label" for="region">Region</label>
      <div class="control">
        <div class="select">
          <select bind:value={region} name="region">
            {#each regionList as region}
            <option>{region.name}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label class="label" for="description">Description</label>
        <textarea bind:value={description} class="textarea" placeholder="Enter description" name="description"></textarea>
      </div>
    </div>
      <div class="field">
        <button class="button is-link">Add Placemark</button>
      </div>
    </form>
    {#if message}
      <div class="section">
        {message}
      </div>
    {/if}
  </div>
</div>