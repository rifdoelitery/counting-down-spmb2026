"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Props = {
  dateStart: string;
  dateEnd: string;
};

export default function pnpm({ dateStart, dateEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(dateEnd),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setTimeLeft(calculateTimeLeft(dateEnd));
    }, 1000);
    return () => clearInterval(id);
  }, [dateEnd]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const isFinished =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      {isFinished ? (
        <p className="text-2xl font-semibold text-amber-500 animate-pulse">
          Sistem kembali online!
        </p>
      ) : (
        <>
          <p className="text-gray-500 text-sm font-medium">
            Sistem akan kembali beroperasi dalam:
          </p>
          <div className="grid grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Hari", value: timeLeft.days },
              { label: "Jam", value: timeLeft.hours },
              { label: "Menit", value: timeLeft.minutes },
              { label: "Detik", value: timeLeft.seconds },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-5 py-6 min-w-[72px] sm:min-w-[100px] shadow-sm"
              >
                <span className="text-4xl sm:text-6xl font-black tabular-nums text-gray-900 tracking-tight">
                  {pad(value)}
                </span>
                <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-500 font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
