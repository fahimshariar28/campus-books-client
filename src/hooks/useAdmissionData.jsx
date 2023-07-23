import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmissionData = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: admissionData,
    isLoading: admissionDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["admissionData"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/admission/${user.email}`);
      return response.data;
    },
  });
  return { admissionData, admissionDataLoading, refetch };
};

export default useAdmissionData;
