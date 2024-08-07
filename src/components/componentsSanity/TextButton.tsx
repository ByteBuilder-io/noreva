import {
  Box,
  Button,
  Container,
  Heading,
  ScaleFade,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import useIsInViewport from '~/hooks/useIsInViewport'
import { fetchPageSlug } from '~/lib/sanity.queries'

import Divider from '../divider/divider'
import IframModal from '../utils/IframeModal'

const TextButton = ({ data }: { data: any }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref)

  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <ScaleFade initialScale={0.9} in={isInViewport}>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            justifyContent={{ base: '', lg: 'space-between' }}
          >
            <Box>
              <Heading size="md">{data.title}</Heading>
              <Heading size="md">{data.title2}</Heading>
            </Box>
            <Box>
              <Button
                size="lg"
                bg={'black'}
                borderRadius={0}
                onClick={async () => {
                  if (data.linkButton.linkType === 'virtual') {
                    onOpen()
                  }
                  if (data.linkButton.linkType === 'internal') {
                    const url = await fetchPageSlug(
                      data.linkButton.pageReference._ref,
                    )
                    router.push(url)
                  }
                  if (data.linkButton.linkType === 'external') {
                    router.push(data.linkButton.url)
                  }
                  if (data.linkButton.linkType === 'wa') {
                    console.log(data.linkButton, 'wa')
                    window.open(
                      `https://wa.me/52${data.linkButton.mensajeWa}?text=Hola,%20vi%20en%20la%20página%20web%20las%20casas%20y%20quiero%20más%20información`,
                    )
                  }
                }}
                color={'white'}
                _hover={{ bg: '#282828' }}
              >
                {data.titleButton}
              </Button>
            </Box>
          </Stack>
        </ScaleFade>
      </Container>
      <IframModal
        url={data.linkButton.recorridoVirtual}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      {data.dividerBottom && <Divider />}
    </div>
  )
}

export default TextButton
