'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        setApiStatus(response.ok ? 'online' : 'offline');
      } catch {
        setApiStatus('offline');
      }
    };
    checkAPI();

    // GSAP animations
    if (heroRef.current) {
      gsap.from(heroRef.current.querySelector('h1'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });

      gsap.from(heroRef.current.querySelector('.subtitle'), {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });
    }
  }, []);

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1a1f35]">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />

      {/* Hero Section - TIGHTER SPACING */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="container max-w-6xl text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-success animate-pulse' : 'bg-warning'}`} />
            <span className="text-sm text-gray-300">
              Backend {apiStatus === 'online' ? 'Online' : 'Starting'}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Business Intelligence
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-400 to-accent/80 bg-clip-text text-transparent">
              That Actually Works
            </span>
          </h1>

          {/* Subtitle */}
          <p className="subtitle text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            English queries. Live dashboards. Smart AI alerts. Real-time user tracking.
            <br />
            <span className="text-accent font-semibold">90% cheaper</span> than Power BI + Datadog + Mixpanel combined.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-accent rounded-xl font-semibold text-white shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$65B</div>
              <div>Market Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100K+</div>
              <div>Target Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div>Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - TIGHT SPACING */}
      <section className="relative py-16 px-4">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Four Features. One Platform.
            </h2>
            <p className="text-lg text-gray-400">
              No competitor does all four together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '✨', title: 'English Queries', desc: 'No SQL required' },
              { icon: '📊', title: 'Live Dashboards', desc: 'Real-time updates' },
              { icon: '🔔', title: 'Smart AI Alerts', desc: 'Actual intelligence' },
              { icon: '👥', title: 'User Tracking', desc: 'Live heatmaps' }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-accent/50 hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - TIGHT SPACING */}
      <section className="relative py-16 px-4">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-400">
              90% cheaper than competitors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Free', price: '$0', popular: false },
              { name: 'Pro', price: '$499', period: '/mo', popular: true },
              { name: 'Enterprise', price: '$1,499', period: '/mo', popular: false }
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border ${
                  plan.popular
                    ? 'bg-gradient-to-br from-accent/20 to-accent/5 border-accent scale-105'
                    : 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10'
                } hover:scale-105 transition-all duration-300`}
              >
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-2">{plan.period}</span>}
                </div>
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-white/5 text-white hover:bg-white/10'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - TIGHT SPACING */}
      <section className="relative py-16 px-4">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ready to Transform Your Analytics?
          </h2>
          <button className="px-12 py-5 bg-accent rounded-xl font-bold text-lg text-white shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-105">
            Start Free Trial
          </button>
        </div>
      </section>
    </main>
  );
}
