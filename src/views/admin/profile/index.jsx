import WalletCard from "../../../components/card/WalletCard";
import NFt3 from "../../../assets/img/nfts/Nft3.png";
import AddWallet from "./components/AddWallet";
import {useWalletStore} from "../../../store/wallet.store";
import React from "react";

const ProfileOverview = () => {
   const {wallets, categories} = useWalletStore()

   return (
       <div className="flex w-full flex-col gap-5">

          <AddWallet/>
          <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
             <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
                Your cards
             </h4>
             <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
                {
                   categories.map((c, i) =>
                       <li key={i}>
                         <div>
                            {c.name}
                         </div>
                      </li>)
                }
             </ul>
          </div>

          {/* Wallet cards */}
          <div className="z-20 grid grid-cols-1 gap-5 grid-cols-4 xl:grid-cols-5">
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
