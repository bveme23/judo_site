'use client';

import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaPrimary: { text: string; link: string };
  ctaSecondary?: { text: string; link: string };
}

export function Hero({ title, subtitle, backgroundImage, ctaPrimary, ctaSecondary }: HeroProps) {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/herojudo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Red Accent Border at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="inline-block">
            {/* J-Road Logo */}
            <div className="mb-4 mx-auto">
              <img src="/logo.png?v=2" alt="J-Road Logo" className="h-32 sm:h-40 w-auto mx-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>
        
        <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl">
          {title.split('\\n').map((line, idx) => (
            <span key={idx}>
              {line.includes('柔道界を変える') ? (
                <>
                  {line.split('柔道界を変える')[0]}
                  <span className="text-primary">柔道界を変える</span>
                  {line.split('柔道界を変える')[1]}
                </>
              ) : (
                line
              )}
              {idx < title.split('\\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ctaPrimary.link}
            className="px-8 py-3 bg-primary text-white hover:bg-red-700 transition-colors"
          >
            {ctaPrimary.text}
          </Link>
          {ctaSecondary && (
            <Link
              href={ctaSecondary.link}
              className="px-8 py-3 bg-white text-black hover:bg-gray-100 transition-colors"
            >
              {ctaSecondary.text}
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 60"
          className="w-full h-12"
          preserveAspectRatio="none"
        >
          <path d="M0 60 L0 0 L1200 0 L1200 60 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
