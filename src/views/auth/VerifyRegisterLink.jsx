import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {useAuthHook} from "../../hooks/auth.hook";

const VerifyRegisterLink = () => {
   const {token} = useParams()
   const {check, verifyRegisterLink} = useAuthHook()
   useEffect(() => {
      (async function(){
         await check(false)
         await verifyRegisterLink(token)
      }())

   }, [])
   return (
       <div className="mt-16 mb-16 flex h-full w-full text-navy-700 dark:text-white items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
          Verifying link...
       </div>
   );
};

export default VerifyRegisterLink;