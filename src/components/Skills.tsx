import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Frontend icons
import { SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiNextdotjs } from 'react-icons/si';
// Backend icons
import { FaNodeJs, FaPython } from 'react-icons/fa';
import { SiExpress, SiGraphql } from 'react-icons/si';
// Database icons
import { SiMongodb, SiPostgresql, SiMysql, SiRedis } from 'react-icons/si';
// DevOps icons
import { FaGitAlt, FaDocker, FaAws, FaLinux } from 'react-icons/fa';
import { SiGithubactions } from 'react-icons/si';
// ML icons
import { SiTensorflow, SiPytorch, SiScikitlearn, SiPandas, SiNumpy } from 'react-icons/si';
// Design icons
import { SiFigma, SiCanva, SiAdobexd, SiSketch } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
    name: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    color: string;
}

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const skills: Skill[] = [
        // Frontend
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'HTML/CSS', icon: SiHtml5, color: '#E34F26' },
        { name: 'Next.js', icon: SiNextdotjs, color: '#ffffffff' },

        // Backend
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'Express', icon: SiExpress, color: '#ffffffff' },
        { name: 'Python', icon: FaPython, color: '#3776AB' },

        // Database
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'MySQL', icon: SiMysql, color: '#4479A1' },

        // DevOps
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },

        // ML
        { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
        { name: 'PyTorch', icon: SiPytorch, color: '#EE4C2C' },
        { name: 'scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
        { name: 'Pandas', icon: SiPandas, color: '#150458' },
        { name: 'NumPy', icon: SiNumpy, color: '#013243' },

        // Design
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
        { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
    ];

    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;

        const cards = grid.querySelectorAll('.skill-card');

        // Staggered animation on scroll
        gsap.fromTo(
            cards,
            {
                opacity: 0,
                y: 30,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.03,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="bg-black text-white py-20 px-6">
            <div className="container mx-auto max-w-7xl">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl scale-y-110 font-medium font-eb-garamond mb-4">My Skills</h2>
                    <p className="text-lg text-gray-600 font-outfit">
                        Technologies I work with
                    </p>
                </div>

                {/* Grid Layout */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4"
                >
                    {skills.map((skill, index) => {
                        const IconComponent = skill.icon;
                        return (
                            <div
                                key={index}
                                className="skill-card flex flex-col items-center justify-center p-4 group cursor-default"
                            >
                                <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                                    <IconComponent
                                        className="text-5xl"
                                        style={{ color: skill.color }}
                                    />
                                </div>
                                <span className="text-xs text-center font-medium font-outfit text-gray-700 group-hover:text-black transition-colors duration-300">
                                    {skill.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Skills;
