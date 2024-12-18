<template>
  <div id="map" class="w-full h-full" />
</template>
<script setup>
import geojsonSource from "./data/test.json";
import maplibregl from "maplibre-gl";

const mapStore = useMapStore();
const config = useRuntimeConfig();

const style = `https://api.maptiler.com/maps/streets-v2/style.json?key=${config.public.mapTilerApiKey}`;
const center = [110.3676, -4.2281];
const zoom = 5;

const map = ref(null);

onMounted(() => {
  const newMap = new maplibregl.Map({
    container: "map",
    center,
    zoom,
    style,
  });

  newMap.addControl(new maplibregl.NavigationControl({ visualizePitch: true }));
  mapStore.setMap(newMap);
  newMap.on("load", () => {
    addGeoJson(newMap);
  });
});

function addGeoJson(map) {
  const source = "geojson-source";
  map.addSource(source, { type: "geojson", data: geojsonSource });

  map.loadImage("/images/logo.png").then((res) => {
    map.addImage("custom-marker", res.data);
  });

  // marker default
  map.addLayer({
    id: "default-marker-layer",
    source,
    type: "symbol",
    filter: ["==", ["get", "name"], "Marker Default"],
    layout: {
      "icon-image": "marker",
      "icon-size": 2,
    },
    paint: {
      "icon-color": "#FF0000",
    },
  });

  // Polygon line
  map.addLayer({
    id: "custom-polygon-layer",
    source,
    type: "fill",
    layout: {},
    paint: {
      "fill-antialias": true,
      "fill-color": ["get", "fillColor"],
      "fill-outline-color": ["get", "lineColor"],
      "fill-opacity": 0.3,
    },
    filter: ["==", ["geometry-type"], "Polygon"],
  });

  // Circle marker
  map.addLayer({
    id: "circle-marker-layer",
    source,
    type: "circle",
    filter: ["==", ["get", "name"], "Circle Marker"],
    paint: {
      "circle-radius": ["get", "radius"],
      "circle-color": "rgb(73,102,198)",
      "circle-opacity": 0.6,
      "circle-stroke-width": 3,
      "circle-stroke-color": "rgb(73,113,198)",
    },
  });

  // custom line
  map.addLayer({
    id: "custom-line-layer",
    source,
    type: "line",
    paint: {
      "line-color": ["get", "lineColor"],
      "line-width": 2,
    },
    filter: ["==", ["geometry-type"], "LineString"],
  });

  console.log(map.getImage("custom-image"));

  // Custom marker
  map.addLayer({
    id: "custom-marker-layer",
    source,
    type: "symbol",
    filter: ["==", ["get", "name"], "Custom Image Marker"],
    layout: {
      "icon-image": "custom-marker",
      "icon-size": 0.1,
    },
  });

  const layers = [
    "default-marker-layer",
    "circle-marker-layer",
    "custom-marker-layer",
  ];

  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers,
    });

    if (!features.length) {
      return;
    }

    const feature = features[0];
    const coordinates = feature.geometry.coordinates;
    const properties = feature.properties;

    const html = `name: ${properties.name}`;

    new maplibregl.Popup().setLngLat(coordinates).setHTML(html).addTo(map);
  });

  layers.map((layer) => {
    map.on("mouseenter", layer, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", layer, () => {
      map.getCanvas().style.cursor = "";
    });
  });
}
</script>
