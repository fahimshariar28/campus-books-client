import CollegeCard from "../../../components/CollegeCard";
import SectionTitle from "../../../components/SectionTitle";
import { useQuery } from "@tanstack/react-query";

const PopularColleges = () => {
  const { data: colleges, isLoading } = useQuery({
    queryKey: ["popularColleges"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/popularcolleges");
      return response.json();
    },
  });

  return (
    <div>
      <SectionTitle title="Popular Colleges" />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colleges.map((college) => (
            <CollegeCard key={college._id} college={college} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularColleges;
