'use client';

import {useEffect, useRef, useState} from "react";
import {useLayoutProvider} from "@/components/layout-context";
import {AnimatePresence, motion} from "framer-motion";

export const WarpBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {setIntroDone} = useLayoutProvider();
    const [showIntroText, setShowIntroText] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", {alpha: false});
        if (!ctx) return;

        const GRID_SPACING = 32.0;
        const DOT_RADIUS = 1.0;
        const MOUSE_RADIUS = 132.0;
        const STRENGTH = 0.3;
        const BASE_OPACITY = 0.05;
        const HOVER_OPACITY = 1.0;

        const TEXT_VISIBLE_DURATION = 2500;
        const TEXT_EXIT_DURATION = 1000;
        const WAVE_DURATION = 2000;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;
        let startTime = performance.now();
        let phase = 0;
        let textExitTriggered = false;
        let contentEnterTriggered = false;

        // Pre-calculate grid positions for performance
        let gridPoints: Array<{ x: number, y: number }> = [];
        let maxDiagonal = 0;

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';

            ctx.scale(dpr, dpr);

            // Recalculate grid
            gridPoints = [];
            for (let x = 0; x < rect.width + GRID_SPACING; x += GRID_SPACING) {
                for (let y = 0; y < rect.height + GRID_SPACING; y += GRID_SPACING) {
                    gridPoints.push({x, y});
                }
            }
            maxDiagonal = rect.width + rect.height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();

            // Clear with background color
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(0, 0, rect.width, rect.height);

            const elapsed = time - startTime;

            // Phase 0 -> 1: Trigger text exit
            if (elapsed > TEXT_VISIBLE_DURATION && !textExitTriggered) {
                setShowIntroText(false);
                phase = 1;
                textExitTriggered = true;
            }

            // Phase 1 -> 2: Trigger content reveal and dot wave
            if (elapsed > (TEXT_VISIBLE_DURATION + TEXT_EXIT_DURATION) && !contentEnterTriggered) {
                setIntroDone(true); // Signal to layout provider
                phase = 2;
                contentEnterTriggered = true;
            }

            // Phase 2 -> 3: Wave complete, fully interactive
            if (phase === 2 && elapsed > (TEXT_VISIBLE_DURATION + TEXT_EXIT_DURATION + WAVE_DURATION)) {
                phase = 3;
            }

            // Batch rendering
            ctx.fillStyle = 'rgb(255, 0, 0)';

            for (let i = 0; i < gridPoints.length; i++) {
                const {x, y} = gridPoints[i];
                let renderX = x;
                let renderY = y;
                let currentOpacity = BASE_OPACITY;

                // Phase 0 & 1: Dots hidden (name showing/exiting)
                if (phase === 0 || phase === 1) {
                    continue;
                }

                // Phase 2: Wave animation
                else if (phase === 2) {
                    const waveElapsed = elapsed - (TEXT_VISIBLE_DURATION + TEXT_EXIT_DURATION);
                    const normalizedProgress = waveElapsed / WAVE_DURATION;

                    // Diagonal wave trigger
                    const diagonalPos = (x + y) / maxDiagonal;
                    const waveStart = normalizedProgress * 1.5 - 0.3;
                    const localProgress = Math.max(0, Math.min(1, (waveStart - diagonalPos) * 4));

                    if (localProgress < 1) {
                        // Ripple effect with multiple sine waves
                        const ripplePhase = localProgress * Math.PI;
                        const amplitude = Math.sin(ripplePhase) * (1 - localProgress);

                        // Primary wave motion (vertical drop)
                        renderY -= amplitude * rect.height * 0.8;

                        // Horizontal ripple (flag-like flutter)
                        const horizontalWave = Math.sin(ripplePhase * 3 + y * 0.05) * amplitude * 25;
                        renderX += horizontalWave;

                        // Secondary vertical ripple (water disturbance)
                        const verticalRipple = Math.sin(ripplePhase * 2 + x * 0.03) * amplitude * 15;
                        renderY += verticalRipple;

                        // Fade in opacity as dots settle
                        currentOpacity = BASE_OPACITY * localProgress;
                    }
                }

                // Phase 3: Interactive physics
                if (phase === 3) {
                    const dx = mouseX - x;
                    const dy = mouseY - y;
                    const distSq = dx * dx + dy * dy;
                    const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

                    if (distSq < radiusSq) {
                        const distance = Math.sqrt(distSq);
                        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                        const angle = Math.atan2(dy, dx);
                        const moveDistance = force * MOUSE_RADIUS * STRENGTH;

                        renderX -= Math.cos(angle) * moveDistance;
                        renderY -= Math.sin(angle) * moveDistance;
                        currentOpacity = BASE_OPACITY + (HOVER_OPACITY - BASE_OPACITY) * force;
                    }
                }

                if (currentOpacity > 0.01) {
                    ctx.globalAlpha = currentOpacity;
                    ctx.beginPath();
                    ctx.arc(renderX, renderY, DOT_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();
        requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [setIntroDone]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
                style={{backgroundColor: 'var(--background)'}}
            />

            <div className="fixed h-screen w-screen z-50 flex items-center justify-center pointer-events-none">
                <AnimatePresence>
                    {showIntroText && (
                        <motion.h1
                            initial={{opacity: 0, y: 30}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 30}}
                            transition={{duration: 2.5, ease: [0.22, 1, 0.36, 1]}}
                            className="text-4xl md:text-6xl font-light text-foreground flex items-baseline gap-[2px]"
                        >
                            David Michael II
                            <span className="h-2 w-2 bg-accent block"/>
                        </motion.h1>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}