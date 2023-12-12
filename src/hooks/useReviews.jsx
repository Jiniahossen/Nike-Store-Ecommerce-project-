
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxiosPublic";

const useReviews = () => {
    const axiosPublic = useAxiosPublic()
    const { refetch, data: review = [] } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews`);
            return res.data;
        }
    })

    return [review, refetch];
};

export default useReviews;