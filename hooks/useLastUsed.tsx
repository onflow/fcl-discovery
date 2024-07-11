import { LOCAL_STORAGE_KEYS } from '../helpers/constants'
import { useLocalStorage } from './useLocalStorage'

export function useLastUsed() {
  const [, setLastUsed] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_USED, null)
  const [lastUsed] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_USED, null)

  return { lastUsed, setLastUsed }
}
