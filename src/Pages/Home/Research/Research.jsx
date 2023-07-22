import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";

const Research = () => {
  const { data: researches, isLoading } = useQuery({
    queryKey: ["research"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/research");
      const data = await response.json();
      return data;
    },
  });

  return (
    <div>
      <SectionTitle title="Research" />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {researches.slice(0, 6).map((research) => (
            <div
              key={research._id}
              className="card w-96 bg-base-100 shadow-xl image-full"
            >
              <figure>
                <img src={research.image_url} alt={research.paper_title} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{research.paper_title}</h2>
                <p>Published in: {research.publication_date}</p>
                <div className="flex justify-between gap-10">
                  <div>
                    <p>Authors</p>
                    <ul className="list-disc">
                      {research.authors.map((author, index) => (
                        <li key={index}>{author}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p>Keywords</p>
                    <ul className="list-disc">
                      {research.keywords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p>Details: {research.details.slice(0, 100)}....</p>
                <div className="card-actions justify-start">
                  <button className="btn btn-primary">See Full Research</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center my-5">
        <button className="btn btn-primary ">See All Research</button>
      </div>
    </div>
  );
};

export default Research;
