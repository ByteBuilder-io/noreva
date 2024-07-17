'use client'

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VisuallyHidden,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useRef, useState } from 'react'
import * as Icons from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import { urlForImage } from '~/lib/sanity.image'
import useIsInViewport from '~/hooks/useIsInViewport' // Importa el hook

const DynamicFontAwesomeIcon = ({ name }) => Icons[name]

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const Footer = ({ data }: { data: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const footerRef = useRef(null)
  const isInViewport = useIsInViewport(footerRef, 0.6)
  const [alredyClose, setAlredyClose] = useState(false)
  console.log(isInViewport)
  // Abre el modal cuando el footer entra en el viewport
  if (isInViewport && !isOpen && !alredyClose) {
    onOpen()
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      ref={footerRef}
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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>¿Quiéres conocer el proyecto?</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              onClose()
              setAlredyClose(true)
            }}
          />
          <ModalBody>
            <Text mb={4}>
              Hola, vi en la página web de Novera y quiero más información, por
              favor!
            </Text>
            <Button
              as="a"
              href={`https://wa.me/${data.number}?text=Hola, vi en la página web de Novera y quiero más información, por favor!`}
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              colorScheme="green"
            >
              Agenda tu visita
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
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
