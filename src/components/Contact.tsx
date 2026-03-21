import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import linkedinIcon from '../assets/images/linkedin.png';
import githubIcon from '../assets/images/github.png';
import emailIcon from '../assets/images/email.png';

const Contact = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const pulseRef = useRef<SVGPathElement>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToSection = (path: string, hash: string) => {
        const currentPath = location.pathname;
        if (currentPath === path || (path === '/' && currentPath === '/')) {
            // Same page — just scroll to the element
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Different page — navigate then scroll after render
            navigate(path);
            setTimeout(() => {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    };

    useEffect(() => {
        if (pathRef.current && pulseRef.current) {
            const pathLength = pathRef.current.getTotalLength();

            // Set the stroke dash properties for the pulse
            pulseRef.current.style.strokeDasharray = `${pathLength * 0.03} ${pathLength * 0.97}`;
            pulseRef.current.style.strokeDashoffset = `${pathLength}`;

            const animate = () => {
                if (!pulseRef.current) return;

                pulseRef.current.style.transition = 'none';
                pulseRef.current.style.strokeDashoffset = `${pathLength}`;

                // Force reflow
                pulseRef.current.getBoundingClientRect();

                pulseRef.current.style.transition = 'stroke-dashoffset 60s linear';
                pulseRef.current.style.strokeDashoffset = `${-pathLength}`;
            };

            animate();
            const interval = setInterval(animate, 30000);

            return () => clearInterval(interval);
        }
    }, []);

    // Path data extracted from contactsvg.svg
    const pathData = "M 122.298075 179.232699 L 7.002245 179.232699 C 3.688128 179.232699 0.999316 181.9163 0.999316 185.230417 L 0.999316 296.706675 C 0.999316 300.020792 3.688128 302.704393 7.002245 302.704393 L 1163.853069 302.704393 C 1167.167186 302.704393 1169.855997 300.020792 1169.855997 296.706675 L 1169.855997 78.219879 C 1169.855997 74.905762 1167.167186 72.21695 1163.853069 72.21695 L 489.841963 72.21695 C 486.527846 72.21695 483.844246 74.905762 483.844246 78.219879 L 483.844246 468.139266 C 483.844246 471.453383 481.155434 474.136984 477.841317 474.136984 L 220.210424 474.136984 C 216.896308 474.136984 214.212707 471.453383 214.212707 468.139266 L 214.212707 6.997633 C 214.212707 3.688727 216.896308 0.999916 220.210424 0.999916 L 398.213929 0.999916 C 401.528046 0.999916 404.216858 3.688727 404.216858 6.997633 L 404.216858 173.229771 C 404.216858 176.543888 401.528046 179.232699 398.213929 179.232699 L 115.195652 179.232699 ";

    return (
        <section id="contact" className="relative w-full bg-[#fafafa] text-gray-900 overflow-hidden px-4 md:px-10 min-h-[55vh]">

            {/* Content container */}
            <div className="relative h-full flex flex-col items-start justify-start pt-10 md:pt-16 px-4 md:px-8 z-10">
                {/* Animated title */}
                <div>
                    <h2
                        className="text-3xl md:text-4xl scale-y-110 font-regular text-gray-900"
                        style={{ fontFamily: 'Regarn, serif' }}
                    >
                        <span className="italic">Contact </span>
                        <span
                            className="text-blue-600 text-4xl md:text-5xl ms-2"
                            style={{ fontFamily: 'ChiKareGo' }}
                        >
                            Me
                        </span>
                    </h2>
                </div>
                <div className="flex flex-col gap-1 mt-5">
                    <h3 className="text-gray-500 text-sm font-regular" style={{ fontFamily: 'Outfit, sans-serif' }}>Email: aditiambasta2004@gmail.com</h3>
                    <h3 className="text-gray-500 text-sm font-regular" style={{ fontFamily: 'Outfit, sans-serif' }}>Leetcode: https://leetcode.com/u/Aditi_Ambasta/ <span className="text-blue-600 font-semibold">500+ Solved Problems</span></h3>
                </div>
                <div className='flex flex-col md:flex-row gap-4 md:gap-20 mt-5 md:mt-7'>
                    <div className="flex flex-col gap-2">
                        <div onClick={() => navigate('/about')} className="mb-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm md:text-base font-light cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            About Me
                        </div>
                        <div onClick={() => navigateToSection('/', 'work')} className="mb-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm md:text-base font-light cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            Work Experience
                        </div>
                        <div onClick={() => navigateToSection('/', 'projects')} className="mb-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm md:text-base font-light cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            Projects
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div onClick={() => navigateToSection('/about', 'achievements')} className="mb-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm md:text-base font-light cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            Achievements
                        </div>
                        <div onClick={() => navigateToSection('/', 'techstack')} className="mb-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm md:text-base font-light cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            Tech Stack
                        </div>
                        <div onClick={() => navigateToSection('/about', 'extracurriculars')} className="mb-2 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm md:text-base font-light cursor-pointer" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            Extra Curriculars
                        </div>
                    </div>
                </div>

                {/* Mobile-only social icons — centered single row */}
                <div className="flex md:hidden items-center justify-center gap-6 mt-8 w-full pb-10">
                    <a href="https://www.linkedin.com/in/aditi-ambasta-9581b4288" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinIcon} alt="LinkedIn" className="w-12 h-12 rounded-xl shadow-sm object-contain" />
                    </a>
                    <a href="https://github.com/AditiAmbasta13" target="_blank" rel="noopener noreferrer">
                        <img src={githubIcon} alt="GitHub" className="w-12 h-12 rounded-xl shadow-sm object-contain" />
                    </a>
                    <a href="mailto:ambasta.aditi@gmail.com">
                        <img src={emailIcon} alt="Email" className="w-12 h-12 rounded-xl shadow-sm object-contain" />
                    </a>
                </div>
            </div>

            {/* Decorative SVG with social icons - desktop only */}
            <div className="hidden md:block absolute top-0 right-0 w-[70%] h-full z-20" aria-hidden="true">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1024.5 576"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-full pointer-events-none"
                >
                    <defs>
                        <linearGradient id="contactPulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="40%" stopColor="#2563EB" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                            <stop offset="60%" stopColor="#2563EB" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <g transform="matrix(0.749634, 0, 0, 0.749634, 163.042052, 111.53476)">
                        {/* Base gray path */}
                        <path
                            ref={pathRef}
                            strokeLinecap="butt"
                            fill="none"
                            strokeLinejoin="miter"
                            d={pathData}
                            stroke="#d0d0d0"
                            strokeWidth="2"
                            strokeOpacity="1"
                            strokeMiterlimit="4"
                        />
                        {/* Animated violet pulse */}
                        <path
                            ref={pulseRef}
                            strokeLinecap="round"
                            fill="none"
                            strokeLinejoin="round"
                            d={pathData}
                            stroke="#2563EB"
                            strokeWidth="3"
                            strokeOpacity="1"
                            strokeMiterlimit="4"
                        />
                    </g>
                </svg>

                {/* Social icons positioned along the SVG paths */}
                <div className="absolute inset-0 pointer-events-auto">
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/aditi-ambasta-9581b4288"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute group"
                        style={{ top: '22%', right: '20%' }}
                    >
                        <div className="rounded-xl flex items-center justify-center shadow-lg">
                            <img src={linkedinIcon} alt="LinkedIn" className="w-12 h-12 rounded-xl shadow-sm object-contain" />
                        </div>
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/AditiAmbasta13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute group"
                        style={{ top: '52%', right: '40%' }}
                    >
                        <div className="rounded-xl flex items-center justify-center shadow-lg">
                            <img src={githubIcon} alt="GitHub" className="w-12 h-12 rounded-xl shadow-sm object-contain" />
                        </div>
                    </a>

                    {/* Email icon */}
                    <a
                        href="mailto:ambasta.aditi@gmail.com"
                        className="absolute group"
                        style={{ top: '36%', right: '65%' }}
                    >
                        <div className="rounded-xl flex items-center justify-center shadow-lg">
                            <img src={emailIcon} alt="Email" className="w-12 h-12 rounded-xl shadow-sm object-contain" />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;