import SectionTitle from "../../components/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useDbUser from "../../hooks/useDbUser";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { dbUserLoading } = useDbUser();
  const { user } = useAuth();

  return (
    <div>
      <SectionTitle title="Profile" />
      {dbUserLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-center gap-20">
          <div>
            <img
              className="w-32 h-32 rounded-full"
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://i.ibb.co/cLRwPXz/profile.png "
              }
              alt=""
            />
          </div>
          <UpdateProfile />
        </div>
      )}
    </div>
  );
};

export default Profile;
