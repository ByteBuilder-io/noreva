import {
  Box,
  Button,
  Heading,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { urlForImage } from '~/lib/sanity.image'
import { fetchPageSlug } from '~/lib/sanity.queries'

import Divider from '../divider/divider'
import IframModal from '../utils/IframeModal'

const ImageBanner = ({ data }: { data: any }) => {
  const image = useBreakpointValue(
    { base: data.imageMobile, lg: data.image },
    { ssr: false },
  )
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      {data.dividerTop && <Divider />}
      <Box pt={'70px'} pb={'70px'}>
        {image && (
          <Box
            bgImage={urlForImage(image).url()}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            height="500px"
            m={'auto'}
            position="relative"
          >
            <VStack
              spacing={4}
              position="absolute"
              top="20%"
              left="10%"
              alignItems="flex-start"
            >
              <Text fontSize="md" color="white" textTransform="uppercase">
                [{data.preTitle}]
              </Text>
              <Heading size="2xl" color="white">
                {data.title}
              </Heading>
            </VStack>
            {data.buttonText && (
              <Button
                position="absolute"
                bottom="10%"
                left="10%"
                size="lg"
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
                }}
              >
                {data.buttonText}
              </Button>
            )}
          </Box>
        )}
      </Box>
      {data.buttonText && data.linkButton.linkType === 'virtual' && (
        <IframModal
          url={data.linkButton.recorridoVirtual}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      )}
      {data.dividerBottom && <Divider />}
    </>
  )
}

export default ImageBanner
