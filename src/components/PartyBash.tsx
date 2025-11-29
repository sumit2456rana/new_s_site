"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

interface ConfettiPiece {
    id: number;
    x: number;
    y: number;
    rotate: number;
    duration: number;
    delay: number;
    color: string;
}

interface PartyBashProps {
    trigger: boolean;
}

export default function PartyBash({ trigger }: PartyBashProps) {
    const flashControls = useAnimationControls();
    const boomControls = useAnimationControls();

    const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

    // RANDOM DIRECTION
    const randomDirection = useCallback(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 250 + Math.random() * 350;

        return {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
        };
    }, []);

    // CONFETTI BURST
    const launchConfetti = useCallback(() => {
        const colors = [
            "#ff008c",
            "#00f5d4",
            "#ffdd00",
            "#ff4d4d",
            "#9b5de5",
            "#4cc9f0",
            "#f72585",
        ];

        const pieces: ConfettiPiece[] = Array.from({ length: 300 }).map(() => {
            const dir = randomDirection();
            return {
                id: Math.random(),
                x: dir.x,
                y: dir.y,
                rotate: Math.random() * 1080,
                duration: 2 + Math.random() * 1.6,
                delay: Math.random() * 0.25,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        });

        setConfetti(pieces);

        setTimeout(() => setConfetti([]), 5000);
    }, [randomDirection]);

    // FLASH
    const flash = useCallback(() => {
        flashControls.start({
            opacity: [0, 1, 0],
            transition: { duration: 0.5, ease: "easeOut" },
        });
    }, [flashControls]);

    // POP / BOOM
    const boom = useCallback(() => {
        boomControls.start({
            scale: [1, 1.3, 0.9, 1],
            rotate: [0, 6, -6, 0],
            transition: { duration: 0.7, ease: "easeOut" },
        });
    }, [boomControls]);

    // WHEN TRIGGER CHANGES → FIRE EFFECT
    useEffect(() => {
        if (!trigger) return;

        // Delay to avoid synchronous setState inside effect
        setTimeout(() => {
            launchConfetti();
            flash();
            boom();
        }, 0);

    }, [trigger, launchConfetti, flash, boom]);


    return (
        <>
            {/* FLASH */}
            <motion.div
                animate={flashControls}
                className="fixed inset-0 bg-white pointer-events-none z-60"
                style={{ opacity: 0 }}
            />

            {/* BOOM */}
            <motion.div
                animate={boomControls}
                className="fixed inset-0 pointer-events-none z-40"
            />

            {/* CONFETTI */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-80">
                {confetti.map((c) => (
                    <motion.div
                        key={c.id}
                        initial={{
                            x: 0,
                            y: 0,
                            rotate: 0,
                            opacity: 1,
                            scale: 0.8,
                        }}
                        animate={{
                            x: c.x,
                            y: c.y,
                            rotate: c.rotate,
                            opacity: 0,
                            scale: 1,
                        }}
                        transition={{
                            duration: c.duration,
                            delay: c.delay,
                            ease: "easeOut",
                        }}
                        className="absolute w-2.5 h-5"
                        style={{
                            backgroundColor: c.color,
                            borderRadius: 3,
                        }}
                    />
                ))}
            </div>
        </>
    );
}
