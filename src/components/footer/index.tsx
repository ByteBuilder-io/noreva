'use client'

import {
  Box,
  chakra,
  Container,
  Flex,
  IconButton,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import * as Icons from 'react-icons/fa'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

import { urlForImage } from '~/lib/sanity.image'

const DynamicFontAwesomeIcon = ({ name }) => Icons[name]

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const Footer = ({ data }: { data: any }) => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      marginTop={'1000px'}
    >
      <Container maxW={'1420px'} py={10}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent={{ base: '', lg: 'space-between' }}
          spacing={{ base: '50px' }}
        >
          <Stack spacing={6} align="center">
            <Box>
              <Stack>
                <Link href={'/'}>
                  <Image
                    src={urlForImage(data.logo).url()}
                    alt="logo montero"
                    height={300}
                    width={270}
                  />
                </Link>
              </Stack>
            </Box>
            <Stack direction={'row'} spacing={6}>
              {data.social &&
                data.social.map((e) => {
                  const Icon = DynamicFontAwesomeIcon(e.icon)
                  return (
                    <SocialButton label={''} href={e.url} key={e._key}>
                      <Icon size={20} />
                    </SocialButton>
                  )
                })}
            </Stack>
            <Text fontSize={'sm'}>
              © {new Date().getFullYear()} {data.derechos}
            </Text>
          </Stack>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={{ base: '50px', lg: '150px' }}
          >
            {data.columns.map((d) => (
              <Stack key={d._key}>
                <ListHeader>{d.title}</ListHeader>
                {d.links.map((i) => (
                  <Box as="a" href={i.url} key={i._key}>
                    {i.name}
                  </Box>
                ))}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default Footer
