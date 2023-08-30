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
import AutoPayTable from "../../autopay/components/table";
import AutoPay from "../../autopay";

const AddTransactionOrAutoPay = ({setTargetId, targetId, transaction}) => {
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
          <Modal onClose={onClose} size={'xl'} isOpen={isOpen} scrollBehavior="inside">
             <ModalOverlay />
             <ModalContent className="bg-white dark:!bg-navy-700 text-navy-700 dark:text-white custom__modal">
                <ModalHeader>Add {transaction?"transaction":"autopay"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody >
                   {
                      transaction ? <Tables targetId={targetId} /> : <AutoPay targetId={targetId} />
                   }
                </ModalBody>
                <ModalFooter>
                   <Button onClick={onClose}>Close</Button>
                </ModalFooter>
             </ModalContent>
          </Modal>

       </div>
   );
};

export default AddTransactionOrAutoPay;