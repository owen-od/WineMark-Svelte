<script>
  import 'leaflet/dist/leaflet.css';
  import {LeafletMap} from '../../services/leaflet-map';
  import {getContext, onMount} from "svelte";
  import Placemark from '../Placemark.svelte';
  
  export let placemark = {};

  export let map = null;

  const mapConfig = {
    location: {lat: 48, lng: 4},
    zoom: 6,
    minZoom: 1,
    defaultLayer: "Geoportail",
  };

  onMount(async () => {
    map = new LeafletMap("placemark-map", mapConfig);
    map.showZoomControl();
    map.showLayerControl();

    addMarker(placemark);
  });
  
 export function addMarker(placemark) {
   const popupTitle = `<p>${placemark.name}</p>`;
   map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, popupTitle);
 }
  
</script>

<div class="box" id="placemark-map" style="height:800px"></div>