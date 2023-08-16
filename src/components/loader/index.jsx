import {useAppStore} from "../../store/index.store";
import "./index.css"
import img from "../../assets/img/profile/favicon.png"

export const Loader = () => {
   const {loading} = useAppStore()
   return (
       <div
           className={`fixed transition-opacity delay-75 flex justify-center items-center w-full top-0 right-0 h-screen bg-brand-600  ${!loading ? '!opacity-0 -z-10' : 'opacity-60 z-50'}`}>
          <img src={img} alt="loading" className="w-[60px]"/>
          {/*<div className="lds-spinner">*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*   <div></div>*/}
          {/*</div>*/}
       </div>
   )
}