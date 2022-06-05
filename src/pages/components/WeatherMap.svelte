<script>
  // import 'leaflet/dist/leaflet.css';
  import {LeafletMap} from '../../services/leaflet-map';
  import {getContext, onMount} from "svelte";

  const placemarkService = getContext("PlacemarkService");

  const mapConfig = {
    location: {lat: 46.427638, lng: 2.213749},
    zoom: 5,
    minZoom: 1,
  };
  let map = null;

  onMount(async () => {
    map = new LeafletMap("weather-map", mapConfig);
    map.showZoomControl();
    map.addTemperature();
  });
  
  export function addMarker(placemark, temp) {
    const popupTitle = `<p>Current temp: ${temp} C</p>`;
    map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, popupTitle, placemark.region);
  }
  
</script>
<div class="box" id="weather-map" style="height:400px">
</div>