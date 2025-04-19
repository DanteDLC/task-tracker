"use client"; //place in a client component <LoginForm>

//place in a server component
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loginWithCreds } from "@/actions/auth";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Logging in...");
    const formData = new FormData(e.target as HTMLFormElement);
    try {
      const result = await loginWithCreds(formData);
      if (result.success) {
        toast.success("Welcome back!", { id: loadingToast });
        router.push("/");
      } else {
        toast.error(result.message, { id: loadingToast });
        setError(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        id: loadingToast,
      });
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleLogin} className="mx-auto max-w-md space-y-4">
      <div className="space-y-2 text-left">
        <label
          htmlFor="email"
          className="text-primary-600 block pl-2 text-xs font-bold sm:text-base"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="text"
          required
          className="w-full rounded-lg border border-gray-300 p-1 px-2 text-xs shadow-md sm:w-full sm:text-base"
        />
      </div>

      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-primary-600 block pl-1 text-xs font-bold sm:text-base"
          >
            Password
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-lg border border-gray-300 p-1 px-2 text-xs shadow-md sm:text-base"
        />
      </div>

      <span className="text-sm text-red-600">{error}</span>

      <p className="flex justify-center text-xs text-blue-600 hover:underline sm:justify-end sm:text-base">
        Forgot password?
      </p>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="w-auto rounded-md bg-[#1e3a8a] p-1.5 px-6 text-xs text-white hover:cursor-pointer hover:bg-[#152a62] disabled:bg-gray-300 sm:text-base"
          disabled={isLoading}
        >
          Log in
        </button>
      </div>

      <div className="my-4 flex items-center gap-2">
        <div className="border-primary-600 flex-1 border-t opacity-80"></div>
        <span className="text-primary-600 text-sm">or</span>
        <div className="border-primary-600 flex-1 border-t opacity-80"></div>
      </div>

      <div className="flex items-center justify-center">
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1e3a8a] px-4 py-2 text-xs font-medium text-white transition duration-200 hover:cursor-pointer hover:bg-[#152a62] disabled:bg-gray-300 sm:text-base">
          Login with SSO
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
