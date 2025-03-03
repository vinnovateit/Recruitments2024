import React from "react";
import { useRouter } from "next/navigation";

const AlreadySubmitted: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-specpurple font-Fixture">
      <div className="relative w-full max-w-4xl cursor-none px-6">
        <div className="mt-[20vh] space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold uppercase text-white md:text-7xl">
              Thank you!
            </h1>
            <p className="text-xl text-white md:text-2xl lg:text-3xl">
              You have already submitted your response.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 rounded bg-pink-500 px-10 py-3 text-lg font-medium text-white transition-colors hover:bg-lime-400 hover:text-black"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlreadySubmitted;
