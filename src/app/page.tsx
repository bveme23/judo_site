import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { WhyJRoad } from '@/components/sections/WhyJRoad';
import { Services } from '@/components/sections/Services';
import { CTA } from '@/components/sections/CTA';
import { JapaneseDivider } from '@/components/decorative/JapaneseDivider';

export default function Home() {
  return (
    <main className="pt-0 relative overflow-hidden">
      {/* Full-screen background GIF with Japanese aesthetic overlay */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/sakura.gif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
        aria-hidden="true"
      />
      
      {/* Subtle Japanese pattern overlay for elegance */}
      <div 
        className="fixed inset-0 w-full h-full z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      
      {/* Content overlay with refined Japanese aesthetic */}
      <div className="relative z-10">
        <Hero
          title="世界と日本を結び、\n柔道界を変える"
          subtitle="海外の柔道家・柔道ファンが、日本で『本物の柔道』と『日本文化』を安心して体験できる新しいスポーツツーリズム。"
          backgroundImage="https://images.unsplash.com/photo-1542818454-dc05decf9db3?auto=format&fit=crop&w=1600&q=80"
          ctaPrimary={{ text: 'サービスを見る', link: '/services/judo-tourism' }}
          ctaSecondary={{ text: 'まずは相談する', link: '/contact' }}
        />
        
        {/* Japanese-style section divider */}
        <div className="relative bg-white">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
        
        <WhyJRoad />
        
        {/* Elegant Japanese divider */}
        <div className="bg-bgLight">
          <JapaneseDivider />
        </div>
        
        <About />
        
        {/* Subtle transition divider */}
        <div className="relative bg-bgLight">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        </div>
        
        <Services />
        
        {/* Final elegant divider before CTA */}
        <div className="relative bg-primarySoft">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
        
        <CTA />
      </div>
    </main>
  );
}
