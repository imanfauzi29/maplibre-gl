function mapStore() {
  const isCustomMap = ref(false);
  const lineLayer = ref(false);
  const polygonLayer = ref(false);
  const circleLayer = ref(false);

  // Actions
  const toggleCustomMap = () => {
    isCustomMap.value = !isCustomMap.value;
  };

  const toggleLine = () => {
    lineLayer.value = !lineLayer.value;
  };

  const togglePolygon = () => {
    polygonLayer.value = !polygonLayer.value;
  };

  const toggleCircle = () => {
    circleLayer.value = !circleLayer.value;
  };

  // Return state and actions
  return {
    isCustomMap,
    lineLayer,
    polygonLayer,
    circleLayer,
    toggleCustomMap,
    toggleLine,
    togglePolygon,
    toggleCircle,
  };
}

export const useMapStore = defineStore("map", mapStore);
