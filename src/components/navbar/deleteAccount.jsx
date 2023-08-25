import React, {useEffect} from 'react';
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay
} from "@chakra-ui/modal";
import InputField from "../fields/InputField";
import {Button} from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/hooks";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useAuthHook} from "../../hooks/auth.hook";

const DeleteAccount = ({open, setOpen}) => {
   const {isOpen, onOpen, onClose} = useDisclosure()
   const {deleteAccount} = useAuthHook()

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: {errors},
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 username: yup.string().required().email(),
                 password: yup.string().required().min(8),
              })
              .required()
      ),
   });
   useEffect(() => {
      if (open) onOpen();
   }, [open])
   useEffect(() => {
      if (!isOpen) {
         reset({})
         setOpen(false)
      }
   }, [isOpen])

   const handleDelete = data => deleteAccount(data)
   return (
       <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
          <ModalOverlay/>
          <ModalContent className="bg-white text-navy-900 dark:!bg-navy-800 dark:text-white">
             <ModalHeader className="">Delete account</ModalHeader>
             <ModalCloseButton/>
             <form onSubmit={handleSubmit(handleDelete)}>
                <ModalBody>
                   <div>
                      <InputField label="Email" placeholder="Email" state={errors.username && "error"}
                                  register={register}
                                  name="username"/>
                   </div>
                   <div>
                      <InputField label="Password" type="password" placeholder="Password" state={errors.password && "error"}
                                  register={register}
                                  name="password"/>
                   </div>
                </ModalBody>
                <ModalFooter>
                   <Button className="mx-3 text-navy-700 dark:text-white dark:bg-navy-700"
                           type="submit">Delete</Button>
                   <Button className="text-navy-700 dark:text-white dark:bg-navy-700"
                           onClick={onClose}>Close</Button>
                </ModalFooter>
             </form>
          </ModalContent>
       </Modal>
   );
};

export default DeleteAccount;