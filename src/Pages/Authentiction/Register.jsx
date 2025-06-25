import React, { use, useContext } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import SocialLogin from "./SocialLogin";


const Register = () => {
  // const {createUser}=UseAuth
  const  {createUser}=useContext(AuthContext)
  // console.log(createUser)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
      .then(result=>{
        console.log(result.user)
      })
      .catch(error=>{
        console.log(error.message)
      })
  };






  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h4 className="text-center">Register</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          {/* frist name */}
          <label>Frist Name</label>
          <input
            type="text"
            className="input"
            {...register("firstName", { required: true, maxLength: 20 })}
            placeholder="frist name"
          />
          {errors.firstName?.type === "required" && (
            <p className="text-red-500 font-bold">First name is required</p>
          )}
          {/* last name */}
          <label>Last Name</label>
          <input
            type="text"
            className="input"
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
            placeholder="Last name"
          />

          {errors.firstName?.type === "maxLength" && (
            <p className="text-red-500 font-bold">
              First name cannot exceed 20 characters
            </p>
          )}

          {/* email filed */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">email is a required</p>
          )}

          {/* password filled */}
     <label className="label">Password</label>
<input
  type="password"
  className="input"
  {...register("password", {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      message:
        "Password must include uppercase, lowercase, number, and special character",
    },
  })}
  placeholder="Password"
/>

{errors.password && (
  <p className="text-xl font-bold text-red-500">
    {errors.password.message}
  </p>
)}


          <button type="submit" className="btn btn-neutral bg-[#caeb66] border-none text-black mt-4">Register</button>
          <br />
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
