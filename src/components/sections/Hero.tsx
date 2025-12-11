'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary?: { text: string; link: string };
}

export function Hero({ title, subtitle, backgroundImage, ctaPrimary, ctaSecondary }: HeroProps) {
  const keyPhrase = '柔道界を変える';

  const titleLines = title
    .replace(/\\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  const titleWithBreaks = titleLines.map((line, index) => {
    if (line.includes(keyPhrase)) {
      const titleParts = line.split(keyPhrase);
      return (
        <span key={index}>
          {titleParts[0]}
          <span className="text-gradient">{keyPhrase}</span>
          {titleParts[1]}
          {index < titleLines.length - 1 && <br />}
        </span>
      );
    }
    return (
      <span key={index}>
        {line}
        {index < titleLines.length - 1 && <br />}
      </span>
    );
  });

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-bgDark via-primaryDark to-bgDark">
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden z-[0]">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Subtle Japanese pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] z-[0]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-
