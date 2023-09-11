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
      watch
   } = useForm({
      resolver: yupResolver(
          yup
              .object({
                 wallet_id_from: yup.number().required().min(0),
                 wallet_id_to: yup.number().required().min(0),
                 amount: yup.number().required().moreThan(0),
                 rate: yup.number().required().moreThan(0)
              })
              .required()
      ),
   });

   const from =  watch("wallet_id_to") ? watch("wallet_id_to") : receiver ? selectedWallet:-1
   const to = watch("wallet_id_from") ? watch("wallet_id_from") : !receiver ? selectedWallet:-1

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
                   <div className="p-2 flex gap-3">
                      <div className="flex-1">
                         <label className={`${ errors.wallet_id_from && "text-red-600"}`}>
                            From
                         </label>
                         <select
                             {...register("wallet_id_from")}
                             defaultValue={!receiver?selectedWallet:-1}
                             className={`${ errors.wallet_id_from && "border-red-600"} py-2.5  px-0 w-full text-sm text-gray-500  border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer`}>
                            <option value="-1"></option>
                            {
                               wallets.map((c, i) => <option disabled={+from===+c.id} key={c.id} value={c.id}>{c.name}</option>)
                            }
                         </select>
                      </div>
                      <div className="flex-1">
                         <label className={`${ errors.wallet_id_to && "text-red-600"}`}>
                            To
                         </label>
                         <select
                             {...register("wallet_id_to")}
                             defaultValue={receiver?selectedWallet:-1}
                             className={` py-2.5 ${ errors.wallet_id_to && "border-red-600"}  px-0 w-full text-sm text-gray-500  border-0 border-b-2 border-gray-200 dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer`}>
                            <option value="-1"></option>
                            {
                               wallets.map((c, i) => <option disabled={+to===+c.id} key={c.id} value={c.id}>{c.name}</option>)
                            }
                         </select>
                      </div>
                   </div>

                   <div className="flex gap-1 justify-between items-end">
                      <InputField label="Amount" extra="flex-1" placeholder="Amount of money"
                                  state={errors.amount && "error"}
                                  register={register} name="amount" type=""/>
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