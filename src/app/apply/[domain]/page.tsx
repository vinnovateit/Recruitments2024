"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginScreen from "~/components/LoginScreen";
import Alert from "~/components/Alert";
import AlreadySubmitted from "~/components/AlreadySubmitted";

type Domain = "technical" | "management" | "design";

interface FormData {
  answers: string[];
  files: File[];
}

interface BasicInfo {
  name: string;
  registrationNumber: string;
  mobileNumber: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

const DomainPage = ({ params: { domain } }: { params: { domain: string } }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [currentDomainIndex, setCurrentDomainIndex] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    answers: ["", "", ""],
    files: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const whiteList = useMemo<Domain[]>(() => ["technical", "management", "design"], []);

  const isValidDomain = domain && whiteList.includes(domain as Domain);

  interface SubmissionResponse {
    success: boolean;
    hasSubmitted: boolean;
  }

  // Check if user has already submitted
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch("/api/submit");
          const data = await response.json() as SubmissionResponse;
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

  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      try {
        const domains = JSON.parse(storedData) as string[];
        if (
          Array.isArray(domains) &&
          domains.every((d) => whiteList.includes(d as Domain))
        ) {
          setSelectedDomains(domains as Domain[]);
          const index = domains.indexOf(domain);
          if (index >= 0) {
            setCurrentDomainIndex(index);
          }
        }
      } catch (error) {
        console.error("Error parsing stored domains:", error);
        router.push("/apply");
      }
    } else {
      router.push("/apply");
    }
  }, [domain, router, whiteList]);

  useEffect(() => {
    if (selectedDomains.length > 0) {
      const index = selectedDomains.indexOf(domain as Domain);
      if (index >= 0) {
        setCurrentDomainIndex(index);
      }
    }
  }, [domain, selectedDomains]);

  const handleInputChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      answers: prev.answers.map((answer, i) => (i === index ? value : answer)),
    }));
  };

  const handleNavigation = (direction: "back" | "next") => {
    // Save current form data
    localStorage.setItem(`formData_${domain}`, JSON.stringify(formData));

    if (direction === "back") {
      if (!selectedDomains.length || currentDomainIndex === 0) {
        router.push("/apply");
      } else {
        router.push(`/apply/${selectedDomains[currentDomainIndex - 1]}`);
      }
    } else {
      if (currentDomainIndex < selectedDomains.length - 1) {
        router.push(`/apply/${selectedDomains[currentDomainIndex + 1]}`);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      localStorage.setItem(`formData_${domain}`, JSON.stringify(formData));

      const basicInfo = JSON.parse(localStorage.getItem("basicInfo") ?? "{}") as BasicInfo;
      const allFormData = selectedDomains.map((d) => ({
        domain: d,
        data: JSON.parse(
          localStorage.getItem(`formData_${d}`) ?? '{"answers":[],"files":[]}',
        ) as FormData,
      }));

      const allAnswers = {
        basicInfo,
        domains: allFormData,
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allAnswers),
      });

      const result = await response.json() as SubmitResult;

      if (!result.success) {
        throw new Error(result.error ?? "Submission failed");
      }

      // Clear local storage
      selectedDomains.forEach((d) => {
        localStorage.removeItem(`formData_${d}`);
      });
      localStorage.removeItem("basicInfo");
      localStorage.removeItem("formData");

      // Show success alert and redirect
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/thank-you");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    setIsSubmitting(false);
  };

  const domainContent = {
    technical: {
      description:
        "Share your technical expertise and problem-solving skills through these challenges. We're looking for innovative thinkers who can tackle complex problems.",
      questions: [
        "Create a small project demonstrating your expertise in any programming language. Share the GitHub repository link and explain your approach.",
        "What's the most challenging technical problem you've solved? Share a link to the solution or describe your approach in detail.",
        "Share your portfolio or any technical blog posts you've written. How do you stay updated with the latest tech trends?",
      ],
    },
    management: {
      description:
        "Demonstrate your leadership abilities and project management skills. We're seeking individuals who can drive teams toward success.",
      questions: [
        "Describe a project you've led from inception to completion. What challenges did you face and how did you overcome them?",
        "Share a link to a presentation or document showcasing your management philosophy and approach to team leadership.",
        "How would you handle a team conflict? Provide an example from your past experience with supporting documents if available.",
      ],
    },
    design: {
      description:
        "Show us your creative vision and design thinking. We're looking for designers who can blend aesthetics with functionality.",
      questions: [
        "Share your design portfolio or Behance/Dribbble profile. What's your design philosophy and process?",
        "Present a case study of your most challenging design project. What was your role and how did you approach the problems?",
        "Create a quick design concept for a mobile app homepage. Share your thought process and the final design file.",
      ],
    },
  } as const;

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-specpurple">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <LoginScreen />;
  }

  if (hasSubmitted) {
    return <AlreadySubmitted />;
  }

  if (!isValidDomain) {
    return <div className="mt-20 text-center text-white">Invalid Domain</div>;
  }

  const content = domainContent[domain as Domain];

  return (
    <div className="cursor-none">
      {showError && (
        <Alert
          message="Failed to submit application. Please try again."
          onClose={() => setShowError(false)}
          variant="error"
          duration={3000}
        />
      )}
      {showSuccess && (
        <Alert
          message="Form submitted successfully! Redirecting..."
          onClose={() => setShowSuccess(false)}
          variant="success"
          duration={2000}
        />
      )}
      <div className="absolute left-0 top-0 font-Fixture">
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
        <Image
          src="/thundericon.png"
          alt="Thunder Icon"
          width={128}
          height={128}
          className="w-20 md:w-32"
        />
      </div>

      <div className="flex min-h-screen items-center justify-center bg-specpurple font-Fixture">
        <div className="relative w-full max-w-4xl cursor-none px-6">
          <div className="mt-[20vh] space-y-8">
            <div className="space-y-4 text-center">
              <h1 className="text-5xl font-bold uppercase text-white md:text-7xl">
                {domain}
              </h1>
              <p className="text-sm text-white md:text-base lg:text-lg">
                {content.description}
              </p>
            </div>

            <form
              className="cursor-none space-y-8"
              onSubmit={(e) => e.preventDefault()}
            >
              {content.questions.map((question, index) => (
                <div key={index} className="space-y-4">
                  <label className="block text-justify text-sm text-white md:text-base lg:text-lg">
                    {question}
                  </label>

                  <input
                    type={index === 1 ? "url" : "text"}
                    className="w-full rounded border border-purple-800 bg-specpurple p-[0.7rem] text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
                    placeholder={
                      index === 1 ? "Attach URL here..." : "Answer here..."
                    }
                    value={formData.answers[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </div>
              ))}
            </form>

            <div className="mt-12 flex justify-center gap-4">
              <button
                onClick={() => handleNavigation("back")}
                className="rounded bg-purple-500 px-10 py-3 text-lg font-medium text-white transition-colors hover:bg-pink-700"
                disabled={isSubmitting}
              >
                ← BACK
              </button>

              {currentDomainIndex < selectedDomains.length - 1 ? (
                <button
                  onClick={() => handleNavigation("next")}
                  className="rounded bg-pink-500 px-10 py-3 text-lg font-medium text-white transition-colors hover:bg-lime-400 hover:text-black"
                  disabled={isSubmitting}
                >
                  NEXT →
                </button>
              ) : (
                <button
                  ref={submitButtonRef}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="group relative z-10 overflow-hidden rounded bg-pink-500 px-10 py-3 text-lg font-medium text-white transition-transform duration-200 hover:scale-110"
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-black">
                    SUBMIT
                    <svg
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-lime-400 transition-transform duration-300 ease-in-out group-hover:scale-y-100"></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainPage;
