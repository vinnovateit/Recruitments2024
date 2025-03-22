"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const DomainSelectionForm: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [answers, setAnswers] = useState({
    name: '',
    registrationNumber: '',
    mobileNumber: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    registrationNumber: false,
    mobileNumber: false,
    selectedDomains: false,
    registrationNumberFormat: false,
    mobileNumberFormat: false
  });

   const handleDomainChange = (domain: string) => {
    setSelectedDomains(prev => {
      const newDomains = prev.includes(domain)
        ? prev.filter(d => d !== domain)
        : [...prev, domain];
      setErrors(prevErrors => ({ ...prevErrors, selectedDomains: newDomains.length === 0 }));
      return newDomains;
    });
  };

  const handleAnswerChange = (field: keyof typeof answers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [field]: value.trim() === '' }));
    
    if (field === 'registrationNumber') {
      const regExp = /^[2-4][0-9][A-Z]{2}\d{4}$/;
      setErrors(prevErrors => ({ ...prevErrors, registrationNumberFormat: !regExp.test(value) }));
    }
    
    if (field === 'mobileNumber') {
      const phoneRegExp = /^[1-9]\d{9}$/;
      setErrors(prevErrors => ({ ...prevErrors, mobileNumberFormat: !phoneRegExp.test(value) }));
    }
  };

  const handleNext = () => {
    const newErrors = {
      name: answers.name.trim() === '',
      registrationNumber: answers.registrationNumber.trim() === '',
      mobileNumber: answers.mobileNumber.trim() === '',
      selectedDomains: selectedDomains.length === 0,
      registrationNumberFormat: !/^2[2-4][A-Z]{3}\d{4}$/.test(answers.registrationNumber),
      mobileNumberFormat: !/^[1-9]\d{9}$/.test(answers.mobileNumber)
    };
    setErrors(newErrors);
    
    if (!Object.values(newErrors).includes(true)) {
      localStorage.setItem('formData', JSON.stringify(selectedDomains));
      localStorage.setItem('basicInfo', JSON.stringify(answers));
      console.log("Selected domains:", selectedDomains);
      console.log("Answers:", answers);
      router.push(`/apply/${selectedDomains[0]}`);
    }
  };

  useEffect(() => {
    if (session?.user?.name) {
      const parts = session.user.name.split(' ');
      const regNo = parts[parts.length - 1];
      const fullName = parts.slice(0, -1).join(' ');

      setAnswers(prev => ({
        ...prev,
        name: fullName,
        registrationNumber: regNo ?? ''
      }));

    }
  }, [session]);

  return (
    <>
    
    <div className="font-Fixture flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl relative px-6">
        <div className='mt-[20vh]'>
            <h2 className="text-white font-bold text-xl mb-8">CHOOSE YOUR PREFERRED DOMAIN(S):</h2>
        
        {errors.selectedDomains && <p className="text-red-500">Please select at least one domain.</p>}

        <div className="space-y-5">
          {["management", "design", "technical"].map(domain => (
            <div key={domain} className="flex items-center">
              <div 
                className={`relative w-7 h-7 mr-3 border-2 border-white flex items-center justify-center ${selectedDomains.includes(domain) ? 'bg-specpurple' : 'bg-specpurple'}`}
                onClick={() => handleDomainChange(domain)}
              >
                {selectedDomains.includes(domain) && (
                  <span className="text-[#9FFF47] text-lg font-extrabold">✓</span>
                )}
              </div>
              <label className="text-white text-lg" onClick={() => handleDomainChange(domain)}>
                {domain.toUpperCase()}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-6 mb-8 mt-12">
          {["name", "registrationNumber", "mobileNumber"].map(field => (
            <div key={field} className="space-y-2">
              <h3 className="text-white font-bold text-lg">{field.replace(/([A-Z])/g, " $1").toUpperCase()}</h3>
              <input
                type="text"
                placeholder={field === "name" ? "FULL NAME" : field === "registrationNumber" ? "2YBAAXXXX" : "VALID WHATSAPP NUMBER"}
                value={answers[field as keyof typeof answers]}
                onChange={(e) => handleAnswerChange(field as keyof typeof answers, e.target.value)}
                readOnly={field === "name" || field === "registrationNumber"}
                className={`w-full p-[0.7rem] bg-specpurple rounded text-white placeholder-white placeholder-opacity-70 border border-purple-800 focus:outline-none focus:border-purple-500 text-lg ${
                  (field === "name" || field === "registrationNumber") ? "cursor-not-allowed" : ""
                }`}
                required
              />
              {errors[field as keyof typeof errors] && <p className="text-red-500">This field is required.</p>}
              {field === "registrationNumber" && errors.registrationNumberFormat && <p className="text-red-500">Invalid format. Use 2YBAAXXXX.</p>}
              {field === "mobileNumber" && errors.mobileNumberFormat && <p className="text-red-500">Invalid phone number. Must be 10 digits and not start with 0.</p>}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={handleNext}
            className="bg-pink-500 text-white hover:text-black px-10 py-3 rounded text-lg font-medium hover:bg-[#9FFF47] transition-colors"
          >
            NEXT →
          </button>
        </div>
        </div>
        
      </div>
    </div>
    </>
    
  );
};

export default DomainSelectionForm;