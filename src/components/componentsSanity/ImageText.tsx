import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  ListItem,
  OrderedList,
  ScaleFade,
  Stack,
  Text,
  UnorderedList,
  useBreakpoint,
} from '@chakra-ui/react'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
// import Image from 'next/image'
import { useRef } from 'react'
import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import useIsInViewport from '~/hooks/useIsInViewport'
import { urlForImage } from '~/lib/sanity.image'

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children, value }) => {
      if (value.children[0].text === '') return <br />
      return <Text fontSize={'16px'}>{children}</Text>
    },
    h1: ({ children }) => {
      return <Heading size={{ base: 'xl', lg: '2xl' }}>{children}</Heading>
    },
    h2: ({ children }) => {
      return <Heading size={{ base: 'lg', lg: 'xl' }}>{children}</Heading>
    },
    h3: ({ children }) => {
      return <Heading size={{ base: 'md', lg: 'lg' }}>{children}</Heading>
    },
    h4: ({ children }) => {
      return <Heading size={{ base: 'sm', lg: 'md' }}>{children}</Heading>
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      return (
        <Button bg={'#a96648'} _hover={{ bg: '#9e5f43' }} color={'white'}>
          <Link            
            href={value.href}
            rel={rel}
          >
            {children}
          </Link>
        </Button>
      )
    },
  },
  list: {
    bullet: ({ children }) => {
      return (
        <UnorderedList style={{ marginLeft: '20px' }}>{children}</UnorderedList>
      )
    },
    number: ({ children }) => {
      return (
        <OrderedList style={{ marginLeft: '20px' }}>{children}</OrderedList>
      )
    },
  },
  listItem: {
    bullet: ({ children }) => {
      return <ListItem>{children}</ListItem>
    },
    number: ({ children }) => {
      return <ListItem>{children}</ListItem>
    },
  },
}

const ImageText = ({ data }: { data: any }) => {
  const breakpoint = useBreakpoint({ ssr: false })
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref, 0.2)
  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      <Container
        m={'auto'}
        maxW={'1420px'}
        pt={{ base: '30px', lg: '70px' }}
        pb={{ base: '30px', lg: '70px' }}
      >
        {breakpoint !== 'base' ? (
          <ScaleFade initialScale={0.9} in={isInViewport}>
            {data.imagePosition ? (
              <RightImage data={data} />
            ) : (
              <LeftImage data={data} />
            )}
          </ScaleFade>
        ) : (
          <ScaleFade initialScale={0.9} in={isInViewport}>
            <LeftImage data={data} />
          </ScaleFade>
        )}
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

const LeftImage = ({ data }: { data: any }) => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: 10, lg: 0 }}
      align="center"
      justify="center"
    >
      <Box maxWidth={{ base: '100vw', lg: 710 }} mx={{ base: '', lg: 'auto' }}>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1} // Default number of slides per view (for small screens)
          spaceBetween={10} // Space between slides
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
        >
          {data.sliderImages.map((slide, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  src={urlForImage(slide.image).width(710).height(710).url()}
                  alt={'image'}
                  width={710}
                  height={710}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
      <Box maxW={700} mx="auto" marginLeft={{ base: 0, lg: 10 }}>
        <PortableText value={data.text} components={components} />
      </Box>
    </Stack>
  )
}

const RightImage = ({ data }: { data: any }) => {
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      spacing={{ base: 10, lg: 0 }}
      align={{ base: '', lg: 'center' }}
      justify={{ base: '', lg: 'center' }}
    >
      <Box
        maxW={700}
        mx={{ base: '', lg: 'auto' }}
        marginRight={{ base: '', lg: 10 }}
      >
        <PortableText value={data.text} components={components} />
      </Box>
      <Box maxWidth={{ base: '100vw', lg: 710 }} mx={{ base: '', lg: 'auto' }}>
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerView={1} // Default number of slides per view (for small screens)
          spaceBetween={10} // Space between slides
          pagination={{
            dynamicBullets: true,
          }}
          navigation={true}
        >
          {data.sliderImages.map((slide, index) => {
            return (
              <SwiperSlide key={index}>
                <Image
                  src={urlForImage(slide.image).width(710).height(710).url()}
                  alt={'image'}
                  width={710}
                  height={710}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
    </Stack>
  )
}

export default ImageText
