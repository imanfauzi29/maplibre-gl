<template>
  <div class="relative h-screen">
    <div class="absolute h-full py-4 px-4 z-10">
      <div
        class="bg-gray-300 h-full w-72 bg-white/30 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-4 dark:bg-black/30 dark:border-black/20"
      >
        <h1 class="text-2xl font-semibold text-black/70 dark:text-white/70">
          Layer
        </h1>

        <div class="mt-10 flex flex-col gap-4">
          <toggle @on-checked="mapStore.toggleLine">Line</toggle>
          <toggle @onChecked="mapStore.togglePolygon">Polygon</toggle>
          <toggle @onChecked="mapStore.toggleCircle">Circle</toggle>
          <toggle v-slot="{ isToggle }" @on-checked="mapStore.toggleCustomMap">
            Marker ({{ isToggle ? "Custom Marker" : "Default Marker" }})
          </toggle>
          <toggle>Vector Tiles</toggle>
        </div>
      </div>
    </div>
    <MapLibreInit />
  </div>
</template>
<script lang="ts" setup>
import Toggle from "~/components/ui/Toggle.vue";
import { useMapStore } from "~/stores/useMapStore";

const mapStore = useMapStore();
</script>
