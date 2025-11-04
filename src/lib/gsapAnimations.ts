import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section: Cinematic title reveal with staggered text
 * Frame-by-frame animation for professional "top agency" feel
 */
export const heroTitleAnimation = (element: HTMLElement) => {
  const timeline = gsap.timeline();

  // Split text into characters for frame-by-frame effect
  const characters = element.querySelectorAll('.char');

  timeline
    // Fade in background
    .from(element, {
      opacity: 0,
      duration: 0.5
    }, 0)
    // Staggered character reveal (frame-by-frame)
    .from(characters, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.05, // 50ms between each character
      ease: 'power2.out'
    }, 0.2)
    // Scale up heading slightly for emphasis
    .to(element, {
      scale: 1.02,
      duration: 0.4,
      ease: 'back.out'
    }, 0.5);

  return timeline;
};

/**
 * Card hover animation: Sophisticated 3D flip effect
 */
export const cardHoverAnimation = (card: HTMLElement) => {
  const timeline = gsap.timeline({ paused: true });

  timeline
    // Lift card up
    .to(card, {
      y: -8,
      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
      duration: 0.3,
      ease: 'power2.out'
    }, 0)
    // Subtle scale
    .to(card, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    }, 0)
    // Border glow
    .to(card, {
      borderColor: 'rgba(99, 102, 241, 0.5)',
      duration: 0.3
    }, 0);

  card.addEventListener('mouseenter', () => timeline.play());
  card.addEventListener('mouseleave', () => timeline.reverse());

  return timeline;
};

/**
 * Dashboard metric counter: Animated number reveal
 * Perfect for real-time data displays
 */
export const countUpAnimation = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2
) => {
  const startValue = parseInt(element.textContent || '0', 10);

  return gsap.to(
    { value: startValue },
    {
      value: endValue,
      duration,
      ease: 'power2.out',
      onUpdate: function () {
        element.textContent = Math.floor(this.targets()[0].value).toLocaleString();
      }
    }
  );
};

/**
 * Scroll-triggered section reveal: Entrance animation on scroll
 */
export const scrollRevealAnimation = (
  element: HTMLElement,
  direction: 'up' | 'down' | 'left' | 'right' = 'up'
) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 }
  };

  gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 0, // No scrub = standard scroll trigger
      markers: false
    },
    opacity: 0,
    ...directions[direction],
    duration: 0.8,
    ease: 'power3.out'
  });
};

/**
 * Parallax effect: Multi-layer depth effect
 */
export const parallaxAnimation = (element: HTMLElement, depth: number = 50) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: 1, // Scrub = smooth scroll sync
      markers: false
    },
    y: depth,
    ease: 'none'
  });
};

/**
 * Animated gradient background (for hero section)
 */
export const animatedGradientBg = (element: HTMLElement) => {
  const timeline = gsap.timeline({ repeat: -1 });

  timeline.to(element, {
    backgroundPosition: '100% center',
    duration: 6,
    ease: 'sine.inOut'
  });

  return timeline;
};

/**
 * Button ripple effect on click
 */
export const rippleEffect = (button: HTMLElement, event: MouseEvent) => {
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.className = 'ripple';

  button.appendChild(ripple);

  gsap.to(ripple, {
    scale: 4,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    onComplete: () => ripple.remove()
  });
};

/**
 * Loading skeleton shimmer animation
 */
export const shimmerAnimation = (skeleton: HTMLElement) => {
  gsap.to(skeleton, {
    backgroundPosition: '1000px 0',
    duration: 2,
    repeat: -1,
    ease: 'linear'
  });
};

/**
 * Complex dashboard animation: Pin and reveal on scroll
 */
export const dashboardScrollSequence = (container: HTMLElement) => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false
    }
  });

  // Animate each chart element in sequence
  const charts = container.querySelectorAll('[data-chart]');
  charts.forEach((chart, index) => {
    timeline.from(
      chart,
      {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out'
      },
      index * 0.2
    );
  });

  return timeline;
};
