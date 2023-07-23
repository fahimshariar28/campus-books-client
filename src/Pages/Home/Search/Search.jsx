import { useState } from "react";
import { useForm } from "react-hook-form";
import CollegeCard from "../../../components/CollegeCard";

const Search = () => {
  const [colleges, setColleges] = useState([]);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const search = data.search;
    fetch(`http://localhost:5000/colleges/search/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
      })
      .catch((err) => {
        console.log(err);
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
            className="input input-bordered w-4/6"
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-primary w-1/5"
          />
        </div>
      </form>
      {colleges.length > 0 &&
        colleges.map((college) => (
          <CollegeCard key={college._id} college={college} />
        ))}
    </div>
  );
};

export default Search;
