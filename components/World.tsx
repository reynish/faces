"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Grid,
    Center,
    AccumulativeShadows,
    RandomizedLight,
    Environment,
    useGLTF,
    useTexture,
    PerspectiveCamera,
    Decal,
    CameraControls,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Head() {
    // const gltf = useLoader(GLTFLoader, "/models/head.gltf");
    const { nodes } = useGLTF("/models/head.gltf");
    const texture = useTexture("/texture_100x100.png");
    // const head = useGLTF("/models/head.gltf");
    const ref = useRef();
    useFrame((state, delta) => (ref.current.rotation.z += delta));
    return (
        <group>
            {/* <Center top> */}
            <mesh
                ref={ref}
                castShadow
                receiveShadow
                geometry={nodes.Busto.geometry}
                position={[0, -0.1, 0]}
                rotation={[1.5, 0, 0]}
                scale={1}
            >
                <meshPhysicalMaterial color={"white"} roughness={0.5} />
                <Decal mesh={ref}>
                    <meshPhysicalMaterial
                        map={texture}
                        polygonOffset={true}
                        polygonOffsetFactor={-10}
                    />
                </Decal>
            </mesh>
            {/* </Center> */}
        </group>
    );
}

export default function World() {
    return (
        <Canvas>
            <PerspectiveCamera position={[0, 0, 0.5]} makeDefault />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Head></Head>
        </Canvas>
    );
}
