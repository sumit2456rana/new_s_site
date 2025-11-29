"use client"
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeartBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let scene: THREE.Scene,
            camera: THREE.PerspectiveCamera,
            renderer: THREE.WebGLRenderer
        const hearts: THREE.Mesh[] = [];

        const container = containerRef.current;

        // --- INIT THREE JS ---
        // eslint-disable-next-line prefer-const
        scene = new THREE.Scene();
        // eslint-disable-next-line prefer-const
        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;
        // eslint-disable-next-line prefer-const
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 10, 7);
        scene.add(ambientLight, directionalLight);

        // --- HEART SHAPE ---
        const heartShape = new THREE.Shape();
        heartShape.moveTo(25, 25);
        heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
        heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
        heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
        heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
        heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
        heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

        const extrudeSettings = {
            depth: 8,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 1,
            bevelThickness: 1,
        };

        const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        const colors = [0xfc94af, 0xff7892, 0xf75373, 0xec4899];

        for (let i = 0; i < 20; i++) {
            const material = new THREE.MeshPhongMaterial({
                color: colors[Math.floor(Math.random() * colors.length)],
                emissive: 0x111111,
                shininess: 100,
                specular: 0xffffff,
                transparent: true,
                opacity: 0.7,
            });

            const heart = new THREE.Mesh(geometry, material);

            const scale = Math.random() * 0.04 + 0.02;
            heart.scale.set(scale, scale, scale);
            heart.position.set(
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 60,
                (Math.random() - 0.5) * 20
            );
            heart.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            heart.userData = {
                originalY: heart.position.y,
                rotationSpeedX: (Math.random() - 0.5) * 0.01,
                rotationSpeedY: (Math.random() - 0.5) * 0.01,
                floatDistance: Math.random() * 2 + 1,
            };

            hearts.push(heart);
            scene.add(heart);
        }

        // --- LOOP ---
        const animate = () => {
            requestAnimationFrame(animate);
            const time = Date.now() * 0.0005;

            hearts.forEach((heart) => {
                heart.rotation.x += heart.userData.rotationSpeedX;
                heart.rotation.y += heart.userData.rotationSpeedY;
                heart.position.y =
                    heart.userData.originalY +
                    Math.sin(time + heart.position.x) * heart.userData.floatDistance;
            });

            renderer.render(scene, camera);
        };

        animate();

        // --- RESIZE HANDLER ---
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <>
            {/* Aurora gradient background */}
            <div
                className="fixed inset-0 opacity-60 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(at 20% 20%, hsla(333,70%,55%,.4) 0px, transparent 50%), \
             radial-gradient(at 80% 20%, hsla(282,82%,54%,.3) 0px, transparent 50%), \
             radial-gradient(at 20% 80%, hsla(210,89%,60%,.3) 0px, transparent 50%), \
             radial-gradient(at 80% 80%, hsla(35,90%,60%,.3) 0px, transparent 50%)",
                    animation: "aurora 20s infinite linear",
                }}
            />

            {/* THREE.JS floating heart canvas */}
            <div
                ref={containerRef}
                className="fixed inset-0 z-10 pointer-events-none"
            />

            {/* aurora animation keyframes */}
            <style>{`
        @keyframes aurora {
          0% { transform: rotate(0deg) scale(1.2); }
          50% { transform: rotate(180deg) scale(1.3); }
          100% { transform: rotate(360deg) scale(1.2); }
        }
      `}</style>
        </>
    );
}
