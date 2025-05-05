"use client";

import { ChakraProvider } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode";
import { themSystem } from "../theme/appTheme";


export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={themSystem}>
      <ColorModeProvider {...props}/>
    </ChakraProvider>
  );
}
