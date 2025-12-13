import { useState } from "react";
import {
  CalendarDays as CalendarDaysIcon,
  Globe,
  Video,
  Clock as ClockIcon,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ScheduleCall() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) return;

    navigate("/schedule-call/confirmed", {
      state: {
        fromSchedule: true,
        date: selectedDate.toISOString(),
        time: selectedTime,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <main className="mx-auto max-w-[1246px] px-4 py-16">
        <CallInfo />
        <div className="mt-8 grid gap-10 lg:grid-cols-[786px,1fr]">
          <DateTimeSelection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            onConfirm={handleConfirmBooking}
          />
          <BookingSummary
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>
      </main>
    </div>
  );
}

function HeroSection() {
  const steps = [
    { number: 1, label: "Your Details", active: false },
    { number: 2, label: "Choose Time", active: true },
    { number: 3, label: "Confirmed", active: false },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-primary via-[#4F39F6] to-[#9810FA] pb-24 pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(52.98%_151.14%_at_50%_50%,rgba(255,255,255,0.1)_0.08%,rgba(0,0,0,0)_100%)]" />

      {/* Blur orbs */}
      <div className="pointer-events-none absolute -right-48 -top-40 h-80 w-80 rounded-full bg-[rgba(81,162,255,0.2)] opacity-30 blur-[64px]" />
      <div className="pointer-events-none absolute -bottom-48 -left-48 h-96 w-96 rounded-full bg-[rgba(194,122,255,0.2)] opacity-50 blur-[64px]" />

      <div className="relative mx-auto max-w-[1152px] px-4">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 shadow-lg">
          <CalendarDaysIcon className="h-10 w-10 text-white" />
        </div>

        <h1 className="mb-4 text-center text-base tracking-wide text-white">
          Book a Consultation
        </h1>

        <p className="mx-auto mb-14 max-w-2xl text-center text-xl leading-relaxed text-blue-100">
          Schedule Your Discovery Call Today & Transform Your Property's
          Potential
        </p>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-base ${
                    step.active
                      ? "bg-white text-blue-primary shadow-[0_0_0_4px_rgba(255,255,255,0.3)]"
                      : "bg-white/20 text-white/60"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm ${step.active ? "text-white" : "text-white/60"}`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="mx-4 h-1 w-28 rounded-full bg-white/20">
                  <div
                    className={`h-full rounded-full ${index === 0 ? "w-full bg-white" : "w-0"}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallInfo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-blue-primary" />
        <span>EST (GMT-5)</span>
      </div>
      <div className="flex items-center gap-2">
        <Video className="h-4 w-4 text-blue-primary" />
        <span>Video call via Google Meet</span>
      </div>
      <div className="flex items-center gap-2">
        <ClockIcon className="h-4 w-4 text-blue-primary" />
        <span>30 minute call</span>
      </div>
    </div>
  );
}

function DateTimeSelection({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onConfirm,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_0_rgba(0,0,0,0.06)]">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100">
            <CalendarDaysIcon className="h-7 w-7 text-blue-primary" />
          </div>
          <div>
            <h2 className="text-base text-gray-900">Select a Date</h2>
            <p className="text-sm text-gray-500">Choose your preferred day</p>
          </div>
        </div>

        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="mt-6 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
          <p className="text-center text-sm text-gray-600">
            <span className="mr-2">💡</span>
            We'll send a calendar invite after confirmation
          </p>
        </div>
      </div>

      <TimeSlots
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

      <div className="flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-sm text-gray-900 transition hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={!selectedDate || !selectedTime}
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-blue-primary via-[#4F39F6] to-[#9810FA] px-8 py-4 text-sm text-white shadow-[0_8px_20px_0_rgba(21,93,252,0.3)] transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirm Booking
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Calendar({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const addMonths = (d: Date, n: number) => {
    const copy = new Date(d);
    copy.setMonth(copy.getMonth() + n);
    copy.setDate(1);
    return copy;
  };

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const buildCalendarMatrix = (monthDate: Date) => {
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const startDay = firstDay.getDay();
    const daysInThisMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0,
    ).getDate();

    const matrix: Date[][] = [];
    let week: Date[] = [];

    // previous month filler
    for (let i = 0; i < startDay; i++) {
      const d = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth(),
        i - startDay + 1,
      );
      d.setHours(0, 0, 0, 0);
      week.push(d);
    }

    for (let day = 1; day <= daysInThisMonth; day++) {
      const d = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
      d.setHours(0, 0, 0, 0);
      week.push(d);
      if (week.length === 7) {
        matrix.push(week);
        week = [];
      }
    }

    // next month filler
    let nextDay = 1;
    while (week.length > 0 && week.length < 7) {
      const d = new Date(
        monthDate.getFullYear(),
        monthDate.getMonth() + 1,
        nextDay++,
      );
      d.setHours(0, 0, 0, 0);
      week.push(d);
    }
    if (week.length) matrix.push(week);

    return matrix;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const matrix = buildCalendarMatrix(currentMonth);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  return (
    <div className="w-full max-w-xs rounded-xl bg-white p-3 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-900">
          {currentMonth.toLocaleString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-7 gap-0">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="flex h-5 items-center justify-center text-xs text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {matrix.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-0">
              {week.map((date, dateIndex) => {
                const isDisabled = date < today;
                const isCurrentMonth =
                  date.getMonth() === currentMonth.getMonth();
                const isSelected = selectedDate
                  ? isSameDay(date, selectedDate)
                  : false;

                return (
                  <button
                    key={dateIndex}
                    onClick={() => !isDisabled && setSelectedDate(date)}
                    disabled={isDisabled}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm transition ${
                      isSelected
                        ? "bg-gray-900 text-white"
                        : isDisabled
                          ? "cursor-not-allowed text-gray-300 opacity-50"
                          : isCurrentMonth
                            ? "text-gray-900 hover:bg-gray-100"
                            : "text-gray-400"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimeSlots({
  selectedTime,
  setSelectedTime,
}: {
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
}) {
  const timeSlots = [
    { time: "9:00 AM", disabled: false, hasIndicator: false },
    { time: "10:00 AM", disabled: false, hasIndicator: false },
    { time: "11:00 AM", disabled: false, hasIndicator: false },
    { time: "1:00 PM", disabled: false, hasIndicator: true },
    { time: "2:00 PM", disabled: false, hasIndicator: false },
    { time: "3:00 PM", disabled: false, hasIndicator: true },
    { time: "4:00 PM", disabled: false, hasIndicator: false },
    { time: "5:00 PM", disabled: false, hasIndicator: false },
  ];

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_0_rgba(0,0,0,0.06)]">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100">
            <ClockIcon className="h-7 w-7 text-[#4F39F6]" />
          </div>
          <div>
            <h2 className="text-base text-gray-900">Choose Your Time</h2>
            <p className="text-sm text-gray-500">Thursday, November 13</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-orange-600" />
          <span className="text-xs text-orange-700">Popular</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {timeSlots.map(({ time, disabled, hasIndicator }) => {
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => !disabled && setSelectedTime(time)}
              disabled={disabled}
              className={`relative rounded-xl px-4 py-4 text-base transition ${
                isSelected
                  ? "border-0 bg-gradient-to-b from-blue-primary to-[#4F39F6] text-white shadow-[0_8px_20px_0_rgba(21,93,252,0.3)]"
                  : disabled
                    ? "cursor-not-allowed border border-gray-100 bg-gray-50 text-gray-300"
                    : "border-2 border-gray-200 bg-white text-gray-700 hover:border-blue-primary hover:bg-blue-50"
              }`}
            >
              {time}
              {hasIndicator && !isSelected && (
                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-yellow-400 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BookingSummary({
  selectedDate,
  selectedTime,
}: {
  selectedDate: Date | null;
  selectedTime: string | null;
}) {
  const isReadyToBook = Boolean(selectedDate && selectedTime);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-[0_8px_30px_0_rgba(0,0,0,0.06)]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg text-gray-900">Booking Summary</h2>
          {isReadyToBook && (
            <div className="h-2 w-2 rounded-full bg-green-500 opacity-50" />
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                <CalendarDaysIcon className="h-6 w-6 text-blue-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Date</p>
                <p className="mt-1 text-base text-gray-900">
                  {selectedDate
                    ? selectedDate.toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Not selected yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                <ClockIcon className="h-6 w-6 text-[#4F39F6]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Time Slot</p>
                <p className="mt-1 text-base text-gray-900">
                  {selectedTime ? `${selectedTime} EST` : "Not selected yet"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-teal-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Format</p>
                <p className="mt-1 text-base text-gray-900">
                  30-min video call
                </p>
              </div>
            </div>
          </div>
        </div>

        {isReadyToBook && (
          <div className="mt-5 rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-teal-50 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
              <div>
                <p className="text-base font-medium text-green-900">
                  Ready to Book!
                </p>
                <p className="mt-1 text-sm text-green-700">
                  Your time slot is secured. Click confirm to complete your
                  booking.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <h3 className="mb-4 text-base text-gray-900">What Happens Next?</h3>
        <div className="space-y-3">
          {[
            "Confirmation email sent instantly",
            "Calendar invite with Google Meet link",
            "Reminder 24 hours before call",
          ].map((text, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <span className="text-xs text-blue-primary">{index + 1}</span>
              </div>
              <p className="text-sm text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
