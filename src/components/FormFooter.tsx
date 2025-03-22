// components/Footer.tsx
import React from "react";
import Link from "next/link";

const FormFooter = () => {
  return (
    <footer className="bg-specpurple text-white py-6 border-t-4 border-lime-500 pt-4 font-Fixture">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Made with ❤️ by VinnovateIT</p>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FormFooter;