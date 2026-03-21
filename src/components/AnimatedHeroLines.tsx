import { useEffect, useRef, useState } from 'react';

const AnimatedHeroLines = () => {
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

            // Set the stroke dash properties for the pulse - 0.03 = 3% of path length
            pulseRef.current.style.strokeDasharray = `${pathLength * 0.03} ${pathLength * 0.97}`;
            pulseRef.current.style.strokeDashoffset = `${pathLength}`;

            // Animate the pulse
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
    }, [isMobile]);

    // Desktop path data from herolines.svg
    const desktopPathData = "M 428.122816 598.124309 L 685.004621 598.124309 C 688.318822 598.124309 691.00249 595.435429 691.00249 592.121229 L 691.00249 248.502211 C 691.00249 245.18801 693.69137 242.504341 697.00557 242.504341 L 956.023889 242.504341 C 959.338089 242.504341 962.021758 245.18801 962.021758 248.502211 L 962.021758 429.636817 C 962.021758 432.951017 959.338089 435.639897 956.023889 435.639897 L 550.67528 435.639897 C 547.36108 435.639897 544.6722 432.951017 544.6722 429.636817 L 544.6722 6.497831 C 544.6722 3.188841 541.988532 0.499961 538.674331 0.499961 L 352.302663 0.499961 C 348.988462 0.499961 346.299583 3.188841 346.299583 6.497831 L 346.299583 361.930202 C 346.299583 365.239191 343.615914 367.928071 340.301714 367.928071 L 6.500233 367.928071 C 3.186032 367.928071 0.502364 365.239191 0.502364 361.930202 L 0.502364 174.537176 C 0.502364 171.222976 3.186032 168.534096 6.500233 168.534096 L 274.820198 168.534096 C 278.134399 168.534096 280.818068 171.222976 280.818068 174.537176 L 280.818068 549.125209 C 280.818068 552.43941 278.134399 555.123078 274.820198 555.123078 L 105.128964 555.123078 C 101.819974 555.123078 99.131095 552.43941 99.131095 549.125209 L 99.131095 418.375831 C 99.131095 415.06163 101.819974 412.377961 105.128964 412.377961 L 416.121867 412.377961 C 419.436067 412.377961 422.124947 415.06163 422.124947 418.375831 L 422.124947 592.121229 C 422.124947 595.435429 424.808615 598.124309 428.122816 598.124309 Z M 428.122816 598.124309";

    // Mobile path data — taller, portrait-oriented
    const mobilePathData = "M 141.017807 1401.217811 L 8.50217 1401.217811 C 5.184462 1401.217811 2.50217 1398.530311 2.50217 1395.217811 L 2.50217 1233.795922 C 2.50217 1230.483422 5.184462 1227.795921 8.50217 1227.795921 L 359.856368 1227.795921 C 363.168868 1227.795921 365.856368 1225.108421 365.856368 1221.795921 L 365.856368 218.05625 C 365.856368 214.74375 363.168868 212.05625 359.856368 212.05625 L 8.50217 212.05625 C 5.184462 212.05625 2.50217 214.74375 2.50217 218.05625 L 2.50217 530.910444 C 2.50217 534.222944 5.184462 536.910445 8.50217 536.910445 L 520.887632 536.910445 C 524.200132 536.910445 526.887632 534.222944 526.887632 530.910444 L 526.887632 8.49894 C 526.887632 5.18644 529.575132 2.49894 532.887633 2.49894 L 897.632456 2.49894 C 900.950165 2.49894 903.632456 5.18644 903.632456 8.49894 L 903.632456 883.217766 C 903.632456 886.530267 900.950165 889.217767 897.632456 889.217767 L 475.080336 889.217767 C 471.767836 889.217767 469.080335 891.905267 469.080335 895.217767 L 469.080335 1126.827163 C 469.080335 1130.144871 471.767836 1132.827163 475.080336 1132.827163 L 743.856401 1132.827163 C 747.168901 1132.827163 749.856401 1130.144871 749.856401 1126.827163 L 749.856401 742.441712 C 749.856401 739.129212 747.168901 736.441712 743.856401 736.441712 L 153.017808 736.441712 C 149.700099 736.441712 147.017807 739.129212 147.017807 742.441712 L 147.017807 1395.217811 C 147.017807 1398.530311 144.330307 1401.217811 141.017807 1401.217811 Z M 141.017807 1401.217811";

    const pathData = isMobile ? mobilePathData : desktopPathData;

    if (isMobile) {
        // Mobile: taller SVG with portrait viewBox
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 910 1410"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
            >
                <defs>
                    <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="40%" stopColor="#2563EB" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                        <stop offset="60%" stopColor="#2563EB" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
                <g>
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
                        strokeWidth="2"
                        strokeOpacity="1"
                        strokeMiterlimit="4"
                    />
                </g>
            </svg>
        );
    }

    // Desktop: original landscape SVG
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1123"
            viewBox="0 0 842.25 595.499986"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
        >
            <defs>
                <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="40%" stopColor="#2563EB" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#2563EB" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 58, 58)">
                <g>
                    {/* Base gray path */}
                    <path
                        ref={pathRef}
                        strokeLinecap="butt"
                        transform="matrix(0.749615, 0, 0, 0.749615, 2.064827, 1.88694)"
                        fill="none"
                        strokeLinejoin="miter"
                        d={pathData}
                        stroke="#d0d0d0"
                        strokeWidth="1"
                        strokeOpacity="1"
                        strokeMiterlimit="4"
                    />
                    {/* Animated blue pulse */}
                    <path
                        ref={pulseRef}
                        strokeLinecap="round"
                        transform="matrix(0.749615, 0, 0, 0.749615, 2.064827, 1.88694)"
                        fill="none"
                        strokeLinejoin="round"
                        d={pathData}
                        stroke="#2563EB"
                        strokeWidth="2"
                        strokeOpacity="1"
                        strokeMiterlimit="4"
                    />
                </g>
            </g>
        </svg>
    );
};

export default AnimatedHeroLines;
