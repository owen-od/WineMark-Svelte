<script>
  import Chart from 'svelte-frappe-charts';
  import {getContext, onMount} from "svelte";
  
  const placemarkService = getContext("PlacemarkService");

  let totalByRegion = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };

  export async function refreshChart() {
    let regions = await placemarkService.getRegions();
    let placemarks = await placemarkService.getPlacemarks();
    populateByPlacemark(regions, placemarks);
  }

  function populateByPlacemark(regions, placemarks) {
    totalByRegion.labels = [];
    totalByRegion.datasets[0].values = [];
    regions.forEach(region => {
      totalByRegion.labels.push(`${region.name}`);
      totalByRegion.datasets[0].values.push(0);
    })
    regions.forEach((region, i) => {
      placemarks.forEach(placemark => {
        if (placemark.region == region.name) {
          totalByRegion.datasets[0].values[i] += 1;
        }
      });
    });
  }

  onMount(async () => {
    let regions = await placemarkService.getRegions();
    let placemarks = await placemarkService.getPlacemarks();
    populateByPlacemark(regions, placemarks);
  });
</script>

<Chart data={totalByRegion} type="line" title="Placemarks By Region"/>