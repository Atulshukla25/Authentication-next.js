"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="w-full max-w-md p-10 bg-white shadow-2xl rounded-3xl border border-gray-300 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Welcome to Dashboard
        </h1>
        <button
          className="w-full p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
