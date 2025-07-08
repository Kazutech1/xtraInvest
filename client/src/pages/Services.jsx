import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Mission from '../components/Mission';
import Footer from '../components/Footer';
import ServicesContent from '../components/Services';

const Services = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Optional: Add mobile detection
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar 
                toggleMenu={toggleMenu}
                isMenuOpen={isMenuOpen} 
                isMobile={isMobile} 
            />
            <Mission />
            <ServicesContent /> {/* Use renamed component */}
            <Footer />
        </div>
    );
};

export default Services;