import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CollegeCard from "../../components/CollegeCard";

const Colleges = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const collegesPerPage = 9;
  const totalColleges = useLoaderData();
  const totalPages = Math.ceil(totalColleges / collegesPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num);

  const { data: colleges, isLoading } = useQuery({
    queryKey: ["colleges", currentPage],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/colleges?page=${currentPage}&limit=${collegesPerPage}`
      );
      return response.json();
    },
  });

  return (
    <div>
      <SectionTitle title="Colleges" />
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
      <div className="flex justify-center items-center space-x-2 mt-5">
        {pageNumbers.map((number) => (
          <button
            onClick={() => setCurrentPage(number + 1)}
            key={number}
            className="bg-primary text-white px-3 py-2 rounded"
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Colleges;
