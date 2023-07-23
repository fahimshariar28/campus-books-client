import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDbUser = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const {
    data: dbUser,
    isLoading: dbUserLoading,
    refetch: dbUserRefetch,
  } = useQuery({
    queryKey: ["dbUser", user.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user/${user.email}`);
      return response.data;
    },
  });
  return { dbUser, dbUserLoading, dbUserRefetch };
};

export default useDbUser;
