import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";


const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
            50: { value: "#eaf5fb" },
            100: { value: "#d4eafa" },
            200: { value: "#a9d5f4" },
            300: { value: "#7ec0ed" },
            400: { value: "#53abe7" },
            500: { value: "#227cb0" }, // Color base
            600: { value: "#1b6691" },
            700: { value: "#154f72" },
            800: { value: "#0e3953" },
            900: { value: "#082234" },
            950: { value: "#04111a" }
          },
          secondary: {
            50:  { value: "#e9f2f0" },
            100: { value: "#cde1dc" },
            200: { value: "#9cc4ba" },
            300: { value: "#6ba799" },
            400: { value: "#4e917f" },
            500: { value: "#47786a" }, // Color base
            600: { value: "#3c6659" },
            700: { value: "#305447" },
            800: { value: "#244235" },
            900: { value: "#183024" },
            950: { value: "#0c1b13" }
          },
          ternary: {
            50:  { value: "#eff5e6" },
            100: { value: "#d8e7be" },
            200: { value: "#bfdc8f" },
            300: { value: "#a5cf5f" },
            400: { value: "#8cc438" },
            500: { value: "#79a03e" }, // Color base
            600: { value: "#638333" },
            700: { value: "#4e6729" },
            800: { value: "#394b1e" },
            900: { value: "#243014" },
            950: { value: "#111707" }
          }
      },
    },
  },
});

export const themSystem = createSystem(defaultConfig, customConfig);