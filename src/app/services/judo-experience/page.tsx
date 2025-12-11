'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeInSection } from '@/components/common/FadeInSection';

// Timeline item component
function TimelineItem({ item, index }: { item: { time: string; activity: string }; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Time label */}
      <div className="mb-2">
        <span className="inline-flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary transition-colors duration-300 group-hover:bg-primary/20">
          {item.time}
        </span>
      </div>
      
      {/* Activity card */}
      <div className="rounded-2xl bg-card p-4 text-sm leading-relaxed shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5">
        {item.activity}
      </div>
    </motion.div>
  );
}

export default function JudoExperiencePage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const recommendedRef = useRef<HTMLElement>(null);

  const images = [
    'https://images.unsplash.com/photo-1542818454-dc05decf9db3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542818454-dc05decf9db3?auto=format&fit=crop&w=1200&q=80',
  ];

  useEffect(() => {
    // Auto-rotate images
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTagClick = (tag: string) => {
    if (tag === '1日体験') {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (tag === '初心者歓迎') {
      scrollToSection('recommended');
    } else if (tag === '道場体験') {
      scrollToSection('schedule');
    }
  };

  const scheduleItems = [
    { time: '10:00', activity: '集合・道場へ移動（指定の駅／ホテルロビーに集合、道場へ移動、到着後更衣室・荷物置き場などをご案内）' },
    { time: '10:30', activity: 'オリエンテーション・準備（道場内でのマナー・ルールのご説明、柔道の歴史や文化についての簡単な紹介、着替え・ストレッチなどの事前準備）' },
    { time: '11:00', activity: '柔道体験開始（準備運動、受け身の練習、基本の立ち方・構え方、簡単な技の体験）' },
    { time: '12:30', activity: '休憩・振り返り（柔道体験の振り返り、質疑応答、柔道の文化や精神性についての説明）' },
    { time: '13:00', activity: '礼法の実践（柔道の礼法について学び、実践する時間）' },
    { time: '13:30', activity: '整理体操・片付け・着替え（クールダウンと簡単な振り返り、道場の清掃・片付けに参加、着替え・写真撮影）' },
    { time: '14:00', activity: '解散（現地解散、もしくは最寄り駅までご案内。午後は自由行動にお使いいただけます）' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section ref={heroRef} className="mx-auto max-w-6xl px-4 pt-24 pb-12 sm:px-6 lg:px-8 lg:pt-32 lg:pb-16">
        <FadeInSection>
          <div className="rounded-3xl bg-muted p-6 shadow-xl lg:p-10">
            {/* Tag badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              {['1日体験', '初心者歓迎', '道場体験'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className="inline-flex items-center rounded-full bg-primarySoft px-3 py-1 text-xs font-medium text-primary transition-all duration-150 hover:bg-primary hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Two-column layout */}
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              {/* Left column: Title and CTA */}
              <div>
                <h1 className="font-heading text-3xl font-bold text-primary tracking-tight sm:text-4xl lg:text-4xl">
                  柔道体験
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-textMuted">
                  柔道初心者の方でも安心して参加できる1日体験プログラム。日本の伝統的な道場で柔道の基礎と礼法、日本文化を体験できます。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-red transition-all duration-200 hover:bg-accent hover:shadow-red-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    お問い合わせ
                  </Link>
                  <Link
                    href="#schedule"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-subtle bg-white px-6 py-3 text-sm font-semibold text-textMain transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    1日の流れを見る
                  </Link>
                </div>
              </div>

              {/* Right column: Image carousel */}
              <div className="order-first lg:order-last">
                <div className="group relative overflow-hidden rounded-2xl bg-muted shadow-md transition-all duration-500 hover:shadow-lg">
                  <div className="relative aspect-[4/3]">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="柔道体験"
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                          idx === activeImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    ))}
                  </div>
                  {/* Carousel dots */}
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === activeImageIndex
                            ? 'w-8 bg-white'
                            : 'w-2 bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Introduction Section */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FadeInSection>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary tracking-tight sm:text-3xl">
                柔道初心者向けの1日体験プログラム
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-textMuted">
                <p>
                  柔道体験は、柔道未経験の方や初心者の方を対象とした、1日で柔道の基礎と日本文化を体験できるプログラムです。日本の伝統的な道場で、柔道の基本動作（受け身、礼法、基本の技）を学びながら、柔道を通じて日本の「礼」や「精神性」に触れることができます。経験豊富な指導者が丁寧にサポートしますので、柔道を初めて体験する方でも安心してご参加いただけます。
                </p>
                <p>
                  稽古の後は、道場での体験を振り返りながら、柔道の歴史や文化についても学ぶ時間を設けています。
                </p>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <div className="overflow-hidden rounded-2xl bg-muted shadow-md transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1542818454-dc05decf9db3?auto=format&fit=crop&w=1200&q=80"
                  alt="柔道体験"
                  className="h-auto w-full object-cover"
        />
      </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Service Contents as Icon Cards */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FadeInSection>
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-primary tracking-tight sm:text-3xl">
              サービス内容
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-primary"></div>
          </div>
        </FadeInSection>

        <div className="grid gap-4 md:grid-cols-2">
              {[
                '日本の伝統的な道場での柔道体験環境の提供',
                '柔道初心者向けの基礎指導（受け身、礼法、基本の技）',
                '道場でのマナー・ルールの丁寧な説明（日本語／英語）',
                '柔道着のレンタル（別料金・対応可能な場合）',
                '柔道の歴史や文化についての簡単な説明',
                '稽古後の振り返りと質疑応答の時間',
          ].map((item, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <div className="group flex gap-3 rounded-2xl bg-card p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primarySoft text-sm font-semibold text-primary transition-transform duration-300 group-hover:scale-110">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-textMain">{item}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Information banner */}
        <FadeInSection delay={0.6}>
          <div className="mt-6 flex gap-3 rounded-lg border border-primary/20 bg-primarySoft px-4 py-3">
            <svg
              className="h-5 w-5 shrink-0 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-textMain">
              ※指導そのものは道場側のサービスとなり、当社は環境提供・調整を行う立場です。
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Daily Schedule as Vertical Timeline */}
      <section id="schedule" className="mx-auto max-w-5xl px-4 py-12 pb-24 sm:px-6 lg:px-8 lg:py-16 lg:pb-32">
        <FadeInSection>
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-bold text-primary tracking-tight sm:text-3xl">
              1日の流れ
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-primary"></div>
          </div>
        </FadeInSection>

        <div className="relative space-y-8">
          {scheduleItems.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Recommended For Section as Cards Grid */}
      <section id="recommended" ref={recommendedRef} className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FadeInSection>
          <div className="rounded-2xl bg-muted px-4 py-8 sm:px-8 sm:py-10">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-primary tracking-tight sm:text-3xl">
                こんな方におすすめ
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary"></div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
          '柔道を初めて体験してみたい方',
          '日本の伝統文化や武道に興味がある方',
          '日本旅行中に柔道の基礎を学びたい方',
          '柔道の礼法や精神性に触れたい方',
              ].map((item, index) => (
                <FadeInSection key={index} delay={index * 0.1}>
                  <div className="flex gap-3 rounded-2xl bg-card p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primarySoft text-primary transition-transform duration-300 hover:scale-110">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="flex-1 text-sm font-medium text-textMain">{item}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Bottom CTA Banner */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <FadeInSection>
          <div className="mt-12 rounded-2xl bg-primary px-6 py-8 text-center shadow-red sm:flex sm:items-center sm:justify-between sm:text-left sm:gap-4">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-xl font-semibold text-white">
                柔道体験について相談してみる
              </h2>
              <p className="mt-2 text-sm text-white/90">
                柔道未経験の方でも大丈夫です。まずはお気軽にお問い合わせください。
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-md transition-all duration-200 hover:bg-muted hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              >
                お問い合わせフォームへ
              </Link>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Sticky Mini CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: showStickyCTA ? 0 : 100, opacity: showStickyCTA ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-subtle bg-white px-4 py-3 shadow-lg sm:hidden ${
          showStickyCTA ? 'block' : 'hidden'
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <p className="text-sm font-medium text-textMain">柔道体験について相談する</p>
          <Link
            href="/contact"
            className="shrink-0 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-red transition-all duration-200 hover:bg-accent hover:scale-105 active:scale-95"
          >
            お問い合わせ
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
