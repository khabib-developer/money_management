import Card from "components/card";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useWalletHook} from "../../hooks/wallet.hook";
import {useDisclosure} from "@chakra-ui/hooks";
import {Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {Button} from "@chakra-ui/react";
import {MdDelete} from "react-icons/md";
import prettyNum from "pretty-num";
import {ceil} from "../../utils";
import {useMemo, useState} from "react";
import {useWalletStore} from "../../store/wallet.store";
import {BtnCom} from "../button";
import ExchangeMoney from "../../views/admin/profile/components/ExchangeMoney";

const WalletCard = ({ name, amount, currency, type,  image, extra, id }) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm({
    resolver: yupResolver(
        yup
            .object({
              name: yup.string().required().min(2),
            })
            .required()
    ),
  });
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {wallets} = useWalletStore()
  const {updateWallet} = useWalletHook()
  const handleUpdate = async (data) => await updateWallet(data, id)
  const handleDelete = async (data) => {
    await updateWallet({active: false}, id, true)
    onClose()
  }
  const allowedToDelete = useMemo(() => wallets.length > 1, [wallets])

  const [selectedWallet, setSelectedWallet] = useState(null)

  const [receiver, setReceiver] = useState(false)

  const handleExchange = (receiver = false) => {
    setSelectedWallet(id)
    setReceiver(receiver)
  }

  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full wallet">
        <div className="relative w-full">
          <img
            src={image}
            className="h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <div className="absolute p-4 flex flex-col column justify-between text-white top-0 h-full w-full">
            <div className="flex justify-between pt-4 items-center">
              <h3 className="lg:text-xl text-2xl">{prettyNum(ceil(amount), {thousandsSeparator: ' '})} {currency}</h3>
              <MdDelete className="cursor-pointer" onClick={onOpen} size={30} color={allowedToDelete?"white":"grey"} />
            </div>
            <div className="flex justify-between items-end pb-3">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <input {...register("name")} className="text-xs transparent" defaultValue={name} />
                <input className="hidden" type="submit" />
              </form>
              <span className="text-xs">{type}</span>
            </div>
            <div className="absolute justify-end exchange__money w-full flex mt-2 top-1/3 gap-5">

              {
                amount > 0 && <BtnCom className="transparent border-amber-50 border-2" onClick={() => handleExchange(false)}>
                    Send
                  </BtnCom>
              }

              <BtnCom className="transparent border-amber-50 border-2 mr-9" onClick={() => handleExchange(true)}>
                Receive
              </BtnCom>
            </div>
          </div>
        </div>
      </div>

      <ExchangeMoney receiver={receiver} selectedWallet={selectedWallet} setSelectedWallet={setSelectedWallet} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="bg-white text-navy-900 dark:!bg-navy-800 dark:text-white">
          <ModalHeader>{ allowedToDelete ? "Are you sure?" : "You must keep at least one wallet"}</ModalHeader>
          <ModalFooter>
            {
              allowedToDelete ? <Button className="text-navy-700 dark:text-white dark:bg-navy-700" colorScheme='blue' mr={3} onClick={handleDelete}>
                Yes
              </Button>: <></>
            }
            <Button className="text-navy-700 dark:text-white dark:bg-navy-700" variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>
  );
};

export default WalletCard;
