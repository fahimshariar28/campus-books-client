import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SocialLogin from "../Shared/SocialLogin";
import Lottie from "lottie-react";
import login from "../../assets/login.json";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const { loginUser, resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleForgetPassword = () => {
    Swal.fire({
      title: "Enter your email address",
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonText: "Send",
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return resetPassword(email)
          .then((result) => {
            console.log(result);
            Swal.fire({
              icon: "success",
              title: "Password reset email sent",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error.message);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <div>
      <Helmet>
        <title>Login | Campus Books</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse justify-evenly">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Your email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center">
                  <input
                    {...register("password", { required: true })}
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="input input-bordered"
                  />
                  <button
                    type="button"
                    className="ms-2 text-2xl text-primary"
                    onClick={togglePasswordVisibility}
                  >
                    {!showPassword ? (
                      <FaEye></FaEye>
                    ) : (
                      <FaEyeSlash></FaEyeSlash>
                    )}
                  </button>
                </div>
                <label className="label">
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-primary w-9/12"
                />
              </div>
            </form>
            <button
              onClick={() => handleForgetPassword()}
              className="link link-hover text-center text-primary"
            >
              Forget Password?
            </button>
            <p className="p-5 text-center">
              New Here?{" "}
              <span className="text-primary">
                <Link to="/register">Create an account</Link>
              </span>{" "}
            </p>
            <SocialLogin></SocialLogin>
          </div>
          <div>
            <Lottie animationData={login} loop={true}></Lottie>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
