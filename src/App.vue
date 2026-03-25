<template>
  <div>
    <Beverage :isIced="currentTemp === 'Cold'" />

    <label for="beverage-name">Name</label>
    <input id="beverage-name" type="text" v-model="currentName" />
    <button type="button" @click="makeAndSelectBeverage">Make Beverage</button>

    <div id="beverage-container">
      <template v-for="beverage in beverages" :key="beverage.id">
        <label>
          <input
            type="radio"
            name="saved-beverage"
            :value="beverage.id"
            v-model="selectedBeverageId"
            @change="selectBeverage(beverage.id)"
          />
          {{ beverage.name }}
        </label>
      </template>
    </div>

    <ul>
      <li>
        <template v-for="temp in temps" :key="temp">
          <label>
            <input
              type="radio"
              name="temperature"
              :id="`r${temp}`"
              :value="temp"
              v-model="currentTemp"
            />
            {{ temp }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="base in bases" :key="base.id">
          <label>
            <input
              type="radio"
              name="base"
              :id="base.id"
              :value="base.id"
              v-model="currentBase"
            />
            {{ base.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="creamer in creamers" :key="creamer.id">
          <label>
            <input
              type="radio"
              name="creamer"
              :id="creamer.id"
              :value="creamer.id"
              v-model="currentCreamer"
            />
            {{ creamer.name }}
          </label>
        </template>
      </li>
      <li>
        <template v-for="syrup in syrups" :key="syrup.id">
          <label>
            <input
              type="radio"
              name="syrup"
              :id="syrup.id"
              :value="syrup.id"
              v-model="currentSyrup"
            />
            {{ syrup.name }}
          </label>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import Beverage from "./components/Beverage.vue";
import { useBeverageStore } from "./stores/beverageStore";

const beverageStore = useBeverageStore();

const {
  temps,
  bases,
  creamers,
  syrups,
  currentTemp,
  currentBase,
  currentCreamer,
  currentSyrup,
  currentName,
  beverages,
} = storeToRefs(beverageStore);

const { makeBeverage, showBeverage } = beverageStore;

const selectedBeverageId = ref("");

const makeAndSelectBeverage = () => {
  const initialCount = beverages.value.length;
  makeBeverage();

  if (beverages.value.length <= initialCount) {
    return;
  }

  const newestBeverage = beverages.value[beverages.value.length - 1];
  selectedBeverageId.value = newestBeverage.id;
};

const selectBeverage = (beverageId: string) => {
  selectedBeverageId.value = beverageId;
  showBeverage(beverageId);
};
</script>

<style lang="scss">
body,
html {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #6e4228;
  background: linear-gradient(to bottom, #6e4228 0%, #956f5a 100%);
}
ul {
  list-style: none;
  padding-left: 0;
}
li {
  margin-bottom: 0.5rem;
}
label {
  margin-right: 0.75rem;
}
</style>

