import { Box, useBreakpoint, useBreakpointValue } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import MovingText from 'react-moving-text'
import ContentAnimation from '../utils/animation'

const arr = ['A volcanic eruption for your brand.', 'test2', 'test3']

const MultipleTexts = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const ref2 = useRef(null)
  const [componentWidth, setComponentWidth] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [key, setKey] = useState(0) // Estado para reiniciar la animación
  const fontSize = useBreakpointValue(
    { base: '1.25rem', lg: '6rem' },
    { ssr: false },
  )

  useEffect(() => {
    const handleResize = () => {
      if (ref2.current) {
        const width = ref2.current.getBoundingClientRect().width
        setComponentWidth(width)
      }
    }

    // Crear el ResizeObserver
    const resizeObserver = new ResizeObserver(handleResize)

    // Copia de ref2.current
    const currentRef = ref2.current

    // Observa el elemento actual
    if (currentRef) {
      resizeObserver.observe(currentRef)
    }

    // Maneja el tamaño inicial
    handleResize()

    // Limpia el observer cuando el componente se desmonta
    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef)
      }
    }
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % data.columns.length)
      setKey((prevKey) => prevKey + 1) // Cambia el key para reiniciar la animación
    }, 5000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <Box
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: data.bgColor ? data.bgColor.hex : 'white',
      }}
      height={{base: '50vh', lg: '90vh'}}
    >
      <div
        style={{
          borderWidth: 3,
          borderColor: 'black',
          width: '95%',
          height: '95%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box ref={ref2} style={{ textAlign: 'center' }} maxW={'1000px'}>
          <ContentAnimation
            key={key}
            fontSize={fontSize}
            maxWidth={componentWidth}
            text={data.columns[currentTextIndex].title}
          />
        </Box>
      </div>
    </Box>
  )
}
export default MultipleTexts
