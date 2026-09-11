import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F7F5EF]">
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          {/* Subtle background pattern - dots, not distracting */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(#0F2557 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Watermark logo - subtle, behind content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/images/logo.png"
              alt=""
              width={500}
              height={500}
              className="opacity-[0.08] w-[400px] h-[400px] md:w-[500px] md:h-[500px] object-contain"
            />
          </div>

          <div className="relative max-w-5xl mx-auto text-center animate-fade-up">
            <span className="inline-block bg-[#1E7A4C] text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              PEF Registered — Free Education for All
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-[#0F2557] leading-tight mb-6">
              Madina Model
              <br />
              Higher Secondary School
            </h1>

            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10">
              Since 1993, nurturing confident, capable students in Faqirwali —
              through quality education, open to every child.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/admissions"
                className="bg-[#0F2557] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#16326e] transition-colors"
              >
                Admissions Open
              </a>
              <a
                href="/about"
                className="border-2 border-[#0F2557] text-[#0F2557] px-6 py-3 rounded-lg font-semibold hover:bg-[#0F2557] hover:text-white transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Stats strip - simple, no icons, real information */}
        <section className="border-t border-b border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {[
              ['1993', 'Established'],
              ['800+', 'Students'],
              ['2', 'Campuses'],
              ['Free', 'Education'],
            ].map(([value, label]) => (
              <div key={label} className="text-center py-8 px-4">
                <div className="text-3xl font-bold text-[#0F2557]">{value}</div>
                <div className="text-sm text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
