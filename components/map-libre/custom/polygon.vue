<template>
  <mgl-geo-json-source :data="polygon" source-id="polygon-layer">
    <mgl-line-layer
      :layout="layout"
      :paint="paint"
      layer-id="polygon-layer"
    ></mgl-line-layer>
  </mgl-geo-json-source>
</template>
<script setup>
import polygonJson from "~/components/map-libre/data/polygon.json";

const polygon = ref(polygonJson);

const layout = {
  "line-join": "round",
  "line-cap": "round",
};

const paint = {
  "line-color": "#0080ff",
  "line-width": 5,
};
</script>
