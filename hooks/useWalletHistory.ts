import { useCallback } from 'react'
import { Wallet } from '../data/wallets'
import { LOCAL_STORAGE_KEYS } from '../helpers/constants'
import { useLocalStorage } from './useLocalStorage'

export function useWalletHistory() {
  const [, setLastUsedState] = useLocalStorage(
    LOCAL_STORAGE_KEYS.LAST_USED,
    null,
  )
  const [lastUsedUid] = useLocalStorage(LOCAL_STORAGE_KEYS.LAST_USED, null)

  const setLastUsed = useCallback(
    (wallet: Wallet) => {
      setLastUsedState(wallet.uid)
    },
    [setLastUsedState],
  )

  const isLastUsed = useCallback(
    (wallet: Wallet) => wallet.uid === lastUsedUid,
    [lastUsedUid],
  )

  return { isLastUsed, setLastUsed, lastUsedUid }
}
