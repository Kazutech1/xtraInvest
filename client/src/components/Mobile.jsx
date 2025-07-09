import { useState, useEffect } from "react";
import { MessageCircle, Phone, FileText, Map, Menu, X } from "lucide-react";
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import heroBg from "../assets/slide.jpeg";
import boxBg from "../assets/box3.jpeg";
import m1 from "../assets/m1.jpeg";
import m2 from "../assets/m2.jpeg";
import m3 from "../assets/m3.jpeg";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import tst1 from "../assets/tst1.jpeg";
import tst2 from "../assets/tst2.jpeg";
import tst3 from "../assets/tst3.jpeg";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Mobile() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [startCounters, setStartCounters] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.3, // Lower threshold for mobile
    triggerOnce: true,
    onChange: (inView) => {
      if (inView) {
        setStartCounters(true);
      }
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
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
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white px-4 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-40 h-16 md:w-50 md:h-20 object-contain" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-slate-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">Phone Number</p>
                <p className="font-semibold text-slate-800">+1 (800) 740 134</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Map className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">VIC 3000, USA</p>
                <p className="font-semibold text-slate-800">121 King St, California</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
    

{/* Sidebar - Mobile & Desktop */}
<div
  className={`mt-13 fixed top-0 left-0 h-full w-64 bg-slate-700 z-40 transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
>
  <div className="mt-16 p-4 flex flex-col space-y-2">
    <a href="#" className="px-4 py-3 text-white bg-slate-600 hover:bg-slate-500 transition-colors">
      Home
    </a>
    <a href="/about" className="px-4 py-3 text-white hover:bg-slate-600 transition-colors">
      About
    </a>
    <a href="/services" className="px-4 py-3 text-white hover:bg-slate-600 transition-colors">
      Services
    </a>
    
    <a href="#" className="px-4 py-3 text-white hover:bg-slate-600 transition-colors">
      FAQ
    </a>
    <a href="#" className="px-4 py-3 text-white hover:bg-slate-600 transition-colors">
      Contact
    </a>
    <a href="/auth" className="px-4 py-3 text-white hover:bg-slate-600 transition-colors">
      Log In
    </a>
  </div>
</div>


      {/* Navigation - Desktop */}
      <nav className="hidden md:block bg-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 md:px-14">
          <div className="flex items-center justify-between">
            <div className="flex">
              <a href="#" className="px-4 md:px-6 py-4 text-white bg-slate-600 hover:bg-slate-500 transition-colors">
                Home
              </a>
              <a href="#" className="px-4 md:px-6 py-4 text-white hover:bg-slate-600 transition-colors">
                About
              </a>
              <a href="#" className="px-4 md:px-6 py-4 text-white hover:bg-slate-600 transition-colors">
                Services
              </a>
              <a href="#" className="px-4 md:px-6 py-4 text-white hover:bg-slate-600 transition-colors">
                FAQ
              </a>
              <a href="#" className="px-4 md:px-6 py-4 text-white hover:bg-slate-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

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

      {/* Trusted Companies Section - Simplified for mobile */}
      <section className="bg-slate-700 py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-14">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-sm md:text-lg font-normal text-white text-center">Trusted by famous companies</h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-8">
              {['RAMIRES', 'BELINDA', 'CLINTON'].map((company) => (
                <div key={company} className="text-white text-sm md:text-base px-3 py-1 border border-white">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-100 py-8 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 md:mb-12">
            <button className="bg-slate-700 text-white px-4 py-1 rounded-none text-xs md:text-sm font-medium">
              OUR MISSION
            </button>
          </div>

          <h2 className="text-xl md:text-3xl lg:text-4xl font-normal text-slate-800 leading-tight mb-4 md:mb-8 px-2">
            It's Personal, Every Person Who Walks Through Our Door Is Important To Us,
            <br className="hidden md:block" />
            Experience and Knowledge When You Need It Most.
          </h2>

          <p className="text-gray-600 text-sm md:text-base">To create a better everyday life for the many people</p>
        </div>
      </section>

      {/* Our Solutions Section - Stacked on mobile */}
      <section className="bg-gray-100 py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 bg-slate-600 shadow-xl">
            <div className="bg-slate-700 p-6 md:p-8 flex flex-col justify-center relative min-h-[250px] md:min-h-[400px]">
              <div 
                className="absolute inset-0 bg-gray-600"
                style={{
                  backgroundImage: `url(${boxBg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.9
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80" />
              <div className="relative z-10 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 leading-tight">
                  Our<br />Solutions<br />are best
                </h3>
                <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                  We Will Help You To Invest in Everything
                </p>
                <a href="#" className="text-gray-300 hover:text-white flex items-center gap-2 text-sm md:text-base">
                  <span>→</span> See more
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 col-span-3">
              {[
                {
                  title: "Investment Advices",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  ),
                  bg: "bg-slate-600",
                  hoverBg: "bg-slate-700"
                },
                {
                  title: "Investment Insurance",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  bg: "bg-slate-500",
                  hoverBg: "bg-slate-600"
                },
                {
                  title: "Wealth Management",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  ),
                  bg: "bg-slate-400",
                  hoverBg: "bg-slate-500"
                }
              ].map((service, index) => (
                <div key={index} className={`${service.bg} p-6 text-center text-white group hover:${service.hoverBg} transition-all duration-500`}>
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">{service.title.split(' ')[0]}</h4>
                  <h4 className="text-lg font-semibold mb-3">{service.title.split(' ')[1]}</h4>
                  <p className="text-gray-300 mb-4 text-sm">On any situation and anytime</p>
                  <button className="bg-white text-slate-700 px-4 py-1 text-sm rounded-full shadow-md">
                    Learn more
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-gray-100 py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4 md:mb-8">
                Who We
                <br />
                Are?
              </h3>
            </div>
            <div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                Investors generally expect higher returns from riskier investments. When a low risk investment is made,
                the return is also generally low. Similarly, high risk comes with high returns.
              </p>
              <a href="#" className="text-gray-600 hover:text-slate-800 flex items-center gap-2 text-sm md:text-base">
                <span>→</span> Read more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Single column on mobile */}
      <section className="bg-gray-100 py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: "Bob Kingman", role: "Co-founder", image: m1 },
              { name: "Sarah Sperson", role: "Manager & Analyzer", image: m2 },
              { name: "Robin McCalister", role: "Risk Manager", image: m3 }
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="aspect-[4/5] bg-gray-300 overflow-hidden rounded-t-lg">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="bg-slate-700 p-4 md:p-6 text-white rounded-b-lg">
                  <h4 className="text-lg font-medium mb-1">{member.name}</h4>
                  <p className="text-gray-300 text-xs md:text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - 2 columns on mobile */}
      <section ref={ref} className="bg-gray-100 py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            {[
              { value: 37, suffix: "+", label: "Years of Experience" },
              { value: 98, suffix: "k", label: "Happy Clients" },
              { value: 65, suffix: "B", label: "Assets Managed" },
              { value: 24, suffix: "+", label: "Countries Served" }
            ].map((stat, index) => (
              <div key={index} className="p-4 md:p-6 transition-all hover:-translate-y-1">
                <div className="text-4xl md:text-7xl font-bold text-slate-800 mb-2">
                  {startCounters && (
                    <CountUp 
                      end={stat.value} 
                      duration={2.5 + index * 0.5} 
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <p className="text-gray-600 text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Simplified for mobile */}
      <section className="bg-gray-100 py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto relative">
          <div className="bg-slate-700 p-6 md:p-12 text-white rounded-lg">
            <div className="mb-6 md:mb-12">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                What we can do More in different cases
              </h3>
              <p className="text-gray-300 text-sm md:text-base">Our Advisors visions</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {[
                { 
                  title: "College Savings", 
                  description: "Insurable risk is predictable",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                  )
                },
                { 
                  title: "Wealth Management", 
                  description: "Better proper functioning",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  )
                },
                { 
                  title: "Stocks Management", 
                  description: "Obtain highest profit",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  )
                },
                { 
                  title: "Income Insurance", 
                  description: "Buying and selling tools",
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  )
                }
              ].map((service, index) => (
                <div key={index} className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {service.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold mb-1">{service.title}</h4>
                    <p className="text-gray-300 text-xs md:text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 md:mb-8">
            <button className="bg-slate-700 text-white px-4 py-1 rounded-none text-xs md:text-sm font-medium">
              TESTIMONIALS
            </button>
          </div>

          <h2 className="text-xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">What our customers says?</h2>
          <p className="text-gray-600 text-sm md:text-lg mb-6 md:mb-12">We have over 15,000 happy customers in world</p>

          <div className="relative max-w-4xl mx-auto">
            <div className="text-6xl md:text-9xl text-gray-300/50 mb-2 -mt-4">&ldquo;</div>
            
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {[
                  {
                    quote: "Would you like me to give you a formula for success? It's quite simple, really: Double your rate of failure. You are thinking of failure as the enemy of success. But it isn't at all. You can be discouraged by failure or you can learn from it, so go ahead and make mistakes. Make all you can. Because remember that's where you will find success.",
                    name: "William Someone",
                    role: "Businessman",
                    image: tst1
                  },
                  {
                    quote: "Would you like me to give you a formula for success? It's quite simple, really: Double your rate of failure. You are thinking of failure as the enemy of success. But it isn't at all. You can be discouraged by failure or you can learn from it, so go ahead and make mistakes. Make all you can. Because remember that's where you will find success.",
                    name: "Jack Murphy",
                    role: "Businessman",
                    image: tst2
                  },
                  {
                    quote: "Investors generally expect higher returns from riskier investments. When a low risk investment is made, the return is also generally low. Similarly, high risk comes with high returns. Investors, particularly novices, are often advised to adopt a particular investment strategy and diversify their portfolio.",
                    name: "Jennifer Johanson",
                    role: "IT Manager",
                    image: tst3
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2 md:px-8">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center justify-center gap-3 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-400">
                        <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-base md:text-xl font-bold text-slate-800">{testimonial.name}</h4>
                        <p className="text-gray-600 text-xs md:text-base">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Smaller on mobile */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-slate-700 hover:bg-slate-800 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-slate-700 hover:bg-slate-800 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section - Stacked on mobile */}
      <section className="bg-gray-100 py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 p-8 md:p-16 flex flex-col justify-center rounded-lg">
              <div className="text-center">
                <div className="text-6xl md:text-9xl font-bold text-slate-800 mb-4 md:mb-6">37</div>
                <div className="text-slate-800 text-lg font-medium uppercase">
                  YEARS OF 
                  <br />
                  EXPERIENCE
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="h-48 md:h-96 w-full overflow-hidden rounded-lg mb-4">
                <img 
                  src={img2} 
                  alt="Finance professionals" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="bg-slate-700 p-6 md:p-8 text-gray-300 rounded-lg">
                <p className="text-sm md:text-base leading-relaxed mb-4">
                  In finance, the benefit from an investment is called a return. The return may consist of a gain (or
                  loss) realized from the sale of a property or an investment, unrealized capital appreciation, or
                  investment income.
                </p>
                <a href="#" className="inline-flex items-center text-gray-300 hover:text-white text-sm md:text-base">
                  Read more
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-100 py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-12 gap-3 md:gap-0">
            <div>
              <h2 className="text-xl md:text-4xl font-bold text-slate-800 mb-1 md:mb-2">From the Blog</h2>
              <p className="text-gray-600 text-sm md:text-lg">Whats new on the board?</p>
            </div>
            <a href="#" className="text-gray-600 hover:text-slate-800 flex items-center gap-2 text-sm md:text-base">
              See more posts <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              "6 reasons every small investors should be blogging... are you missing the boat?",
              "Study shows small investors that blog get 55% more website visitors",
              "Forget community, forget conversation, investors blogging is about money."
            ].map((title, index) => (
              <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-medium text-slate-800 mb-2 md:mb-3 leading-relaxed">
                    {title}
                  </h3>
                  <time className="text-gray-600 text-xs md:text-sm italic">10 June 2024</time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-slate-800 py-8 md:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">Our Professional Certifications</h2>
              <p className="text-gray-300 text-sm md:text-base">
                View our official certifications and credentials that demonstrate our expertise and compliance with industry standards.
              </p>
            </div>

            <button className="bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white px-4 py-3 text-sm md:text-base rounded-lg flex items-center justify-center gap-2 transition-colors w-full md:w-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              View PDF Certificates
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['ISO 9001', 'CFP®', 'CPA', 'SEC Registered'].map((cert, index) => (
              <div key={index} className="bg-slate-700 p-3 flex items-center justify-center h-16 md:h-24 rounded">
                <span className="text-white text-xs md:text-base font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-14 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
              
                <div>
                     <img src={logo} className="w-50 h-20 object-contain" />
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Inco is redefining the marketplace for business purchases by making it dramatically easier for buyers to
                discover, learn more about, compare and buy the products and services they need to run and grow their
                businesses.
              </p>

              {/* Social Media Icons */}
              {/* <div className="flex gap-2 md:gap-3">
                <a
                  href="#"
                  className="w-8 h-8 md:w-10 md:h-10 bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-colors rounded-full"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 md:w-10 md:h-10 bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-colors rounded-full"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 md:w-10 md:h-10 bg-slate-700 text-white flex items-center justify-center hover:bg-slate-600 transition-colors rounded-full"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div> */}
            </div>

            {/* About Company */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-slate-800 mb-4 md:mb-6">ABOUT COMPANY</h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                    <span>›</span> About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                    <span>›</span> Support
                  </a>
                </li>
                <li>
                 
                </li>
                <li>
                 
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                    <span>›</span> Contact Us
                  </a>
                </li>
                <li>
                
                </li>
              </ul>
            </div>

            {/* Quick Access */}
            <div>
              <h4 className="text-base md:text-lg font-semibold text-slate-800 mb-4 md:mb-6">QUICK ACCESS</h4>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                    <span>›</span> Users Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                    <span>›</span> Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                    <span>›</span> Investment Guide
                  </a>
                </li>
                <li>
              
                </li>
                <li>
                  
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base">
                    <span>›</span> Reviews
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300 py-4 md:py-6">
          <div className="max-w-7xl mx-auto px-4 md:px-14">
            <p className="text-center text-gray-600 text-xs md:text-sm">© Copyright 2025. All Rights Reserved - XtraInvest.</p>
          </div>
        </div>
      </footer>

      {/* Chat Icon */}
      
    </div>
  );
}

export default Mobile
