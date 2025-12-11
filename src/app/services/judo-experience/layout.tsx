import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '柔道体験｜1日で日本の柔道と文化を体験',
  description:
    '柔道初心者の方でも安心して参加できる1日体験プログラム。日本の伝統的な道場で柔道の基礎と礼法、日本文化を体験できます。',
};

export default function JudoExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

