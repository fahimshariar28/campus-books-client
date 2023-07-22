import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import Marquee from "react-fast-marquee";

const Reviews = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/reviews");
      return response.json();
    },
  });

  return (
    <div>
      <SectionTitle title="Reviews" />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <Marquee
          pauseOnHover={true}
          gradient={false}
          speed={50}
          direction="left"
        >
          {reviews.map((review, index) => (
            <div key={index} className="ml-3">
              <div className="card shadow-xl">
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
        </Marquee>
      )}
    </div>
  );
};

export default Reviews;
