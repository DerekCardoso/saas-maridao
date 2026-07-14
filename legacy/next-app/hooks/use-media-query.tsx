"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    // Função para atualizar o estado
    const updateMatches = () => {
      setMatches(media.matches)
    }

    // Definir o valor inicial
    updateMatches()

    // Adicionar listener para mudanças
    media.addEventListener("change", updateMatches)

    // Limpar listener
    return () => {
      media.removeEventListener("change", updateMatches)
    }
  }, [query])

  return matches
}
