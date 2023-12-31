
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useWishlist = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth();
    const { refetch:wishlistRefetch, data: wishlist = [] } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wishlist/${user.email}`);
            return res.data;
        }
    })

    return [wishlist, wishlistRefetch];
};

export default useWishlist;