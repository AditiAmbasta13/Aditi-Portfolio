import { useState, useRef, useEffect } from 'react';

interface WorkExperience {
    id: number;
    position: string;
    company: string;
    companyDetail?: string;
    period: string;
    description: string;
    link?: string;
}

const workData: WorkExperience[] = [
    {
        id: 1,
        position: 'Full-Stack Developer Intern',
        company: 'MyPacific.ai',
        period: 'Feb 2025 - Jul 2025',
        description: 'Building MVP for an AI-driven trip planning platform with seamless UI and AI model integrations.',
    },
    {
        id: 2,
        position: 'Frontend Developer Intern',
        company: 'Go Chanakya',
        companyDetail: 'Financial Advising Startup',
        period: 'Jun 2024 - Aug 2024',
        description: 'Developed financial planner web app, improving user engagement with responsive UI components.',
    },
    {
        id: 3,
        position: 'AI/ML Research Intern',
        company: 'Simppl',
        companyDetail: 'Mozilla Firefox',
        period: 'Apr 2024 - Feb 2025',
        description: 'Developed AI-powered speech analysis system for real-time confidence evaluation and feedback.',
    },
    {
        id: 4,
        position: 'UI/UX Mentor',
        company: 'DJS Infomatrix',
        companyDetail: 'AI & DS Club',
        period: 'Jun 2024 - Apr 2025',
        description: 'Mentoring students on UI/UX design principles and front-end web development best practices.',
    },
];

const Work = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [headerVisible, setHeaderVisible] = useState(false);

    // Configuration – use larger card heights on mobile where text wraps more
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const scrollPerItem = 300;
    const totalScrollDistance = workData.length * scrollPerItem;
    const expandedHeight = isMobile ? 260 : 200;
    const collapsedHeight = isMobile ? 120 : 80;

    // Track scroll position within the tall container
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const containerTop = containerRect.top;

            setHeaderVisible(containerTop < window.innerHeight * 0.7);

            // Start internal scroll when section is 20% into the viewport from below
            const earlyTrigger = window.innerHeight * 0.6;
            const adjustedTop = containerTop - earlyTrigger;

            if (adjustedTop <= 0 && adjustedTop >= -totalScrollDistance) {
                const progress = Math.abs(adjustedTop) / totalScrollDistance;
                setScrollProgress(Math.min(1, Math.max(0, progress)));
            } else if (adjustedTop > 0) {
                setScrollProgress(0);
            } else {
                setScrollProgress(1);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [totalScrollDistance]);

    const internalScroll = scrollProgress * totalScrollDistance;

    const getItemStyles = (index: number) => {
        const itemScrollStart = index * scrollPerItem;
        const scrollPastItem = internalScroll - itemScrollStart;

        let collapseProgress = 0;
        if (scrollPastItem > 0) {
            collapseProgress = Math.min(1, scrollPastItem / scrollPerItem);
        }

        let appearProgress = 1;
        if (index > 0) {
            const prevItemScroll = internalScroll - (index - 1) * scrollPerItem;
            if (prevItemScroll <= 0) {
                appearProgress = 0;
            } else {
                appearProgress = Math.min(1, prevItemScroll / (scrollPerItem * 0.4));
            }
        }

        const currentHeight = expandedHeight - (collapseProgress * (expandedHeight - collapsedHeight));

        return { currentHeight, collapseProgress, appearProgress };
    };

    return (
        <div
            id="section-work"
            ref={containerRef}
            style={{ height: `${totalScrollDistance + window.innerHeight}px` }}
        >
            <section className="sticky top-0 min-h-screen bg-black py-20">
                {/* Header */}
                <div
                    className="px-8 md:px-16 mb-12"
                    style={{
                        opacity: headerVisible ? 1 : 0,
                        transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                >
                    <div className="text-right">
                        <h2
                            className="text-3xl md:text-4xl font-light text-white"
                            style={{ fontFamily: 'Regarn, serif' }}
                        >
                            <span className='italic'>My</span>{' '} <span className="text-blue-600 text-4xl md:text-5xl ms-2" style={{ fontFamily: 'ChiKareGo' }}>Experiences</span>
                        </h2>
                        <p className="text-gray-400 text-md font-outfit mt-2">
                            Professional journey so far
                        </p>
                    </div>
                </div>

                {/* Vertical divider line - desktop only */}
                <div className="relative hidden md:block">
                    <div className="absolute top-0 left-1/2 w-px bg-gray-700" style={{ height: '100%' }} />
                </div>

                {/* Work Items Table */}
                <div className="border-t border-gray-700">
                    {workData.map((item, index) => {
                        const { currentHeight, collapseProgress, appearProgress } = getItemStyles(index);

                        return (
                            <div
                                key={item.id}
                                className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-700 overflow-hidden group will-change-[height,opacity,transform]"
                                style={{
                                    height: `${currentHeight}px`,
                                    opacity: appearProgress,
                                    transform: `translateY(${(1 - appearProgress) * 25}px)`,
                                }}
                            >
                                {/* Column 1: Position & Company */}
                                <div
                                    className={`relative flex ps-6 md:ps-36 py-4 h-full ${collapseProgress > 0.5 ? 'flex-row items-center gap-4' : 'flex-col justify-start pt-6'
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <h3
                                            className="text-base md:text-2xl font-medium text-white group-hover:text-blue-600 transition-colors duration-300"
                                            style={{ fontFamily: 'Regarn, serif' }}
                                        >
                                            {item.position}
                                        </h3>
                                        <p className="text-gray-300 text-sm font-outfit mt-1">
                                            {item.company}
                                            {item.companyDetail && (
                                                <span className="text-gray-500"> • {item.companyDetail}</span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Column 2: Period & Description */}
                                <div className="flex flex-col justify-center ps-6 md:ps-0 pe-6 md:pe-64 py-2 md:py-4 overflow-hidden">
                                    {/* Period badge */}
                                    <span
                                        className="inline-block w-fit px-3 py-1 text-xs font-outfit font-medium text-blue-600 bg-gray-900 rounded-full mb-2"

                                    >
                                        {item.period}
                                    </span>
                                    <p
                                        className={`text-gray-300 text-sm md:text-base font-outfit leading-relaxed ${collapseProgress > 0.5 ? 'line-clamp-1' : ''
                                            }`}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Scroll indicator */}
                {scrollProgress < 0.05 && scrollProgress > 0 && (
                    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-outfit animate-bounce z-50">
                        Scroll to explore experiences
                    </div>
                )}
            </section>
        </div>
    );
};

export default Work;
