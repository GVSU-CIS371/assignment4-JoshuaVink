import { defineStore } from "pinia";
import bases from "../data/bases.json";
import creamers from "../data/creamers.json";
import syrups from "../data/syrups.json";
import tempretures from "../data/tempretures.json";
import type {
  BaseBeverageType,
  BeverageType,
  CreamerType,
  SyrupType,
} from "../types/beverage";

type TemperatureType = string;

type BeverageStoreState = {
  temps: TemperatureType[];
  bases: BaseBeverageType[];
  creamers: CreamerType[];
  syrups: SyrupType[];
  currentTemp: TemperatureType;
  currentBase: string;
  currentCreamer: string;
  currentSyrup: string;
  currentName: string;
  beverages: BeverageType[];
};

export const useBeverageStore = defineStore("BeverageStore", {
  state: (): BeverageStoreState => ({
    temps: tempretures,
    bases,
    creamers,
    syrups,
    currentTemp: tempretures[0],
    currentBase: bases[0].id,
    currentCreamer: creamers[0].id,
    currentSyrup: syrups[0].id,
    currentName: "",
    beverages: [],
  }),

  getters: {
    selectedBase(state): BaseBeverageType {
      return state.bases.find((base) => base.id === state.currentBase) ?? state.bases[0];
    },
    selectedCreamer(state): CreamerType {
      return (
        state.creamers.find((creamer) => creamer.id === state.currentCreamer) ??
        state.creamers[0]
      );
    },
    selectedSyrup(state): SyrupType {
      return state.syrups.find((syrup) => syrup.id === state.currentSyrup) ?? state.syrups[0];
    },
  },

  actions: {
    makeBeverage(name?: string) {
      const beverageName = (name ?? this.currentName).trim();

      if (!beverageName) {
        return;
      }

      const base = this.bases.find((item) => item.id === this.currentBase) ?? this.bases[0];
      const creamer =
        this.creamers.find((item) => item.id === this.currentCreamer) ?? this.creamers[0];
      const syrup = this.syrups.find((item) => item.id === this.currentSyrup) ?? this.syrups[0];

      this.beverages.push({
        id: `${Date.now()}-${this.beverages.length + 1}`,
        name: beverageName,
        temp: this.currentTemp,
        base,
        creamer,
        syrup,
      });

      this.currentName = "";
    },

    showBeverage(beverageId: string) {
      const beverage = this.beverages.find((item) => item.id === beverageId);

      if (!beverage) {
        return;
      }

      this.currentTemp = beverage.temp;
      this.currentBase = beverage.base.id;
      this.currentCreamer = beverage.creamer.id;
      this.currentSyrup = beverage.syrup.id;
      this.currentName = beverage.name;
    },
  },

  persist: {
    storage: sessionStorage,
  },
});
