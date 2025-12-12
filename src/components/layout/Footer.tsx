import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="mx-auto max-w-7xl flex flex-col gap-12 px-4 py-12 text-sm sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png?v=2"
              alt="J-Road Logo"
              className="h-8 w-auto"
            />
          </div>
          <p className="text-gray-400 leading-relaxed mb-4">
            柔道を通じて世界と日本をつなぐスポーツツーリズムプログラムを提供します。
          </p>
          <p className="text-gray-400">
            お問い合わせ:{' '}
            <a
              href={`mailto:${siteConfig.socials.email}`}
              className="text-primary hover:text-red-400 transition-colors"
            >
              {siteConfig.socials.email}
            </a>
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-end sm:gap-8" aria-label="フッターナビ">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-gray-400 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} J-Road. All rights reserved.
      </div>
      {/* Red accent line at bottom */}
      <div className="h-1 bg-primary"></div>
    </footer>
  );
}
