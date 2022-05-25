import { useState, useEffect } from 'react'

function getStorageValue(key, defaultValue, storage) {
  const saved = storage.getItem(key)
  const initial = JSON.parse(saved)
  return initial || defaultValue
}

export const useStorage = (key, defaultValue) => {
  const storage = localStorage || sessionStorage
  const [value, setValue] = useState(() =>
    getStorageValue(key, defaultValue, storage)
  )

  useEffect(() => {
    storage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
