import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AppDataContext } from './useAppData.js'

const STORAGE_KEY = 'musical_archive_data'

function storageExists() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null
  } catch {
    return false
  }
}

/** 读取存档：缺字段时用空数组，绝不回退到 createDefaults() 以免把示例数据写进用户存档 */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return {
      plates: Array.isArray(parsed.plates) ? parsed.plates : [],
      materials: Array.isArray(parsed.materials) ? parsed.materials : [],
      pendingItems: Array.isArray(parsed.pendingItems) ? parsed.pendingItems : [],
      actors: Array.isArray(parsed.actors) ? parsed.actors : [],
    }
  } catch {
    return null
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // quota exceeded or unavailable
  }
}

const EMPTY = { plates: [], materials: [], pendingItems: [], actors: [] }

export default function AppDataProvider({ defaults, children }) {
  const [isFirstRun] = useState(() => !storageExists())
  const [firstRunDismissed, setFirstRunDismissed] = useState(false)

  const [snapshot] = useState(() => {
    const stored = loadFromStorage()
    if (stored) return stored
    return EMPTY
  })

  const [plates, setPlates] = useState(() => snapshot.plates)
  const [materials, setMaterials] = useState(() => snapshot.materials)
  const [pendingItems, setPendingItems] = useState(() => snapshot.pendingItems)
  const [actors, setActors] = useState(() => snapshot.actors)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    saveToStorage({ plates, materials, pendingItems, actors })
  }, [plates, materials, pendingItems, actors])

  const initWithDefaults = useCallback(() => {
    setPlates(defaults.plates)
    setMaterials(defaults.materials)
    setPendingItems(defaults.pendingItems)
    setActors(defaults.actors)
    setFirstRunDismissed(true)
  }, [defaults])

  const initEmpty = useCallback(() => {
    setPlates([])
    setMaterials([])
    setPendingItems([])
    setActors([])
    setFirstRunDismissed(true)
    saveToStorage(EMPTY)
  }, [])

  const clearDemoData = useCallback(() => {
    setPlates((prev) => prev.filter((x) => !x.isDemo))
    setMaterials((prev) => prev.filter((x) => !x.isDemo))
    setPendingItems((prev) => prev.filter((x) => !x.isDemo))
    setActors((prev) => prev.filter((x) => !x.isDemo))
  }, [])

  const showFirstRunDialog = isFirstRun && !firstRunDismissed

  const value = useMemo(
    () => ({
      plates,
      setPlates,
      materials,
      setMaterials,
      pendingItems,
      setPendingItems,
      actors,
      setActors,
      showFirstRunDialog,
      initWithDefaults,
      initEmpty,
      clearDemoData,
    }),
    [plates, materials, pendingItems, actors, showFirstRunDialog, initWithDefaults, initEmpty, clearDemoData],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
