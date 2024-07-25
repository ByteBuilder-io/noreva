import {
  Box,
  Heading,
  Text,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useRef, useState, useEffect } from 'react'
import useIsInViewport from '~/hooks/useIsInViewport'

const ContentAnimation = ({
  text,
  maxWidth,
  fontSize,
  needAjust = false,
}: {
  text: string
  maxWidth: number
  fontSize: string
  needAjust?: boolean
}) => {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref, 0.1)
  const [lines, setLines] = useState([])

  const getTextWidth = async (
    text,
    fontSize = '16px',
    fontFamily = 'HankenGrotesk',
  ) => {
    // Crear un contenedor invisible para medir el ancho del texto
    const canvas = await document.createElement('canvas')
    const context = await canvas.getContext('2d')

    context.font = await `${fontSize} ${fontFamily}`
    const width = await context.measureText(text).width

    return width
  }

  useEffect(() => {
    const calculateWordsPerLine = async () => {
      let words = text.split(' ')
      let paragraf = ''
      let linesU = []
      const correctWidth = needAjust
        ? maxWidth >= 2000
          ? maxWidth - maxWidth * 0.7
          : maxWidth <= 700
            ? maxWidth - maxWidth * 0.45
            : maxWidth - maxWidth * 0.45
        : maxWidth - maxWidth * 0.3

      for (var key in words) {
        paragraf = paragraf + ' ' + words[key]
        if ((await getTextWidth(paragraf, fontSize)) >= correctWidth) {
          linesU.push(paragraf)
          paragraf = ''
        }
      }
      if (paragraf !== '') {
        linesU.push(paragraf)
        paragraf = ''
      }
      setLines(linesU)
    }

    calculateWordsPerLine()
    window.addEventListener('resize', calculateWordsPerLine)
    return () => window.removeEventListener('resize', calculateWordsPerLine)
  }, [text, fontSize, maxWidth, needAjust])
  return (
    <Box ref={ref}>
      {lines.map((line, index) => (
        <Text key={index} as="p">
          <Box
            style={{
              clipPath: isInViewport
                ? 'inset(0px -10%)'
                : 'inset(0px 0px 100%)',
              transform: isInViewport ? 'translateY(0px)' : 'translateY(100%)',
              opacity: isInViewport ? 1 : 0,
              transition:
                'clip-path 2.5s ease, transform 2.5s ease, opacity 2.5s ease',
            }}
          >
            <Heading textAlign="center" fontSize={fontSize}>
              {line}
            </Heading>
          </Box>
        </Text>
      ))}
    </Box>
  )
}

export default ContentAnimation
