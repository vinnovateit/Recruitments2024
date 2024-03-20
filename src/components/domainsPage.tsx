function  DomainsPage(){
    return <>
    <div className="domainsbody h-52 w-full bg-[#1E003E] flex justify-start items-start flex-col scrollbar-none">
    <img src="/staricon.png" alt="" className="w-20 sm:scale-100" />
    </div>
    <div className="h-screen w-full bg-[#1E003E] flex justify-start items-start flex-col">
      <div className="heading h-64 px-8 sm:scale-100 sm:px-20 py-4 flex justify-between flex-col sm:flex-row items-start w-full">
        <div className="headingsection">
        <img src="/OUR.png" alt="asdf" className="w-28 h-18 sm:w-40"/>
        <span className="text-[56px] sm:text-[80px] font-bold text-white">DOMAINS</span>
        </div>
        <div className="thundersection ">
          <img src="/thundericon.png" alt="Thunderromaing Icons" className="scale-[0.2] sm:scale-75 -translate-y-20 translate-x-36 sm:translate-y-12 sm:translate-x-0" />
        </div>
      </div>
      <div className="domains h-auto w-full sm:w-full flex justify-center items-center flex-col sm:flex-row">
        <div className="management px-0 sm:px-16 pb-8">
          <img src="/managementcard.png" alt="Management" className="w-44 sm:w-80"  />
        </div>
        <div className="technical px-0 sm:px-16 pb-8">
          <img src="/techcard.png" alt="Management" className="w-44 sm:w-80"  />
        </div>
        <div className="design px-0 sm:px-16">
          <img src="/designcard.png" alt="Management" className="w-44 sm:w-80"  />
        </div>
      </div>
    </div>
    {/*<div className="h-36 w-full bg-[#1E003E] flex justify-end items-end flex-col">
    <img src="/waveicon.png" alt="" />
</div>*/}
    </>
}

export default DomainsPage;