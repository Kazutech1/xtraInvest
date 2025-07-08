import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Mission from '../components/Mission';
import Testimonials from '../components/tESTIMONIALS.JSX';
import Footer from '../components/Footer';
import img1 from "../assets/img1.jpeg"


const About = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 

  return (
    <div className="min-h-screen  bg-gray-100">
           <Navbar 
  toggleMenu={toggleMenu}
  isMenuOpen={isMenuOpen} 
  isMobile={isMobile} 
/>
      {/* History Section */}
     {/* History Section */}
<section className="mb-16 max-w-7xl mx-auto px-4 md:px-6">
  <div className=" overflow-hidden">
    <div className="p-6 md:p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">Our History</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Timeline */}
        <div className="border-l-2 border-slate-300 pl-6 space-y-8">
          <div className="relative">
            <div className="absolute -left-7 top-1 h-4 w-4 rounded-full bg-slate-700 border-4 border-slate-100"></div>
            <h3 className="text-xl font-semibold text-slate-800">2010 - Foundation</h3>
            <p className="text-slate-600 mt-2">
              Established with a vision to revolutionize financial planning through innovative solutions.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-7 top-1 h-4 w-4 rounded-full bg-slate-700 border-4 border-slate-100"></div>
            <h3 className="text-xl font-semibold text-slate-800">2014 - First Milestone</h3>
            <p className="text-slate-600 mt-2">
              Reached $100M in assets under management and expanded to three new states.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-7 top-1 h-4 w-4 rounded-full bg-slate-700 border-4 border-slate-100"></div>
            <h3 className="text-xl font-semibold text-slate-800">2018 - Industry Recognition</h3>
            <p className="text-slate-600 mt-2">
              Awarded "Best Financial Advisory Firm" by Financial Times for exceptional client service.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -left-7 top-1 h-4 w-4 rounded-full bg-slate-700 border-4 border-slate-100"></div>
            <h3 className="text-xl font-semibold text-slate-800">2023 - Current Day</h3>
            <p className="text-slate-600 mt-2">
              Serving clients nationwide with over $1B in managed assets and 50+ financial experts.
            </p>
          </div>
        </div>
        
        {/* Image/Stats */}
        <div className=" p-6 flex flex-col justify-center">
          <div className="mb-6">
            <img 
              src={img1} 
              alt="Our team working together" 
              className="object-cover w-full h-80"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <p className="text-3xl font-bold text-slate-800">37+</p>
              <p className="text-slate-600 text-sm">Years Experience</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <p className="text-3xl font-bold text-slate-800">98k</p>
              <p className="text-slate-600 text-sm">Happy Clients</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <p className="text-3xl font-bold text-slate-800">65B</p>
              <p className="text-slate-600 text-sm">Assets Managed</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <p className="text-3xl font-bold text-slate-800">24+</p>
              <p className="text-slate-600 text-sm">Countries Served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <Mission />
      <Testimonials />
         <section className="bg-slate-800 py-12 md:py-16 md:mt-16">
  <div className="max-w-7xl mx-auto px-4 md:px-14">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
      {/* Certification Info */}
      <div className="mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3">Our Professional Certifications</h2>
        <p className="text-gray-300 text-sm md:text-base max-w-lg">
          View our official certifications and credentials that demonstrate our expertise and compliance with industry standards.
        </p>
      </div>

      {/* Certification Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full md:w-auto">
        {/* View PDF Button */}
        <button
          className="bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-lg flex items-center justify-center gap-3 transition-colors w-full sm:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          View PDF Certificates
        </button>

        {/* View Certification Button */}
        {/* <button
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-medium px-6 py-3 md:px-8 md:py-4 text-base md:text-lg rounded-lg flex items-center justify-center gap-3 transition-colors w-full sm:w-auto"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          View Digital Badges
        </button> */}
      </div>
    </div>

    {/* Optional Certification Logos */}
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="bg-slate-700 p-4  flex items-center justify-center h-24">
        <span className="text-white font-medium">ISO 9001</span>
      </div>
      <div className="bg-slate-700 p-4  flex items-center justify-center h-24">
        <span className="text-white font-medium">CFP®</span>
      </div>
      <div className="bg-slate-700 p-4  flex items-center justify-center h-24">
        <span className="text-white font-medium">CPA</span>
      </div>
      <div className="bg-slate-700 p-4  flex items-center justify-center h-24">
        <span className="text-white font-medium">SEC Registered</span>
      </div>
    </div>
  </div>
</section>
      <Footer />    
    </div>
  );
};


export default About;