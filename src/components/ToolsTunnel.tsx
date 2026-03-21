import { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ToolIconData {
    image: string;
    row: number;
    col: number;
}

interface ToolLogoProps {
    imagePath: string;
    position: [number, number, number];
    scrollProgress: number;
    zSpeed: number;
}

const ToolLogo = ({ imagePath, position, scrollProgress, zSpeed }: ToolLogoProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, imagePath);

    useFrame(() => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshBasicMaterial;

            // Only Z-axis movement with individual speed
            const zPos = scrollProgress * 60 * zSpeed - 10; // Each icon moves at different pace
            meshRef.current.position.z = zPos;

            // HIDDEN initially, fade in when tunnel starts
            if (scrollProgress < 0.15) {
                material.opacity = 0; // Hidden - no duplicate visible
            } else if (scrollProgress > 0.7) {
                material.opacity = Math.max(0, 1 - (scrollProgress - 0.7) / 0.3);
            } else {
                // Fade in from 0.15 to 0.25
                const fadeIn = Math.min(1, (scrollProgress - 0.15) / 0.1);
                material.opacity = fadeIn;
            }
        }
    });

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <planeGeometry args={[2.2, 2.2]} />
                <meshBasicMaterial
                    map={texture}
                    transparent
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

interface SceneProps {
    icons: ToolIconData[];
    scrollProgress: number;
}

const Scene = ({ icons, scrollProgress }: SceneProps) => {
    const { camera } = useThree();

    // Generate icon data with random Z-speeds for staggered effect
    const iconData = useMemo(() => {
        return icons.map((icon) => {
            // Match 2D row spacing - 6 icons with gap-[30px]
            // At z=-10, with FOV 75, we need to calculate screen-relative positions
            const xSpacing = 2.8;  // Adjusted to match gap-[30px] at scale
            const xPos = (icon.col - 2.5) * xSpacing;  // Center 6 icons (-2.5 to +2.5)

            // Match vertical positions of 2D rows (row 0 above, row 1 below)
            // Row 0 = first row (clones), Row 1 = second row
            const yPos = icon.row === 0 ? 1.5 : -0.5;  // Adjusted for 2-row layout

            // Random Z-speed for staggered effect (0.7 to 1.3)
            const zSpeed = 0.7 + Math.random() * 0.6;

            return {
                ...icon,
                position: [xPos, yPos, -10] as [number, number, number],
                zSpeed
            };
        });
    }, [icons]);

    // Keep camera at origin
    useEffect(() => {
        camera.position.set(0, 0, 0);
        camera.lookAt(0, 0, -1);
    }, [camera]);

    return (
        <>
            <ambientLight intensity={0.9} />
            <pointLight position={[10, 10, 10]} intensity={1} />

            {iconData.map((icon, index) => (
                <ToolLogo
                    key={index}
                    imagePath={icon.image}
                    position={icon.position}
                    scrollProgress={scrollProgress}
                    zSpeed={icon.zSpeed}
                />
            ))}
        </>
    );
};

interface ToolsTunnelProps {
    icons: ToolIconData[];
}

const ToolsTunnel = ({ icons }: ToolsTunnelProps) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Listen to global scroll - parent handles positioning
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            // Progress based on scroll past hero (after 1 viewport)
            const progress = Math.min(Math.max((scrollY - windowHeight) / (windowHeight * 2), 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Canvas
            camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 100 }}
            className="w-full h-full"
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
        >
            <Scene icons={icons} scrollProgress={scrollProgress} />
        </Canvas>
    );
};

export default ToolsTunnel;
