import { defineConfig, presetUno } from "unocss";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  presets: [
    presetUno(), // default preset (right now it's equivalent to @unocss/preset-wind)
    presetRemToPx(), // coverts rem to px for utils.
  ],
});
