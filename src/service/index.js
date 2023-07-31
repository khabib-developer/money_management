import axios from "axios";
import {useAppStore} from "../store/index.store";

const BASE_URL = "/api"

axios.defaults.baseURL = BASE_URL;

const useAxios = () => {
   const { setLoading, setError } = useAppStore();

   const fetchData = async (
       url,
       method,
       body,
       headers,
       error = false,
       withCredentials = true
   ) => {
      try {
         setLoading(true);
         const config = {
            method,
            url,
            headers,
            withCredentials,
         };
         if (body) {
            config.data = body;
         }
         const res = await axios(config);
         return res.data;
      } catch (err) {
         console.log(err);
         if(error) {
            Object.values(err.response.data).forEach(err => {
               setError(err[0])
            })
         }
         return false;
      } finally {
         setLoading(false);
      }
   };

   return { fetchData };
};

export default useAxios;
