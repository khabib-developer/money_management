import {useAppStore} from "../../store/index.store";
import "./index.css"
export const Loader = () => {
   const {loading} = useAppStore()
   if(loading)
      return (
          <div
              className="fixed z-50 flex justify-center items-center w-full top-0 right-0 h-screen bg-brand-900 opacity-60">
             <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
             </div>
          </div>
      )
   return <></>
}