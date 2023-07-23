import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";
import useAdmissionData from "../../hooks/useAdmissionData";

const Admission = () => {
  const { data: colleges, isLoading } = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/colleges");
      return response.json();
    },
  });

  const { admissionData, admissionDataLoading } = useAdmissionData();

  const isCollegeIdInAdmissionData = (collegeId) => {
    const collegeIds = admissionData.map((data) => data.collegeId);
    return collegeIds.includes(collegeId);
  };

  return (
    <div>
      <SectionTitle title="Admission" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-lg">
              <th></th>
              <th>College Name</th>
              <th>Admission Ends</th>
              <th>Action</th>
            </tr>
          </thead>
          {isLoading || admissionDataLoading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          ) : (
            <tbody>
              {colleges.map((college, index) => (
                <tr key={college._id}>
                  <td>{index + 1}</td>
                  <td>{college.college_name}</td>
                  <td>{college.admission_date}</td>
                  <td>
                    {isCollegeIdInAdmissionData(college._id) ? (
                      <button className="btn btn-outline btn-primary" disabled>
                        Already Applied
                      </button>
                    ) : (
                      <Link to={`/admission/${college._id}`}>
                        <button className="btn btn-outline btn-primary">
                          Apply Now
                        </button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Admission;
