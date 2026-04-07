import { useRef, useEffect, useState, useCallback } from 'react';
import Navbar from './Navbar';
import TextCursor from '../ui/TextCursor';
import Contact from './Contact';
import Education from './Education';
import aditiPic from '../assets/images/Aditi_pic.jpeg';
import connectButton from '../assets/images/connect_button.png';

// Achievement images
import achFinnoverse from '../assets/images/achievments/Finnoverse.jpg';
import achExpo from '../assets/images/achievments/expo.png';
import achIdea from '../assets/images/achievments/idea.jpg';
import achPixel from '../assets/images/achievments/pixel.png';
import achIdea2 from '../assets/images/achievments/idea2.jpg';
import achSih from '../assets/images/achievments/sih.jpg';
import achSih2 from '../assets/images/achievments/sih2.jpg';
import achUiux from '../assets/images/achievments/uiux.png';
import achUiux2 from '../assets/images/achievments/uiux2.png';
import ach4good from '../assets/images/achievments/4good.jpg';
import achbuildathon from '../assets/images/achievments/buildathon.jpg';
import achNSS from '../assets/images/achievments/NSS.jpg';
import achwizard from '../assets/images/achievments/pixel wizrd.jpg';
import achcode from '../assets/images/achievments/code like her.png';

// Extra Ciricular Images
import draw1 from '../assets/images/xtra_ciriculars/draw1.jpg';
import draw2 from '../assets/images/xtra_ciriculars/draw2.jpg';
import draw3 from '../assets/images/xtra_ciriculars/draw3.jpg';
import ui1 from '../assets/images/xtra_ciriculars/ui1.jpg';
import ui2 from '../assets/images/xtra_ciriculars/ui2.png';
import ui3 from '../assets/images/xtra_ciriculars/ui3.png';
import event1 from '../assets/images/xtra_ciriculars/event1.jpg';
import event2 from '../assets/images/xtra_ciriculars/event2.jpg';
import event3 from '../assets/images/xtra_ciriculars/event3.jpg';

