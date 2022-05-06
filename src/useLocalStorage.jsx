import {useState, useEffect} from 'react'

function getSavedValue(initialValue, key) {
  const storedValue = JSON.parse(localStorage.getItem(key))
  if(storedValue) return storedValue

  if(initialValue instanceof Function) return initialValue()
  return initialValue
}

export default function useLocalStorage(initialValue, key) {
  const [value,setValue] = useState(() => {
    return getSavedValue(initialValue, key)
  })

  useEffect (() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value,setValue];
}