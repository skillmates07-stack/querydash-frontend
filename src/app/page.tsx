'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const router = useRouter();
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

    if (heroRef.current) {
      gsap.from(heroRef.current.querySelector('h1'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, []);

  return (
    <main className="relative overflow-hidden" style={{ background: '#0d0d0d' }}>
      {/* Animated background - subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a2a2a08_1px,transparent_1px),linear-gradient(to_bottom,#2a2a2a08_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#5b47fb15,transparent_50%)]" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="container max-w-6xl text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ 
            background: apiStatus === 'online' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            borderColor: apiStatus === 'online' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'
          }}>
            <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'} animate-pulse`} />
            <span className="text-sm" style={{ color: '#a8a8a8' }}>
              Backend {apiStatus === 'online' ? 'Online' : 'Starting'}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span style={{ color: '#ffffff' }}>
              Business Intelligence
            </span>
            <br />
            <span className="text-gradient" style={{
              background: 'linear-gradient(135deg, #5b47fb 0%, #7c66ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              That Actually Works
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl mb-8" style={{ color: '#a8a8a8', maxWidth: '48rem', margin: '0 auto 2rem' }}>
            English queries. Live dashboards. Smart AI alerts. Real-time user tracking.
            <br />
            <span style={{ color: '#5b47fb', fontWeight: 600 }}>90% cheaper</span> than Power BI + Datadog + Mixpanel combined.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => router.push('/dashboard')}
              className="group relative px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #5b47fb 0%, #7c66ff 100%)',
                boxShadow: '0 4px 20px rgba(91, 71, 251, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(91, 71, 251, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(91, 71, 251, 0.3)';
              }}
            >
              Start Free Trial
            </button>
            <button
              onClick={() => window.open('https://youtube.com/demo', '_blank')}
              className="px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:bg-[#242424]"
              style={{
                background: 'rgba(26, 26, 26, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #2a2a2a'
              }}
            >
              Watch Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm" style={{ color: '#666666' }}>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#ffffff' }}>$65B</div>
              <div>Market Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#ffffff' }}>100K+</div>
              <div>Target Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#ffffff' }}>99.9%</div>
              <div>Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#ffffff' }}>
              Four Features. One Platform.
            </h2>
            <p className="text-lg" style={{ color: '#a8a8a8' }}>
              No competitor does all four together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'English Queries', desc: 'No SQL required', gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' },
              { title: 'Live Dashboards', desc: 'Real-time updates', gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%)' },
              { title: 'Smart AI Alerts', desc: 'Actual intelligence', gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)' },
              { title: 'User Tracking', desc: 'Live heatmaps', gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)' }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: feature.gradient,
                  border: '1px solid #2a2a2a'
                }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>{feature.title}</h3>
                <p style={{ color: '#a8a8a8' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
