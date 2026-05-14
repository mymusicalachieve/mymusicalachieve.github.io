import { createContext, useContext } from 'react'

export const AppDataContext = createContext(null)

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
