'use client'

import { useCreateRootStore } from "@/hooks/useCreateRootStore"
import RootStore from "@/stores/RootStore"
import React from "react"

type RootStoreContextValue = RootStore

type RootStoreProviderProps = {
  children: React.ReactNode
}

export const RootStoreContext = React.createContext<RootStoreContextValue | null>(null)
export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({ children }) => {
  const store = useCreateRootStore();
  return (
    <RootStoreContext.Provider value={store}>
      {children}
    </RootStoreContext.Provider>
  )
}