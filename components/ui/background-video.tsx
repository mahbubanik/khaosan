"use client";

import React, { useEffect, useRef, useState } from 'react';

export interface BackgroundVideoProps {
    src: string;
    style?: React.CSSProperties;
    className?: string;
    poster?: string;
    /**
     * Provide only when the footage conveys meaning. Omit for purely
     * decorative ambiance - the video is then hidden from assistive tech.
     */
    label?: string;
    /** If true, preloads aggressively. Use for hero videos. */
    priority?: boolean;
}

/**
 * Decorative, muted, looping background video that respects the user's
 * motion preferences. When `prefers-reduced-motion: reduce` is set, the
 * video does not autoplay and is held on its first frame (WCAG 2.2.2 / 2.3.3).
 */
export default function BackgroundVideo({ src, style, className, poster, label, priority = false }: BackgroundVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)');
        const update = () => setReducedMotion(query.matches);
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (reducedMotion) {
            video.pause();
            return;
        }

        // ponytail: only play when visible to save CPU/bandwidth
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        }, { rootMargin: '200px' });

        observer.observe(video);
        return () => observer.disconnect();
    }, [reducedMotion]);

    return (
        <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload={priority ? "auto" : "none"}
            poster={poster}
            aria-hidden={label ? undefined : true}
            aria-label={label}
            className={className}
            style={style}
        >
            <source src={src} type="video/mp4" />
        </video>
    );
}
