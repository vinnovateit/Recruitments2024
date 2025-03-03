"use client";

import React, { useState, useEffect } from "react";
import DomainSelectionForm from "~/components/DomainSelectionForm";
import { useSession } from "next-auth/react";
import LoginScreen from "~/components/LoginScreen";
import AlreadySubmitted from "~/components/AlreadySubmitted";

const Page = () => {
  const { data: session, status } = useSession();
  const [hasSubmitted, setHasSubmitted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has already submitted
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch("/api/submit");
          const data = await response.json();
          if (data.success) {
            setHasSubmitted(data.hasSubmitted);
          }
        } catch (error) {
          console.error("Error checking submission status:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (status !== "loading") {
      void checkSubmissionStatus();
    }
  }, [session, status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-specpurple">
        <svg
          className="h-10 w-10 animate-spin text-lime-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  if (hasSubmitted) {
    return <AlreadySubmitted />;
  }

  return (
    <div className="">
      <div className="absolute left-0 top-0">
        <svg
          className="ml-[-1.2vw] w-16 md:w-32 lg:w-40"
          viewBox="0 0 129 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_56_3802)">
            <path
              d="M3.94072 3.27278C3.94072 3.27278 -7.6574 33.1742 7.87169 43.32C23.4008 53.4659 27.0135 18.6703 42.7494 27.7032C56.6596 35.688 36.1137 52.3997 54.2856 62.1731C72.4575 71.9464 83.7558 50.5554 83.7558 50.5554C83.7558 50.5554 88.4395 38.1416 74.4525 39.7015C60.4654 41.2614 57.6788 54.8699 78.6939 66.248C99.709 77.6261 108.971 62.9123 108.971 62.9123"
              stroke="white"
              strokeWidth="30"
              strokeLinecap="round"
            />
            <path
              d="M3.94072 3.27278C3.94072 3.27278 -7.6574 33.1742 7.87169 43.32C23.4008 53.4659 27.0135 18.6703 42.7494 27.7032C56.6596 35.688 36.1137 52.3997 54.2856 62.1731C72.4575 71.9464 83.7558 50.5554 83.7558 50.5554C83.7558 50.5554 88.4395 38.1416 74.4525 39.7015C60.4654 41.2614 57.6788 54.8699 78.6939 66.248C99.709 77.6261 108.971 62.9123 108.971 62.9123"
              stroke="#F94AC9"
              strokeWidth="15"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      <div className="absolute right-0 top-0">
        <img
          src="/thundericon.png"
          alt="Thunder Icon"
          className="w-20 md:w-32"
        />
      </div>
      <DomainSelectionForm />
    </div>
  );
};

export default Page;
