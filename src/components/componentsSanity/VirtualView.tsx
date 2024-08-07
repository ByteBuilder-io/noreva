import { Box, Container } from '@chakra-ui/react'
import Divider from '../divider/divider'

const VirtualView = ({ data }) => {
  return (
    <>
      <Box m={'auto'} pt={'70px'} pb={'70px'}>
        <iframe
          src={data.url}
          width="100%"
          height={`${data.height}px`}
          allowFullScreen
        ></iframe>
      </Box>
      {data.dividerBottom && <Divider />}
    </>
  )
}

export default VirtualView
