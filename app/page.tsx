// import Image from 'next/image';
import FloatingItems from './components/FloatingItems';
import Hero from './components/Hero';
import CursorTrail from './components/ver/CursorTrail';
import Header from './components/Header';
import Footer from './components/Footer';
import H3DButton from './components/ver/H3DButton';

export default function Page() {
  return (
    <div className="min-h-screen font-sans bg-white dark:bg-black">
      <CursorTrail />
      {/* header */}
      <Header />

      {/* content */}
      <main className="flex flex-col items-center">
        <section className="w-full h-screen flex items-center justify-center">
          <Hero />
        </section>

        <Footer />
      </main>
    </div>
  );
}
