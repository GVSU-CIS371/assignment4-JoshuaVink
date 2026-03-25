<template>
  <div
    class="froth"
    :class="[creamerTextureClass, { 'no-creamer': isNoCreamer }]"
    :style="creamerStyle"
  >
    <div v-for="i in 5" :key="i" class="foam" v-show="!isNoCreamer"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { creamers, currentCreamer } from "../stores/beverage";

const selectedCreamer = computed(
  () =>
    creamers.value.find((creamer) => creamer.id === currentCreamer.value) ??
    creamers.value[0],
);

const isNoCreamer = computed(() => selectedCreamer.value.name === "No Creamer");

const creamerStyle = computed<Record<string, string>>(() => ({
  "--creamer-color": selectedCreamer.value.color,
  "--foam-color":
    selectedCreamer.value.name === "Milk"
      ? "#f8fbff"
      : selectedCreamer.value.name === "Half & Half"
        ? "#fff6d6"
        : "#efe8d6",
  "--froth-height":
    selectedCreamer.value.name === "Milk"
      ? "14%"
      : selectedCreamer.value.name === "Cream"
        ? "24%"
        : selectedCreamer.value.name === "Half & Half"
          ? "19%"
          : "0%",
  "--froth-opacity":
    selectedCreamer.value.name === "Milk"
      ? "0.78"
      : selectedCreamer.value.name === "Cream"
        ? "0.98"
        : selectedCreamer.value.name === "Half & Half"
          ? "0.9"
          : "0",
  "--foam-scale":
    selectedCreamer.value.name === "Milk"
      ? "0.82"
      : selectedCreamer.value.name === "Cream"
        ? "1.08"
        : selectedCreamer.value.name === "Half & Half"
          ? "0.94"
          : "0",
  "--foam-shadow":
    selectedCreamer.value.name === "Milk"
      ? "0 0 0 1px rgba(255, 255, 255, 0.35)"
      : selectedCreamer.value.name === "Cream"
        ? "0 4px 10px rgba(160, 130, 90, 0.28)"
        : selectedCreamer.value.name === "Half & Half"
          ? "0 2px 8px rgba(180, 150, 90, 0.22)"
          : "none",
}));

const creamerTextureClass = computed(() => {
  switch (selectedCreamer.value.name) {
    case "Milk":
      return "creamer-milk";
    case "Cream":
      return "creamer-cream";
    case "Half & Half":
      return "creamer-half-half";
    default:
      return "";
  }
});
</script>

<style lang="scss" scoped>
.froth {
  overflow: visible;
  transform: translateY(400%);
  position: relative;
  height: var(--froth-height);
  width: 100%;
  background-color: var(--creamer-color);
  animation: pour-tea 2s 2s forwards;
  opacity: var(--froth-opacity);
  transition: background-color 0.25s ease, opacity 0.25s ease, height 0.25s ease,
    box-shadow 0.25s ease;
}

.froth::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.froth.no-creamer {
  height: 0;
  opacity: 0;
}

.foam {
  display: block;
  background: var(--foam-color);
  border-radius: 30px;
  height: 40px;
  width: 40px;
  position: absolute;
  transform: scale(var(--foam-scale));
  box-shadow: var(--foam-shadow);
  transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.creamer-milk {
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.7),
    rgba(220, 238, 255, 0.18)
  );
}

.creamer-milk::after {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.45),
    rgba(255, 255, 255, 0.1) 40%,
    rgba(200, 225, 255, 0.15)
  );
}

.creamer-cream {
  background-image: radial-gradient(
      circle at 25% 20%,
      rgba(255, 255, 255, 0.6),
      transparent 35%
    ),
    linear-gradient(to bottom, rgba(255, 248, 220, 0.3), rgba(210, 185, 140, 0.12));
  box-shadow: inset 0 4px 10px rgba(255, 255, 255, 0.24);
}

.creamer-cream::after {
  background: radial-gradient(
      circle at 20% 10%,
      rgba(255, 255, 255, 0.45),
      transparent 28%
    ),
    radial-gradient(circle at 78% 40%, rgba(255, 255, 255, 0.22), transparent 30%);
}

.creamer-half-half {
  background-image: repeating-linear-gradient(
    -35deg,
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5) 7px,
    rgba(255, 245, 200, 0.18) 7px,
    rgba(255, 245, 200, 0.18) 14px
  );
}

.creamer-half-half::after {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.22),
    rgba(255, 248, 220, 0.06)
  );
}

.foam:nth-child(1) {
  top: 0px;
  left: -3px;
}

.foam:nth-child(2) {
  top: 0px;
  left: 55px;
}

.foam:nth-child(3) {
  width: 30px;
  height: 30px;
  border-radius: 40px;
  top: 3px;
  left: 30px;
}

.foam:nth-child(4) {
  width: 30px;
  height: 30px;
  border-radius: 45px;
  top: 5px;
  right: -2px;
}

.foam:nth-child(5) {
  top: 2px;
  right: 10px;
}
</style>
