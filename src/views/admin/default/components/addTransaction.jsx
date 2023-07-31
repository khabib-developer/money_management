import React, {useEffect} from 'react';
import {useDisclosure} from "@chakra-ui/hooks";
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay
} from "@chakra-ui/modal";
import {Button} from "@chakra-ui/react";
import Tables from "../../tables";

const AddTransaction = ({setTargetId, targetId}) => {
   const {isOpen, onOpen, onClose} = useDisclosure()


   useEffect(() => {
      if (targetId) {
         onOpen()
      }
   }, [targetId])

   useEffect(() => {
      if(!isOpen) {
         setTargetId(null)
      }
   }, [isOpen])

   return (
       <div>
          <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
             <ModalOverlay />
             <ModalContent>
                <ModalHeader>Add transaction</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                   <Tables targetId={targetId} />
                </ModalBody>
                <ModalFooter>
                   <Button onClick={onClose}>Close</Button>
                </ModalFooter>
             </ModalContent>
          </Modal>

       </div>
   );
};

export default AddTransaction;