// hooks/useBienvenida.ts
import { useEffect } from "react";

export function useBienvenida(nombre: string) {
  useEffect(() => {
    if (nombre) {
      console.log(`Bienvenido/a, ${nombre}!`);
    }
  }, [nombre]);
}
