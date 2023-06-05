"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    useGLTF,
    useTexture,
    PerspectiveCamera,
    Decal,
    Stats,
    OrbitControls,
} from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

type GLTFResult = GLTF & {
    nodes: {
        Busto: THREE.Mesh;
    };
    materials: {
        ["default"]: THREE.MeshStandardMaterial;
    };
};

function Head() {
    const { nodes } = useGLTF("/models/head.gltf") as GLTFResult;
    const texture = useTexture("/texture_100x100.png");
    const ref = useRef<any>();
    useFrame((state, delta) =>
        ref && ref.current ? (ref.current.rotation.z += delta) : null
    );
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
            <gridHelper />
            <axesHelper />
            <Stats />
            <OrbitControls />
            <Head></Head>
        </Canvas>
    );
}
