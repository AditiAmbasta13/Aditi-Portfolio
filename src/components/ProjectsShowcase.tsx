import React, { useEffect, useRef, useState } from 'react';

// Tech stack images
import reactIcon from '../assets/images/skills-logos/react.png';
import nodeIcon from '../assets/images/skills-logos/node.png';
import mongoIcon from '../assets/images/skills-logos/mongo.png';
import firebaseIcon from '../assets/images/skills-logos/firebase.png';
import aiIcon from '../assets/images/skills-logos/AI.png';
import mlIcon from '../assets/images/skills-logos/ML.png';
import figmaIcon from '../assets/images/skills-logos/figma.png';
import pythonIcon from '../assets/images/skills-logos/colab.png';
import connectButton from '../assets/images/connect_button.png';
import projOne from '../assets/images/proj1.png';
import projTwo from '../assets/images/proj2.png';
import projThree from '../assets/images/proj3.png';
import projFour from '../assets/images/proj4.png';
import projFive from '../assets/images/proj5.png';
import { BiArrowToLeft } from 'react-icons/bi';
import { BsArrow90DegRight } from 'react-icons/bs';
import { GoArrowUpRight } from 'react-icons/go';

// GitHub SVG Icon
const GithubIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

// Presentation SVG Icon
const PptIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M4.5 4.5v11.25A1.5 1.5 0 006 17.25h12a1.5 1.5 0 001.5-1.5V4.5M12 17.25v3M9 20.25h6" />
    </svg>
);

// Reusable visibility hook — resets when element leaves viewport so animation replays
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

// Staggered reveal style helper — each child gets an increasing delay
const stagger = (visible: boolean, index: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
} as React.CSSProperties);

