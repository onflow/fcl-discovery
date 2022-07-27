import { useState, useEffect } from 'react'

// Local storage not supported in incognito and checking window object not sufficient
const isLocalStorageAvailable = () => {
  const testString = 'test'
  try {
    localStorage.setItem(testString, testString)
    localStorage.removeItem(testString)
    return true
  } catch (e) {
    return false
  }
} 

const getStorageValue = (key, defaultValue) => {
  const saved = localStorage.getItem(key)
  const initial = JSON.parse(saved)
  return initial || defaultValue
}

export const useLocalStorage = (key, defaultValue) => {
  if (!isLocalStorageAvailable()) {
    return [null, () => {}]
  }

  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
