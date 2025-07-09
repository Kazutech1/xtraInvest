import { useState, useEffect } from "react";
import { MessageCircle, Phone, FileText, Map, Menu, X } from "lucide-react";

import heroBg from "../assets/slide.jpeg"
import boxBg from "../assets/box3.jpeg"
// import m1 from "./assets/m1.jpeg"
// import m2 from "./assets/m2.jpeg"
// import m3 from "./assets/m3.jpeg"
// import img1 from "./assets/img1.jpeg"
// import img2 from "./assets/img2.jpeg"
// import tst1 from "./assets/tst1.jpeg"
// import tst2 from "./assets/tst2.jpeg"
// import tst3 from "./assets/tst3.jpeg"
import Navbar from "../components/Navbar";
import Mission from "../components/Mission";
import Stats from "../components/Stats";
import Services from "../components/Services";
// import Testimonials from "../components/tESTIMONIALS.JSX";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";






function Home() {

    const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  
 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? 2 : prev - 1));
  };

 const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }; 


          
   return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
    <Navbar 
  toggleMenu={toggleMenu}
  isMenuOpen={isMenuOpen} 
  isMobile={isMobile} 
/>

      {/* Hero Section */}
  <main className="relative bg-gray-100 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img 
      src={heroBg} 
      alt="Professional businessman in modern office"
      className="w-full h-full object-cover animate-zoomIn"
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 flex items-center min-h-[400px] md:min-h-[600px]">
    <div className="max-w-2xl space-y-4 md:space-y-6">
      {/* Animated Headline with distinct effects */}
      <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
        <span className="block animate-textReveal delay-100">
          <span className="inline-block animate-wordsSlide delay-100">We will take you</span>
        </span>
        <span className="block animate-textReveal delay-300">
          <span className="inline-block animate-wordsSlide delay-300">through each step</span>
        </span>
        <span className="block animate-textReveal delay-500">
          <span className="inline-block animate-wordsSlide delay-500">till the end.</span>
        </span>
      </h2>

      {/* Animated Description */}
      <div className="space-y-2 md:space-y-4 text-gray-100">
        <p className="text-base md:text-lg animate-lineReveal delay-700">
          Investors, particularly novices, are often advised to adopt a particular investment strategy and
          diversify their portfolio.
        </p>
        <p className="text-base md:text-lg animate-lineReveal delay-900">
          Diversification has the statistical effect of reducing overall risk.
        </p>
      </div>

      {/* Animated Button */}
      <div className="animate-buttonAppear delay-1100">
        <Link to='/auth'>
              <button className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 md:px-10 md:py-4 text-lg md:text-xl rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
          Our Solutions
        </button>
        </Link>
      
      </div>
    </div>
  </div>
</main>



      {/* Trusted Companies Section */}
      <section className="bg-slate-700 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <h3 className="text-base md:text-lg font-normal text-white">Trusted by famous companies</h3>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-12">
              <div className="text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 border border-white flex items-center justify-center">
                    <span className="text-lg font-bold">R</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">RAMIRES</div>
                    <div className="text-xs">MCKINCY</div>
                  </div>
                </div>
              </div>
              <div className="text-white">
                <div className="flex items-center gap-1">
                  <div className="grid grid-cols-3 gap-1">
                    <div className="w-2 h-2 bg-white"></div>
                    <div className="w-2 h-2 bg-white"></div>
                    <div className="w-2 h-2 bg-white"></div>
                    <div className="w-2 h-2 bg-white"></div>
                    <div className="w-2 h-2 bg-white"></div>
                    <div className="w-2 h-2 bg-white"></div>
                  </div>
                </div>
              </div>
              <div className="text-white text-lg md:text-xl font-light tracking-wider">BELINDA</div>
              <div className="text-white border border-white px-3 py-1 md:px-4 md:py-2">
                <div className="text-sm font-medium">CLINTON</div>
                <div className="text-xs">LIVING & EXPERIENCE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
   <Mission />
      {/* Statistics Section */}
   <Stats />

      {/* Services Section */}
{/* Services Section */}
<Services />



      {/* Testimonials Section */}
     <Testimonials />

      {/* Blog Section */}
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4 md:gap-0">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-800 mb-1 md:mb-2">From the Blog</h2>
              <p className="text-gray-600 text-sm md:text-lg">Whats new on the board?</p>
            </div>
            <a href="#" className="text-gray-600 hover:text-slate-800 flex items-center gap-2 text-sm md:text-base">
              See more posts <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Blog Post 1 */}
            <article className="bg-white  overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-3 md:mb-4 leading-relaxed">
                  6 reasons every small investors should be blogging... are you missing the boat?
                </h3>
                <time className="text-gray-600 text-xs md:text-sm italic">10 June 2024</time>
              </div>
            </article>

            {/* Blog Post 2 */}
            <article className="bg-white  overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-3 md:mb-4 leading-relaxed">
                  Study shows small investors that blog get 55% more website visitors
                </h3>
                <time className="text-gray-600 text-xs md:text-sm italic">10 June 2024</time>
              </div>
            </article>

            {/* Blog Post 3 */}
            <article className="bg-white  overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-3 md:mb-4 leading-relaxed">
                  Forget community, forget conversation, investors blogging is about money.
                </h3>
                <time className="text-gray-600 text-xs md:text-sm italic">10 June 2024</time>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
    <section className="bg-slate-800 py-12 md:py-16">
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

      {/* Footer */}
      <Footer />

      {/* Chat Icon */}
     
    </div>
  );
}

export default Home
