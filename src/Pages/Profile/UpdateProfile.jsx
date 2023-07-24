import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useDbUser from "../../hooks/useDbUser";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { user, updateUserProfile } = useAuth();
  const { dbUser, dbUserRefetch } = useDbUser();
  //   console.log(dbUser);
  //   console.log(user);

  const [axiosSecure] = useAxiosSecure();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const name = data.name;
      const email = data.email;
      const phone = data.phone;
      const address = data.address;
      updateUserProfile(name).then(() => {
        //   Profile name update
      });
      axiosSecure.patch(`/user/${user.email}`, {
        name: name,
        email: email,
        phone: phone,
        address: address,
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditMode(false);
      dbUserRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isEditMode ? (
        <div>
          <h1 className="text-2xl font-bold">Name: {dbUser.name}</h1>
          <h1 className="text-2xl font-bold">Email: {dbUser.email}</h1>
          <h1 className="text-2xl font-bold">Phone: {dbUser.phone}</h1>
          <h1 className="text-2xl font-bold">Address: {dbUser.address}</h1>
          <button
            onClick={() => setIsEditMode(true)}
            className="btn btn-outline btn-primary mt-5"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              defaultValue={dbUser?.name}
              placeholder="Name"
              {...register("name")}
            />
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              defaultValue={dbUser?.email}
              placeholder="Email"
              {...register("email")}
              readOnly
            />
          </div>
          <div className="flex flex-col md:flex-row mt-5 gap-5">
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="tel"
              defaultValue={dbUser?.phone}
              {...register("phone")}
              placeholder="Phone Number"
              pattern="[0-9]+"
            />
            <input
              className="w-1/2 h-12 input input-bordered border-primary"
              type="text"
              {...register("address")}
              placeholder="Address"
              defaultValue={dbUser.address}
            />

            <div className="w-full">
              <input
                type="submit"
                value="Save Changes"
                className="btn btn-primary"
              />
              <button
                onClick={() => setIsEditMode(false)}
                className="btn btn-warning ml-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateProfile;
