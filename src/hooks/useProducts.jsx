import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProducts = () => {
    const axiosPublic=useAxiosPublic();
    const {data:shoe=[],refetch}= useQuery({
        queryKey:['shoe'],
        queryFn:async()=>{
            const res=await axiosPublic.get('http://localhost:5000/shoes');
            return res.data;
        }
    })



    return[shoe,refetch]
};

export default useProducts;