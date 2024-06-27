import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface IModal {
  url: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const IframModal = (props: IModal) => {
  const { url, isOpen, onOpen, onClose } = props
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    function updateSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    if (typeof window !== 'undefined') {
      updateSize()

      window.addEventListener('resize', updateSize)

      return () => window.removeEventListener('resize', updateSize)
    }
  }, [])

  return (
    <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Recorrido virtual</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <iframe
            src={url}
            width="100%"
            height={windowSize.height - 150}
            allowFullScreen
          ></iframe>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default IframModal
