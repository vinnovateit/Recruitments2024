"use client";

import React from "react";
import DomainSelectionForm from "~/components/DomainSelectionForm";
import { useSession } from "next-auth/react";
import LoginScreen from "~/components/LoginScreen";

const Page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen bg-specpurple">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!session) {
    return <LoginScreen />;
  }

  return (
    <div className="">
      <DomainSelectionForm />
    </div>
  );
};

export default Page;
