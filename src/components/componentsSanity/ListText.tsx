import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Image,
  Stack,
  useBreakpoint,
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
                  position="relative" // Añadir position:relative al Stack
                >
                  <Heading
                    as="h1"
                    fontSize={{ base: '50px', lg: '130px' }}
                    fontWeight="bold"
                  >
                    {item.title}
                  </Heading>
                  <Image
                    src={urlForImage(item.image).url()}
                    alt={item.text}
                    boxSize={{ base: '50px', lg: '130px' }}
                    ml={2}
                  />
                  {/* Espacio entre textos adicionales */}
                  <Box w="150px" />
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
