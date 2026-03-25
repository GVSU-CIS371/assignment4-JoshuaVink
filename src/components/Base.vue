<template>
  <div class="baseBeverage" :class="baseTextureClass" :style="baseStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { bases, currentBase } from "../stores/beverage";

const selectedBase = computed(
  () => bases.value.find((base) => base.id === currentBase.value) ?? bases.value[0],
);

const baseStyle = computed<Record<string, string>>(() => ({
  "--base-color": selectedBase.value.color,
}));

const baseTextureClass = computed(() => {
  switch (selectedBase.value.name) {
    case "Black Tea":
      return "base-black-tea";
    case "Green Tea":
      return "base-green-tea";
    case "Coffee":
      return "base-coffee";
    default:
      return "";
  }
});
</script>

<style scoped>
.baseBeverage {
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 0;
  background-color: var(--base-color);
  animation: pour-tea 2s;
  z-index: 300;
  transition: background-color 0.25s ease;
}

.baseBeverage::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.3;
}

.base-black-tea::after {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(0, 0, 0, 0.2)
  );
}

.base-green-tea::after {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.18) 8px,
    rgba(255, 255, 255, 0.06) 8px,
    rgba(255, 255, 255, 0.06) 16px
  );
}

.base-coffee::after {
  background-image: radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.18),
      transparent 35%
    ),
    radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.2), transparent 35%);
}
</style>
