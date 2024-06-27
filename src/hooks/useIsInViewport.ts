// hooks/useIsInViewport.js
import { useEffect, useState } from 'react'

const useIsInViewport = (ref, threshold = 0.6) => {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.intersectionRatio >= threshold)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold,
      },
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, threshold])

  return isInViewport
}

export default useIsInViewport
