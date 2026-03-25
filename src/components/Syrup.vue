<template>
  <div class="syrup" :class="[syrupTextureClass, { 'no-syrup': isNoSyrup }]" :style="syrupStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { currentSyrup, syrups } from "../stores/beverage";

const selectedSyrup = computed(
  () => syrups.value.find((syrup) => syrup.id === currentSyrup.value) ?? syrups.value[0],
);

const isNoSyrup = computed(() => selectedSyrup.value.name === "No Syrup");

const syrupStyle = computed<Record<string, string>>(() => ({
  "--syrup-color": selectedSyrup.value.color,
}));

const syrupTextureClass = computed(() => {
  switch (selectedSyrup.value.name) {
    case "Vanilla":
      return "syrup-vanilla";
    case "Caramel":
      return "syrup-caramel";
    case "Hazelnut":
      return "syrup-hazelnut";
    default:
      return "";
  }
});
</script>
<style lang="scss" scoped>
.syrup {
  transform: translateY(400%);
  background-color: var(--syrup-color);
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;
  transition: background-color 0.25s ease, opacity 0.25s ease, height 0.25s ease;
}

.syrup.no-syrup {
  height: 0;
  opacity: 0;
}

.syrup-vanilla {
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.45),
    rgba(255, 255, 255, 0.15)
  );
}

.syrup-caramel {
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.2) 4px,
    rgba(0, 0, 0, 0.08) 4px,
    rgba(0, 0, 0, 0.08) 8px
  );
}

.syrup-hazelnut {
  background-image: radial-gradient(
      circle at 30% 30%,
      rgba(255, 255, 255, 0.18),
      transparent 30%
    ),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.22));
}
</style>
