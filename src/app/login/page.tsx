"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.error && result?.ok) {
      router.push("/dashboard");
      toast.success("Login successful");
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-pink-500 p-6">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl border border-gray-300">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          Login
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="text-gray-800 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 mt-2 rounded-lg border text-black border-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100"
            />
          </div>
          <div>
            <label className="text-gray-800 font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 mt-2 rounded-lg border text-black border-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-indigo-500 to-black text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
          >
            Login
          </button>
          <p className="text-center text-gray-700 mt-4">
            Don't have an account?{" "}
            <a
              onClick={() => router.push("/signup")}
              className="text-indigo-600 cursor-pointer hover:underline font-semibold"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
