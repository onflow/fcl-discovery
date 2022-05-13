import { useState, useEffect } from 'react'

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key)
  return saved == 'undefined' || saved == 'null' ? defaultValue : JSON.parse(saved)
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
