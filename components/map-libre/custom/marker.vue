<template>
  <mgl-marker
    v-if="!mapStore.isCustomMap"
    :coordinates="coordinates"
    color="#cc0000"
  />
  <mgl-marker v-else :coordinates="coordinates">
    <template v-slot:marker>
      <img :src="logo" alt="marker" class="size-8" />
    </template>
  </mgl-marker>
</template>
<script setup>
import { useMapStore } from "~/stores/useMapStore";
import logo from "~/assets/images/logo.png";

const mapStore = useMapStore();
const coordinates = [107.6191, -6.8896];
</script>
