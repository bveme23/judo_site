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
  // \nを改行として処理し、空行を除外
  const titleLines = title
    .replace(/\\n/g, '\n') // エスケープされた\nを実際の改行に変換
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
      {/* Animated background orbs - more subtle for Japanese aesthetic */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      {/* Subtle Japanese pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      {/* Judo banner overlay with transparency to retain red base */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: 'url(/judo_banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
      
      {/* Background image overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      )}
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mb-8 px-5 py-2 rounded-full bg-primary/25 text-white text-sm font-semibold tracking-widest border border-primary/40 backdrop-blur-sm shadow-lg">
                J-Road
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-8 leading-[1.2] font-serif"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {titleWithBreaks}
            </motion.h1>
            
            {/* Elegant Japanese-style underline accent */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 h-1 w-24 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              style={{ letterSpacing: '0.02em' }}
            >
              {subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <Link
                href={ctaPrimary.link}
                className="btn-primary text-center shadow-red-lg hover:shadow-red-lg/80 transition-all duration-300"
              >
                {ctaPrimary.text}
              </Link>
              {ctaSecondary && (
                <Link
                  href={ctaSecondary.link}
                  className="btn-secondary text-center backdrop-blur-md transition-all duration-300"
                >
                  {ctaSecondary.text}
                </Link>
              )}
            </motion.div>
          </div>
          
          {/* Right: Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            <img
              src="/logo.png?v=2"
              alt="J-Road Logo"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-sm font-medium">スクロール</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
