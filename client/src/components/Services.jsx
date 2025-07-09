import React from 'react'
import img1 from "../assets/img1.jpeg"

const ServicesContent = () => {
  return (
    <div>
      <section className="h-full bg-gray-100 py-8 md:py-16">
        <div className="h-full">
          <div className="flex justify-start">
            {/* Left Column - Empty (since image will float over right column on desktop) */}
            <div className="hidden lg:block mx-50 bg-amber-500"></div>
      
            {/* Right Column - Services with floating image */}
            <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] bg-slate-700 p-4 sm:p-6 md:p-8 lg:px-24 text-white">
              {/* Floating Image - Hidden on mobile, visible on larger screens */}
              <div className="hidden lg:block absolute -left-60 xl:-left-80 -top-10 xl:-top-20 w-80 xl:w-96 h-80 xl:h-96 overflow-hidden shadow-xl">
                <img 
                  src={img1} 
                  alt="Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Mobile Image - Visible only on mobile/tablet */}
              <div className="lg:hidden mb-6 sm:mb-8 w-full h-48 sm:h-60 md:h-72 overflow-hidden shadow-xl rounded-lg">
                <img 
                  src={img1} 
                  alt="Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mb-6 sm:mb-8 md:mb-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                  What we can do More in different cases
                </h3>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg">Our Advisors visions</p>
              </div>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {/* College Savings */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">College Savings</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Insurable risk is predictable</p>
                  </div>
                </div>
      
                {/* Wealth Management */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">Wealth Management</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Better proper functioning</p>
                  </div>
                </div>
      
                {/* Stocks Management */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">Stocks Management</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Obtain highest profit</p>
                  </div>
                </div>
      
                {/* Income Insurance */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">Income Insurance</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Buying and selling tools</p>
                  </div>
                </div>
      
                {/* Investment Advice */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-lg hover:bg-slate-600 transition-colors duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">Investment Advice</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">Aim all economic activities</p>
                  </div>
                </div>
      
                {/* Industrial Contracts */}
                <div className="flex items-start gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 rounded-lg hover:bg-slate-600 transition-colors duration-300 sm:col-span-2 lg:col-span-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8m0 0H6a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h8m-8 0v4a2 2 0 002 2h4a2 2 0 002-2v-4m-8 0V8a2 2 0 012-2h4a2 2 0 012 2v8"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">Industrial Contracts</h4>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base">New and inventive way</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesContent