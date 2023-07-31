import Banner from "./components/Banner";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import WalletCard from "../../../components/card/WalletCard";
import NFt3 from "../../../assets/img/nfts/Nft3.png";
import AddWallet from "./components/AddWallet";
import {useWalletStore} from "../../../store/wallet.store";

const ProfileOverview = () => {
   const {wallets, categories} = useWalletStore()

   return (
       <div className="flex w-full flex-col gap-5">
          {/*<div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">*/}
          {/*   <div className="col-span-4 lg:!mb-0">*/}
          {/*      <Banner/>*/}
          {/*   </div>*/}

          {/*   <div className="col-span-3 lg:!mb-0">*/}
          {/*      <Storage/>*/}
          {/*   </div>*/}

          {/*   <div className="z-0 col-span-5 lg:!mb-0">*/}
          {/*      <Upload/>*/}
          {/*   </div>*/}
          {/*</div>*/}
          {/* all project & ... */}

          <AddWallet/>
          <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
             <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
                Your cards
             </h4>
             <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
                <li>
                   <div>
                      Cash
                   </div>
                </li>
                <li>
                   <div className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white">
                      Card
                   </div>
                </li>
                <li>
                   <div className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white">
                      Visa
                   </div>
                </li>
                <li>
                   <div className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white">
                      <div>Cryptocurrency</div>
                   </div>
                </li>
             </ul>
          </div>

          {/* Wallet cards */}
          <div className="z-20 grid grid-cols-1 gap-5 grid-cols-5 xl:grid-cols-3">
             {
                wallets.map((wallet, i) =>
                    <WalletCard
                        key={i}
                        id={wallet.id}
                        name={wallet.name}
                        amount={wallet.balance}
                        currency={wallet.currency}
                        type={categories.find(c => c.id === wallet.category).name}
                        image={NFt3}
                    />)
             }

          </div>
       </div>
   );
};

export default ProfileOverview;