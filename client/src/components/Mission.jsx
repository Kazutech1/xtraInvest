import React from 'react'
import { useState, useEffect } from "react";

import boxBg from "../assets/box3.jpeg"
import m1 from "../assets/m1.jpeg"
import m2 from "../assets/m2.jpeg"
import m3 from "../assets/m3.jpeg"
import img1 from "../assets/img1.jpeg"

const Mission = () => {
  return (
    <div>
      {/* Mission Section - Enhanced for mobile */}
      <section className="bg-gray-100 py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14 text-center">
          <div className="mb-6 md:mb-12">
            <button className="bg-slate-700 text-white border-slate-700 hover:bg-slate-800 px-4 md:px-6 py-1 rounded-none text-xs sm:text-sm md:text-base font-medium">
              OUR MISSION
            </button>
          </div>

          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-normal text-slate-800 leading-tight mb-6 md:mb-8 max-w-5xl mx-auto">
            It's Personal, Every Person Who Walks Through Our Door Is Important To Us,
            <br className="hidden sm:block" />
            Experience and Knowledge When You Need It Most.
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4 sm:px-0">
            To create a better everyday life for the many people
          </p>
        </div>
      </section>

      {/* Our Solutions Section - Enhanced mobile layout */}
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-slate-600 overflow-hidden shadow-xl">
            {/* Left Column - Our Solutions */}
            <div className="bg-slate-700 p-6 sm:p-8 md:p-8 flex flex-col justify-center relative overflow-hidden group hover:bg-slate-800 transition-all duration-500 min-h-[200px] md:min-h-[300px]">
              {/* Background Image with Animation */}
              <div 
                className="absolute inset-0 bg-gray-600 transition-all duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${boxBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.9
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content Container */}
              <div className="relative z-10 text-white transform group-hover:-translate-y-1 transition-transform duration-500">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4 leading-tight">
                  <span className="inline-block transition-all duration-300">Our</span>
                  <br />
                  <span className="inline-block transition-all duration-300 delay-75">Solutions</span>
                  <br />
                  <span className="inline-block transition-all duration-300 delay-100">are best</span>
                </h3>
                <p className="text-gray-300 mb-4 md:mb-6 text-sm sm:text-base md:text-base transition-all duration-300 group-hover:text-white">
                  We Will Help You To Invest in Everything
                </p>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white flex items-center gap-2 text-sm sm:text-base md:text-base transition-all duration-300 group-hover:gap-3 group-hover:translate-x-1"
                >
                  <span className="inline-block transition-all duration-300 group-hover:translate-x-1">→</span> 
                  <span className="underline-offset-4 group-hover:underline">See more</span>
                </a>
              </div>
            </div>

            {/* Right Columns - Service Cards */}
            <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
              {/* Investment Advices */}
              <div className="bg-slate-600 p-4 sm:p-6 md:p-8 text-center text-white relative overflow-hidden group hover:bg-slate-700 transition-all duration-500 min-h-[250px] sm:min-h-[280px] md:min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700/30 to-slate-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 md:mb-2 transition-colors duration-300">Investment</h4>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 transition-colors duration-300">Advices</h4>
                  <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base group-hover:text-white transition-colors duration-300">
                    On any situation and anytime
                  </p>
                  <button className="bg-white text-slate-700 hover:text-slate-800 px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-2 text-xs sm:text-sm md:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    Learn more
                  </button>
                </div>
              </div>

              {/* Investment Insurance */}
              <div className="bg-slate-500 p-4 sm:p-6 md:p-8 text-center text-white relative overflow-hidden group hover:bg-slate-600 transition-all duration-500 min-h-[250px] sm:min-h-[280px] md:min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 to-slate-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 md:mb-2 transition-colors duration-300">Investment</h4>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 transition-colors duration-300">Insurance</h4>
                  <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base group-hover:text-white transition-colors duration-300">
                    On any situation and anytime
                  </p>
                  <button className="bg-white text-slate-700 hover:text-slate-800 px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-2 text-xs sm:text-sm md:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    Learn more
                  </button>
                </div>
              </div>

              {/* Wealth Management */}
              <div className="bg-slate-400 p-4 sm:p-6 md:p-8 text-center text-white relative overflow-hidden group hover:bg-slate-500 transition-all duration-500 min-h-[250px] sm:min-h-[280px] md:min-h-[300px] sm:col-span-2 md:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/30 to-slate-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 md:mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-1 md:mb-2 transition-colors duration-300">Wealth</h4>
                  <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 transition-colors duration-300">Management</h4>
                  <p className="text-gray-300 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base group-hover:text-white transition-colors duration-300">
                    On any situation and anytime
                  </p>
                  <button className="bg-white text-slate-700 hover:text-slate-800 px-4 py-1 sm:px-5 sm:py-2 md:px-6 md:py-2 text-xs sm:text-sm md:text-base rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section - Enhanced mobile layout */}
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4 sm:mb-6 md:mb-8">
                Who We
                <br />
                Are?
              </h3>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                Investors generally expect higher returns from riskier investments. When a low risk investment is made,
                the return is also generally low. Similarly, high risk comes with high returns.
              </p>
              <a href="#" className="text-gray-600 hover:text-slate-800 flex items-center gap-2 justify-center lg:justify-start">
                <span>→</span> Read more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced mobile layout */}
      <section className="bg-gray-100 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-4 overflow-hidden">
            {/* Bob Kingman */}
            <div className="relative group">
              <div className="aspect-[4/5] bg-gray-300 overflow-hidden">
                <img 
                  src={m1} 
                  alt="Bob Kingman - Co-founder"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="bg-slate-700 p-4 sm:p-5 md:p-6 text-white">
                <h4 className="text-base sm:text-lg md:text-xl font-medium mb-1">Bob Kingman</h4>
                <p className="text-gray-300 text-xs sm:text-sm md:text-sm">Co-founder</p>
              </div>
            </div>

            {/* Sarah Sperson */}
            <div className="relative group">
              <div className="aspect-[4/5] bg-gray-300 overflow-hidden">
                <img 
                  src={m2} 
                  alt="Sarah Sperson - Manager & Analyzer"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="bg-slate-700 p-4 sm:p-5 md:p-6 text-white">
                <h4 className="text-base sm:text-lg md:text-xl font-medium mb-1">Sarah Sperson</h4>
                <p className="text-gray-300 text-xs sm:text-sm md:text-sm">Manager & Analyzer</p>
              </div>
            </div>

            {/* Robin McCalister */}
            <div className="relative group sm:col-span-2 lg:col-span-1">
              <div className="aspect-[4/5] bg-gray-300 overflow-hidden">
                <img 
                  src={m3} 
                  alt="Robin McCalister - Risk Manager"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="bg-slate-700 p-4 sm:p-5 md:p-6 text-white">
                <h4 className="text-base sm:text-lg md:text-xl font-medium mb-1">Robin McCalister</h4>
                <p className="text-gray-300 text-xs sm:text-sm md:text-sm">Risk Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mission