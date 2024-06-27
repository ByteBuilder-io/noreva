import { Box, Flex, Spinner } from '@chakra-ui/react'

interface LoadingBackdropProps {
  isOpen: boolean
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({ isOpen }) => {
  return (
    <>
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          backgroundColor="rgba(0, 0, 0, 0.6)" // Color de fondo semi-transparente
          zIndex={9999}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            flexDirection="column"
            alignItems="center"
            p={4}
            borderRadius="md"
            backgroundColor="white"
            boxShadow="md"
          >
            <Spinner size="xl" color="blue.500" />
            <Box mt={4}>Cargando...</Box>
          </Flex>
        </Box>
      )}
    </>
  )
}

export default LoadingBackdrop
