<script>
  import Chart from 'svelte-frappe-charts';
  import {getContext, onMount} from "svelte";
  
  const placemarkService = getContext("PlacemarkService");

  let totalByUser = {
    labels: [],
    datasets: [
      {
        values: []
      }
    ]
  };

  export async function refreshChart() {
    let users = await placemarkService.getUsers();
    let placemarks = await placemarkService.getPlacemarks();
    populateByUsers(users, placemarks);
  }

  function populateByUsers(users, placemarks) {
    totalByUser.labels = [];
    totalByUser.datasets[0].values = [];
    users.forEach(user => {
      totalByUser.labels.push(`${user.firstName}`);
      totalByUser.datasets[0].values.push(0);
    })
    users.forEach((user, i) => {
      placemarks.forEach(placemark => {
        if (user._id == placemark.userid) {
          totalByUser.datasets[0].values[i] += 1;
        }
      });
    });
  }

  onMount(async () => {
    let users = await placemarkService.getUsers();
    let placemarks = await placemarkService.getPlacemarks();
    populateByUsers(users, placemarks);
  });
</script>

<Chart data={totalByUser} type="pie" title="Placemarks By User"/>