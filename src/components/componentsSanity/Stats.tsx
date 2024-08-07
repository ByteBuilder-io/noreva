import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'

import Divider from '../divider/divider'

const Stats = ({ data }: { data: any }) => {
  return (
    <div style={{ backgroundColor: data.bgColor ? data.bgColor.hex : 'white' }}>
      <Container m={'auto'} maxW={'1420px'} pt={'70px'} pb={'70px'}>
        <Stack direction={'column'} spacing={5}>
          <Stack
            direction={['column', 'row']}
            width={'full'}
            align={{ base: '', lg: 'center' }}
            justify={'center'}
            spacing={{ base: 10, lg: 20 }}
          >
            {data.columns.map((d, i) => {
              return (
                <Stack direction={'column'} spacing={1} key={d._key}>
                  <Box>
                    <Heading size={{ base: 'sm', lg: 'md' }}>{d.title}</Heading>
                  </Box>
                  <Box>
                    <Text>{d.description}</Text>
                  </Box>
                </Stack>
              )
            })}
          </Stack>
          <Box sx={{ margin: 'auto' }}>{data.extraText}</Box>
        </Stack>
      </Container>
      {data.dividerBottom && <Divider />}
    </div>
  )
}

export default Stats
