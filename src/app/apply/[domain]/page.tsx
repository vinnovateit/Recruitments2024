"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginScreen from "~/components/LoginScreen";
import { Send, AlertCircle } from "lucide-react";
import Alert from "~/components/Alert";

type Domain = "technical" | "management" | "design";

interface FormData {
  answers: string[];
  files: File[];
}

const DomainPage = ({
  params: { domain },
}: {
  params: { domain: string }
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [currentDomainIndex, setCurrentDomainIndex] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    answers: ['', '', ''],
    files: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [paperPlaneStyle, setPaperPlaneStyle] = useState({
    position: 'static',
    transform: 'translate(0, 0) rotate(0deg)',
    opacity: 1,
    color: '#39FF14',
  });
  const [buttonText, setButtonText] = useState("SUBMIT");
  
  const whiteList: Domain[] = ["technical", "management", "design"];

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen bg-specpurple">
      <div className="text-white">Loading...</div>
    </div>;
  }

  if (!session) {
    return <LoginScreen />;
  }

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      try {
        const domains = JSON.parse(storedData);
        if (Array.isArray(domains) && domains.every(d => whiteList.includes(d as Domain))) {
          setSelectedDomains(domains as Domain[]);
          const index = domains.indexOf(domain);
          setCurrentDomainIndex(index >= 0 ? index : 0);
        }
      } catch (error) {
        console.error('Error parsing stored domains:', error);
        router.push('/apply');
      }
    }
  }, [domain, router]);

  const handleInputChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      answers: prev.answers.map((answer, i) => i === index ? value : answer)
    }));
  };

  const handleNavigation = (direction: 'back' | 'next') => {
    // Save current form data
    localStorage.setItem(`formData_${domain}`, JSON.stringify(formData));

    if (direction === 'back') {
      if (!selectedDomains.length || currentDomainIndex === 0) {
        router.push('/apply');
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
    setButtonText("SUBMITTED");
    try {
      localStorage.setItem(`formData_${domain}`, JSON.stringify(formData));

      const basicInfo = JSON.parse(localStorage.getItem("basicInfo") || "{}");
      const allFormData = selectedDomains.map((d) => ({
        domain: d,
        data: JSON.parse(localStorage.getItem(`formData_${d}`) || '{"answers":[],"files":[]}'),
      }));

      const allAnswers = {
        basicInfo,
        domains: allFormData,
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allAnswers),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      // Clear local storage
      selectedDomains.forEach(d => {
        localStorage.removeItem(`formData_${d}`);
      });
      localStorage.removeItem('basicInfo');
      localStorage.removeItem('formData');

      // Animate paper plane
      setPaperPlaneStyle({
        position: 'fixed',
        transform: 'translate(calc(100vw - 100px), calc(-100vh + 100px)) rotate(45deg)',
        opacity: 0,
        transition: 'all 1s ease-in-out',
        color: '#39FF14',
        filter: 'drop-shadow(0 0 8px #39FF14)'
      });

      // Wait for animation to complete before redirecting
      setTimeout(() => {
        router.push("/thank-you");
      }, 1000);

    } catch (error) {
      console.error("Error submitting form:", error);
      setShowError(true);
      setButtonText("SUBMIT");
      setPaperPlaneStyle({
        position: 'static',
        transform: 'translate(0, 0) rotate(0deg)',
        opacity: 1,
        color: '#39FF14',
        filter: 'drop-shadow(0 0 8px #39FF14)'
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
    setIsSubmitting(false);
  };


  // Validate domain
  if (!domain || !whiteList.includes(domain as Domain)) {
    return <div className="text-white text-center mt-20">Invalid Domain</div>;
  }

  const domainContent = {
    technical: {
      description: "Share your technical expertise and problem-solving skills through these challenges. We're looking for innovative thinkers who can tackle complex problems.",
      questions: [
        "Create a small project demonstrating your expertise in any programming language. Share the GitHub repository link and explain your approach.",
        "What's the most challenging technical problem you've solved? Share a link to the solution or describe your approach in detail.",
        "Share your portfolio or any technical blog posts you've written. How do you stay updated with the latest tech trends?"
      ]
    },
    management: {
      description: "Demonstrate your leadership abilities and project management skills. We're seeking individuals who can drive teams toward success.",
      questions: [
        "Describe a project you've led from inception to completion. What challenges did you face and how did you overcome them?",
        "Share a link to a presentation or document showcasing your management philosophy and approach to team leadership.",
        "How would you handle a team conflict? Provide an example from your past experience with supporting documents if available."
      ]
    },
    design: {
      description: "Show us your creative vision and design thinking. We're looking for designers who can blend aesthetics with functionality.",
      questions: [
        "Share your design portfolio or Behance/Dribbble profile. What's your design philosophy and process?",
        "Present a case study of your most challenging design project. What was your role and how did you approach the problems?",
        "Create a quick design concept for a mobile app homepage. Share your thought process and the final design file."
      ]
    }
  } as const;

  const content = domainContent[domain as Domain];

  return (
    <div className="cursor-none">
      {showError && (
        <Alert
          message="Failed to submit application. Redirecting..."
          onClose={() => setShowError(false)}
          variant="error"
          duration={3000}
        />
      )}
      <div className="font-Fixture absolute top-0 left-0">
        <svg
          className="w-16 md:w-32 lg:w-40 ml-[-1.2vw]"
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

      <div className="absolute top-0 right-0">
        <img 
          src="/thundericon.png" 
          alt="Thunder Icon" 
          className="w-20 md:w-32"
        />
      </div>

      <div className="font-Fixture flex justify-center items-center min-h-screen bg-specpurple">
        <div className="w-full max-w-4xl relative px-6 cursor-none">
          <div className="mt-[20vh] space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-white text-5xl md:text-7xl font-bold uppercase">
                {domain}
              </h1>
              <p className="text-white text-sm md:text-base lg:text-lg">
                {content.description}
              </p>
            </div>

            <form className="space-y-8 cursor-none" onSubmit={(e) => e.preventDefault()}>
              {content.questions.map((question, index) => (
                <div key={index} className="space-y-4">
                  <label className="text-white text-sm md:text-base lg:text-lg block text-justify">
                    {question}
                  </label>
                  
                    <input
                      type={index === 1 ? "url" : "text"}
                      className="w-full p-[0.7rem] bg-specpurple rounded text-white placeholder-gray-400 border border-purple-800 focus:outline-none focus:border-purple-500"
                      placeholder={index === 1 ? "Attach URL here..." : "Answer here..."}
                      value={formData.answers[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  
                </div>
              ))}
            </form>

            <div className="flex justify-center gap-4 mt-12">
        <button
          onClick={() => handleNavigation('back')}
          className="bg-gray-500 text-white px-10 py-3 rounded text-lg font-medium hover:bg-gray-600 transition-colors"
          disabled={isSubmitting}
        >
          ← BACK
        </button>
          
        {currentDomainIndex < selectedDomains.length - 1 ? (
          <button
            onClick={() => handleNavigation('next')}
            className="bg-pink-500 text-white px-10 py-3 rounded text-lg font-medium hover:bg-pink-600 transition-colors"
            disabled={isSubmitting}
          >
            NEXT →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-pink-500 text-white px-10 py-3 rounded text-lg font-medium hover:bg-pink-600 transition-colors flex items-center gap-2 relative overflow-visible"
          >
            <span>{buttonText}</span>
            <Send 
              className="w-5 h-5" 
              style={paperPlaneStyle}
            />
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