import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdmissionData from "../../hooks/useAdmissionData";

const SelectCollege = () => {
  const { user } = useAuth();
  const college = useLoaderData();
  const [axiosSecure] = useAxiosSecure();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    data.studentPhone = parseInt(data.studentPhone);
    data.appliedDate = new Date().toLocaleDateString();
    data.studentDOB = new Date(data.studentDOB).toLocaleDateString();
    try {
      await axiosSecure.post("/admission", data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have successfully applied for the college",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const { admissionData, admissionDataLoading } = useAdmissionData();

  const isCollegeIdInAdmissionData = (collegeId) => {
    const collegeIds = admissionData.map((data) => data.collegeId);
    return collegeIds.includes(collegeId);
  };

  return (
    <div>
      <SectionTitle title="Select College" />
      {admissionDataLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className=" w-11/12 mx-auto">
          <input
            className="w-full h-12 input input-bordered border-primary"
            type="text"
            defaultValue={college._id}
            {...register("collegeId")}
            readOnly
          />
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              defaultValue={college.college_name}
              {...register("collegeName")}
              readOnly
            />
            <input
              type="text"
              className="w-1/2 h-12 input input-bordered border-primary"
              {...register("subject")}
              placeholder="Subject"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              defaultValue={user?.displayName}
              placeholder="Name"
              {...register("studentName")}
              readOnly
            />
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              defaultValue={user?.email}
              placeholder="Email"
              {...register("studentEmail")}
              readOnly
            />
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="tel"
              defaultValue={user?.phoneNumber}
              {...register("studentPhone")}
              placeholder="Phone Number"
              pattern="[0-9]+"
              required
            />
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              {...register("studentAddress")}
              placeholder="Address"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="date"
              {...register("studentDOB")}
              placeholder="Date of Birth"
              required
            />
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              {...register("studentImage")}
              defaultValue={user?.photoURL}
              placeholder="Image URL"
              required
            />
          </div>
          <div className="flex justify-center">
            {isCollegeIdInAdmissionData(college._id) ? (
              <button
                className="btn btn-outline btn-primary w-full mt-5"
                disabled
              >
                Already Applied
              </button>
            ) : (
              <button className="btn btn-outline btn-primary w-full mt-5">
                Apply Now
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default SelectCollege;
