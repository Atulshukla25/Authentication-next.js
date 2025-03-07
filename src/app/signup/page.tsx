"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import signupSchema from "@/schema/signupSchema";
import * as yup from "yup";

type SignupFormData = yup.InferType<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const handleSignup = async (data: SignupFormData) => {
    const { name, email, password } = data;
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const responsedata = await res.json();
    if (responsedata.error) {
      toast.error(responsedata.error);
    } else {
      toast.success("Registration successful!");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-pink-500 p-6">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl border border-gray-300">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Join Us
        </h2>
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="flex flex-col gap-6"
        >
          <div>
            <label className="text-gray-800 font-semibold">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className={`w-full p-4 mt-2 rounded-lg border text-black ${
                errors.name ? "border-red-500" : "border-gray-300"
              } outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full p-4 mt-2 rounded-lg border text-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              } outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-800 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`w-full p-4 mt-2 rounded-lg border text-black ${
                errors.password ? "border-red-500" : "border-gray-300"
              } outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-indigo-500 to-black text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <a
              onClick={() => router.push("/login")}
              className="text-indigo-600 cursor-pointer hover:underline font-semibold"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
