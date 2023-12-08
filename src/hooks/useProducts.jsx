import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic=useAxiosPublic();
    const {data:shoe=[]}= useQuery({
        queryKey:['shoe'],
        queryFn:async()=>{
            const res=await axiosPublic.get('');
            return res.data;
        }
    })



    return[shoe]
};

export default useProducts;