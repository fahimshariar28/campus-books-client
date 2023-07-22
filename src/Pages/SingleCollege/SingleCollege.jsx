import { Link, useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";

const SingleCollege = () => {
  const college = useLoaderData();
  const {
    college_image,
    college_name,
    admission_date,
    events,
    research_count,
    reviews,
    sports,
  } = college;

  const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRatings / reviews.length;

  return (
    <div>
      <SectionTitle title="Single College" />
      <div>
        <div className="mockup-window border bg-base-300">
          <div className="flex flex-col justify-center px-4 py-16 bg-base-200">
            <img
              className="mx-auto w-full object-cover"
              src={college_image}
              alt={college_name}
            />
            <div className="mt-3 flex justify-around">
              <p className="text-2xl">Admission Ends in: {admission_date}</p>
              <h1 className="text-2xl font-bold text-center">
                College Name: {college_name}
              </h1>
              <p className="text-2xl text-center">
                Total Reviews: {averageRating}
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-2xl text-center mt-5">
          Chance to attend{" "}
          <span className="text-primary">Events And Sports</span>
        </h1>
        <div className="m-5 flex justify-evenly">
          <div>
            <h1 className="text-2xl font-bold">Events</h1>
            <ul className="list-disc">
              {events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Sports</h1>
            <ul className="list-disc">
              {sports.map((sport, index) => (
                <li key={index}>{sport}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h1 className="text-2xl text-center mt-5">
            Chance to work with the{" "}
            <span className="text-primary">Professional Research Team</span>
          </h1>
          <p className="text-xl text-center">
            Total Research from{" "}
            <span className="text-primary">
              {college_name}: {research_count}
            </span>
          </p>
        </div>
      </div>
      <div>
        <h1 className="text-center text-2xl mt-5">Reviews of the College</h1>
        <div className="flex justify-evenly">
          {reviews.slice(0, 3).map((review, index) => (
            <div key={index} className="ml-3">
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <p className="text-justify">{review.review_text}</p>
                  <h2 className="card-title">Rating: {review.rating}</h2>
                  <h2 className="card-title">
                    Review By: {review.reviewer_name}
                  </h2>
                  <h2 className="card-title">
                    Review For: {review.college_name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h1 className="text-center text-2xl my-5">
        <span className="text-primary">
          <Link to="/admission">Click Here</Link>
        </span>{" "}
        to Book College Now
      </h1>
    </div>
  );
};

export default SingleCollege;
