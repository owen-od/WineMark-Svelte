<script>
  import 'leaflet/dist/leaflet.css';
  import {LeafletMap} from '../../services/leaflet-map';
  import {getContext, onMount} from "svelte";

  const placemarkService = getContext("PlacemarkService");

  const mapConfig = {
    location: {lat: 46.427638, lng: 2.213749},
    zoom: 6,
    minZoom: 1,
  };
  let map = null;

  onMount(async () => {
    map = new LeafletMap("dashboard-map", mapConfig);
    map.showZoomControl();
  
    const regions = await placemarkService.getRegions();
    regions.forEach(region => {
      map.addLayerGroup(region.name);
    });
    map.showLayerControl();

    const placemarks = await placemarkService.getPlacemarks();
    placemarks.forEach(placemark => {
      addMarker(placemark);
    });
  });
  
  export function addMarker(placemark) {
    const popupTitle = `<a href = "/#/placemark/${placemark._id}">${placemark.name}</a>`;
    map.addMarker({lat: placemark.latitude, lng: placemark.longitude}, popupTitle, placemark.region);
  }
</script>
<div class="box" id="dashboard-map" style="height:800px">
</div>