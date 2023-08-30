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
import InputField from "../../../../components/fields/InputField";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {currency} from "../../../../contants";
import {useWalletHook} from "../../../../hooks/wallet.hook";
import {useAppStore} from "../../../../store/index.store";
import {useWalletStore} from "../../../../store/wallet.store";

const ExchangeMoney = ({selectedWallet, setSelectedWallet, receiver}) => {
   const {isOpen, onOpen, onClose} = useDisclosure()

   const {exchangeMoney} = useWalletHook()

   const { wallets} = useWalletStore()

   const {currencyRate} = useWalletStore()

   const {
      register,
      handleSubmit,
      reset,
      formState: {errors},
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 from: yup.number().required().min(0),
                 to: yup.number().required().min(0),
                 amount: yup.number().required().moreThan(0),
                 rate: yup.number().required().moreThan(0)
              })
              .required()
      ),
   });

   useEffect(() => {
      if (!!selectedWallet) onOpen()
   }, [selectedWallet])

   useEffect(() => {
      if (!isOpen) {
         setSelectedWallet(null)
         reset({})
      }
   }, [isOpen])

   const handleSend = async (data) => {
      onClose()
      // await addWallet(
      //     {
      //        ...data,
      //        currency: data.currency.toUpperCase(),
      //        category: Number(data.category),
      //        user: user.id
      //     })
      console.log(data)
      await exchangeMoney(data)
      reset({})
   }
   return (
       <Modal onClose={onClose} size={'lg'} isOpen={isOpen}>
          <ModalOverlay/>
          <ModalContent className="bg-white text-navy-900 dark:!bg-navy-800 dark:text-white">
             <ModalHeader className="">Add Wallet</ModalHeader>
             <ModalCloseButton/>
             <form onSubmit={handleSubmit(handleSend)}>
                <ModalBody>
                   <div className="p-2">
                      <label>
                         From
                      </label>
                      <select
                          {...register("from")}
                          defaultValue={!receiver?selectedWallet:-1}
                          className="block py-2.5 transparent px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                         <option value="-1"></option>
                         {
                            wallets.map((c, i) => <option disabled={receiver&&selectedWallet===c.id} key={c.id} value={c.id}>{c.name}</option>)
                         }
                      </select>
                   </div>
                   <div className="p-2">
                      <label>
                         To
                      </label>
                      <select
                          {...register("to")}
                          defaultValue={receiver?selectedWallet:-1}
                          className="block py-2.5 transparent px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                         <option value="-1"></option>
                         {
                            wallets.map((c, i) => <option  disabled={!receiver&&selectedWallet===c.id} key={c.id} value={c.id}>{c.name}</option>)
                         }
                      </select>
                   </div>
                   <div className="flex gap-1 justify-between items-end">
                      <InputField label="Amount" extra="flex-1" placeholder="Amount of money"
                                  state={errors.amount && "error"}
                                  register={register} name="amount" type="number"/>
                      <select
                          style={{right: "36px"}}
                          {...register("currency")}
                          className="block py-2.5 px-0 transparent absolute text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                         {
                            Object.keys(currency).map((c, i) => <option key={i} value={c}>{currency[c]}</option>)
                         }
                      </select>
                   </div>
                   <div className="pt-2">
                      <InputField label="Rate (USD/UZS)" defaultValue={currencyRate.Rate} placeholder="Currency rate (USD/UZS)" state={errors.rate && "error"}
                                  register={register}
                                  name="rate"/>
                   </div>

                </ModalBody>
                <ModalFooter>
                   <Button className="mx-3 text-navy-700 dark:text-white dark:bg-navy-700" type="submit">Send</Button>
                   <Button className="text-navy-700 dark:text-white dark:bg-navy-700" onClick={onClose}>Close</Button>
                </ModalFooter>
             </form>
          </ModalContent>
       </Modal>
   );
};

export default ExchangeMoney;