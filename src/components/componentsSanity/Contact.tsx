import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  ListItem,
  OrderedList,
  ScaleFade,
  Stack,
  Text,
  Textarea,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'
import Link from 'next/link'
import { useRef } from 'react'

import useIsInViewport from '~/hooks/useIsInViewport'

import Divider from '../divider/divider'

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

const Contact = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref, 0.4)
  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      {data.dividerTop && <Divider />}
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <ScaleFade initialScale={0.9} in={isInViewport}>
          <Stack direction={{ base: 'column', lg: 'row' }} spacing={10}>
            <Box maxW={700} w={'full'}>
              <FormContact />
            </Box>
            <Box maxW={700}>
              <PortableText value={data.text} components={components} />
            </Box>
          </Stack>
        </ScaleFade>
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

const FormContact = () => {
  const toast = useToast()
  return (
    <Box maxW={700} w={'full'}>
      <Stack direction="column" spacing={10}>
        <Text>[Contacto]</Text>
        <Heading>Formulario de contacto</Heading>
        <Stack direction={'row'} spacing={5}>
          <Input
            type="text"
            variant="flushed"
            placeholder="Nombre..."
            borderBottomColor={'black'}
          />
          <Input
            type="email"
            variant="flushed"
            placeholder="Correo..."
            borderBottomColor={'black'}
          />
        </Stack>
        <Textarea
          variant="flushed"
          borderBottomColor={'black'}
          placeholder="Deja un comentario"
        />
        <Button
          bg={'black'}
          borderRadius={0}
          color={'white'}
          _hover={{ bg: '#282828' }}
          onClick={() =>
            toast({
              title: `Gracias! Te contactaremos lo antes posible.`,
              status: 'success',
              isClosable: true,
            })
          }
        >
          Enviar
        </Button>
      </Stack>
    </Box>
  )
}

export default Contact
