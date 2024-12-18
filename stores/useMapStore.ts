import maplibregl from "maplibre-gl";

function mapStore() {
  const markerCoordinates = ref([107.6191, -6.8896]);
  const customMarker = ref<maplibregl.Marker | null>(null);
  const map = ref<maplibregl.Map | null>(null);

  // Actions
  const setCustomMarker = (marker: maplibregl.Marker) => {
    customMarker.value = marker;
  };

  const addLayer = ({
    layerId,
    stateSource,
    data,
    type,
    ...rest
  }: {
    layerId: string;
    stateSource: string;
    data: object;
    layout: object;
    paint: object;
    type:
      | "fill"
      | "line"
      | "symbol"
      | "circle"
      | "heatmap"
      | "fill-extrusion"
      | "raster"
      | "hillshade"
      | "background";
  }) => {
    map.value.addSource(stateSource, { type: "geojson", data });

    map.value.addLayer({
      id: layerId,
      type,
      source: stateSource,
      ...rest,
    });
  };

  const removeLayer = (layerId, stateSource) => {
    if (map.value.getLayer(layerId)) {
      map.value.removeLayer(layerId);
      map.value.removeSource(stateSource);
    }
  };

  const setMap = (libreMap: maplibregl.Map) => {
    map.value = libreMap;
  };

  // Return state and actions
  return {
    markerCoordinates,
    customMarker,
    map,
    setCustomMarker,
    setMap,
    addLayer,
    removeLayer,
  };
}

export const useMapStore = defineStore("map", mapStore);
