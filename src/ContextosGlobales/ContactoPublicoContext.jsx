"use client";

import { createContext, useContext, useEffect, useState } from "react";

const EnlaceWhatsappContext = createContext("");

function normalizarNumeroWhatsapp(numero) {
  return String(numero || "").replace(/[^\d]/g, "");
}

export default function ContactoPublicoProvider({ children }) {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [enlaceWhatsapp, setEnlaceWhatsapp] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarEnlaceWhatsapp() {
      try {
        const respuesta = await fetch(`${API}/datosempresa/seleccionartodos`, {
          method: "GET",
          headers: { Accept: "application/json" },
          mode: "cors",
          cache: "no-store",
          signal: controlador.signal,
        });

        if (!respuesta.ok) return;

        const datos = await respuesta.json();
        const empresa = Array.isArray(datos) ? datos[0] : datos;
        const numeroWhatsapp = empresa?.contactoWhatsapp || empresa?.contactoTelefono || "";

        if (!numeroWhatsapp) return;

        const mensaje = encodeURIComponent("Hola, quisiera agendar una hora.");
        setEnlaceWhatsapp(
          `https://wa.me/${normalizarNumeroWhatsapp(numeroWhatsapp)}?text=${mensaje}`
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          setEnlaceWhatsapp("");
        }
      }
    }

    cargarEnlaceWhatsapp();
    return () => controlador.abort();
  }, [API]);

  return (
    <EnlaceWhatsappContext.Provider value={enlaceWhatsapp}>
      {children}
    </EnlaceWhatsappContext.Provider>
  );
}

export function useEnlaceWhatsapp() {
  return useContext(EnlaceWhatsappContext);
}