// About page SVG with animated pulse
const AboutHeroLines = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const pulseRef = useRef<SVGPathElement>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (pathRef.current && pulseRef.current) {
            const pathLength = pathRef.current.getTotalLength();
            pulseRef.current.style.strokeDasharray = `${pathLength * 0.03} ${pathLength * 0.97}`;
            pulseRef.current.style.strokeDashoffset = `${pathLength}`;

            const animate = () => {
                if (!pulseRef.current) return;
                pulseRef.current.style.transition = 'none';
                pulseRef.current.style.strokeDashoffset = `${pathLength}`;
                pulseRef.current.getBoundingClientRect();
                pulseRef.current.style.transition = 'stroke-dashoffset 60s linear';
                pulseRef.current.style.strokeDashoffset = `${-pathLength}`;
            };

            animate();
            const interval = setInterval(animate, 30000);
            return () => clearInterval(interval);
        }
    }, [isMobile]);

    const desktopPathData = "M 72.198183 372.338096 L 329.302777 372.338096 C 332.616894 372.338096 335.305706 375.026908 335.305706 378.341025 L 335.305706 508.998516 C 335.305706 512.312632 332.616894 514.996233 329.302777 514.996233 L 239.686141 514.996233 C 236.372024 514.996233 233.683213 512.312632 233.683213 508.998516 L 233.683213 6.998408 C 233.683213 3.684292 236.372024 1.000691 239.686141 1.000691 L 397.700728 1.000691 C 401.014845 1.000691 403.703657 3.684292 403.703657 6.998408 L 403.703657 257.250701 C 403.703657 260.564818 401.014845 263.25363 397.700728 263.25363 L 6.999709 263.25363 C 3.685592 263.25363 1.001992 265.937231 1.001992 269.251348 L 1.001992 366.340379 C 1.001992 369.654496 3.685592 372.338096 6.999709 372.338096 Z M 72.198183 372.338096 ";

    const mobilePathData = "M 141.017807 1401.217811 L 8.50217 1401.217811 C 5.184462 1401.217811 2.50217 1398.530311 2.50217 1395.217811 L 2.50217 1233.795922 C 2.50217 1230.483422 5.184462 1227.795921 8.50217 1227.795921 L 359.856368 1227.795921 C 363.168868 1227.795921 365.856368 1225.108421 365.856368 1221.795921 L 365.856368 218.05625 C 365.856368 214.74375 363.168868 212.05625 359.856368 212.05625 L 8.50217 212.05625 C 5.184462 212.05625 2.50217 214.74375 2.50217 218.05625 L 2.50217 530.910444 C 2.50217 534.222944 5.184462 536.910445 8.50217 536.910445 L 520.887632 536.910445 C 524.200132 536.910445 526.887632 534.222944 526.887632 530.910444 L 526.887632 8.49894 C 526.887632 5.18644 529.575132 2.49894 532.887633 2.49894 L 897.632456 2.49894 C 900.950165 2.49894 903.632456 5.18644 903.632456 8.49894 L 903.632456 883.217766 C 903.632456 886.530267 900.950165 889.217767 897.632456 889.217767 L 475.080336 889.217767 C 471.767836 889.217767 469.080335 891.905267 469.080335 895.217767 L 469.080335 1126.827163 C 469.080335 1130.144871 471.767836 1132.827163 475.080336 1132.827163 L 743.856401 1132.827163 C 747.168901 1132.827163 749.856401 1130.144871 749.856401 1126.827163 L 749.856401 742.441712 C 749.856401 739.129212 747.168901 736.441712 743.856401 736.441712 L 153.017808 736.441712 C 149.700099 736.441712 147.017807 739.129212 147.017807 742.441712 L 147.017807 1395.217811 C 147.017807 1398.530311 144.330307 1401.217811 141.017807 1401.217811 Z M 141.017807 1401.217811";

    const pathData = isMobile ? mobilePathData : desktopPathData;

    if (isMobile) {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 910 1410"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="aboutPulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="40%" stopColor="#2563EB" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#2563EB" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <path
                    ref={pathRef}
                    strokeLinecap="butt"
                    fill="none"
                    strokeLinejoin="miter"
                    d={pathData}
                    stroke="#d0d0d0"
                    strokeWidth="1"
                    strokeOpacity="1"
                    strokeMiterlimit="4"
                />
                <path
                    ref={pulseRef}
                    strokeLinecap="round"
                    fill="none"
                    strokeLinejoin="round"
                    d={pathData}
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeOpacity="1"
                    strokeMiterlimit="4"
                />
            </svg>
        );
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 500 520"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="aboutPulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="40%" stopColor="#2563EB" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#2563EB" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
            {/* Base gray path */}
            <path
                ref={pathRef}
                strokeLinecap="butt"
                fill="none"
                strokeLinejoin="miter"
                d={pathData}
                stroke="#d0d0d0"
                strokeWidth="1"
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
                strokeWidth="1"
                strokeOpacity="1"
                strokeMiterlimit="4"
            />
        </svg>
    );
};

// Staggered reveal helper
const stagger = (visible: boolean, index: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
} as React.CSSProperties);

const useVisible = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return { ref, visible };
};

// Achievement carousel data
const achievements = [
    { image: achFinnoverse, label: '2nd prize - Finnoverse Buildathon' },
    { image: achExpo, label: 'Department 1st prize - Tech Expo' },
    { image: achIdea, label: '1st prize Female Category -\n Union Bank of India Idea Hackathon' },
    { image: achPixel, label: 'Pixel-Paranoia Competition Finalist' },
    { image: achIdea2, label: '1st prize Female Category -\n Union Bank of India Idea Hackathon' },
    { image: achSih2, label: '2024 SIH Finalist - Team Overload Oblivion' },
    { image: achUiux, label: '1st prize - UI/UX Hackathon' },
    { image: achUiux2, label: '1st prize - UI/UX Hackathon' },
    { image: ach4good, label: '1st prize - UI/UX Hackathon' },
    { image: achNSS, label: 'NSS Participation' },
    { image: achbuildathon, label: '3rd prize - Think for Good Competition' },
    { image: achwizard, label: 'Pixel Wizard Hackathon Participation' },
    { image: achcode, label: 'Code Like Her Hackathon Participation' },
];

