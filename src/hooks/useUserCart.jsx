
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserCart = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { refetch, data: userCart = [] } = useQuery({
        queryKey: ['userCart', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/cart?email=${user.email}`);
            return res.data;
        }
    })

    return [userCart, refetch]
};

export default useUserCart;