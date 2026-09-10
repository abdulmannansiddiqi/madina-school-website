import Image from 'next/image';

export default function PageBackground({ children }) {
  return (
    <div className="relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0F2557 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/images/logo.png"
          alt=""
          width={400}
          height={400}
          className="object-contain"
          style={{ opacity: 0.06, width: '350px', height: 'auto' }}
        />
      </div>

      {/* Actual page content sits on top */}
      <div className="relative">{children}</div>
    </div>
  );
}