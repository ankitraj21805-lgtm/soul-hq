import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SOUL HQ | SOUL Syndicate',
  description: 'Premium MadOut 2 clan management website'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
