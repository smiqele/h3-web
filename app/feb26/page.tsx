// import Image from 'next/image';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardStack from '../components/CardStack';
import Scope from '../components/Scope';

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* header */}
      <Header />

      {/* content */}
      <main className="flex flex-col items-center">
        <section className="h-[92vh] w-full flex items-center justify-center">
          <Hero />
        </section>

        <CardStack />

        <section className="h-[100vh] w-full flex items-center justify-center">
          <Scope />
        </section>

        <Footer />
      </main>
    </div>
  );
}
