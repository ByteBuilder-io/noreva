import { Avatar, Box } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppButton = ({ data }: { data: any }) => {
  return (
    <Box position="fixed" bottom={4} right={4} cursor="pointer">
      <a
        href={`https://wa.me/${data.number}?text=Mensaje%20de%20prueba`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Avatar
          size={'md'}
          bg="#25d366"
          icon={<FaWhatsapp size={20} color="white" />}
        />
      </a>
    </Box>
  )
}

export default WhatsAppButton
