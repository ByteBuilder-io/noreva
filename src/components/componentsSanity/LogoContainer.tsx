import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'

import Divider from '../divider/divider'
import { urlForImage } from '~/lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'

const LogoContainer = ({ data }: { data: any }) => {
  return (
    <div style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}>
      {data.dividerTop && <Divider />}
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <Stack direction={'column'} spacing={5}>
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
                    src={urlForImage(d.image).width(200).height(50).url()}
                    alt={'image'}
                    width={200}
                    height={50}
                  />
                </Link>
              )
            })}
          </Stack>
        </Stack>
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

export default LogoContainer
