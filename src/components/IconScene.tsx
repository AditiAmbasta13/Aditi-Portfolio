import { useRef, useEffect, useMemo, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Preload } from '@react-three/drei';
import { Vector3, TextureLoader } from 'three';
import * as THREE from 'three';

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

// Import Outfit font for Three.js Text
import outfitFont from '../assets/fonts/Outfit/static/Outfit-Regular.ttf';

// MODULE-LEVEL TEXTURE CACHE - Loaded once at module initialization, never re-suspended
const textureLoader = new TextureLoader();
const textureCache = new Map<string, THREE.Texture>();
const allIconImages = [
    figmaIcon, reactIcon, nodeIcon, colabIcon, sqlIcon, firebaseIcon,
    AIIcon, MLIcon, MongoIcon, javaIcon, powerbiIcon, CanvaIcon, javaIcon, postmanIcon, angularIcon, DLIcon
];

// Pre-load all textures with proper async callbacks
const texturesLoadedPromise = Promise.all(
    allIconImages.map(src => {
        return new Promise<void>((resolve) => {
            textureLoader.load(
                src,
                (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    textureCache.set(src, texture);
                    resolve();
                },
                undefined, // onProgress
                () => resolve() // onError - resolve anyway
            );
        });
    })
);

// DEBUG: Suspense fallback to detect when textures are re-loading
const SuspenseFallback = () => {
    useEffect(() => {
        console.error('[SuspenseFallback] SUSPENSE TRIGGERED - Textures are loading!');
        return () => {
            console.log('[SuspenseFallback] Suspense resolved - textures loaded');
        };
    }, []);
    return null;
};

interface IconData {
    image: string;
    heroX: number;
    heroY: number;
    lineX: number;
    lineY: number;
    row: number;
    col: number;
    zSpeed: number;
    name: string;
}

interface IconMeshProps {
    data: IconData;
    scrollProgress: number;
    texture: THREE.Texture;
    initialScrollProgress: number;
}

