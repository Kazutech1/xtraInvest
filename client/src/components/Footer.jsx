import React from 'react'
import logo from "../assets/logo.png"


const Footer = () => {
  return (
    <div><footer className="bg-gray-200">
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
  <a
    href="#"
    className="text-gray-600 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm md:text-base"
  >
    <span>›</span> Contact Us
  </a>
</li>

<li className="flex items-start gap-2 text-gray-600 text-sm md:text-base">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-800 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13 21.314l-4.657-4.657A8 8 0 1117.657 16.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
  <span>Level 57/19 Martin Pl, Sydney NSW 2000, Australia</span>
</li>

<li className="flex items-center gap-2 text-gray-600 text-sm md:text-base">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m8 0l-4-4m4 4l-4 4m8-12H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
  </svg>
  <a href="mailto:support@leganexuscom.org" className="hover:text-slate-800 transition-colors">
    support@leganexuscom.org
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
      </footer></div>
  )
}

export default Footer