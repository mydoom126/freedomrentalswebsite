import { Check, Lock } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

interface BookingState {
  fromSchedule?: boolean;
  date?: string;
  time?: string;
}

export default function BookingConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingState = (location.state || null) as BookingState | null;
  const isAuthorized = Boolean(bookingState?.fromSchedule);

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/schedule-call", { replace: true });
    }
  }, [isAuthorized, navigate]);

  const formattedDate = useMemo(() => {
    if (!bookingState?.date) return null;
    const parsed = new Date(bookingState.date);
    return parsed.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [bookingState?.date]);

  const formattedTime = useMemo(() => {
    return bookingState?.time ?? null;
  }, [bookingState?.time]);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-primary via-[#4F39F6] to-[#9810FA] pb-24 pt-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(52.98%_151.14%_at_50%_50%,rgba(255,255,255,0.15)_0%,rgba(0,0,0,0)_100%)]" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 shadow-lg">
            <Check className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-normal leading-tight md:text-4xl">
            Your Discovery Call is Confirmed.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-blue-100">
            You&apos;ve just taken the first step toward unlocking your
            property&apos;s full potential.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { label: "Your Details", active: true },
              { label: "Choose Time", active: true },
              { label: "Confirmed", active: true },
            ].map((step, index) => (
              <div key={step.label} className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold shadow-[0_10px_20px_rgba(0,0,0,0.2)] ${
                    step.active
                      ? "bg-white text-blue-primary"
                      : "bg-white/30 text-white/80"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm uppercase tracking-[0.2em] text-white/80">
                  {step.label}
                </span>
                {index < 2 && <div className="h-px w-14 bg-white/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-16 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Thank You for Scheduling Your Consultation
            </h2>
            <p className="text-base leading-relaxed text-gray-600">
              Thank you for scheduling your consultation with Freedom Rental
              Properties. One of our Property Success Managers will connect with
              you at your scheduled time to discuss your goals, analyze your
              property&apos;s potential, and outline a personalized strategy for
              maximum performance.
            </p>
            {(formattedDate || formattedTime) && (
              <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                {formattedDate &&
                  `${formattedDate}${formattedTime ? " · " : ""}${formattedTime || ""}`}
              </p>
            )}
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-primary via-[#4F39F6] to-[#9810FA] px-8 py-4 text-base font-medium text-white shadow-[0_15px_30px_rgba(77,43,255,0.35)] transition hover:shadow-xl"
          >
            <Lock className="h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