// Extra-curricular activities data
const extraCurriculars = [
    {
        title: 'College Committies',
        description: 'Active member of college committies (DJS Express, DJS Infomatrix, etc.), attending committee events, hackathons and tech meetups.',
        images: [event1, event2, event3],
    },
    {
        title: 'Social Media Coordinator',
        description: 'Managed and created content for LinkedIn (@GoChanakya - Fintech Startup Company) and Instagram for college committee events.',
        images: [ui1, ui2, ui3],
    },
    {
        title: 'Sketching & Art',
        description: 'Passionate about sketching, painting and exploring abstract art in my free time. Won some prizes in art competitions.',
        images: [draw1, draw2, draw3],
    },
];

// Shuffling image stack component
const ShufflingImageStack = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
    }, [images.length]);

    // Auto-shuffle every 3 seconds
    useEffect(() => {
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
    }, [nextImage]);

    return (
        <div className="relative w-48 h-56 mx-auto">
            {images.map((img, i) => {
                // Calculate position relative to current index
                const offset = (i - currentIndex + images.length) % images.length;
                const isFront = offset === 0;
                const isMid = offset === 1;

                return (
                    <div
                        key={i}
                        className="absolute inset-0 rounded-xl overflow-hidden shadow-lg transition-all duration-700 ease-in-out"
                        style={{
                            zIndex: isFront ? 3 : isMid ? 2 : 1,
                            transform: isFront
                                ? 'translateX(0) scale(1) rotate(0deg)'
                                : isMid
                                    ? 'translateX(18px) translateY(10px) scale(0.93) rotate(3deg)'
                                    : 'translateX(-14px) translateY(18px) scale(0.87) rotate(-3deg)',
                            opacity: isFront ? 1 : isMid ? 0.7 : 0.45,
                        }}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {/* Dark overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                );
            })}
            {/* Next button */}
            <button
                onClick={nextImage}
                className="absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md transition-colors duration-200"
                aria-label="Next image"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            </button>
        </div>
    );
};

const About = () => {
    const { ref: heroRef, visible: heroVisible } = useVisible(0.1);
    const [artboardScale, setArtboardScale] = useState(1);
    const ARTBOARD_W = 1440;
    const ARTBOARD_H = 900;

    useEffect(() => {
        const update = () => {
            setArtboardScale(Math.min(
                window.innerWidth / ARTBOARD_W,
                window.innerHeight / ARTBOARD_H,
            ));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#fafafa]">
            {/* Navbar */}
            <Navbar activeSection="about" />

            {/* TextCursor overlay */}
            <div className="fixed inset-0 pointer-events-none z-50">
                <TextCursor
                    text="●"
                    spacing={80}
                    followMouseDirection={true}
                    randomFloat={true}
                    exitDuration={0.3}
                    removalInterval={20}
                    maxPoints={10}
                />
            </div>

            {/* ─── Hero Section ─── */}
            <div className="relative min-h-screen overflow-hidden" ref={heroRef}>
                <div className="relative z-10 min-h-screen flex items-center justify-center">

                    {/* ── DESKTOP ARTBOARD ────────────────────────────────────────────────── */}
                    <div
                        className="hidden md:block absolute pointer-events-none"
                        style={{
                            width: `${ARTBOARD_W}px`,
                            height: `${ARTBOARD_H}px`,
                            top: '50%',
                            left: '50%',
                            transform: `translate(-50%, -50%) scale(${artboardScale})`,
                            transformOrigin: 'center center',
                        }}
                    >
                        {/* Title  |  top:5vh->45  right:5vw->72 */}
                        <div className="absolute pointer-events-auto" style={{ top: 55, right: 0, zIndex: 10 }}>
                            <h2
                                className="text-5xl scale-y-110 font-regular text-gray-900"
                                style={{ fontFamily: 'Regarn, serif' }}
                            >
                                <span className="italic">About</span>
                                <span
                                    className="text-blue-600 text-6xl ms-3"
                                    style={{ fontFamily: 'ChiKareGo' }}
                                >
                                    Me
                                </span>
                            </h2>
                        </div>

                        {/* Left Text Zone (using original viewport-relative percentages adjusted for the 1440x900 artboard) */}
                        <div className="absolute pointer-events-auto text-left -me-8" style={{ top: 0, left: 0, width: '59%', height: '100%', zIndex: 10 }}>
                            <p
                                className="absolute top-[21%] left-[26%] text-gray-600 text-base md:text-xl mt-4 max-w-lg font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif', ...stagger(heroVisible, 5) }}
                            >
                                <span className="text-gray-400 bg-gray-100 text-md md:text-5xl" style={{ fontFamily: "ChiKareGo" }}>Hi, I'm Aditi</span> — part developer, part problem solver, and occasionally a professional debugger of my own mistakes.
                            </p>
                            <p
                                className="absolute top-[33%] left-[26%] text-gray-600 text-base md:text-xl mt-6 max-w-lg font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif', ...stagger(heroVisible, 5) }}
                            >
                                I work across the stack, building responsive frontends, developing backend systems, and working with machine learning and Agentic AI to design intelligent, autonomous applications.
                            </p>
                            <p
                                className="absolute top-[52%] left-[15%] text-gray-600 text-base md:text-xl mt-4 max-w-lg font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif', ...stagger(heroVisible, 5) }}
                            >
                                I enjoy solving problems, learning new technologies, and turning complex ideas into real, working products.
                            </p>
                            <p
                                className="absolute top-[60%] left-[15%] text-gray-600 text-base md:text-xl mt-4 max-w-lg font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif', ...stagger(heroVisible, 5) }}
                            >
                                Outside of tech, I enjoy sketching, cycling, and sometimes going down deep rabbit holes trying to fix one tiny bug.
                            </p>
                        </div>

                        {/* Right Area - SVG, Image, Connect Button */}
                        <div className="absolute top-36 right-10 h-full pointer-events-auto" style={{ width: '55%', zIndex: 10, ...stagger(heroVisible, 1) }}>
                            {/* Animated Hero Lines SVG */}
                            <div className="absolute pointer-events-none" style={{ width: '75%', left: 96, top: 40 }}>
                                <AboutHeroLines />
                            </div>

                            {/* Profile Image — absolute on top of SVG */}
                            <div
                                className="absolute"
                                style={{ top: '9%', left: '30%', transform: 'translate(-50%, -50%)', ...stagger(heroVisible, 2) }}
                            >
                                <div className="relative">
                                    <img
                                        src={aditiPic}
                                        alt="Aditi"
                                        className="w-60 h-80 rounded-lg object-cover shadow-xl"
                                    />
                                </div>
                            </div>

                            {/* Connect Button */}
                            <div className="absolute rounded-[17px]" style={{ bottom: 390, right: 460, zIndex: 10 }}>
                                <a href="#contact" className="relative inline-block group cursor-pointer">
                                    <img
                                        src={connectButton}
                                        alt="Connect"
                                        className="w-40 h-auto rounded-[19px] shadow-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-md"
                                        style={{ fontFamily: '"Outfit", serif' }}
                                    >
                                        Let's Connect
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── MOBILE LAYOUT ───────────────────────────────────────────────────── */}
                    <div className="md:hidden flex flex-col items-center w-full mt-20 relative">
                        {/* Title Mobile */}
                        <div className="absolute top-[-60px] right-6" style={{ zIndex: 10 }}>
                            <h2
                                className="text-3xl scale-y-110 font-regular text-gray-900"
                                style={{ fontFamily: 'Regarn, serif' }}
                            >
                                <span className="italic">About</span>
                                <span
                                    className="text-blue-600 text-4xl ms-3"
                                    style={{ fontFamily: 'ChiKareGo' }}
                                >
                                    Me
                                </span>
                            </h2>
                        </div>
                        {/* Text — centered */}
                        <div className="text-center px-6 mb-8" style={stagger(heroVisible, 1)}>
                            <p
                                className="text-gray-600 text-sm mt-3 font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif' }}
                            >
                                <span className="text-gray-400 bg-gray-100 text-2xl" style={{ fontFamily: "ChiKareGo" }}>Hi, I'm Aditi</span> — part developer, part problem solver, and occasionally a professional debugger of my own mistakes.
                            </p>
                            <p
                                className="text-gray-600 text-sm mt-3 font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif' }}
                            >
                                I work across the stack, building responsive frontends, developing backend systems, and working with machine learning and Agentic AI to design intelligent, autonomous applications.
                            </p>
                            <p
                                className="text-gray-600 text-sm mt-3 font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif' }}
                            >
                                I enjoy solving problems, learning new technologies, and turning complex ideas into real, working products.
                            </p>
                            <p
                                className="text-gray-600 text-sm mt-3 font-regular leading-relaxed"
                                style={{ fontFamily: '"Outfit", sans-serif' }}
                            >
                                Outside of tech, I enjoy sketching, cycling, and sometimes going down deep rabbit holes trying to fix one tiny bug.
                            </p>
                        </div>

                        {/* Image + SVG behind + button */}
                        <div className="relative w-full flex flex-col items-center">
                            {/* SVG lines behind */}
                            <div className="absolute -top-97 flex items-center justify-center pointer-events-none" aria-hidden="true">
                                <div className="w-[100%] h-full">
                                    <AboutHeroLines />
                                </div>
                            </div>

                            {/* Profile image */}
                            <div className="relative z-10" style={stagger(heroVisible, 2)}>
                                <img
                                    src={aditiPic}
                                    alt="Aditi"
                                    className="w-36 h-48 rounded-lg object-cover shadow-xl"
                                />
                            </div>

                            {/* Connect button — smaller, centered */}
                            <div className="relative z-10 mt-6" style={stagger(heroVisible, 3)}>
                                <a href="#contact" className="relative inline-block group cursor-pointer">
                                    <img
                                        src={connectButton}
                                        alt="Connect"
                                        className="w-28 h-auto rounded-[17px] shadow-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-xs"
                                        style={{ fontFamily: '"Outfit", serif' }}
                                    >
                                        Let's Connect
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Achievements Carousel ─── */}
            <div id="achievements" className="mt-20 mb-28 px-4 overflow-hidden">
                <div className="text-center mb-20">
                    <h2
                        className="md:text-4xl text-3xl scale-y-110 font-regular text-gray-900"
                        style={{ fontFamily: 'Regarn, serif' }}
                    >
                        <span className="italic">My</span>
                        <span
                            className="text-blue-600 md:text-5xl text-4xl ms-3"
                            style={{ fontFamily: 'ChiKareGo' }}
                        >
                            Achievements
                        </span>
                    </h2>
                    <p className="md:text-base text-sm text-gray-500 mt-2 font-outfit">
                        A few proud moments.
                    </p>
                </div>

                <div
                    className="flex w-max gap-6"
                    style={{
                        animation: 'scroll-left 35s linear infinite',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
                    onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
                >
                    {/* Render images twice for seamless loop */}
                    {[...achievements, ...achievements].map((ach, i) => (
                        <div
                            key={i}
                            className="relative flex-shrink-0 w-72 h-52 rounded-xl overflow-hidden shadow-lg group"
                        >
                            <img
                                src={ach.image}
                                alt={ach.label}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            {/* Dark overlay at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                            {/* Label text */}
                            <span
                                className="absolute bottom-3 left-4 text-white text-sm font-semibold tracking-wide"
                                style={{ fontFamily: '"Outfit", sans-serif' }}
                            >
                                {ach.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Extra Curricular Section ─── */}
            <div id="extracurriculars" className="relative py-24 px-8 md:px-16 bg-[#fafafa]">
                {/* Title - top right */}
                <div className="text-right mb-24">
                    <h2
                        className="md:text-4xl text-3xl scale-y-110 font-regular text-gray-900"
                        style={{ fontFamily: 'Regarn, serif' }}
                    >
                        <span className="italic">Extra</span>
                        <span
                            className="text-blue-600 md:text-5xl text-4xl ms-3"
                            style={{ fontFamily: 'ChiKareGo' }}
                        >
                            Curriculars
                        </span>
                    </h2>
                    <p className="text-gray-500 md:text-base text-sm font-outfit mt-2">
                        Beyond the code
                    </p>
                </div>

                {/* Three columns */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    {extraCurriculars.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center gap-5"
                        >
                            {/* Shuffling image stack */}
                            <ShufflingImageStack images={item.images} />
                            {/* Text below image */}
                            <div className="text-center items-center mt-3 w-[300px] ">
                                <h3
                                    className="text-xl font-medium text-gray-900 mb-1"
                                    style={{ fontFamily: 'Regarn, serif' }}
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="text-gray-500 text-center text-sm leading-relaxed"
                                    style={{ fontFamily: '"Outfit", sans-serif' }}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── Education Section ─── */}
            <Education />

            {/* ─── Contact Section ─── */}
            <Contact />
        </div>
    );
};

export default About;
