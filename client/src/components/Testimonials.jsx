import React, { useState } from 'react'

import img2 from "../assets/img2.jpeg"
import tst1 from "../assets/tst1.jpeg"
import tst2 from "../assets/tst2.jpeg"
import tst3 from "../assets/tst3.jpeg"

const Testimonials = () => {

        const [currentTestimonial, setCurrentTestimonial] = useState(0);
    



    const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? 2 : prev - 1));
  };


  return (
    <div> <section className="bg-gray-100 py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-14 text-center">
              <div className="mb-6 md:mb-8">
                <button className="bg-slate-700 text-white border-slate-700 hover:bg-slate-800 px-4 md:px-6 py-1 rounded-none text-xs md:text-sm font-medium tracking-wider">
                  TESTIMONIALS
                </button>
              </div>
    
              <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">What our customers says?</h2>
              <p className="text-gray-600 text-sm md:text-lg mb-8 md:mb-16">We have over 15,000 happy customers in world</p>
    
              {/* Testimonial Slider */}
              <div className="relative max-w-4xl mx-auto">
                {/* Large Quote Mark */}
     {/* In your component */}
    <div className="font-['Dancing_Script'] text-8xl md:text-9xl text-gray-300/50 mb-2 -mt-4">
      &ldquo;
    </div>
                {/* Testimonial Content */}
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                  >
                    {/* Testimonial 1 - William Someone */}
                    <div className="w-full flex-shrink-0 px-4 md:px-8">
                      <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto">
                        "Would you like me to give you a formula for success? It's quite simple, really: Double your rate of
                        failure. You are thinking of failure as the enemy of success. But it isn't at all. You can be
                        discouraged by failure or you can learn from it, so go ahead and make mistakes. Make all you can.
                        Because remember that's where you will find success."
                      </p>
    
                      <div className="flex items-center justify-center gap-4 md:gap-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-400">
                          <img src={tst1}></img>
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg md:text-xl font-bold text-slate-800">William Someone</h4>
                          <p className="text-gray-600 text-sm md:text-base">Businessman</p>
                        </div>
                      </div>
                    </div>
    
                    {/* Testimonial 2 - Jack Murphy */}
                    <div className="w-full flex-shrink-0 px-4 md:px-8">
                      <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto">
                        "Would you like me to give you a formula for success? It's quite simple, really: Double your rate of
                        failure. You are thinking of failure as the enemy of success. But it isn't at all. You can be
                        discouraged by failure or you can learn from it, so go ahead and make mistakes. Make all you can.
                        Because remember that's where you will find success."
                      </p>
    
                      <div className="flex items-center justify-center gap-4 md:gap-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-400">
                          <img src={tst2}></img>
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg md:text-xl font-bold text-slate-800">Jack Murphy</h4>
                          <p className="text-gray-600 text-sm md:text-base">Businessman</p>
                        </div>
                      </div>
                    </div>
    
                    {/* Testimonial 3 - Jennifer Johanson */}
                    <div className="w-full flex-shrink-0 px-4 md:px-8">
                      <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto">
                        "Investors generally expect higher returns from riskier investments. When a low risk investment is
                        made, the return is also generally low. Similarly, high risk comes with high returns. Investors,
                        particularly novices, are often advised to adopt a particular investment strategy and diversify
                        their portfolio."
                      </p>
    
                      <div className="flex items-center justify-center gap-4 md:gap-6">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-400">
                         <img src={tst3}></img>
                        </div>
                        <div className="text-left">
                          <h4 className="text-lg md:text-xl font-bold text-slate-800">Jennifer Johanson</h4>
                          <p className="text-gray-600 text-sm md:text-base">IT Manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* Navigation Arrows */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-slate-700 hover:bg-slate-800 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
    
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-slate-700 hover:bg-slate-800 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
    
          {/* Experience Section */}
       <section className="bg-gray-100 py-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Column - Years of Experience */}
          <div className="bg-gray-200 p-8 md:p-16 flex flex-col justify-center ">
            <div className="text-center">
              <div className="text-7xl md:text-9xl font-bold text-slate-800 mb-4 md:mb-6 md:mr-33">37</div>
              <div className="text-slate-800 text-lg md:text-xl font-medium tracking-wider uppercase  md:mr-35">
                YEARS OF 
                <br />
                EXPERIENCE
              </div>
            </div>
          </div>
    
          {/* Right Column - Team Image and Content */}
          <div className="relative">
            {/* Team Image */}
            <div className=" absolute -top-20 h-60 md:h-120 w-full overflow-hidden">
              <img 
                src={img2} 
                alt="Finance professionals" 
                className="w-full h-full object-cover"
              />
            </div>
    
            {/* Content Box */}
            <div className=" absolute bg-slate-700  -left-80 -bottom-27 w-full  p-8 md:p-10 text-gray-300">
              <p className="text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                In finance, the benefit from an investment is called a return. The return may consist of a gain (or
                loss) realized from the sale of a property or an investment, unrealized capital appreciation, or
                investment income.
              </p>
              <a 
                href="#" 
                className="inline-flex items-center text-gray-300 hover:text-white text-sm md:text-base font-medium transition-colors"
              >
                Read more
                <svg 
                  className="ml-2 w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section></div>
  )
}

export default Testimonials