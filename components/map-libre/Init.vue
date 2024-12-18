<template>
  <ClientOnly>
    <mgl-map :center="center" :map-style="style" :zoom="zoom" height="100vh">
      <mgl-navigation-control />
      <map-libre-custom-marker />
      <map-libre-custom-geojsonlayer
        v-if="mapStore.lineLayer"
        id="line-layer"
        :data="lineJson"
      />
      <map-libre-custom-geojsonlayer
        v-if="mapStore.polygonLayer"
        id="polygon-layer"
        :data="polygonLayer"
      />
      <map-libre-custom-geojsonlayer id="circle-layer" :data="circleLayer" />
    </mgl-map>
  </ClientOnly>
</template>
<script setup>
import json from "./data/test.json";
import lineJson from "./data/line.json";
import polygonLayer from "./data/polygon.json";
import circleLayer from "./data/circle.json";

const mapStore = useMapStore();
const config = useRuntimeConfig();

const style = `https://api.maptiler.com/maps/streets-v2/style.json?key=${config.public.mapTilerApiKey}`;

const geoJsonSource = ref(json);

const center = [107.6191, -6.8896];

const zoom = 8;
</script>
