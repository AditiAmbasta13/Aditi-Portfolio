import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
    activeSection?: string;
}

const Navbar = ({ activeSection = 'home' }: NavbarProps) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDarkBg, setIsDarkBg] = useState(false);

    const location = useLocation();
    const isAboutPage = location.pathname === '/about';

    const navItems = [
        { id: 'home', label: 'HOME', href: '/', isRoute: true },
        { id: 'about', label: 'ABOUT', href: '/about', isRoute: true },
        { id: 'resume', label: 'RESUME', href: 'https://drive.google.com/file/d/1Q1eXtrcNPqF22gotLDQSzMoNxE2nmzNS/view?usp=sharing', isRoute: false },
        { id: 'contact', label: 'CONTACT', href: '#contact', isRoute: false },
    ];

    const primaryItem = isAboutPage
        ? navItems.find(item => item.id === 'about')!
        : navItems.find(item => item.id === 'home')!;
    const dropdownItems = navItems.filter(item => item.id !== primaryItem.id);

    useEffect(() => {
        const handleScroll = () => {
            const heroHeight = window.innerHeight;
            const shouldCollapse = window.scrollY > heroHeight * 0.8;
            setIsCollapsed(shouldCollapse);
            if (!shouldCollapse) setIsDropdownOpen(false);

            // Check if we are over a dark section
            const workSection = document.getElementById('section-work');
            const eduSection = document.getElementById('section-education');
            
            let isDark = false;
            const navOffset = 50; // Approximating the visual center of the navbar

            if (workSection) {
                const rect = workSection.getBoundingClientRect();
                if (rect.top <= navOffset && rect.bottom >= navOffset) isDark = true;
            }
            if (eduSection) {
                const rect = eduSection.getBoundingClientRect();
                if (rect.top <= navOffset && rect.bottom >= navOffset) isDark = true;
            }
            
            setIsDarkBg(isDark);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const handleNavClick = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    };

    const NavItem = ({ item, isInDropdown = false, isMobile = false }: {
        item: typeof navItems[0];
        isInDropdown?: boolean;
        isMobile?: boolean;
    }) => {
        const isActive = activeSection === item.id || (item.isRoute && location.pathname === item.href);
        const isHovered = hoveredItem === item.id;

        if (isMobile) {
            const inner = (
                <span
                    className={`text-2xl font-medium tracking-widest transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-900'
                        }`}
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                    {item.label}
                </span>
            );

            return item.isRoute ? (
                <Link to={item.href} onClick={handleNavClick} className="block py-3 border-b border-gray-100">
                    {inner}
                </Link>
            ) : (
                <a href={item.href} onClick={handleNavClick} className="block py-3 border-b border-gray-100">
                    {inner}
                </a>
            );
        }

        const inner = (
            <>
                <span
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 ${isActive ? 'text-blue-600' : isHovered ? 'text-blue-600' : (isDarkBg && isInDropdown ? 'text-white' : 'text-gray-900')
                        }`}
                >
                    {item.label}
                </span>
                <span
                    className={`absolute right-0 h-[1px] rounded-r-full transition-colors duration-200 ${isHovered || isActive ? 'bg-blue-600' : (isDarkBg && isInDropdown ? 'bg-white' : 'bg-gray-900')
                        }`}
                    style={{ bottom: '-6px', left: '-64px' }}
                />
            </>
        );

        return item.isRoute ? (
            <Link
                to={item.href}
                className="relative group block cursor-pointer"
                onClick={isInDropdown ? handleNavClick : undefined}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                {inner}
            </Link>
        ) : (
            <a
                href={item.href}
                className="relative group block cursor-pointer"
                onClick={isInDropdown ? handleNavClick : undefined}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
            >
                {inner}
            </a>
        );
    };

    return (
        <>
            {/* ─── MOBILE NAVBAR ─── */}
            <div className="md:hidden">
                {/* Hamburger button */}
                <button
                    onClick={() => setIsMobileMenuOpen(prev => !prev)}
                    className="fixed top-6 left-6 z-[60] w-10 h-10 flex flex-col justify-center items-center gap-[5px] group"
                    aria-label="Toggle menu"
                >
                    {/* Top bar */}
                    <span
                        className={`block h-[1.5px] bg-gray-900 transition-all duration-300 origin-center ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-[6.5px]' : 'w-6'
                            }`}
                    />
                    {/* Middle bar */}
                    <span
                        className={`block h-[1.5px] bg-gray-900 transition-all duration-300 ${isMobileMenuOpen ? 'w-0 opacity-0' : 'w-4 group-hover:w-6'
                            }`}
                    />
                    {/* Bottom bar */}
                    <span
                        className={`block h-[1.5px] bg-gray-900 transition-all duration-300 origin-center ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[6.5px]' : 'w-6'
                            }`}
                    />
                </button>

                {/* Fullscreen overlay menu */}
                <div
                    className={`fixed inset-0 z-50 bg-[#fafafa] flex flex-col justify-center px-10 transition-all duration-500 ${isMobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                        }`}
                >
                    {/* Animated nav items */}
                    <nav className="flex flex-col">
                        {navItems.map((item, i) => (
                            <div
                                key={item.id}
                                className="transition-all duration-500"
                                style={{
                                    transitionDelay: isMobileMenuOpen ? `${i * 60 + 100}ms` : '0ms',
                                    opacity: isMobileMenuOpen ? 1 : 0,
                                    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(12px)',
                                }}
                            >
                                <NavItem item={item} isMobile={true} />
                            </div>
                        ))}
                    </nav>

                    {/* Subtle footer inside menu */}
                    <p
                        className="absolute bottom-10 left-10 text-xs text-gray-400 tracking-widest uppercase"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                        Portfolio
                    </p>
                </div>
            </div>

            {/* ─── DESKTOP NAVBAR (unchanged) ─── */}
            <nav
                className="hidden md:flex fixed top-8 left-0 z-50 flex-col gap-4 pl-16 cursor-pointer"
                style={{ fontFamily: '"Outfit", sans-serif' }}
            >
                {!isCollapsed && navItems.map((item) => (
                    <NavItem key={item.id} item={item} />
                ))}

                {isCollapsed && (
                    <>
                        <div className="relative">
                            <Link
                                to={primaryItem.href}
                                className="relative group block cursor-pointer"
                                onMouseEnter={() => setHoveredItem(primaryItem.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <span
                                    className={`text-sm font-medium tracking-wide transition-colors duration-200 ${activeSection === primaryItem.id || location.pathname === primaryItem.href
                                        ? 'text-blue-600'
                                        : hoveredItem === primaryItem.id
                                            ? 'text-blue-600'
                                            : 'text-gray-900'
                                        }`}
                                >
                                    {primaryItem.label}
                                </span>
                                <span
                                    className={`absolute right-0 h-[1px] rounded-r-full transition-colors duration-200 ${hoveredItem === primaryItem.id || activeSection === primaryItem.id || location.pathname === primaryItem.href
                                        ? 'bg-blue-600'
                                        : 'bg-gray-900'
                                        }`}
                                    style={{ bottom: '-6px', left: '-64px' }}
                                />
                            </Link>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="absolute top-0 -right-5 p-1 cursor-pointer"
                            >
                                <svg
                                    className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} text-blue-600`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        <div
                            className={`flex flex-col gap-4 transition-all duration-300 overflow-hidden ${isDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            {dropdownItems.map((item) => (
                                <NavItem key={item.id} item={item} isInDropdown={true} />
                            ))}
                        </div>
                    </>
                )}
            </nav>
        </>
    );
};

export default Navbar;