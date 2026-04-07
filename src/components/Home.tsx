import { useRef, useState, useEffect } from 'react';
import VariableProximity from '../ui/VariableProximity';
import IconScene from './IconScene';
import AnimatedHeroLines from './AnimatedHeroLines';
import ProjectsShowcase from './ProjectsShowcase';
import Work from './Work';
import Contact from './Contact';
import Navbar from './Navbar';
import TextCursor from '../ui/TextCursor';
import connectButton from '../assets/images/connect_button.png';
import aalogo from '../assets/images/aalogo.png';
import gradientBg from '../assets/gradient.png';
import paper1 from '../assets/images/paper1.jpg';
import paper2 from '../assets/images/paper2.png';
import githubIcon from '../assets/images/github.png';
import linkedinIcon from '../assets/images/linkedin.png';
// Import icon images
import figmaIcon from '../assets/images/skills-logos/java.png';
import reactIcon from '../assets/images/skills-logos/react.png';
import nodeIcon from '../assets/images/skills-logos/node.png';
import colabIcon from '../assets/images/skills-logos/colab.png';
import sqlIcon from '../assets/images/skills-logos/sql.png';
import firebaseIcon from '../assets/images/skills-logos/firebase.png';
import AIIcon from '../assets/images/skills-logos/AI.png';
import MLIcon from '../assets/images/skills-logos/ML.png';
import MongoIcon from '../assets/images/skills-logos/mongo.png';
import CppIcon from '../assets/images/skills-logos/cpp.png';
import CanvaIcon from '../assets/images/skills-logos/canva.png';
import powerbiIcon from '../assets/images/skills-logos/powerbi.png';
import javaIcon from '../assets/images/skills-logos/figma.png';
import postmanIcon from '../assets/images/skills-logos/postman.png';
import angularIcon from '../assets/images/skills-logos/angular.png';
import DLIcon from '../assets/images/skills-logos/MLDL.png';
const Home = () => {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    // ── Artboard ──────────────────────────────────────────────────────────
    // Fixed "design viewport" all hero elements are authored at.
    // The canvas is scaled uniformly so every element stays glued together.
    const ARTBOARD_W = 1440;
    const ARTBOARD_H = 900;
    const [artboardScale, setArtboardScale] = useState(1);

    // Track scroll progress for Three.js animation
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const maxScroll = windowHeight * 3;

            const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        setIsMounted(true);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scale artboard to always fill the viewport without distortion
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
            <Navbar activeSection="home" />

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

            {/* Three.js Icon Animation Overlay - desktop only */}
            <div className="hidden md:block">
                {isMounted && <IconScene scrollProgress={scrollProgress} artboardScale={artboardScale} />}
            </div>

            {/* Hero Section */}
            <div className="relative h-screen overflow-hidden">
                {/* Gradient Background */}
                {/* <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                    style={{ backgroundImage: `url(${gradientBg})`, zIndex: 0 }}
                /> */}

                {/* Social Links - Top Right */}
                <div className="absolute top-8 right-8 flex gap-4 z-20">
                    {/* GitHub */}
                    <a
                        href="https://github.com/AditiAmbasta13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-11 h-11 rounded-full bg-[#fafafa] flex items-center justify-center transition-transform hover:scale-110"
                    >
                        <img
                            src={githubIcon}
                            alt="GitHub"
                            className="w-full h-full object-cover rounded-[12px] shadow-lg"
                        />
                    </a>
                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/aditi-ambasta-9581b4288"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-11 h-11 rounded-full bg-[#fafafa] flex items-center justify-center transition-transform hover:scale-110"
                    >
                        <img
                            src={linkedinIcon}
                            alt="LinkedIn"
                            className="w-full h-full object-cover rounded-[12px] shadow-lg"
                        />
                    </a>
                </div>

                {/* ── DESKTOP ARTBOARD ──────────────────────────────────────────────────
                    Fixed 1440×900 canvas. All hero elements live here and are
                    scaled together — none can drift relative to one another.
                    Navbar + social buttons stay outside so they stay viewport-anchored.
                ───────────────────────────────────────────────────────────────────── */}
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
                    {/* SVG lines — fills artboard */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none ms-10 mt-5" aria-hidden="true">
                        <AnimatedHeroLines />
                    </div>

                    {/* AA Logo  |  top:30vh→270  right:40vw→576 */}
                    <div className="absolute pointer-events-auto" style={{ top: 240, right: 575, zIndex: 10 }}>
                        <img src={aalogo} alt="AA Logo" className="w-16 h-auto rounded-[17px] shadow-lg" />
                    </div>

                    {/* Hero text — centred in the artboard */}
                    <div
                        className="absolute pointer-events-auto"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
                    >
                        <div className="max-w-2xl text-left">
                            <h1 className="text-6xl leading-tight" style={{ fontFamily: '"Regarn", serif' }}>
                                <span className="text-gray-400 bg-gray-100 text-7xl" style={{ fontFamily: 'ChiKareGo' }}>Hey!</span>
                                {' '}
                                <span className="text-gray-900 font-bold">I'm <span className="italic">Aditi</span></span>
                            </h1>
                            <h2 className="text-6xl mt-1 leading-tight font-bold" style={{ fontFamily: '"Regarn", serif' }}>
                                <span className="text-gray-900 me-3">Software</span>
                                <div className="relative inline-block">
                                    <span className="text-gray-900">Developer</span>
                                    <span className="absolute bottom-1 left-0 right-0 h-1 bg-blue-600 rounded-full"></span>
                                </div>
                            </h2>
                            <h2 className="text-6xl mt-1 leading-tight font-bold" style={{ fontFamily: '"Regarn", serif' }}>
                                <span className="text-gray-900 font-medium text-7xl" style={{ fontFamily: 'ChiKareGo' }}>Engineer</span>
                                <span className="text-gray-400">(</span>
                                <span className="text-gray-900 font-medium text-7xl" style={{ fontFamily: 'ChiKareGo' }}>r</span>
                                <span className="text-gray-400">)</span>
                                <span className="text-gray-900">.</span>
                            </h2>
                        </div>
                    </div>

                    {/* Connect Button  |  bottom:16→64  right:40vw→576 */}
                    <div className="absolute pointer-events-auto rounded-[17px]" style={{ bottom: 84, right: 506, zIndex: 10 }}>
                        <a href="#contact" className="relative inline-block group cursor-pointer">
                            <img src={connectButton} alt="Connect" className="w-40 h-auto rounded-[19px] shadow-lg transition-transform duration-300 group-hover:scale-105" />
                            <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-md" style={{ fontFamily: '"Outfit", serif' }}>
                                Let's Connect
                            </span>
                        </a>
                    </div>

                    {/* "studying BTech in…"  |  bottom:33vh→297  right:18vw→259 */}
                    <div className="absolute pointer-events-auto" style={{ bottom: 307, right: 160, zIndex: 10 }}>
                        <p className="text-gray-600 text-md text-right leading-relaxed" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            studying BTech in<br />
                            AI &amp; Data Science
                        </p>
                    </div>

                    {/* "focused on learning…"  |  bottom:25vh→225  left:12.5vw→180 */}
                    <div className="absolute pointer-events-auto" style={{ bottom: 205, left: 15, zIndex: 10 }}>
                        <p className="text-gray-600 bg-[#fafafa] text-md text-right leading-relaxed" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            focused on learning every single day<br />
                            building meaningful things with intent,<br />
                            Improving consistently, one step at a time.
                        </p>
                    </div>
                </div>

                {/* ── MOBILE LAYOUT ─────────────────────────────────────────────────────
                    Traditional stacked layout shown only on small screens.
                ───────────────────────────────────────────────────────────────────── */}

                {/* Mobile: SVG lines */}
                <div className="md:hidden absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
                    <AnimatedHeroLines />
                </div>

                {/* Mobile: centred hero text */}
                <div className="md:hidden relative z-10 min-h-screen flex flex-col justify-center items-center">
                    <div className="max-w-2xl text-center -mt-3">
                        <h1 className="text-4xl leading-tight" style={{ fontFamily: '"Regarn", serif' }}>
                            <span className="text-gray-400 bg-gray-100 text-5xl" style={{ fontFamily: 'ChiKareGo' }}>Hey!</span>
                            {' '}
                            <span className="text-gray-900 font-bold">I'm <span className="italic">Aditi</span></span>
                        </h1>
                        <h2 className="text-4xl mt-1 leading-tight font-bold" style={{ fontFamily: '"Regarn", serif' }}>
                            <span className="text-gray-900 me-3">Software</span>
                            <div className="relative inline-block">
                                <span className="text-gray-900">Developer</span>
                                <span className="absolute bottom-1 left-0 right-0 h-1 bg-blue-600 rounded-full"></span>
                            </div>
                        </h2>
                        <h2 className="text-4xl mt-1 leading-tight font-bold" style={{ fontFamily: '"Regarn", serif' }}>
                            <span className="text-gray-900 font-medium text-5xl" style={{ fontFamily: 'ChiKareGo' }}>Engineer</span>
                            <span className="text-gray-400">(</span>
                            <span className="text-gray-900 font-medium text-5xl" style={{ fontFamily: 'ChiKareGo' }}>r</span>
                            <span className="text-gray-400">)</span>
                            <span className="text-gray-900">.</span>
                        </h2>
                    </div>
                </div>

                {/* Mobile: AA Logo */}
                <div className="md:hidden absolute top-[26vh] right-[25vw]" style={{ zIndex: 10 }}>
                    <img src={aalogo} alt="AA Logo" className="w-12 h-auto rounded-[17px] shadow-lg" />
                </div>

                {/* Mobile: connect button */}
                <div className="md:hidden absolute bottom-40 right-1/2 translate-x-1/2 rounded-[17px]" style={{ zIndex: 10 }}>
                    <a href="#contact" className="relative inline-block group cursor-pointer">
                        <img src={connectButton} alt="Connect" className="w-32 h-auto rounded-[17px] shadow-lg transition-transform duration-300 group-hover:scale-105" />
                        <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-semibold text-sm" style={{ fontFamily: '"Outfit", serif' }}>
                            Let's Connect
                        </span>
                    </a>
                </div>

                {/* Mobile: "focused on learning" */}
                <div className="md:hidden absolute bottom-60 right-1/2 translate-x-1/2" style={{ zIndex: 10 }}>
                    <p className="bg-[#fafafa] text-gray-600 text-sm text-center whitespace-nowrap" style={{ fontFamily: '"Outfit", sans-serif' }}>
                        focused on learning every single day<br />
                        Improving consistently, one step at a time.
                    </p>
                </div>
            </div>

            {/* Extended scroll area for animation - reduced gap for icons to fully exit before Projects */}
            <div
                className="relative md:min-h-[120vh] flex flex-col items-center justify-start md:pt-[20vh]"
                style={{ backgroundColor: `rgb(250, 250, 250)` }}
            >

                {/* Tools I use title - FIXED positioned above icons, disappears when tunnel starts (desktop only) */}
                <div
                    className="hidden md:block fixed top-[18%] left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300 text-center"
                    style={{ opacity: scrollProgress > 0.20 && scrollProgress < 0.40 ? 1 : 0 }}
                >
                    <h2
                        className="text-4xl scale-y-110 font-regular text-gray-900"
                        style={{ fontFamily: 'Regarn, serif' }}
                    >
                        <span className="italic">My Tech </span>
                        <span
                            className="text-blue-600 text-5xl ms-2"
                            style={{ fontFamily: 'ChiKareGo' }}
                        >
                            Shelf
                        </span>
                    </h2>
                    <p className="text-lg text-gray-500 mt-2 font-outfit">
                        carefully picked, frequently used tech stack
                    </p>
                </div>

                {/* Mobile-only static icon grid */}
                <div className="md:hidden w-full px-6 py-28" id="techstack">
                    <div className="text-center mb-10">
                        <h2
                            className="md:text-4xl text-3xl scale-y-110 font-regular text-gray-900"
                            style={{ fontFamily: 'Regarn, serif' }}
                        >
                            <span className="italic">My Tech </span>
                            <span
                                className="text-blue-600 md:text-5xl text-4xl md:ms-2 ms-1"
                                style={{ fontFamily: 'ChiKareGo' }}
                            >
                                Shelf
                            </span>
                        </h2>
                        <p className="md:text-base text-sm text-gray-500 mt-2" style={{ fontFamily: '"Outfit", sans-serif' }}>
                            carefully picked, frequently used tech stack
                        </p>
                    </div>
                    <div className="grid grid-cols-4 gap-6 max-w-xs mx-auto">
                        {[
                            { name: 'React', src: reactIcon },
                            { name: 'Node.js', src: nodeIcon },
                            { name: 'Python', src: colabIcon },
                            { name: 'SQL', src: sqlIcon },
                            { name: 'C++', src: firebaseIcon },
                            { name: 'Java', src: figmaIcon },
                            { name: 'Angular', src: angularIcon },
                            { name: 'Mongo/Firebase', src: MongoIcon },
                            { name: 'AI & Agents', src: AIIcon },
                            { name: 'ML + DL', src: DLIcon },
                            { name: 'FIgma/Canva', src: javaIcon },
                            { name: 'Power BI', src: powerbiIcon },
                        ].map(({ name, src }) => (
                            <div key={name} className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={src}
                                        alt={name}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                                <span className="text-xs text-gray-500 text-center" style={{ fontFamily: '"Outfit", sans-serif' }}>
                                    {name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Projects Showcase - full screen with background images */}
            <div id="projects">
                <ProjectsShowcase />
            </div>

            {/* ─── Published Papers Section ─── */}
            <section id="papers" className="bg-[#fafafa] py-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-right mb-12">
                        <h2
                            className="text-3xl md:text-4xl font-light text-gray-900"
                            style={{ fontFamily: 'Regarn, serif' }}
                        >
                            <span className="italic">Published</span>{' '}
                            <span className="text-blue-600 text-4xl md:text-5xl ms-2" style={{ fontFamily: 'ChiKareGo' }}>
                                Papers
                            </span>
                        </h2>
                        <p className="text-gray-500 text-sm font-light mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                            My research contributions
                        </p>
                    </div>

                    {/* Two cards side by side */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Paper 1 */}
                        <a
                            href="https://iieta.org/journals/isi/paper/10.18280/isi.300906"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-stretch"
                        >
                            {/* Image Section */}
                            <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden shrink-0">
                                <img src={paper1} alt="Paper" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                                    <span className="flex items-center gap-1 text-white text-sm font-medium group-hover:gap-2 transition-all duration-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                        Read Paper
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-6 flex flex-col flex-1">
                                {/* Badge */}
                                <span
                                    className="inline-block w-fit px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full mb-3"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    Open Access
                                </span>
                                {/* Title */}
                                <h3
                                    className="text-base md:text-md font-medium text-gray-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors duration-300"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    A Hybrid Semantic–Rule-Based NLP Framework Integrating DFCI and MSKCC Approaches for Clinical Trial Matching Using UMLS and FAISS
                                </h3>
                                {/* Description */}
                                <p
                                    className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 flex-1"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    Proposes a hybrid retrieval framework integrating semantic embeddings, dense retrieval using FAISS, clinical concept normalization via UMLS, and cross-encoder-based re-ranking.
                                </p>
                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <span
                                        className="text-xs text-gray-400"
                                        style={{ fontFamily: 'Outfit, sans-serif' }}
                                    >
                                        ML · Biomedical NLP · Clinical Research
                                    </span>
                                </div>
                            </div>
                        </a>

                        {/* Paper 2 */}
                        <a
                            href="https://thegrenze.com/index.php?display=page&view=journalabstract&absid=6705&id=8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative transition-all duration-300 overflow-hidden flex flex-col md:flex-row items-stretch"
                        >
                            {/* Image Section */}
                            <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden shrink-0">
                                <img src={paper2} alt="Paper" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center pb-2">
                                    <span className="flex items-center gap-1 text-white text-sm font-medium group-hover:gap-2 transition-all duration-300" style={{ fontFamily: 'Outfit, sans-serif' }}>
                                        Read Paper
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17L17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-6 flex flex-col flex-1">
                                {/* Badge */}
                                <div className="flex flex-col mb-3">
                                    <span
                                        className="inline-block w-fit px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full mb-1"
                                        style={{ fontFamily: 'Outfit, sans-serif' }}
                                    >
                                        GIJET · Vol 12, Issue 1
                                    </span>
                                </div>
                                {/* Title */}
                                <h3
                                    className="text-base md:text-md font-medium text-gray-900 leading-snug mb-2 group-hover:text-blue-700 transition-colors duration-300"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    SpeakBoost: Enhancing Verbal Communication with AI
                                </h3>
                                {/* Conference info */}
                                <p
                                    className="text-blue-500 text-[10px] md:text-xs font-medium mb-2 leading-tight"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    Hinweis Fourth International Conf. on Advanced Research in Engineering and Technology
                                </p>
                                {/* Description */}
                                <p
                                    className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4 flex-1"
                                    style={{ fontFamily: 'Outfit, sans-serif' }}
                                >
                                    This paper presents an AI-powered communication enhancement tool that provides instant, personalized feedback to improve professional and public speaking skills.
                                </p>
                                {/* Footer */}
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <span
                                        className="text-xs text-gray-400"
                                        style={{ fontFamily: 'Outfit, sans-serif' }}
                                    >
                                        AI · Speech Analysis · NLP
                                    </span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Work/Experience Section */}
            <div id="work">
                <Work />
            </div>

            {/* Contact Section */}
            <Contact />
        </div>
    );
};

export default Home;