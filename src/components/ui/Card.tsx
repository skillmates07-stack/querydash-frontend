import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'glass';
  hover?: boolean;
}

export function Card({ children, className = '', variant = 'default', hover = false }: CardProps) {
  const baseStyles = 'rounded-2xl border transition-all duration-300';

  const variants = {
    default: 'bg-neutral-900 border-neutral-800',
    gradient: 'bg-gradient-to-br from-neutral-900 to-neutral-800 border-neutral-700',
    glass: 'bg-white/5 backdrop-blur-xl border-white/10'
  };

  const hoverStyles = hover ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
