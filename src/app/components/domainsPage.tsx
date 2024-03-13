function  DomainsPage(){
    return <>
    <div className="domainsbody h-52 w-full bg-[#1E003E] flex justify-start items-start flex-col scrollbar-none">
    <img src="/staricon.png" alt="" />
    </div>
    <div className="h-screen w-full bg-[#1E003E] flex justify-start items-start flex-col">
      <div className="heading px-20 py-8 flex justify-between items-center w-full">
        <div className="headingsection">
        <img src="/OUR.png" alt="asdf" className=""/>
        <span className="text-[100px] font-bold text-white">DOMAINS</span>
        </div>
        <div className="thundersection ">
          <img src="/thundericon.png" alt="Thunderromaing Icons" className="scale-75 translate-y-12" />
        </div>
      </div>
      <div className="domains w-full flex justify-between items-center flex-row">
        <div className="management px-16">
          <img src="/managementcard.png" alt="Management" className=""  />
      
        </div>
        <div className="technical">
          <img src="/techcard.png" alt="Management" />
        </div>
        <div className="design px-16">
          <img src="/designcard.png" alt="Management" />
        </div>
      </div>
    </div>
    <div className="h-36 w-full bg-[#1E003E] flex justify-end items-end flex-col">
    <img src="/waveicon.png" alt="" />
    </div>
    </>
}

export default DomainsPage;