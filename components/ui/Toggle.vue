<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      :checked="isToggle"
      :disabled="disabled"
      class="sr-only peer"
      type="checkbox"
      value=""
      @change="handleChange"
    />
    <div
      class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-disabled:cursor-not-allowed peer-disabled:bg-gray-500 peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    />
    <span
      class="ms-3 text-sm font-medium text-gray-900 dark:text-white/70 peer-disabled:cursor-not-allowed"
    >
      <slot :isToggle="isToggle" />
    </span>
  </label>
</template>
<script lang="ts" setup>
const props = defineProps({
  checked: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
  },
});
const emit = defineEmits(["onChecked"]);
const isToggle = ref(props.checked || false);

function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const checked = input.checked;
  isToggle.value = checked;
  emit("onChecked", checked);
}
</script>
