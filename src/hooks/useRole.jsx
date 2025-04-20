import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, isError } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/role/${user?.email}`);
            // console.log('from user role', res.data);
            return res.data;
        },
    });

    return { role: data?.role, isLoading, isError };
};

export default useRole;