const IconMesh = ({ data, scrollProgress, texture, initialScrollProgress }: IconMeshProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const shadowRefs = useRef<(THREE.Mesh | null)[]>([]);
    const isFirstFrame = useRef(true);
    // Track if we've ever been at scroll 0 to ensure proper initialization
    const hasInitialized = useRef(initialScrollProgress < 0.01);
    const [hovered, setHovered] = useState(false);
    const wiggleOffset = useRef({ x: 0, y: 0, rotation: 0 });
    const wiggleTime = useRef(0);

    // Ensure proper color rendering - set sRGB color space
    useMemo(() => {
        texture.colorSpace = THREE.SRGBColorSpace;
    }, [texture]);

    const targetPos = useMemo(() => new Vector3(data.heroX, data.heroY, -10), [data.heroX, data.heroY]);

    // Create shadow layers first so we can reference them in useFrame
    const shadowLayers = useMemo(() => {
        const layers = [];
        const layerCount = 3;

        for (let i = 0; i < layerCount; i++) {
            const layerScale = 1 + (i + 1) * 0.08;
            const width = 1.2 * layerScale;
            const height = 1.2 * layerScale;
            const radius = 0.35 * layerScale;

            const shape = new THREE.Shape();
            const x = -width / 2;
            const y = -height / 2;

            shape.moveTo(x + radius, y);
            shape.lineTo(x + width - radius, y);
            shape.quadraticCurveTo(x + width, y, x + width, y + radius);
            shape.lineTo(x + width, y + height - radius);
            shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            shape.lineTo(x + radius, y + height);
            shape.quadraticCurveTo(x, y + height, x, y + height - radius);
            shape.lineTo(x, y + radius);
            shape.quadraticCurveTo(x, y, x + radius, y);

            layers.push({
                geometry: new THREE.ShapeGeometry(shape),
                opacity: 0.12 - (i * 0.02),
                zOffset: -0.01 * (i + 1)
            });
        }

        return layers;
    }, []);

    // DEBUG: Track initialization
    useEffect(() => {
        console.log(`[IconMesh ${data.name}] Mounted with initialScrollProgress: ${initialScrollProgress.toFixed(3)}`);
    }, [data.name, initialScrollProgress]);

    useFrame(() => {
        if (!meshRef.current) return;
        const material = meshRef.current.material as THREE.MeshBasicMaterial;

        let opacity = 1;
        let scale = 1;
        let phase = 'hero-to-line';

        // Calculate target position based on scroll progress
        if (scrollProgress < 0.30) {
            const t = scrollProgress / 0.30;
            const easeT = t * t * (3 - 2 * t);

            targetPos.x = data.heroX + (data.lineX - data.heroX) * easeT;
            targetPos.y = data.heroY + (data.lineY - data.heroY) * easeT;
            targetPos.z = -10;
            scale = 0.8 + easeT * 0.2;
            phase = 'hero-to-line';

        } else if (scrollProgress < 0.40) {
            targetPos.set(data.lineX, data.lineY, -10);
            scale = 1;
            phase = 'in-line';

        } else {
            const tunnelProgress = (scrollProgress - 0.40) / 0.60;
            const adjustedProgress = Math.min(tunnelProgress * data.zSpeed, 1);

            const outwardMultiplier = adjustedProgress * 5;
            const sideDirection = data.lineX >= 0 ? 1 : -1;
            const minOffset = sideDirection * adjustedProgress * 3;
            targetPos.x = data.lineX * (1 + outwardMultiplier) + minOffset;

            const yDirection = data.lineY >= 0 ? 1 : -1;
            targetPos.y = data.lineY * (1 + outwardMultiplier * 0.8) + (yDirection * adjustedProgress * 1);

            const zOffset = adjustedProgress * 25 - 10;
            targetPos.z = zOffset;

            scale = 1 + adjustedProgress * 2.5;
            phase = 'tunnel';

            if (adjustedProgress > 0.6) {
                opacity = Math.max(0, 1 - (adjustedProgress - 0.6) / 0.3);
            }
        }

        if (scrollProgress > 0.85) {
            opacity = 0;
            phase = 'hidden';
        }

        // DEBUG: Log only for first icon and at key scroll points
        if (data.name === 'Figma' && (
            isFirstFrame.current ||
            (scrollProgress > 0.25 && scrollProgress < 0.35) ||
            opacity < 1
        )) {
            console.log(`[Figma] scroll: ${scrollProgress.toFixed(3)}, phase: ${phase}, opacity: ${opacity.toFixed(2)}, scale: ${scale.toFixed(2)}, pos: (${targetPos.x.toFixed(1)}, ${targetPos.y.toFixed(1)}, ${targetPos.z.toFixed(1)}), isFirstFrame: ${isFirstFrame.current}, hasInit: ${hasInitialized.current}`);
        }

        // CRITICAL FIX: On first frame, if textures loaded while page was already scrolled,
        // we need to start from hero position and quickly catch up to avoid flash
        if (isFirstFrame.current) {
            console.log(`[IconMesh ${data.name}] FIRST FRAME - initialScroll: ${initialScrollProgress.toFixed(3)}, currentScroll: ${scrollProgress.toFixed(3)}`);

            // If loaded while scrolled past the hero phase, start at hero and animate fast
            if (initialScrollProgress > 0.05) {
                console.log(`[IconMesh ${data.name}] Starting from HERO position for catch-up animation`);
                // Start at hero position
                meshRef.current.position.set(data.heroX, data.heroY, -10);
                shadowRefs.current.forEach((shadowMesh, i) => {
                    if (shadowMesh) {
                        shadowMesh.position.set(data.heroX, data.heroY, -10 + shadowLayers[i].zOffset);
                        shadowMesh.scale.setScalar(0.8);
                    }
                });
                meshRef.current.scale.setScalar(0.8);
                // Mark as needing catch-up animation
                hasInitialized.current = false;
            } else {
                console.log(`[IconMesh ${data.name}] Starting at TARGET position (normal)`);
                // Normal case - set directly to target
                meshRef.current.position.copy(targetPos);
                shadowRefs.current.forEach((shadowMesh, i) => {
                    if (shadowMesh) {
                        shadowMesh.position.copy(targetPos);
                        shadowMesh.position.z += shadowLayers[i].zOffset;
                        shadowMesh.scale.setScalar(scale);
                    }
                });
                meshRef.current.scale.setScalar(scale);
                hasInitialized.current = true;
            }
            isFirstFrame.current = false;
            material.opacity = opacity;
            return;
        }

        // Use faster lerp when catching up from initial load, or normal lerp otherwise
        const lerpFactor = !hasInitialized.current ? 0.25 : (scrollProgress < 0.05 ? 0.3 : 0.2);

        // Mark as initialized once we're close enough to target
        if (!hasInitialized.current) {
            const dist = meshRef.current.position.distanceTo(targetPos);
            if (dist < 0.5) {
                console.log(`[IconMesh ${data.name}] Caught up to target, now initialized`);
                hasInitialized.current = true;
            }
        }

        // Wiggle animation when hovered
        if (hovered) {
            wiggleTime.current += 0.15;
            wiggleOffset.current.x = Math.sin(wiggleTime.current * 3) * 0.08;
            wiggleOffset.current.y = Math.cos(wiggleTime.current * 2.5) * 0.08;
            wiggleOffset.current.rotation = Math.sin(wiggleTime.current * 2) * 0.15;
        } else {
            // Smooth return to normal position
            wiggleOffset.current.x *= 0.9;
            wiggleOffset.current.y *= 0.9;
            wiggleOffset.current.rotation *= 0.9;
            wiggleTime.current = 0;
        }

        meshRef.current.position.lerp(targetPos, lerpFactor);
        meshRef.current.position.x += wiggleOffset.current.x;
        meshRef.current.position.y += wiggleOffset.current.y;
        meshRef.current.rotation.z = wiggleOffset.current.rotation;

        // Sync shadows with lerp
        shadowRefs.current.forEach((shadowMesh, i) => {
            if (shadowMesh) {
                shadowMesh.position.copy(meshRef.current!.position);
                shadowMesh.position.z += shadowLayers[i].zOffset;
                shadowMesh.scale.copy(meshRef.current!.scale);
                shadowMesh.rotation.z = meshRef.current!.rotation.z;
                const shadowMaterial = shadowMesh.material as THREE.MeshBasicMaterial;
                shadowMaterial.opacity = opacity * shadowLayers[i].opacity;
            }
        });

        meshRef.current.scale.setScalar(scale);
        material.opacity = opacity;
    });

    // Create rounded rectangle geometry with proper UVs
    const roundedGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        const width = 1.2;
        const height = 1.2;
        const radius = 0.35; // Increased border radius for softer corners
        const x = -width / 2;
        const y = -height / 2;

        shape.moveTo(x + radius, y);
        shape.lineTo(x + width - radius, y);
        shape.quadraticCurveTo(x + width, y, x + width, y + radius);
        shape.lineTo(x + width, y + height - radius);
        shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        shape.lineTo(x + radius, y + height);
        shape.quadraticCurveTo(x, y + height, x, y + height - radius);
        shape.lineTo(x, y + radius);
        shape.quadraticCurveTo(x, y, x + radius, y);

        const geometry = new THREE.ShapeGeometry(shape);

        // Fix UV mapping to center texture
        const pos = geometry.attributes.position;
        const uvs = new Float32Array(pos.count * 2);
        for (let i = 0; i < pos.count; i++) {
            // Map position to 0-1 UV range
            uvs[i * 2] = (pos.getX(i) + width / 2) / width;
            uvs[i * 2 + 1] = (pos.getY(i) + height / 2) / height;
        }
        geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

        return geometry;
    }, []);

    // Show name only during line formation stage (25-40%)
    const showName = scrollProgress > 0.25 && scrollProgress < 0.40;
    const nameOpacity = showName ? Math.min(1, (scrollProgress - 0.25) / 0.05) * Math.min(1, (0.40 - scrollProgress) / 0.05) : 0;

    return (
        <group>
            {/* Multiple shadow layers for soft blur effect */}
            {shadowLayers.map((layer, i) => (
                <mesh
                    key={i}
                    ref={(el) => { shadowRefs.current[i] = el; }}
                    position={[data.heroX, data.heroY, -10 + layer.zOffset]}
                    geometry={layer.geometry}
                >
                    <meshBasicMaterial
                        color="#9ca3af"
                        transparent
                        opacity={layer.opacity}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
            {/* Main icon */}
            <mesh
                ref={meshRef}
                position={[data.heroX, data.heroY, -10]}
                geometry={roundedGeometry}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <meshBasicMaterial
                    map={texture}
                    transparent
                    side={THREE.DoubleSide}
                />
            </mesh>
            {/* Icon name - ALWAYS rendered to preload font, opacity controls visibility */}
            <Text
                position={[data.lineX, data.lineY - 0.9, -10]}
                fontSize={0.28}
                color="#757575"
                anchorX="center"
                anchorY="top"
                fillOpacity={nameOpacity}
                font={outfitFont}
            >
                {data.name}
            </Text>
        </group>
    );
};

interface SceneProps {
    scrollProgress: number;
    initialScrollProgress: number;
}

const Scene = ({ scrollProgress, initialScrollProgress }: SceneProps) => {
    const { camera } = useThree();

    // Define all 12 icons with positions
    const iconData: IconData[] = useMemo(() => {
        const icons = [
            // Row 1 (6 icons)
            { image: figmaIcon, row: 0, col: 0, name: 'Java' },
            { image: reactIcon, row: 0, col: 1, name: 'React' },
            { image: nodeIcon, row: 0, col: 2, name: 'Node.js' },
            { image: colabIcon, row: 0, col: 3, name: 'Python' },
            { image: sqlIcon, row: 0, col: 4, name: 'SQL' },
            { image: firebaseIcon, row: 0, col: 5, name: 'C++' },
            // Row 2 (6 icons)
            { image: AIIcon, row: 1, col: 0, name: 'AI & Agents' },
            { image: angularIcon, row: 1, col: 2, name: 'Angular' },
            { image: DLIcon, row: 1, col: 1, name: 'ML + DL' },
            { image: MongoIcon, row: 1, col: 3, name: 'Mongo/Firebase' },
            { image: powerbiIcon, row: 1, col: 4, name: 'Power BI' },
            { image: javaIcon, row: 1, col: 5, name: 'Figma/Canva' },
        ];

        return icons.map((icon, index) => {
            // HERO POSITIONS - Row 1: inline with text, Row 2: off-screen below
            let heroX = 0;
            let heroY = 0;

            if (icon.row === 0) {
                // Row 1: Positioned inline with hero description text (lowered to match text)
                // Y values lowered to be at description text level (-0.5 to -2)
                const inlinePositions = [
                    { x: 8.9, y: 1 },   // Figma - after "products"
                    { x: -7, y: 2.5 },    // React - after "React interface"  
                    { x: -1.3, y: 4.4 },    // Node - after "Node.js backend"
                    { x: 5.4, y: -1.3 },     // Colab - second line start
                    { x: -4.1, y: -5 },      // SQL - after "precision"
                    { x: -5.8, y: -1.3 },      // Firebase - after "Firebase"
                ];
                heroX = inlinePositions[icon.col].x;
                heroY = inlinePositions[icon.col].y;
            } else if (icon.row === 1) {
                // Row 2: Start below screen (will slide up)
                const xSpacing = 2.5;
                heroX = (icon.col - 2.5) * xSpacing;
                heroY = -9; // Below visible area
            } else {
                // Row 3 (4 icons): Start below screen
                const xSpacing = 2.5;
                heroX = (icon.col - 1.5) * xSpacing;
                heroY = -12; // Further below visible area
            }

            // Line positions (3-row centered grid)
            // Row 1 order: React, Node, Colab, Figma, SQL, Firebase
            const xSpacing = 2.2;
            let lineCol = icon.col;
            let colCenter = 2.5; // default center for 6-column rows
            if (icon.row === 0) {
                // Reorder: Figma (0) goes to position 3, others adjust
                const lineOrder = [3, 0, 1, 2, 4, 5]; // Figma->3, React->0, Node->1, Colab->2, SQL->4, Firebase->5
                lineCol = lineOrder[icon.col];
            } else if (icon.row === 2) {
                colCenter = 1.5; // center for 4-column row
            }
            const lineX = (lineCol - colCenter) * xSpacing;
            // 3 rows shifted down by -1 to avoid overlapping the title
            const lineY = icon.row === 0 ? 1.2 : icon.row === 1 ? -1.5 : -3.5;

            // Deterministic Z-speed for staggered tunnel (0.8 to 1.4) based on index
            const zSpeed = 0.8 + ((index * 0.05) % 0.6);

            return {
                ...icon,
                heroX,
                heroY,
                lineX,
                lineY,
                zSpeed
            };
        });
    }, []);

    // Use pre-loaded textures from module-level cache (loaded outside of Suspense)
    const textureMap = useMemo(() => {
        const map = new Map<string, THREE.Texture>();
        // Get textures from the global cache
        map.set(figmaIcon, textureCache.get(figmaIcon)!);
        map.set(reactIcon, textureCache.get(reactIcon)!);
        map.set(nodeIcon, textureCache.get(nodeIcon)!);
        map.set(colabIcon, textureCache.get(colabIcon)!);
        map.set(sqlIcon, textureCache.get(sqlIcon)!);
        map.set(firebaseIcon, textureCache.get(firebaseIcon)!);
        map.set(AIIcon, textureCache.get(AIIcon)!);
        map.set(MLIcon, textureCache.get(MLIcon)!);
        map.set(MongoIcon, textureCache.get(MongoIcon)!);
        map.set(CppIcon, textureCache.get(javaIcon)!);
        map.set(powerbiIcon, textureCache.get(powerbiIcon)!);
        map.set(CanvaIcon, textureCache.get(CanvaIcon)!);
        map.set(javaIcon, textureCache.get(javaIcon)!);
        map.set(postmanIcon, textureCache.get(postmanIcon)!);
        map.set(angularIcon, textureCache.get(angularIcon)!);
        map.set(DLIcon, textureCache.get(DLIcon)!);
        return map;
    }, []);

    useEffect(() => {
        camera.position.set(0, 0, 0);
        camera.lookAt(0, 0, -1);
    }, [camera]);

    return (
        <>
            <ambientLight intensity={0.9} />
            {iconData.map((data, index) => (
                <IconMesh
                    key={index}
                    data={data}
                    scrollProgress={scrollProgress}
                    texture={textureMap.get(data.image)!}
                    initialScrollProgress={initialScrollProgress}
                />
            ))}
        </>
    );
};

interface IconSceneProps {
    scrollProgress: number;
}

const IconScene = ({ scrollProgress }: IconSceneProps) => {
    const [texturesReady, setTexturesReady] = useState(false);
    const initialScrollRef = useRef(scrollProgress);
    const renderCount = useRef(0);
    renderCount.current++;

    // DEBUG: Log every render
    console.log(`[IconScene] Render #${renderCount.current}, scrollProgress: ${scrollProgress.toFixed(3)}, texturesReady: ${texturesReady}`);

    // Wait for all textures to be loaded via THREE.TextureLoader
    useEffect(() => {
        console.log('[IconScene] useEffect - waiting for THREE.TextureLoader to finish');
        texturesLoadedPromise.then(() => {
            console.log('[IconScene] Textures loaded via TextureLoader, setting texturesReady=true');
            setTexturesReady(true);
        });
    }, []);

    // Don't render until textures are loaded
    if (!texturesReady) {
        console.log('[IconScene] Returning null - textures not loaded yet');
        return null;
    }

    return (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 15 }}>
            <Canvas
                camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 150 }}
                className="w-full h-full"
                style={{ pointerEvents: 'none' }}
                gl={{
                    alpha: true,
                    antialias: true,
                    toneMapping: THREE.NoToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
            >
                <Suspense fallback={<SuspenseFallback />}>
                    <Scene scrollProgress={scrollProgress} initialScrollProgress={initialScrollRef.current} />
                    <Preload all />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default IconScene;
