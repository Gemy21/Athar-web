"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

function PerfumeBottle(props: any) {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
        color: "#D4AF37",
        metalness: 1,
        roughness: 0.1,
        envMapIntensity: 1,
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
        color: "#050505",
        metalness: 0.8,
        roughness: 0.2,
        envMapIntensity: 1,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: "#D4AF37",
        metalness: 0.1,
        roughness: 0,
        transmission: 0.6, // Glass-like
        thickness: 2,
        envMapIntensity: 1,
        opacity: 0.8,
        transparent: true,
    });

    return (
        <group ref={groupRef} {...props} dispose={null}>
            {/* Bottle Body - Glassy Gold */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
                <boxGeometry args={[2, 3, 0.8]} />
                <primitive object={glassMaterial} />
            </mesh>

            {/* Inner Liquid - Solid Gold */}
            <mesh position={[0, -0.1, 0]} scale={[0.9, 0.9, 0.8]}>
                <boxGeometry args={[2, 2.8, 0.7]} />
                <meshStandardMaterial color="#D4AF37" metalness={0.5} roughness={0.2} transparent opacity={0.8} />
            </mesh>

            {/* Bottle Neck - Gold Ring */}
            <mesh position={[0, 1.6, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                <primitive object={goldMaterial} />
            </mesh>

            {/* Cap - Black Luxury */}
            <mesh position={[0, 2.2, 0]}>
                <boxGeometry args={[1.2, 1, 0.8]} />
                <primitive object={blackMaterial} />
            </mesh>

            {/* Fancy Label Area */}
            <mesh position={[0, 0, 0.41]}>
                <planeGeometry args={[1.5, 2]} />
                <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.42]}>
                <planeGeometry args={[1.3, 1.8]} />
                <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
            </mesh>

            {/* Brand Name Text on Label */}
            <Text
                position={[0, 0.2, 0.43]}
                fontSize={0.25}
                color="#000000"
                anchorX="center"
                anchorY="middle"
            >
                ATHAR
            </Text>
            <Text
                position={[0, -0.6, 0.43]}
                fontSize={0.06}
                color="#000000"
                anchorX="center"
                anchorY="middle"
                letterSpacing={0.5}
            >
                EAU DE PARFUM
            </Text>
        </group>
    );
}

export default function HeroCanvas() {
    return (
        <div style={{
            width: '100%',
            height: '80vh',
            minHeight: '600px',
            position: 'relative',
            background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 70%)'
        }}>
            <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} shadows style={{ pointerEvents: 'none' }}>
                <color attach="background" args={['#000000']} />

                {/* Studio Lighting */}
                <ambientLight intensity={0.4} />

                {/* Main Light */}
                <spotLight
                    position={[4, 6, 4]}
                    angle={0.3}
                    penumbra={1}
                    intensity={2.5}
                    castShadow
                    color="#ffffff"
                    shadow-mapSize={2048}
                />

                {/* Fill Light */}
                <spotLight
                    position={[-4, 4, -2]}
                    angle={0.4}
                    penumbra={1}
                    intensity={1.2}
                    color="#D4AF37"
                />

                {/* Rim Light */}
                <pointLight position={[0, -2, -3]} intensity={1.5} color="#D4AF37" />

                {/* Back Light */}
                <pointLight position={[0, 3, -4]} intensity={1} color="#ffffff" />

                <Environment preset="city" />

                <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.35}>
                    <PerfumeBottle position={[0, -0.4, 0]} scale={0.9} />
                </Float>

                <ContactShadows
                    position={[0, -2.8, 0]}
                    opacity={0.6}
                    scale={8}
                    blur={2.5}
                    far={4}
                    color="#000000"
                />
            </Canvas>

            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 10,
                pointerEvents: 'none',
                width: '90%',
                maxWidth: '800px'
            }}>
                <h1 style={{
                    fontSize: 'clamp(3rem, 10vw, 7rem)',
                    textShadow: '0 10px 40px rgba(0,0,0,0.9)',
                    letterSpacing: '0.2em',
                    background: 'linear-gradient(to bottom, #F4C430, #D4AF37, #AA8C2C)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0',
                    fontWeight: 700
                }}>
                    ATHAR
                </h1>

                <div style={{
                    height: '2px',
                    background: 'linear-gradient(to right, transparent, #D4AF37, transparent)',
                    margin: '2rem auto',
                    width: '60%',
                    maxWidth: '300px'
                }} />

                <p style={{
                    fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                    color: '#fff',
                    marginTop: '1rem',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    fontWeight: 300,
                    textShadow: '0 5px 20px rgba(0,0,0,0.8)'
                }}>
                    The Essence of Luxury
                </p>
            </div>
        </div>
    );
}
