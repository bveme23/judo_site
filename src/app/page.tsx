import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { WhyJRoad } from '@/components/sections/WhyJRoad';
import { Services } from '@/components/sections/Services';
import { CTA } from '@/components/sections/CTA';
import { JapaneseDivider } from '@/components/decorative/JapaneseDivider';

export default function Home() {
  return (
    <main className="relative">
      <Hero
        title="世界と日本を結び、\n柔道界を変える"
        subtitle="海外の柔道家・柔道ファンが、日本で『本物の柔道』と『日本文化』を安心して体験できる新しいスポーツツーリズム。"
        backgroundImage="https://images.unsplash.com/photo-1542818454-dc05decf9db3?auto=format&fit=crop&w=1600&q=80"
        ctaPrimary={{ text: 'サービスを見る', link: '/services/judo-tourism' }}
        ctaSecondary={{ text: 'まずは相談する', link: '/contact' }}
      />
      
      {/* Clean section divider */}
      <div className="border-t border-border"></div>
      
      <WhyJRoad />
      
      {/* Clean divider */}
      <div className="bg-bgLight">
        <div className="border-t border-border"></div>
      </div>
      
      <About />
      
      {/* Clean transition divider */}
      <div className="border-t border-border"></div>
      
      <Services />
      
      {/* Clean divider before CTA */}
      <div className="border-t border-border"></div>
      
      <CTA />
    </main>
  );
}
