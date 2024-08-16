import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useModalType } from '../../hooks/useModalType'

type AdaptiveModalProps = {
  children: ReactNode
  onClose: () => void
  isOpen: boolean
}

export function AdaptiveModal({
  children,
  onClose,
  isOpen,
}: AdaptiveModalProps) {
  const modalType = useModalType()

  if (modalType === 'drawer') {
    return (
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
        <DrawerContent
          overflow="auto"
          roundedTop="1rem"
          h="min(30rem, calc(100vh - 4rem))"
          display="flex"
        >
          {children}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(1px)" />
      <ModalContent
        borderRadius="1rem"
        flexDirection="column"
        w={['23rem', null, '45rem']}
        h="min(32.5rem, calc(100vh - 4rem))"
        maxW="none"
        maxH="none"
        display="flex"
        boxShadow="0 0 1.5rem 0 rgba(0, 0, 0, 0.25)"
        bg="background"
      >
        {children}
      </ModalContent>
    </Modal>
  )
}
