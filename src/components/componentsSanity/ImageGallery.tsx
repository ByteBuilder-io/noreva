import { Box, Container, Image, ScaleFade, SimpleGrid } from '@chakra-ui/react'
import { useRef } from 'react'

import useIsInViewport from '~/hooks/useIsInViewport'
import { urlForImage } from '~/lib/sanity.image'

import Divider from '../divider/divider'

const ImageGallery = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref, 0.1)
  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      {data.dividerTop && <Divider />}
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <ScaleFade initialScale={0.9} in={isInViewport}>
          <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={5}>
            {data.columns.map((d) => (
              <Box
                key={d._key}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={urlForImage(d.image).width(450).height(450).url()}
                  alt="Images gallery"
                  width={450}
                  height={450}
                  htmlHeight={450}
                  htmlWidth={450}
                  objectFit="cover"
                  objectPosition="center"
                  style={{ transition: 'transform 0.3s ease' }}
                  _hover={{ transform: 'scale(1.1)' }}
                />
              </Box>
            ))}
          </SimpleGrid>
        </ScaleFade>
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

export default ImageGallery
