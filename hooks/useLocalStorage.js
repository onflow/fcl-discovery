import { useState, useEffect } from 'react'

function getStorageValue(key, defaultValue) {
  const saved = localStorage.getItem(key)
  const initial = JSON.parse(saved)
  return initial || defaultValue
}

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
