<script>
  import 'leaflet/dist/leaflet.css';
  import {LeafletMap} from '../../services/leaflet-map';
  import {onMount} from "svelte";


  const mapConfig = {
    location: {lat: 46.427638, lng: 2.213749},
    zoom: 6,
    minZoom: 1,
  };

  onMount(async () => {
    const map = new LeafletMap("dashboard-map", mapConfig);
    map.showZoomControl();
    map.showLayerControl();
  });
</script>

<div class="box" id="dashboard-map" style="height:800px">
</div>