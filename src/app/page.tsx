import Image from "next/image";
import LoginForm from "@/components/LoginForm";
export const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#efeded] bg-gradient-to-br">
      <div className="m-10 flex w-auto flex-col gap-8 rounded-md bg-white/95 p-8 px-10 shadow-xl">
        {/* Box - Upper Part */}
        <div className="flex flex-col items-center justify-center text-center"></div>
        <div>
          <LoginForm />

          <div className="text-gray flex flex-col space-x-2 p-2 px-1 pt-5 text-center text-xs sm:flex-row sm:px-20 sm:text-base">
            <a href="#" className="line-contact text-gray-400">
              Having trouble logging in?
            </a>
            <a
              href="#"
              className="line-contact text-blue-400 hover:text-blue-800"
            >
              Contact Us
            </a>
          </div>

          <div className="text-gray space-x-2 text-center text-xs sm:text-base">
            <a href="#" className="line-contact text-gray-400">
              Copyright © 2024
            </a>
            <span className="text-gray-400">|</span>
            <a href="#" className="line-contact text-gray-400">
              All rights reserved.
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
