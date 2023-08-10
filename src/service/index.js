import axios from "axios";
import {useAppStore} from "../store/index.store";

const BASE_URL = "https://mm.airi.uz/api"
// const BASE_URL = "http://34.130.223.96/api"



axios.defaults.baseURL = BASE_URL;

const useAxios = () => {
   const { setLoading, setError } = useAppStore();

   const fetchData = async (
       url,
       method,
       body,
       headers,
       error = true,
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
         console.log(err, error)
         if(err && error) {
            Object.values(err.response.data).forEach(err => {
               setError(err)
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
