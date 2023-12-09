import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategory = () => {
    const axiosPublic=useAxiosPublic();
    const {data:category=[],refetch}= useQuery({
        queryKey:['category'],
        queryFn:async()=>{
            const res=await axiosPublic.get('http://localhost:5000/category');
            return res.data;
        }
    })



    return[category,refetch]
};

export default useCategory;