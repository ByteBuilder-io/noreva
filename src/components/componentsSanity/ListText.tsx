import React, { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Image,
  Stack,
  useBreakpoint,
  Text,
} from '@chakra-ui/react'
import { urlForImage } from '~/lib/sanity.image'
import Marquee from 'react-fast-marquee'

const ListText = ({ data }) => {
  const breakpoint = useBreakpoint({ ssr: false })
  const [hoverIndex, setHoverIndex] = useState(null)
  const [alreadyHovered, setAlreadyHovered] = useState(
    new Array(data.columns.length).fill(false),
  )

  const handleMouseEnter = (index) => {
    setHoverIndex(index)
    const newHovered = [...alreadyHovered]
    newHovered[index] = true
    setAlreadyHovered(newHovered)
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
  }

  const getPatternedContent = (item, rowIndex) => {
    const textSegments = item.title.split(' - ')
    const segmentsLength = textSegments.length
    let patternedContent = []

    if (segmentsLength > 1) {
      for (let i = 0; i < segmentsLength; i++) {
        const shouldInsertImage =
          (rowIndex % 3 === 0 && i === 2) ||
          (rowIndex % 3 === 1 && i === 1) ||
          (rowIndex % 3 === 2 && i === 3)

        if (shouldInsertImage) {
          patternedContent.push(
            <React.Fragment key={`image-${i}`}>
              <Image
                src={urlForImage(item.image).url()}
                alt={item.text}
                boxSize={{ base: '50px', lg: '130px' }}
                mx={2}
              />
              <Heading
                as="h1"
                fontSize={{ base: '50px', lg: '130px' }}
                fontWeight="bold"
                mx={2}
              >
                -
              </Heading>
            </React.Fragment>,
          )
        }

        patternedContent.push(
          <React.Fragment key={`text-${i}`}>
            <Heading
              as="h1"
              fontSize={{ base: '50px', lg: '130px' }}
              fontWeight="bold"
              mx={2}
            >
              {textSegments[i]} -
            </Heading>
          </React.Fragment>,
        )
      }
    } else {
      // Si no hay "-", solo muestra el texto seguido de la imagen
      patternedContent = [
        <Heading
          key={`text-only`}
          as="h1"
          fontSize={{ base: '50px', lg: '130px' }}
          fontWeight="bold"
          mx={2}
        >
          {item.title}
        </Heading>,
        <Image
          key={`image-only`}
          src={urlForImage(item.image).url()}
          alt={item.text}
          boxSize={{ base: '50px', lg: '130px' }}
          mx={2}
        />,
      ]
    }

    return patternedContent
  }

  return (
    <div style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}>
      <Container
        m={'auto'}
        maxW={'100%'}
        pt={{ base: '100px', lg: '150px' }}
        pb={{ base: '100px', lg: '150px' }}
      >
        <Stack spacing={{ base: 10, lg: 20 }}>
          {data.columns.map((item, index) => (
            <Box
              key={index}
              whiteSpace="nowrap"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Marquee
                gradient={false}
                speed={breakpoint === 'base' ? 150 : 350}
                style={{ minHeight: '100%' }}
                autoFill={alreadyHovered[index]}
                play={breakpoint === 'base' ? true : hoverIndex === index}
              >
                <Stack
                  ml={index % 2 === 0 ? '5%' : '10%'}
                  direction={'row'}
                  overflowY={'hidden'}
                  w={'100%'}
                  position="relative"
                >
                  {getPatternedContent(item, index)}
                  {/* Espacio entre textos adicionales */}
                  <Box w={{base: "20px", lg: "50px"}} />
                </Stack>
              </Marquee>
            </Box>
          ))}
        </Stack>
      </Container>
    </div>
  )
}

export default ListText
