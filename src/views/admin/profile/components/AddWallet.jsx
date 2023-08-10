import React from 'react';
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
import InputField from "../../../../components/fields/InputField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {currency} from "../../../../contants";
import {useWalletHook} from "../../../../hooks/wallet.hook";
import {useAppStore} from "../../../../store/index.store";
import {useWalletStore} from "../../../../store/wallet.store";

const AddWallet = () => {
   const {isOpen, onOpen, onClose} = useDisclosure()

   const {addWallet} = useWalletHook()

   const {categories, wallets} = useWalletStore()

   const {user} = useAppStore()
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
                 name: yup.string().required().min(3),
                 balance: yup.number().required().min(0),
              })
              .required()
      ),
   });

   const handleAddWallet = async (data) => {
      onClose()
      await addWallet(
          {
             ...data,
             currency: data.currency.toUpperCase(),
             category: Number(data.category),
             user: user.id
          })
      reset({})
   }
   return (
       <div>
          <div className="p-1 mt-3 rounded ">
             <button onClick={onOpen}
                     className={`px-6 py-2 rounded text-white bg-gradient-to-r from-indigo-500 to-purple-500 ${!wallets.length&&"animation-pulse"}`}>Add wallet
             </button>
          </div>

          <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
             <ModalOverlay/>
             <ModalContent className="bg-white text-navy-900 dark:!bg-navy-800 dark:text-white">
                <ModalHeader className="">Add Wallet</ModalHeader>
                <ModalCloseButton/>
                <form onSubmit={handleSubmit(handleAddWallet)}>
                   <ModalBody>
                      <div>
                         <InputField label="Name" placeholder="Name of card" state={errors.name && "error"}
                                     register={register}
                                     name="name"/>
                      </div>
                      <div className="flex gap-1 justify-between items-end">
                         <InputField label="Amount" extra="flex-1" placeholder="Amount of money"
                                     state={errors.name && "error"}
                                     register={register} name="balance" type="number"/>
                         <select
                             style={{right: "36px"}}
                             {...register("currency")}
                             className="block py-2.5 px-0 transparent absolute text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            {
                               Object.keys(currency).map((c, i) => <option key={i} value={c}>{currency[c]}</option>)
                            }
                         </select>
                      </div>
                      <div className="p-2">
                         <label>
                            Type
                         </label>
                         <select
                             {...register("category")}
                             className="block py-2.5 transparent px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            {
                               categories.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)
                            }
                         </select>
                      </div>
                   </ModalBody>
                   <ModalFooter>
                      <Button className="mx-3" type="submit">Add</Button>
                      <Button onClick={onClose}>Close</Button>
                   </ModalFooter>
                </form>
             </ModalContent>
          </Modal>

       </div>
   );
};

export default AddWallet;