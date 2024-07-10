import {
  Container,
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { motion } from 'framer-motion'

import useIsInViewport from '~/hooks/useIsInViewport'

import Divider from '../divider/divider'
import { urlForImage } from '~/lib/sanity.image'

const BigText = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref, 0.1)

  // Componentes personalizados para PortableText
  const components: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children, value }) => {
        if (value.children[0].text === '') return <br />
        return (
          <Text
            textAlign="center"
            fontSize={{ base: 'xl', lg: `${data.textSize}px` }}
          >
            {children}
          </Text>
        )
      },
      h1: ({ children }) => {
        return (
          <Heading
            textAlign="center"
            fontSize={{ base: 'xl', lg: `${data.textSize}px` }}
          >
            {children}
          </Heading>
        )
      },
      h2: ({ children }) => {
        return (
          <Heading
            textAlign="center"
            fontSize={{ base: 'xl', lg: `${data.textSize}px` }}
          >
            {children}
          </Heading>
        )
      },
      h3: ({ children }) => {
        return (
          <Heading
            textAlign="center"
            fontSize={{ base: 'xl', lg: `${data.textSize}px` }}
          >
            {children}
          </Heading>
        )
      },
      h4: ({ children }) => {
        return (
          <Heading
            textAlign="center"
            fontSize={{ base: 'xl', lg: `${data.textSize}px` }}
          >
            {children}
          </Heading>
        )
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
          <UnorderedList style={{ marginLeft: '20px' }}>
            {children}
          </UnorderedList>
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

  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      <Container m={'auto'} maxW={'1420px'} pt={'150px'} pb={'150px'}>
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: isInViewport ? 1 : 0, y: isInViewport ? 0 : 200 }}
          transition={{ duration: 0.9 }}
        >
          <PortableText value={data.text} components={components} />
          <Stack direction={'column'} spacing={5} pt={20}>
            <Stack
              direction={['column', 'row']}
              width={'full'}
              align={{ base: 'center', lg: 'center' }}
              justify={'center'}
              spacing={{ base: 10, lg: 20 }}
            >
              {data.columns.map((d, i) => {
                return (
                  <Link href={d.link.url || '#'} target="_blank" key={d._key}>
                    <Image
                      src={urlForImage(d.image).url()}
                      alt={'image'}
                      width={200}
                      height={100}
                    />
                  </Link>
                )
              })}
            </Stack>
          </Stack>
        </motion.div>
      </Container>
    </div>
  )
}

export default BigText
