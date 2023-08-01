import Card from "components/card";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useWalletHook} from "../../hooks/wallet.hook";
import {useDisclosure} from "@chakra-ui/hooks";
import {Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {Button} from "@chakra-ui/react";
import {MdDelete} from "react-icons/md";

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
  const {updateWallet} = useWalletHook()
  const handleUpdate = async (data) => await updateWallet(data, id)
  const handleDelete = async (data) => {
    await updateWallet({active: false}, id, true)
    onClose()
  }
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={image}
            className="h-full w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <div className="absolute p-4 flex flex-col column justify-between text-white top-0 h-full w-full">
            <div className="flex justify-between pt-4 items-center">
              <h3 className="lg:text-xl text-2xl">{amount} {currency}</h3>
              <MdDelete className="cursor-pointer" onClick={onOpen} size={30} color="white" />
            </div>
            <div className="flex justify-between items-end pb-3">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <input {...register("name")} className="lg:text-xl text-2xl transparent" defaultValue={name} />
                <input className="hidden" type="submit" />
              </form>
              <span className="lg:text-md text-xl">{type}</span>
            </div>
          </div>

        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleDelete}>
              Yes
            </Button>
            <Button variant='ghost' onClick={onClose}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Card>
  );
};

export default WalletCard;
