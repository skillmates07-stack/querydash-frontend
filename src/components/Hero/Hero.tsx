'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroTitleAnimation, animatedGradientBg } from '@/lib/gsapAnimations';
import styles from './Hero.module.css';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gradientBgRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize hero animations on mount
    if (titleRef.current) {
      heroTitleAnimation(titleRef.current);
    }

    if (gradientBgRef.current) {
      animatedGradientBg(gradientBgRef.current);
    }

    // CTA button entrance
    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out'
      });
    }
  }, []);

  // Function to split text into characters for animation
  const renderCharacters = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char">
        {char}
      </span>
    ));
  };

  return (
    <section className={styles.hero}>
      {/* Animated gradient background */}
      <div
        ref={gradientBgRef}
        className={styles.gradientBg}
      />

      {/* Decorative elements */}
      <div className={styles.decorativeBlob1} />
      <div className={styles.decorativeBlob2} />

      <div className="container-safe py-20 md:py-32 lg:py-48 relative z-10">
        {/* Main headline with character-by-character animation */}
        <h1
          ref={titleRef}
          className="text-hero leading-tight mb-6 text-center md:text-left"
        >
          {renderCharacters('QueryDash')}
          <br />
          <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
            {renderCharacters('Real-Time BI')}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-body text-neutral mb-8 max-w-2xl mx-auto md:mx-0">
          English queries. Live dashboards. Smart alerts. Real-time user tracking.
          <br className="hidden md:block" />
          90% cheaper than Power BI + Datadog + Mixpanel combined.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary">
            Start Free Trial
          </button>
          <button className="btn-secondary">
            Watch Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 text-sm text-neutral">
          <div>
            <div className="font-semibold text-white">10,000+</div>
            <div>Active teams</div>
          </div>
          <div>
            <div className="font-semibold text-white">$500M</div>
            <div>Data processed daily</div>
          </div>
          <div>
            <div className="font-semibold text-white">99.9%</div>
            <div>Uptime SLA</div>
          </div>
        </div>
      </div>
    </section>
  );
}
