import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
  Image,
  Stack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { settingsQuery } from '~/lib/sanity.queries'
import type { Image as SanityImage } from 'sanity'

interface Link {
  title: string
  slug: string
  image: SanityImage
}

interface Banner {
  _key: string
  content: string
}

interface Navbar {
  logo: SanityImage
  seo: string
  links: Link[]
  banner: Banner[]
}

export default function Nav({ logo }: { logo?: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const client = getClient(undefined)
  const [data, setData] = useState<Navbar>(undefined)

  useEffect(() => {
    const getData = async () => {
      const settings = await client.fetch(settingsQuery)
      console.log(settings[0].navbar)
      setData(settings[0].navbar)
    }
    if (data === undefined) getData()
  }, [])

  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="60px"
        backgroundColor="white"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX="20px"
        zIndex={2}
      >
        <IconButton
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          variant="ghost"
          onClick={() => onOpen()}
        />
        {!logo && data && (
          <Image src={urlForImage(data.logo).url()} alt={''} height="40px" />
        )}
        {logo && <Image src={logo} alt={''} height="40px" />}
        <Box />
      </Box>

      <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          {data && (
            <Box width={'100%'} h={'100%'}>
              <IconButton
                icon={<HamburgerIcon />}
                aria-label="Open Menu"
                variant="ghost"
                onClick={() => onClose()}
              />
              <Stack
                direction={{ base: 'column', lg: 'row' }}
                width={'100%'}
                h={'100%'}
              >
                <Box w={{ base: '', lg: '50%' }}>asd</Box>
                <Box w={'50%'} borderWidth={2} borderColor={'red'}>
                  <Image
                    src={urlForImage(data.links[0].image).url()}
                    alt={''}
                    height="100%"
                  />
                </Box>
              </Stack>
            </Box>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
