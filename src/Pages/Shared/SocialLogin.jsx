import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { googleSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const savedUser = {
          name: user.displayName,
          email: user.email,
        };
        fetch("http://localhost:5000/adduser", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        Swal.fire({
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn()
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const savedUser = {
          name: user.displayName,
          email: user.email,
        };
        fetch("http://localhost:5000/adduser", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        Swal.fire({
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <div className="divider"></div>
      <div className="w-full text-center pb-4 flex gap-5 justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-circle btn-primary hover:bg-base-100 hover:text-primary"
        >
          <FaGoogle></FaGoogle>
        </button>
        <button
          onClick={handleFacebookSignIn}
          className="btn btn-circle btn-primary hover:bg-base-100 hover:text-primary"
        >
          <FaFacebook></FaFacebook>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
