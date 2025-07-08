import React, { useState } from 'react'
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Stats = () => {

       const [startCounters, setStartCounters] = useState(false);
     const { ref, inView } = useInView({
        threshold: 0.5, // Trigger when 50% of element is visible
        triggerOnce: true, // Only trigger once
        onChange: (inView) => {
          if (inView) {
            setStartCounters(true);
          }
        }
      });

    
  return (
    <div>  <section ref={ref} className="bg-gray-100 py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
          {/* Years of Experience */}
          <div className="p-4 md:p-6  transition-all hover:-translate-y-1">
            <div className="text-5xl md:text-7xl font-bold text-slate-800 mb-2">
              {startCounters && (
                <CountUp 
                  end={37} 
                  duration={2.5} 
                  suffix="+" 
                  className="inline-block"
                />
              )}
            </div>
            <p className="text-gray-600 text-sm md:text-base">Years of Experience</p>
          </div>

          {/* Happy Clients */}
          <div className="p-4 md:p-6    transition-all hover:-translate-y-1">
            <div className="text-5xl md:text-7xl font-bold text-slate-800 mb-2">
              {startCounters && (
                <CountUp 
                  end={98} 
                  duration={3} 
                  suffix="k" 
                  className="inline-block"
                />
              )}
            </div>
            <p className="text-gray-600 text-sm md:text-base">Happy Clients</p>
          </div>

          {/* Assets Managed */}
          <div className="p-4 md:p-6 transition-all hover:-translate-y-1">
            <div className="text-5xl md:text-7xl font-bold text-slate-800 mb-2">
              {startCounters && (
                <CountUp 
                  end={65} 
                  duration={3.5} 
                  suffix="B" 
                  className="inline-block"
                />
              )}
            </div>
            <p className="text-gray-600 text-sm md:text-base">Assets Managed</p>
          </div>

          {/* Countries Served */}
          <div className="p-4 md:p-6  transition-all hover:-translate-y-1">
            <div className="text-5xl md:text-7xl font-bold text-slate-800 mb-2">
              {startCounters && (
                <CountUp 
                  end={24} 
                  duration={2} 
                  suffix="+" 
                  className="inline-block"
                />
              )}
            </div>
            <p className="text-gray-600 text-sm md:text-base">Countries Served</p>
          </div>
        </div>
      </div>
    </section></div>
  )
}

export default Stats