<template>
  <ClientOnly>
    <mgl-map :center="center" :map-style="style" :zoom="zoom" height="100vh">
      <mgl-navigation-control />
      <mgl-marker :coordinates="coordinates" color="#cc0000" />
    </mgl-map>
  </ClientOnly>
</template>
<script setup>
import json from "./test.json";

const config = useRuntimeConfig();
const geoJsonSource = ref(json);

const style = `https://api.maptiler.com/maps/streets-v2/style.json?key=${config.public.mapTilerApiKey}`;
const center = [107.6191, -6.8896];
const coordinates = [107.6191, -6.8896];
const zoom = 8;
</script>
