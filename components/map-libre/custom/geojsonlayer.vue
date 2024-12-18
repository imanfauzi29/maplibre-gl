<template>
  <mgl-geo-json-source :data="props.data" :source-id="props.id">
    <mgl-line-layer
      :layer-id="props.id"
      :layout="layout"
      :paint="paint"
    ></mgl-line-layer>
  </mgl-geo-json-source>
</template>
<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const layout = {
  "line-join": "round",
  "line-cap": "round",
};

const paint = {
  "line-color": "#0080ff",
  "line-width": 5,
};
</script>
