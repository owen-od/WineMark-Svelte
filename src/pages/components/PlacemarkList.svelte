<script>
  import {getContext, onMount} from 'svelte'

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
      </tr>
    {/each}
  </tbody>
</table>
