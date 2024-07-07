import { useEffect, useState } from 'react'

const useScrollPosition = (maxScroll) => {
  const [isScrolledPast, setIsScrolledPast] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY >= maxScroll)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [maxScroll])

  return isScrolledPast
}

export default useScrollPosition
