'use client';

import {useEffect, useRef} from "react";

export const WarpBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const GRID_SPACING = 32.0;
        const DOT_RADIUS = 1.0;
        const MOUSE_RADIUS = 120.0;
        const STRENGTH = 0.3;

        // Opacity Config
        const BASE_OPACITY = 0.4;
        const HOVER_OPACITY = 1.0;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Resize Handler
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        // Animation Loop
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgb(255, 0, 0)';

            // Loop through grid
            for (let x = 0; x < canvas.width + GRID_SPACING; x += GRID_SPACING) {
                for (let y = 0; y < canvas.height + GRID_SPACING; y += GRID_SPACING) {
                    const dx = mouseX - x;
                    const dy = mouseY - y;

                    // Using squared distance avoids the slow Math.sqrt() for the initial check
                    const distSq = dx * dx + dy * dy;
                    const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

                    // OPTIMIZATION: If the dot is far away, draw it cheaply and move on
                    if (distSq > radiusSq) {
                        ctx.globalAlpha = BASE_OPACITY;
                        ctx.beginPath();
                        ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
                        ctx.fill();
                        continue; // Skip the physics math below!
                    }

                    // --- HEAVY MATH ZONE (Only for dots near mouse) ---

                    // Now we can afford to use Math.sqrt since we know we are close
                    const distance = Math.sqrt(distSq);

                    const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    const moveDistance = force * MOUSE_RADIUS * STRENGTH;

                    const renderX = x - Math.cos(angle) * moveDistance;
                    const renderY = y - Math.sin(angle) * moveDistance;

                    ctx.globalAlpha = BASE_OPACITY + (HOVER_OPACITY - BASE_OPACITY) * force;
                    ctx.beginPath();
                    ctx.arc(renderX, renderY, DOT_RADIUS, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        // Initialize
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        resizeCanvas();
        render();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            style={{backgroundColor: 'var(--background)'}}
        />
    );
}