const ProjectsShowcase = () => {
    return (
        <section className="bg-[#fafafa] py-20 px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-right mb-4">
                <h2
                    className="text-3xl md:text-5xl font-light text-gray-900"
                    style={{ fontFamily: 'Regarn, serif' }}
                >
                    <span className="italic">Things I've</span>{' '}
                    <span className="text-blue-600 text-4xl md:text-6xl ms-2" style={{ fontFamily: 'ChiKareGo' }}>
                        Built
                    </span>
                </h2>
                <p className="text-gray-500 text-sm font-light mt-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Projects I've worked on
                </p>
            </div>

            {/* ── Projects list ── */}
            <div className="max-w-7xl mx-auto gap-8 flex flex-col">

                {/* ══════════════════════════════════════════
                    PROJECT 01 — SpeakBoost  (image LEFT)
                ══════════════════════════════════════════ */}
                {(() => {
                    const { ref, visible } = useVisible();
                    return (
                        <div
                            ref={ref}
                            className="md:-ms-12 flex flex-col md:flex-row items-center py-3"
                        >
                            {/* Image */}
                            <div className="w-full md:w-[40%] flex justify-center" style={stagger(visible, 0)}>
                                <img src={projOne} alt="SpeakBoost" className="max-w-[90%] md:max-w-full" />
                            </div>

                            {/* Text */}
                            <div className="mt-6 md:-ms-16 md:-mt-36 w-full md:w-[45%] text-left px-4 md:px-0">
                                <span
                                    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
                                    style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.2em', ...stagger(visible, 1) }}
                                >
                                    Project 01
                                </span>
                                <h3
                                    className="text-3xl md:text-4xl font-medium text-gray-900 mt-2 mb-3 leading-none"
                                    style={{ fontFamily: 'Regarn, serif', ...stagger(visible, 2) }}
                                >
                                    <span className='md:text-5xl text-4xl font-medium' style={{ fontFamily: 'ChiKareGo' }}  >SpeakBoost</span> - Enhancing Verbal Communication with AI
                                </h3>
                                <div className="h-px bg-gray-200 mb-3" style={{ width: 80, ...stagger(visible, 3) }} />
                                <ul className="space-y-2 mb-7">
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 4) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        Real-time speech analysis using NLP
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 5) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        AI-powered confidence evaluation
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 6) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        Flask-based voice interaction
                                    </li>
                                    <li className="flex items-center gap-2 text-blue-500 text-sm md:text-base font-semibold" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 7) }}>
                                        Published research paper at Hinweis International Conference
                                    </li>
                                </ul>
                                <div className="flex gap-3 justify-center md:justify-start" style={stagger(visible, 8)}>
                                    <a href="https://github.com/AditiAmbasta13/Speak-boost-ipd/tree/working" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <GithubIcon /> GitHub
                                        </span>
                                    </a>
                                    <a href="https://docs.google.com/presentation/d/1GAcjfzFaKFt1HvGbERo3vkCGe8efb0e6lrNCUKykaWo/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <PptIcon /> Case Study
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })()}


                {/* ══════════════════════════════════════════
                    PROJECT 02 — Digital Memory  (image RIGHT)
                ══════════════════════════════════════════ */}
                {(() => {
                    const { ref, visible } = useVisible();
                    return (
                        <div
                            ref={ref}
                            className="md:-me-16 mb-5 flex flex-col md:flex-row-reverse items-center py-3 mt-10 md:mt-0"
                        >
                            {/* Image */}
                            <div className="w-full md:w-[46%] flex justify-center" style={stagger(visible, 0)}>
                                <img src={projFive} alt="Digital Memory" className="max-w-[90%] md:max-w-full rounded-xl" />
                            </div>

                            {/* Text */}
                            <div className="mt-6 md:mt-0 md:-me-3 w-full md:w-[45%] text-left md:text-right px-4 md:px-0">
                                <span
                                    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
                                    style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.2em', ...stagger(visible, 1) }}
                                >
                                    Project 02
                                </span>
                                <h3
                                    className="text-3xl md:text-4xl font-medium text-gray-900 mt-2 mb-3 leading-none"
                                    style={{ fontFamily: 'Regarn, serif', ...stagger(visible, 2) }}
                                >
                                    AI-powered knowledge management system - <span className='md:text-5xl text-4xl font-medium' style={{ fontFamily: 'ChiKareGo' }}>Digital Memory</span>
                                </h3>
                                <div className="h-px bg-gray-200 mb-3 md:ml-auto" style={{ width: 80, ...stagger(visible, 3) }} />
                                <ul className="space-y-2 mb-7">
                                    <li className="flex items-center md:justify-end gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 4) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 md:hidden" />
                                        AI-powered backend engine for processing knowledge
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 hidden md:block" />
                                    </li>
                                    <li className="flex items-center md:justify-end gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 5) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 md:hidden" />
                                        Ingests various content, extracts meaningful entities, relationships, summaries
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 hidden md:block" />
                                    </li>
                                    <li className="flex items-center md:justify-end gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 6) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 md:hidden" />
                                        Organizes into a semantic graph for search and visualization
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 hidden md:block" />
                                    </li>
                                </ul>
                                <div className="flex gap-3 justify-center md:justify-end" style={stagger(visible, 7)}>
                                    <a href="https://github.com/AditiAmbasta13/digital-memory-frontend" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <GithubIcon /> GitHub
                                        </span>
                                    </a>
                                    <a href="https://digital-memory-web.vercel.app/" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <GoArrowUpRight /> Live Demo
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })()}


                {/* ══════════════════════════════════════════
                    PROJECT 03 — DevOps Agent  (image LEFT)
                ══════════════════════════════════════════ */}
                {(() => {
                    const { ref, visible } = useVisible();
                    return (
                        <div
                            ref={ref}
                            className="md:-ms-12 flex flex-col md:flex-row items-center py-3 mt-10"
                        >
                            {/* Image */}
                            <div className="w-full md:w-[40%] flex justify-center" style={stagger(visible, 0)}>
                                <img src={projTwo} alt="DevOps Agent" className="max-w-[90%] md:max-w-full" />
                            </div>

                            {/* Text */}
                            <div className="mt-6 md:ms-10 md:-mt-8 w-full md:w-[45%] text-left px-4 md:px-0">
                                <span
                                    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
                                    style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.2em', ...stagger(visible, 1) }}
                                >
                                    Project 03
                                </span>
                                <h3
                                    className="text-3xl md:text-4xl font-medium text-gray-900 mt-2 mb-3 leading-none"
                                    style={{ fontFamily: 'Regarn, serif', ...stagger(visible, 2) }}
                                >
                                    <span className='md:text-5xl text-4xl font-medium' style={{ fontFamily: 'ChiKareGo' }}>Devops Agent</span> - VS Code Extension for DevOps Automation
                                </h3>
                                <div className="h-px bg-gray-200 mb-3" style={{ width: 80, ...stagger(visible, 3) }} />
                                <ul className="space-y-2 mb-7">
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 4) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        Autonomous git actions &amp; test generation
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 5) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        PR management &amp; CI/CD monitoring
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 6) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        Docker/Kubernetes deployments
                                    </li>
                                </ul>
                                <div className="flex gap-3 justify-center md:justify-start" style={stagger(visible, 7)}>
                                    <a href="https://docs.google.com/presentation/d/1mylj4cC4Go6BSS6TpfZ2T_FzZENoQ6V0jFc_pcKkGp4/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <PptIcon /> Case Study
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })()}


                {/* ══════════════════════════════════════════
                    PROJECT 04 — Travel Planner  (image RIGHT)
                ══════════════════════════════════════════ */}
                {(() => {
                    const { ref, visible } = useVisible();
                    return (
                        <div
                            ref={ref}
                            className="md:-me-16 flex flex-col md:flex-row-reverse items-center py-3 mt-10"
                        >
                            {/* Image */}
                            <div className="w-full md:w-[45%] flex justify-center px-4 md:px-0" style={stagger(visible, 0)}>
                                <img
                                    src={projFour}
                                    alt="MyPacific"
                                    className="rounded-xl object-cover w-full max-w-[90%] md:max-w-full"
                                    style={{ maxWidth: 480, aspectRatio: '16/10' }}
                                />
                            </div>

                            {/* Text */}
                            <div className="mt-6 md:mt-0 md:-me-5 w-full md:w-[45%] text-left md:text-right px-4 md:px-0">
                                <span
                                    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
                                    style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.2em', ...stagger(visible, 1) }}
                                >
                                    Project 04
                                </span>
                                <h3
                                    className="text-3xl md:text-4xl font-medium text-gray-900 mt-2 mb-3 leading-none"
                                    style={{ fontFamily: 'Regarn, serif', ...stagger(visible, 2) }}
                                >
                                    Agentic AI System - <span className='md:text-5xl text-4xl font-medium' style={{ fontFamily: 'ChiKareGo' }}>Travel Planner</span>
                                </h3>
                                <div className="h-px bg-gray-200 mb-3 md:ml-auto" style={{ width: 80, ...stagger(visible, 3) }} />
                                <ul className="space-y-2 mb-7">
                                    <li className="flex items-center md:justify-end gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 4) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 md:hidden" />
                                        Agentic Chat System for personalized travel planning
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 hidden md:block" />
                                    </li>
                                    <li className="flex items-center md:justify-end gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 5) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 md:hidden" />
                                        Integrated with APIs for real-time data
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 hidden md:block" />
                                    </li>
                                    <li className="flex items-center md:justify-end gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 6) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 md:hidden" />
                                        Multi-modal output: itinerary, maps, and images
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 hidden md:block" />
                                    </li>
                                    <li className="flex items-center md:justify-end gap-2 text-blue-500 text-sm md:text-base font-semibold" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 7) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 md:hidden" />
                                        Internship project at MyPacific
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 hidden md:block" />
                                    </li>
                                </ul>
                                <div className="flex gap-3 justify-center md:justify-end" style={stagger(visible, 7)}>
                                    <a href="https://www.canva.com/design/DAHDWzIT3R8/1Ix4Ad0k904m-WXJRhxLgw/view?utm_content=DAHDWzIT3R8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hafe354243b" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <PptIcon /> Case Study
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })()}


                {/* ══════════════════════════════════════════
                    PROJECT 05 — Ship Sentinel  (image LEFT)
                ══════════════════════════════════════════ */}
                {(() => {
                    const { ref, visible } = useVisible();
                    return (
                        <div
                            ref={ref}
                            className="md:-ms-16 flex flex-col md:flex-row items-center py-3 mt-10"
                        >
                            {/* Image */}
                            <div className="w-full md:w-[45%] flex justify-center px-4 md:px-0" style={stagger(visible, 0)}>
                                <img
                                    src={projThree}
                                    alt="Ship Sentinel"
                                    className="rounded-xl object-cover w-full max-w-[90%] md:max-w-full"
                                    style={{ maxWidth: 480, aspectRatio: '16/10' }}
                                />
                            </div>

                            {/* Text */}
                            <div className="mt-6 md:mt-0 md:-ms-5 w-full md:w-[45%] text-left px-4 md:px-0">
                                <span
                                    className="text-xs font-semibold tracking-widest text-blue-500 uppercase"
                                    style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.2em', ...stagger(visible, 1) }}
                                >
                                    Project 05
                                </span>
                                <h3
                                    className="text-3xl md:text-4xl font-medium text-gray-900 mt-2 mb-3 leading-none"
                                    style={{ fontFamily: 'Regarn, serif', ...stagger(visible, 2) }}
                                >
                                    <span className='md:text-5xl text-4xl font-medium' style={{ fontFamily: 'ChiKareGo' }}>Ship Sentinel</span> - Oil Spill & Marine Monitoring System
                                </h3>
                                <div className="h-px bg-gray-200 mb-3" style={{ width: 80, ...stagger(visible, 3) }} />
                                <ul className="space-y-2 mb-7">
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 4) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        YOLO-based object detection for anomaly tracking
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 text-sm md:text-base font-light" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 5) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        SAR data analysis for real-time oil spill detection
                                    </li>
                                    <li className="flex items-center gap-2 text-blue-500 text-sm md:text-base font-semibold" style={{ fontFamily: 'Outfit, sans-serif', ...stagger(visible, 6) }}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                        SIH (Smart India Hackathon) 2024 finalist
                                    </li>
                                </ul>
                                <div className="flex gap-3 justify-center md:justify-start" style={stagger(visible, 7)}>
                                    <a href="https://github.com/yuvrajagarwal48/OverloadOblivion_SIH_OilSpill" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <GithubIcon /> GitHub
                                        </span>
                                    </a>
                                    <a href="https://www.canva.com/design/DAGY-ROItwQ/xvRLttB0jPaQkAalRbQ5CQ/view?utm_content=DAGY-ROItwQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4b522f8073" target="_blank" rel="noopener noreferrer" className="relative inline-block group cursor-pointer">
                                        <img
                                            src={connectButton}
                                            alt="Connect"
                                            className="w-32 h-auto rounded-[17px] shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <span
                                            className="absolute inset-0 flex items-center gap-2 justify-center text-gray-700 font-semibold text-sm pointer-events-none"
                                            style={{ fontFamily: '"Outfit", serif' }}
                                        >
                                            <PptIcon /> Case Study
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })()}

            </div>
        </section>
    );
};

export default ProjectsShowcase;
