import { createContext, useContext, useState } from 'react'

export const NavigationContext = createContext({
  navigate: (route: string) => {
    console.log('Navigate to', route)
  },
  goBack: () => {
    console.log('Go back')
  },
  history: [],
  currentRoute: '',
})

export function Navigator({ children }) {
  const [history, setHistory] = useState([])
  const [currentRoute, setCurrentRoute] = useState('')

  const navigate = route => {
    setHistory([...history, currentRoute])
    setCurrentRoute(route)
  }

  const goBack = () => {
    const previousRoute = history.pop()
    setCurrentRoute(previousRoute)
  }

  return (
    <NavigationContext.Provider
      value={{ navigate, goBack, history, currentRoute }}
    ></NavigationContext.Provider>
  )
}

export function Route({ component }) {
  return component
}

export function useNavigation() {
  return useContext(NavigationContext)
}
