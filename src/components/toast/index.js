import {useAppStore} from "../../store/index.store";
import {useEffect} from "react";
import { useToast } from '@chakra-ui/react'

export const Toast = () => {
   const {error, info,  clear} = useAppStore()
   const toast = useToast()

   useEffect(() => {
      if(error) {
         toast({
            position:"top",
            title: error,
            status: 'error',
            isClosable: true,
         })
         setTimeout(() => clear(), 1000)
      }
      if(info) {
         toast({
            position:"top",

            title: info,
            status: 'info',
            isClosable: true,
         })
         setTimeout(() => clear(), 1000)
      }
   }, [error, info])

   return <></>
}