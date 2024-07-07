import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react'

interface ScrollContextProps {
  isScrolledPast: boolean
  hasHero: boolean
  setHasHero: Dispatch<SetStateAction<boolean>>
}

const ScrollContext = createContext<ScrollContextProps>({
  isScrolledPast: false,
  hasHero: false,
  setHasHero: () => {},
})

export const ScrollProvider = ({ children }) => {
  const [isScrolledPast, setIsScrolledPast] = useState(false)
  const [hasHero, setHasHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY >= 650) // Ajusta según tus necesidades
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ isScrolledPast, hasHero, setHasHero }}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScrollContext = () => {
  return useContext(ScrollContext)
}
