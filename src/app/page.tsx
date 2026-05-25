import Image from "next/image";
import CountdownTimer from "./components/CountdownTimer";

export default function Home() {
  const dateStart = process.env.NEXT_DATE_START ?? "";
  const dateEnd = process.env.NEXT_DATE_END ?? "";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 py-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-400/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[400px] rounded-full bg-orange-300/20 blur-[100px]" />
      </div>

      <main className="relative z-10 flex flex-col items-center gap-10 text-center max-w-2xl w-full">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-600">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          Dalam Pemeliharaan dan Pembaruan Aplikasi
        </span>

        {/* Logo / Name */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-6">
            <Image
              src="/Logo-jabar.webp"
              alt="Logo Jawa Barat"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
            <Image
              src="/disdik.png"
              alt="Logo Disdik"
              width={96}
              height={96}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900">
            SPMB 2026
          </h1>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Sistem Sedang Dalam Pemeliharaan dan Pembaruan Aplikasi
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
            Kami sedang melakukan optimalisasi dan penyempurnaan aplikasi guna
            meningkatkan stabilitas dan kualitas layanan SPMB 2026.
          </p>
        </div>

        {/* Countdown */}
        <CountdownTimer dateStart={dateStart} dateEnd={dateEnd} />

        {/* Footer */}
        <p className="text-gray-400 text-xs mt-4">
          &copy; {new Date().getFullYear()} Sekolah Maung &mdash; SPMB 2026
        </p>
      </main>
    </div>
  );
}
