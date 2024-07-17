import {
  Box,
  Container,
  Image,
  Stack,
  Text,
  useBreakpoint,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { urlForImage } from '~/lib/sanity.image'
import { fetchPageSlug } from '~/lib/sanity.queries'

import Divider from '../divider/divider'
import Marquee from 'react-fast-marquee'

const CategorySelector = ({ data }: { data: any }) => {
  const ref = useRef(null)
  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      {data.dividerTop && <Divider />}
      <Container m={'auto'} maxW={'100%'} pt={'70px'} pb={'70px'}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={10}
          display={{ base: 'none', md: 'flex' }}
        >
          <SliderImages slides={data.backgroundImages} />
        </Stack>

        <Box display={{ base: 'auto', md: 'none' }}>
          <Box>
            <SliderImages slides={data.backgroundImages} />
          </Box>
        </Box>
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

const SliderImages = ({ slides }: { slides: any }) => {
  const breakpoint = useBreakpoint({ ssr: false })
  const router = useRouter()
  return (
    <Marquee
      gradient={false}
      speed={breakpoint === 'base' ? 80 : 120}
      style={{ minHeight: '100%' }}
      autoFill={false}
      play={true}
      pauseOnHover={true}
    >
      {slides.map((slide, index) => {
        let w = breakpoint === 'base' ? 225 : 450
        let h = breakpoint === 'base' ? 250 : 500
        const url = urlForImage(slide.image).width(w).height(h).url()
        return (
          <Stack key={slide._key} direction="row">
            <Stack mb="10">
              <Box
                onClick={async () => {
                  if (slide.linkButton.linkType === 'internal') {
                    const url = await fetchPageSlug(
                      slide.linkButton.pageReference._ref,
                    )
                    router.push(url)
                  }
                  if (slide.linkButton.linkType === 'external') {
                    router.push(slide.linkButton.url)
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <Box
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    htmlHeight={`${h}px`}
                    htmlWidth={`${w}px`}
                    width={`${w}px`}
                    height={`${h}px`}
                    src={url}
                    alt={'title'}
                    style={{ transition: 'transform 0.3s ease' }}
                    _hover={{ transform: 'scale(1.1)' }}
                    objectFit="cover" // Cover the container
                  />
                </Box>
              </Box>

              <Text fontSize={{ base: '20px', lg: '20px' }} fontWeight="bold">
                {slide.title}
              </Text>
            </Stack>
            <Box w={{ base: '10px', lg: '50px' }} />
          </Stack>
        )
      })}
    </Marquee>
  )
}

export default CategorySelector
