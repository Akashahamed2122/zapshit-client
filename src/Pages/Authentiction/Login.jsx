import React from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          {...register("email")}
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          {...register("password", { required: true, minLength: 6 })}
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="text-xl font-bold">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-xl font-bold">
            Password must be at least 6 characters
          </p>
        )}

        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-primary mt-4">Login</button>
        <div>
          <SocialLogin></SocialLogin>
        </div>
      </form>
    </>
  );
};

export default Login;
