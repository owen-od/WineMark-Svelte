<script>
  import Chart from 'svelte-frappe-charts';
  import {getContext, onMount} from "svelte";
  
  const placemarkService = getContext("PlacemarkService");

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let totalByMonth = {
    labels: months,
    datasets: [
      {
        values: []
      }
    ]
  };

  export async function refreshChart() {
    let placemarks = await placemarkService.getPlacemarks();
    populateByPlacemark(placemarks);
  }

  function populateByPlacemark(placemarks) {
    totalByMonth.labels = [];
    totalByMonth.datasets[0].values = [];
    months.forEach(month => {
      totalByMonth.labels.push(`${month}`);
      totalByMonth.datasets[0].values.push(0);
    })
    months.forEach((month, i) => {
      placemarks.forEach(placemark => {
        if (placemark.timestamp.includes(month)) {
          totalByMonth.datasets[0].values[i] += 1;
        }
      });
    });
  }

  onMount(async () => {
    let placemarks = await placemarkService.getPlacemarks();
    populateByPlacemark(placemarks);
  });
</script>

<Chart data={totalByMonth} type="line" title="Placemarks By Month"/>