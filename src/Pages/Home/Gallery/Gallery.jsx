import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";

const Gallery = () => {
  const { data: graduates, isLoading } = useQuery({
    queryKey: ["graduates"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/graduates");
      return response.json();
    },
  });

  return (
    <div className="container mx-auto px-4  ">
      <SectionTitle title="Graduates" />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {graduates.slice(0, 6).map((graduate) => (
            <div
              key={graduate._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <img
                src={graduate.college_group_photo}
                alt={graduate.college_name}
                className="w-full h-64 object-cover rounded-t-lg transition duration-300 ease-in-out transform hover:scale-105"
              />
              <div className="cursor-pointer px-4 mb-5 py-4 absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center transition duration-300 ease-in-out opacity-0 hover:opacity-100">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {graduate.college_name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
