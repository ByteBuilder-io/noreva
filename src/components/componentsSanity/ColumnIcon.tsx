import {
  Box,
  Container,
  Heading,
  ScaleFade,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRef } from 'react'
import * as Icons from 'react-icons/fa'

import useIsInViewport from '~/hooks/useIsInViewport'

import Divider from '../divider/divider'

const DynamicFontAwesomeIcon = ({ name }) => Icons[name]

const ColumnIcon = ({ data }: { data: any }) => {
  const ref = useRef(null)
  const isInViewport = useIsInViewport(ref)

  return (
    <div
      ref={ref}
      style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}
    >
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <ScaleFade initialScale={0.9} in={isInViewport}>
          <Stack direction={['column', 'row']} spacing="24px" width={'full'}>
            {data.columns.map((d, i) => {
              const Icon = DynamicFontAwesomeIcon(d.icon)
              return (
                <Stack
                  width={'full'}
                  direction={'column'}
                  spacing={4}
                  key={d._key}
                >
                  <Box>
                    <Icon size={30} />
                  </Box>
                  <Box>
                    <Heading fontFamily="Sitka" size={{ base: 'sm', lg: 'md' }}>
                      {d.title}
                    </Heading>
                  </Box>
                  <Box>
                    <Text>{d.description}</Text>
                  </Box>
                </Stack>
              )
            })}
          </Stack>
        </ScaleFade>
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

export default ColumnIcon
