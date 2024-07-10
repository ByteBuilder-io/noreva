import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Image,
  List,
  ListItem,
  useDisclosure,
  Heading,
  useBreakpoint,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { settingsQuery } from '~/lib/sanity.queries'
import type { Image as SanityImage } from 'sanity'
import Link from 'next/link'

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
  const [data, setData] = useState<Navbar>(undefined)
  const [hoveredImage, setHoveredImage] = useState<string | undefined>(
    undefined,
  )
  const breakpoint = useBreakpoint({ ssr: true })

  useEffect(() => {
    const getData = async () => {
      const client = getClient(undefined)
      const settings = await client.fetch(settingsQuery)
      setData(settings[0].navbar)
    }
    if (data === undefined) getData()
  }, [data])

  useEffect(() => {
    if (data && data.links.length > 0) {
      setHoveredImage(urlForImage(data.links[0].image).url())
      data.links.forEach((link) => {
        if (typeof window !== 'undefined') {
          const img = new window.Image()
          img.src = urlForImage(link.image).url()
        }
      })
    }
  }, [data])

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
          <Link href={'/'}>
            <Image src={urlForImage(data.logo).url()} alt={''} height="40px" />
          </Link>
        )}
        {logo && (
          <Link href={'/'}>
            <Image src={logo} alt={''} height="40px" />
          </Link>
        )}
        <Box />
      </Box>

      <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          {data && (
            <Box width={'100%'} height={'100%'} display={'flex'}>
              <Box
                width={{ base: '100%', lg: '50%' }}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                position="relative"
              >
                <IconButton
                  icon={<CloseIcon boxSize={{ base: 6, lg: 10 }} />}
                  aria-label="Close Menu"
                  variant="ghost"
                  onClick={onClose}
                  position="absolute"
                  top={10}
                  left={10}
                />
                <Heading
                  as="h1"
                  fontSize={{ base: '30px', lg: '70px' }}
                  my={10}
                >
                  NOREVA
                </Heading>
                <List spacing={3} textAlign={'center'}>
                  {data.links.map((link, index) => (
                    <ListItem
                      key={index}
                      onMouseEnter={() =>
                        setHoveredImage(urlForImage(link.image).url())
                      }
                      onMouseLeave={() =>
                        setHoveredImage(urlForImage(data.links[0].image).url())
                      }
                      cursor={'pointer'}
                      _hover={{ color: 'teal.500' }}
                    >
                      <Heading
                        as="h1"
                        fontSize={{ base: '30px', lg: '100px' }}
                        my={10}
                      >
                        {link.title}
                      </Heading>
                    </ListItem>
                  ))}
                </List>
              </Box>
              {breakpoint !== 'base' && (
                <Box width={'50%'} height={'100%'}>
                  {hoveredImage && (
                    <Image
                      src={hoveredImage}
                      alt={''}
                      objectFit={'cover'}
                      width={'100%'}
                      height={'100%'}
                    />
                  )}
                </Box>
              )}
            </Box>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
