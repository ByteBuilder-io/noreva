import React, { useState } from 'react'
import { Box, Container, Heading, Image, Stack } from '@chakra-ui/react'
import { urlForImage } from '~/lib/sanity.image'
import Marquee from 'react-fast-marquee'

const ListText = ({ data }) => {
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
      <Container m={'auto'} maxW={'100%'} pt={'250px'} pb={'250px'}>
        <Stack spacing={20}>
          {data.columns.map((item, index) => (
            <Box
              key={index}
              whiteSpace="nowrap"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Marquee
                gradient={false}
                speed={300}
                style={{ minHeight: '100%' }}
                autoFill={alreadyHovered[index]}
                play={hoverIndex === index}
              >
                <Stack
                  ml={index % 2 === 0 ? '20%' : '30%'}
                  direction={'row'}
                  overflowY={'hidden'}
                  w={'100%'}
                  position="relative" // Añadir position:relative al Stack
                >
                  <Heading as="h1" fontSize="250px" fontWeight="bold">
                    {item.title}
                  </Heading>
                  <Image
                    src={urlForImage(item.image).url()}
                    alt={item.text}
                    boxSize="250px"
                    ml={2}
                  />
                  {/* Espacio entre textos adicionales */}
                  <Box w="200px" />
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
