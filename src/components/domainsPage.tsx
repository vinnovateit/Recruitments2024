import React from 'react';

function DomainsPage() {
  return (
    <div className='font-Fixture'>
      <div className="mt-[10vh] min-h-screen bg-[#1E003E] flex flex-col">
        {/* Top section with star icon */}
        {/* <div className="w-full p-4 md:p-6 lg:p-8">
          <img 
            src="/staricon.png" 
            alt="Star Icon" 
            className="w-12 md:w-16 lg:w-20"
          />
        </div> */}

        {/* Header section */}
        <div className="w-full  py-4 md:py-6 lg:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
            <div className="ml-9 max-w-[80vw] pt-3 md:pl-8 md:pt-10">
          <div className=" font-outline-2 text-6xl font-bold text-specpurple md:text-7xl">
            OUR
          </div>
          <div className="mr-2 pt-3 text-5xl font-bold text-white md:text-7xl">
            DOMAINS
          </div>
        </div>
            
            {/* Fixed position for thunder icon */}
            <div className="absolute right-0">
              <img 
                src="/thundericon.png" 
                alt="Thunder Icon" 
                className="w-20 md:w-32"
              />
            </div>
          </div>
        </div>

        {/* Cards section */}
        <div className="flex-grow w-full px-4 md:px-8 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <div className="transform transition-transform hover:scale-105">
              <img 
                src="/managementcard.png" 
                alt="Management" 
                className="w-full max-w-[280px] lg:max-w-[320px]"
              />
            </div>
            
            <div className="transform transition-transform hover:scale-105">
              <img 
                src="/techcard.png" 
                alt="Technical" 
                className="w-full max-w-[280px] lg:max-w-[320px]"
              />
            </div>
            
            <div className="transform transition-transform hover:scale-105 md:col-span-2 lg:col-span-1">
              <img 
                src="/designcard.png" 
                alt="Design" 
                className="w-full max-w-[280px] lg:max-w-[320px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DomainsPage;