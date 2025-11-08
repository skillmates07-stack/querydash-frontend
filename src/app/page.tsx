'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  // Check backend status
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
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Hero title animation (frame-by-frame)
    if (heroRef.current) {
      const title = heroRef.current.querySelector('h1');
      const subtitle = heroRef.current.querySelector('.subtitle');
      const cta = heroRef.current.querySelector('.cta-buttons');

      gsap.from(title, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(subtitle, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      });

      gsap.from(cta, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
      });
    }

    // Metrics cards stagger animation
    if (metricsRef.current) {
      gsap.from(metricsRef.current.querySelectorAll('.metric-card'), {
        scrollTrigger: {
          trigger: metricsRef.current,
          start: 'top 80%'
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, []);

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#1a1f35]">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-success animate-pulse' : 'bg-warning'}`} />
            <span className="text-sm text-gray-300">
              Backend {apiStatus === 'online' ? 'Online' : 'Starting'}
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Business Intelligence
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-400 to-accent/80 bg-clip-text text-transparent">
              That Actually Works
            </span>
          </h1>

          {/* Subtitle */}
          <p className="subtitle text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            English queries. Live dashboards. Smart AI alerts. Real-time user tracking.
            <br />
            <span className="text-accent font-semibold">90% cheaper</span> than Power BI + Datadog + Mixpanel combined.
          </p>

          {/* CTA Buttons */}
          <div className="cta-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-accent rounded-xl font-semibold text-white shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 hover:scale-105">
              Start Free Trial
              <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Why Existing Tools Fail
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Teams waste millions using outdated analytics tools that don't work together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔒',
                title: 'SQL Gatekeeping',
                problem: 'Only technical people can access data',
                cost: 'Lost opportunities'
              },
              {
                icon: '⏰',
                title: 'Static Dashboards',
                problem: 'Refresh hourly, not real-time',
                cost: '$100K+ lost per incident'
              },
              {
                icon: '🔔',
                title: 'Alert Fatigue',
                problem: '100 alerts/day, teams ignore 99%',
                cost: 'Critical issues missed'
              },
              {
                icon: '💸',
                title: 'Expensive',
                problem: 'Power BI $120/person + Datadog $500+',
                cost: '$3K+/month for 20 people'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-danger/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 mb-2">{item.problem}</p>
                <p className="text-danger text-sm font-semibold">{item.cost}</p>
                <div className="absolute inset-0 rounded-2xl bg-danger/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section ref={metricsRef} className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Four Features. One Platform.
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No competitor does all four together
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                icon: '✨',
                title: 'English Queries',
                description: 'Ask questions in plain English. No SQL required. 30% faster than writing queries.',
                example: '"Show me top 10 customers by revenue"',
                color: 'from-blue-500/20 to-cyan-500/20',
                borderColor: 'border-blue-500/30'
              },
              {
                icon: '📊',
                title: 'Live Dashboards',
                description: 'Real-time metrics updating every 5 seconds. Catch problems immediately, not 1 hour later.',
                example: 'Revenue: $8.2K/hour → $4.1K/hour (live)',
                color: 'from-purple-500/20 to-pink-500/20',
                borderColor: 'border-purple-500/30'
              },
              {
                icon: '🔔',
                title: 'Smart AI Alerts',
                description: 'AI explains why metrics changed and suggests fixes. Not noise. Actual intelligence.',
                example: '"Revenue dropped due to checkout abandonment spike"',
                color: 'from-orange-500/20 to-red-500/20',
                borderColor: 'border-orange-500/30'
              },
              {
                icon: '👥',
                title: 'User Tracking',
                description: 'See who\'s on your site right now. Geographic heatmaps. User journey visualization.',
                example: '1,234 users online: 42% US, 28% EU, 15% Asia',
                color: 'from-green-500/20 to-emerald-500/20',
                borderColor: 'border-green-500/30'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`metric-card group relative p-8 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.borderColor} hover:scale-105 transition-all duration-300`}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                <div className="px-4 py-3 rounded-lg bg-black/30 border border-white/10">
                  <code className="text-sm text-gray-400">{feature.example}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400">
              90% cheaper than competitors combined
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Free',
                price: '$0',
                description: 'For individuals and small projects',
                features: [
                  '1 dashboard',
                  '100 queries/month',
                  'Email alerts only',
                  'Community support'
                ],
                cta: 'Start Free',
                popular: false
              },
              {
                name: 'Pro',
                price: '$499',
                period: '/month',
                description: 'For growing teams and businesses',
                features: [
                  'Unlimited dashboards',
                  'Unlimited queries',
                  'Real-time user tracking',
                  '50 alert rules',
                  'Slack + Email + Webhooks',
                  'All connectors'
                ],
                cta: 'Start Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$1,499',
                period: '/month',
                description: 'For large organizations',
                features: [
                  'Everything in Pro',
                  'Custom connectors',
                  'White-label option',
                  'API access',
                  'SSO/SAML',
                  '24/7 dedicated support'
                ],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border ${
                  plan.popular
                    ? 'bg-gradient-to-br from-accent/20 to-accent/5 border-accent scale-105'
                    : 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10'
                } hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400 ml-2">{plan.period}</span>}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300">
                      <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-accent text-white hover:bg-accent/90 shadow-xl shadow-accent/20'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ready to Transform Your Analytics?
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join 10,000+ teams already using QueryDash
          </p>
          <button className="group relative px-12 py-5 bg-accent rounded-xl font-bold text-lg text-white shadow-2xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-105">
            Start Free Trial
            <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </main>
  );
}
