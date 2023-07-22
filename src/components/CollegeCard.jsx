import { Link } from "react-router-dom";

const CollegeCard = ({ college }) => {
  const {
    _id,
    college_name,
    college_image,
    averageRating,
    admission_date,
    research_count,
  } = college;

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            className="w-full h-48 object-cover"
            src={college_image}
            alt={college_name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">College Name: {college_name}</h2>
          <div>
            <p className="text-lg">Admission Date: {admission_date}</p>
            <p className="text-lg">Research Published: {research_count}</p>
            <p className="text-lg">Rating: {averageRating}</p>
          </div>
          <div className="card-actions justify-end">
            <Link to={`/classes/${_id}`}>
              <button className="btn btn-primary">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeCard;
