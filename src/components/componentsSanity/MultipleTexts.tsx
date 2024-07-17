import { Box, useBreakpoint } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import MovingText from 'react-moving-text'

const arr = ['A volcanic eruption for your brand.', 'test2', 'test3']

const MultipleTexts = ({ data }: { data: any }) => {
  const ref = useRef(null)

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        backgroundColor: data.bgColor ? data.bgColor.hex : 'white',
      }}
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
        <Box style={{ textAlign: 'center' }} maxW={'1000px'}>
          <RenderText data={data} />
        </Box>
      </div>
    </div>
  )
}

const RenderText = ({ data }) => {
  const breakpoint = useBreakpoint({ ssr: false })

  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [key, setKey] = useState(0) // Estado para reiniciar la animación

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % data.columns.length)
      setKey((prevKey) => prevKey + 1) // Cambia el key para reiniciar la animación
    }, 5000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <MovingText
      key={key} // Cambia el key para reiniciar la animación
      type="fadeInFromBottom"
      duration="500ms"
      delay="0s"
      direction="normal"
      timing="linear"
      iteration="1"
      fillMode="none"
      style={{
        fontSize: breakpoint === 'base' ? '2.5rem' : '6rem',
        fontWeight: 'bold',
      }} // Ajusta el tamaño y el estilo del texto
    >
      {data.columns[currentTextIndex].title}
    </MovingText>
  )
}

export default MultipleTexts
