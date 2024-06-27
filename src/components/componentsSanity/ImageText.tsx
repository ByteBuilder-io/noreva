import {
  Box,
  Container,
  Divider,
  Heading,
  ListItem,
  OrderedList,
  ScaleFade,
  Stack,
  Text,
  UnorderedList,
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
        <Link
          style={{ textDecoration: 'underline black' }}
          href={value.href}
          rel={rel}
        >
          {children}
        </Link>
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
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref, 0.2)
  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      {data.dividerTop && <Divider />}
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <ScaleFade initialScale={0.9} in={isInViewport}>
          {data.imagePosition ? (
            <RightImage data={data} />
          ) : (
            <LeftImage data={data} />
          )}
        </ScaleFade>
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
    >
      <Box maxWidth={710}>
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
      <Box maxW={700} marginLeft={{ base: 0, lg: 10 }}>
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
    >
      <Box maxW={700} marginRight={{ base: 0, lg: 10 }}>
        <PortableText value={data.text} components={components} />
      </Box>
      <Box maxWidth={710}>
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
                  height={700}
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
