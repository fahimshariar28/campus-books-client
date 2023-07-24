import { useState } from "react";
import { useForm } from "react-hook-form";
import CollegeCard from "../../../components/CollegeCard";

const Search = () => {
  const [colleges, setColleges] = useState([]);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading status
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const search = data.search;
    setIsLoading(true); // Set loading to true when data fetching starts
    fetch(`http://localhost:5000/colleges/search/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setIsContentVisible(true);
        setIsLoading(false); // Set loading to false when data fetching is done
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Set loading to false in case of an error
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="flex gap-5">
          <input
            {...register("search")}
            type="text"
            placeholder="Search"
            className="w-4/6 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="submit"
            value="Search"
            className="btn bg-blue-500 hover:bg-blue-600 text-white font-bold rounded w-1/5"
          />
        </div>
      </form>
      <div className={isContentVisible ? "block" : "hidden"}>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {colleges.map((college) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl mt-5 text-red-500">
            No colleges found
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
