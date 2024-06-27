import {
  Box,
  Container,
  Heading,
  Image,
  ScaleFade,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import useIsInViewport from '~/hooks/useIsInViewport'
import { urlForImage } from '~/lib/sanity.image'
import { fetchPageSlug } from '~/lib/sanity.queries'

import styles from '../../styles/SliderImages.module.css'
import Divider from '../divider/divider'

const CategorySelector = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref)
  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      {data.dividerTop && <Divider />}
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={10}
          display={{ base: 'none', md: 'flex' }}
        >
          <ScaleFade initialScale={0.9} in={isInViewport}>
            <Box>
              <Text
                color="gray.500"
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                mb={2}
              >
                [{data.preTitle}]
              </Text>

              <Heading size="xl" sx={{ whiteSpace: 'nowrap' }}>
                {data.title}
              </Heading>
            </Box>
          </ScaleFade>
          <SliderImages slides={data.backgroundImages} />
        </Stack>

        <Box display={{ base: 'auto', md: 'none' }}>
          <ScaleFade initialScale={0.9} in={isInViewport}>
            <Box pb={30}>
              <Text
                color="gray.500"
                fontSize="sm"
                fontWeight="bold"
                textTransform="uppercase"
                mb={2}
              >
                [{data.preTitle}]
              </Text>
              <Heading size="xl" sx={{ whiteSpace: 'nowrap' }}>
                {data.title}
              </Heading>
            </Box>
          </ScaleFade>
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
  const router = useRouter()
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      slidesPerView={1} // Default number of slides per view (for small screens)
      spaceBetween={15} // Space between slides
      pagination={{
        dynamicBullets: true,
      }}
      breakpoints={{
        // when window width is >= 768px
        768: {
          slidesPerView: 3,
        },
      }}
      className={styles.swiperContainer}
      navigation={true}
    >
      {slides.map((slide, index) => {
        const url = urlForImage(slide.image).width(450).height(500).url()
        return (
          <SwiperSlide key={slide._key}>
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
                    htmlHeight="500px"
                    htmlWidth="450px"
                    width="450px"
                    height="500px"
                    src={url}
                    alt={'title'}
                    style={{ transition: 'transform 0.3s ease' }}
                    _hover={{ transform: 'scale(1.1)' }}
                    objectFit="cover" // Cover the container
                  />
                </Box>
              </Box>

              <Text fontSize="lg" fontWeight="bold">
                {slide.title}
              </Text>

              <Text fontSize="md">{slide.subtitle}</Text>
            </Stack>
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default CategorySelector
