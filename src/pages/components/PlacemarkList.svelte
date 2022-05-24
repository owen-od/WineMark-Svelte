<script>
  import {getContext, onMount} from 'svelte'
import Placemark from '../Placemark.svelte';

  const placemarkService = getContext("PlacemarkService");
  let placemarkList = [];

  onMount(async () => {
    placemarkList = await placemarkService.getPlacemarks();
  });
</script>

<table class="table is-fullwidth">
  <thead>
    <th>Name</th>
    <th>Latitude</th>
    <th>Longitude</th>
    <th>Region</th>
    <th>Link</th>
  </thead>
  <tbody>
    {#each placemarkList as placemark}
      <tr>
        <td>
          {placemark.name}
        </td>
        <td>
          {placemark.latitude}
        </td>
        <td>
          {placemark.longitude}
        </td>
        <td>
          {placemark.region}
        </td>
        <td>
          <a href = "/#/placemark/{placemark._id}">link</a>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
