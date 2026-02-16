import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Athar - Essence of Luxury",
  description: "Exclusive perfumes and luxury scents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav style={{
          padding: '20px',
          borderBottom: '1px solid #222',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{
            fontSize: 'clamp(1.3rem, 4vw, 1.5rem)',
            fontFamily: 'Playfair Display',
            color: '#D4AF37'
          }}>
            ATHAR
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: '#fff', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Home</a>
            <a href="/#products" style={{ color: '#fff', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Collection</a>
            <a href="/admin" style={{ color: '#666', fontSize: 'clamp(0.75rem, 1.8vw, 0.8rem)' }}>Admin</a>
          </div>
        </nav>
        {children}
        <footer style={{
          padding: '50px 20px',
          background: '#050505',
          borderTop: '1px solid #222',
          textAlign: 'center',
          color: '#666',
          marginTop: '100px'
        }}>
          <p>&copy; {new Date().getFullYear()} ATHAR. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
