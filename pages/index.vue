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
          <toggle @on-checked="toggleLineLayer">Line</toggle>
          <toggle @onChecked="togglePolygonLayer">Polygon</toggle>
          <toggle @onChecked="toggleCircleLayer">Circle</toggle>
          <toggle @onChecked="toggleMarker">Marker</toggle>
          <toggle
            v-if="mapStore.customMarker"
            v-slot="{ isToggle }"
            :disabled="!mapStore.customMarker"
            @on-checked="toggleCustomMarker"
          >
            Marker ({{ isToggle ? "Custom Marker" : "Default Marker" }})
          </toggle>
          <toggle>Vector Tiles</toggle>
        </div>
      </div>
    </div>
    <MapLibreInit />
  </div>
</template>
<script setup>
import maplibregl from "maplibre-gl";
import Toggle from "~/components/ui/Toggle.vue";
import { useMapStore } from "~/stores/useMapStore";
import linejson from "~/components/map-libre/data/line.json";
import polygonjson from "~/components/map-libre/data/polygon.json";
import circlejson from "~/components/map-libre/data/circle.json";

const mapStore = useMapStore();

function toggleLineLayer(isChecked) {
  const layerId = "line";
  const stateSource = "state-line";

  if (isChecked) {
    mapStore.addLayer({
      layerId,
      stateSource,
      data: linejson,
      type: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#4f5af6",
        "line-width": 3,
      },
    });
  } else {
    mapStore.removeLayer(layerId, stateSource);
  }
}

function togglePolygonLayer(isChecked) {
  const layerId = "polygon";
  const stateSource = "state-polygon";

  if (isChecked) {
    mapStore.addLayer({
      layerId,
      stateSource,
      data: polygonjson,
      type: "fill",
      paint: {
        "fill-color": "rgba(96,165,227)",
        "fill-outline-color": "rgb(34,126,209)",
        "fill-opacity": 0.6,
      },
    });
  } else {
    mapStore.removeLayer(layerId, stateSource);
  }
}

function toggleCircleLayer(isChecked) {
  const layerId = "circle";
  const stateSource = "state-circle";

  if (isChecked) {
    mapStore.addLayer({
      layerId,
      stateSource,
      data: circlejson,
      type: "circle",
      paint: {
        "circle-radius": 24,
        "circle-color": "rgb(156,73,198)",
        "circle-opacity": 0.6,
        "circle-stroke-width": 3,
        "circle-stroke-color": "rgb(156, 73, 198)",
      },
    });
  } else {
    mapStore.removeLayer(layerId, stateSource);
  }
}

function toggleMarker(showMarker) {
  if (!showMarker && mapStore.customMarker) {
    mapStore.customMarker.remove();
    mapStore.setCustomMarker(null);
    return;
  }

  const marker = new maplibregl.Marker()
    .setLngLat(mapStore.markerCoordinates)
    .addTo(mapStore.map);

  mapStore.setCustomMarker(marker);
}

function toggleCustomMarker(isCustom) {
  if (mapStore.customMarker) {
    mapStore.customMarker.remove();
  }

  if (isCustom) {
    const img = document.createElement("img");
    img.src = "/images/logo.png";
    img.className = "size-8";

    const marker = new maplibregl.Marker({ element: img })
      .setLngLat(mapStore.markerCoordinates)
      .addTo(mapStore.map);

    mapStore.setCustomMarker(marker);
  } else {
    const marker = new maplibregl.Marker()
      .setLngLat(mapStore.markerCoordinates)
      .addTo(mapStore.map);

    mapStore.setCustomMarker(marker);
  }
}
</script>
