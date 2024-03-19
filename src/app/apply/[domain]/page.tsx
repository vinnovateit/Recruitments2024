import React from "react";

const whiteList = ["tech", "management", "design"];

export default function DomainPage({
  params: { domain },
}: {
  params: { domain: string };
}) {
  if (!domain || !whiteList.includes(domain)) {
    return <div>404</div>;
  }

  return (
    <div className="max-w-screen min-h-screen space-y-10 overflow-hidden bg-[#1E003E] text-white">
      <div className="flex justify-center pt-10">
        <div className="max-w-[80vw]">
          <h1 className="pt-3 text-center font-mono text-5xl font-bold uppercase text-white md:text-7xl">
            {domain}
          </h1>
          <p className="pt-4 text-sm md:text-base lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
            esse consectetur minima fugiat doloribus. Deleniti maiores sit
            repellendus mollitia ducimus.
          </p>
        </div>
      </div>

      <div className="flex justify-center pb-20">
        <form className="max-w-[80vw]">
          <div className="flex flex-col gap-4">
            <label
              htmlFor="ques1"
              className="text-sm md:mt-8 md:text-base lg:mt-12 lg:text-lg"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              esse consectetur minima fugiat doloribus. Deleniti maiores sit
              repellendus mollitia ducimus.
            </label>
            <input
              id="ques1"
              type="text"
              className="rounded-md border-2 border-[#D6C7E5] bg-[#1E003E] p-2 text-[#D6C7E5] placeholder-[#D6C7E5] placeholder-opacity-50 focus:border-[#BC18CF] focus:outline-none"
              placeholder="Answer here..."
            />
          </div>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="ques2"
              className="text-sm md:mt-8 md:text-base lg:mt-12 lg:text-lg"
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              esse consectetur minima fugiat doloribus. Deleniti maiores sit
              repellendus mollitia ducimus.
            </label>
            <input
              id="ques2"
              type="url"
              className="rounded-md border-2 border-[#D6C7E5] bg-[#1E003E] p-2 text-[#D6C7E5] placeholder-[#D6C7E5] placeholder-opacity-50 focus:border-[#BC18CF] focus:outline-none"
              placeholder="Attach here..."
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-sm md:mt-8 md:text-base lg:mt-12 lg:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
              esse consectetur minima fugiat doloribus. Deleniti maiores sit
              repellendus mollitia ducimus.
            </p>
            <label
              htmlFor="ques3"
              className="rounded-md border-2 border-[#D6C7E5] bg-[#1E003E] p-2 text-[#D6C7E5] text-opacity-50 placeholder-[#D6C7E5] focus:border-[#BC18CF] focus:outline-none"
            >
              Attach Files
            </label>
            <input
              id="ques3"
              type="file"
              className="hidden"
              placeholder="Answer here..."
            />
          </div>
        </form>
      </div>
    </div>
  );
}
