import {
  CalendarDays as CalendarDaysIcon,
  Clock as ClockIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const WEB_APP_URL = "/api/book-consultation";
const FORM_ID = "contact-form";

export default function BookConsultation() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <HeroSection />
      <main className="mx-auto max-w-[1024px] px-4 py-12">
        <FeatureCards />
        <FormSection />
      </main>
    </div>
  );
}

function HeroSection() {
  const steps = [
    { number: 1, label: "Your Details", active: true },
    { number: 2, label: "Choose Time", active: false },
    { number: 3, label: "Confirmed", active: false },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-primary via-[#4F39F6] to-[#9810FA]">
      {/* Radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(52.98%_151.14%_at_50%_50%,rgba(255,255,255,0.1)_0.08%,rgba(0,0,0,0)_100%)]" />

      {/* Blur orbs */}
      <div className="pointer-events-none absolute -left-16 -top-32 h-80 w-80 rounded-full bg-blue-light/20 opacity-[0.31] blur-[64px]" />
      <div className="pointer-events-none absolute -bottom-96 -right-48 h-96 w-96 rounded-full bg-purple-400/20 opacity-[0.49] blur-[64px]" />

      <div className="relative mx-auto max-w-[1024px] px-4 py-20">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 shadow-lg">
          <CalendarDaysIcon className="h-10 w-10 text-white" />
        </div>

        {/* Heading */}
        <h1 className="mb-4 text-center text-base tracking-wide text-white">
          Book a Consultation
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-14 max-w-2xl text-center text-xl leading-relaxed text-blue-100">
          Schedule Your Discovery Call Today & Transform Your Property's
          Potential
        </p>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              {/* Step */}
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
                  className={`text-sm ${
                    step.active ? "text-white" : "text-white/60"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="mx-4 h-1 w-24 rounded-full bg-white/20">
                  <div
                    className={`h-full rounded-full ${
                      index === 0 ? "w-full bg-white" : "w-0"
                    }`}
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

function FeatureCards() {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-3">
      {/* Card 1: Free Revenue Analysis */}
      <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-white via-green-50/50 to-teal-50 p-8 shadow-lg">
        <div className="absolute -top-16 right-0 h-32 w-32 rounded-full bg-green-200/30 blur-[64px]" />
        <div className="relative space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00BC7D] to-[#009689] shadow-lg">
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M14.689 3.752c.057-.306.22-.582.459-.781.239-.2.54-.308.852-.308.311 0 .612.108.852.308.239.199.402.475.459.781l1.401 7.41c.1.527.356 1.012.735 1.391.379.379.864.635 1.391.735l7.41 1.401c.306.057.582.22.781.459.2.239.308.54.308.852s-.108.612-.308.852c-.199.239-.475.402-.781.459l-7.41 1.401c-.527.1-1.012.356-1.391.735-.379.379-.635.864-.735 1.391l-1.401 7.41c-.057.306-.22.582-.459.781-.239.2-.54.308-.852.308s-.612-.108-.852-.308c-.239-.199-.402-.475-.459-.781l-1.401-7.41c-.1-.527-.356-1.012-.735-1.391-.379-.379-.864-.635-1.391-.735l-7.41-1.401c-.306-.057-.582-.22-.781-.459-.2-.239-.308-.54-.308-.852s.108-.612.308-.852c.199-.239.475-.402.781-.459l7.41-1.401c.527-.1 1.012-.356 1.391-.735.379-.379.635-.864.735-1.391l1.401-7.41z"
                  stroke="currentColor"
                  strokeWidth="2.667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M26.667 2.667v5.333M29.333 5.333H24M5.333 29.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333z"
                  stroke="currentColor"
                  strokeWidth="2.667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs text-white shadow">
              100% FREE
            </span>
          </div>

          {/* Content */}
          <div>
            <h3 className="mb-1 text-base text-gray-900">
              Free Revenue Analysis
            </h3>
            <p className="mb-3 text-sm text-emerald-600">
              Get Your Custom Report
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              Discover your property's earning potential with a personalized
              revenue analysis—no cost, no catch
            </p>
          </div>

          {/* Bullets */}
          <div className="space-y-2 border-t border-green-100 pt-3">
            {[
              "Market comparison data",
              "Pricing optimization tips",
              "Revenue projections",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg
                  className="h-3.5 w-3.5 flex-shrink-0 text-emerald-600"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="6.417"
                    stroke="currentColor"
                    strokeWidth="1.167"
                  />
                  <path
                    d="M5.25 7l1.167 1.167L8.75 5.833"
                    stroke="currentColor"
                    strokeWidth="1.167"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-xs text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 2: Zero Pressure */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50 p-8 shadow-lg">
        <div className="absolute -top-16 right-0 h-32 w-32 rounded-full bg-blue-200/30 blur-[64px]" />
        <div className="relative space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B7FFF] to-[#4F39F6] shadow-lg">
            <svg className="h-8 w-8 text-white" viewBox="0 0 32 32" fill="none">
              <path
                d="M14.667 22.667l2.666 2.666c.263.263.575.471.918.613.343.142.711.215 1.082.215.372 0 .74-.073 1.083-.215.343-.142.655-.35.917-.613.263-.262.471-.574.613-.917.142-.343.215-.711.215-1.083 0-.371-.073-.74-.215-1.082-.142-.343-.35-.655-.613-.918M18.667 18.667L22 22c.53.53 1.25.828 2 .828s1.47-.298 2-.828c.53-.53.828-1.25.828-2s-.298-1.47-.828-2l-5.173-5.173c-.75-.75-1.767-1.17-2.827-1.17s-2.077.42-2.827 1.17L14 14c-.53.53-.828 1.25-.828 2s.298 1.47.828 2c.53.53 1.25.828 2 .828s1.47-.298 2-.828l3.747-3.747c1.216-1.213 2.802-1.986 4.507-2.196 1.705-.21 3.432.155 4.906 1.037l.627.373c.568.343 1.243.462 1.893.334L28 13.333M28 4l1.333 14.667h-2.666M4 4L2.667 18.667 11.333 27.333c.53.53 1.25.829 2 .829s1.47-.298 2-.829c.53-.53.829-1.25.829-2s-.298-1.47-.829-2M4 5.333h10.667"
                stroke="currentColor"
                strokeWidth="2.667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="mb-1 text-base text-gray-900">Zero Pressure</h3>
            <p className="mb-3 text-sm text-blue-600">
              No Obligation Consultation
            </p>
            <p className="text-sm leading-relaxed text-gray-600">
              Just honest advice and insights. Decide what's best for you on
              your own timeline
            </p>
          </div>
          <div className="space-y-2 border-t border-blue-100 pt-3">
            {[
              "Friendly, consultative approach",
              "No hard sell or commitments",
              "Take your time to decide",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg
                  className="h-3.5 w-3.5 flex-shrink-0 text-blue-600"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="6.417"
                    stroke="currentColor"
                    strokeWidth="1.167"
                  />
                  <path
                    d="M5.25 7l1.167 1.167L8.75 5.833"
                    stroke="currentColor"
                    strokeWidth="1.167"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-xs text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card 3: Proven Success */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-white via-amber-50/50 to-orange-50 p-8 shadow-lg">
        <div className="absolute -top-16 right-0 h-32 w-32 rounded-full bg-amber-200/30 blur-[64px]" />
        <div className="relative space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FE9A00] to-[#F54900] shadow-lg">
            <svg className="h-8 w-8 text-white" viewBox="0 0 32 32" fill="none">
              <path
                d="M20.636 17.187l2.02 11.368c.023.134.004.271-.054.394-.058.123-.152.225-.269.293-.118.068-.253.099-.389.088-.135-.011-.264-.063-.369-.149l-4.773-3.583c-.231-.172-.51-.265-.798-.265s-.568.093-.798.265l-4.781 3.58c-.105.086-.234.138-.369.149-.135.011-.271-.02-.389-.088-.117-.068-.211-.17-.269-.293-.058-.123-.077-.26-.054-.394l2.019-11.367M16 18.667c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
                stroke="currentColor"
                strokeWidth="2.667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h3 className="mb-2 text-base text-gray-900">Proven Success</h3>
            <div className="inline-flex items-end gap-1 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 px-3 py-1.5">
              <span className="text-3xl leading-none text-orange-600">40+</span>
              <span className="pb-1 text-sm text-orange-600">Properties</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            Hands-on experience optimizing real properties — quality management,
            not just quantity
          </p>
          <div className="space-y-2 border-t border-amber-100 pt-3">
            {[
              { icon: "star", text: "24-hour response guarantee" },
              { icon: "check", text: "Personalized owner support" },
              { icon: "check", text: "Tailored solutions for you" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                {item.icon === "star" ? (
                  <svg
                    className="h-3.5 w-3.5 flex-shrink-0 text-orange-500"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M6.723 1.339c.025-.052.065-.095.114-.126.049-.03.106-.046.163-.046s.114.016.163.046c.049.031.089.074.114.126l1.348 2.73c.09.18.22.335.383.453.163.118.351.195.55.224l3.013.441c.057.008.11.032.154.069.043.036.076.085.094.14.018.054.02.113.006.169-.014.056-.043.107-.085.147l-2.18 2.123c-.144.14-.251.313-.313.506-.062.192-.077.395-.043.594l.515 2.994c.01.057.004.115-.018.169-.022.053-.059.1-.106.133-.047.034-.102.054-.16.058-.058.004-.116-.008-.165-.035l-2.694-1.417c-.178-.093-.375-.142-.576-.142s-.399.049-.576.142L4.723 12.26c-.05.027-.107.039-.165.035-.058-.004-.113-.024-.16-.058-.047-.034-.084-.08-.106-.133-.022-.054-.028-.112-.018-.169l.514-2.994c.034-.199.019-.402-.043-.594-.062-.193-.169-.366-.313-.506L2.252 5.718c-.042-.04-.071-.091-.085-.147-.014-.056-.012-.115.006-.17.018-.054.051-.103.094-.139.044-.037.097-.061.154-.069l3.013-.441c.199-.029.387-.106.55-.224.163-.118.294-.273.383-.453l1.347-2.73z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1.167"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-3.5 w-3.5 flex-shrink-0 text-orange-500"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="6.417"
                      stroke="currentColor"
                      strokeWidth="1.167"
                    />
                    <path
                      d="M5.25 7l1.167 1.167L8.75 5.833"
                      stroke="currentColor"
                      strokeWidth="1.167"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                <span className="text-xs text-gray-600">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormSection() {
  const navigate = useNavigate();
  const [interestLevel, setInterestLevel] = useState("ready");
  const [interestOpen, setInterestOpen] = useState(false);
  const interestRef = useRef<HTMLDivElement>(null);
  const handleDateInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      const target = event.currentTarget;
      if (typeof target.showPicker === "function") {
        target.showPicker();
      }
    },
    [],
  );

  const interestOptions = [
    {
      value: "ready",
      label: "Ready to Move Forward – Actively Seeking Management",
    },
    { value: "comparing", label: "Comparing Property Managers" },
    {
      value: "exploring",
      label: "Exploring Options – Not Ready to Commit Yet",
    },
    { value: "pricing", label: "Looking for Pricing & Information Only" },
    {
      value: "planning",
      label: "Planning for a Future Rental (1–6 Months Out)",
    },
    { value: "notReady", label: "Property Not Ready Yet – Need Guidance" },
    {
      value: "unsure",
      label: "Unsure – Need a Consultation to Understand Fit",
    },
  ];

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!interestRef.current?.contains(event.target as Node)) {
        setInterestOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const form =
      (document.getElementById(FORM_ID) as HTMLFormElement | null) ||
      (document.querySelector("form") as HTMLFormElement | null);

    if (!form) {
      console.error(
        "[Form→Sheets] No form found on page. Set FORM_ID or ensure a <form> exists.",
      );
      return;
    }

    const sendFormData = async (body: Record<string, string>) => {
      try {
        const res = await fetch(WEB_APP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const raw = await res.text();
          console.warn(
            "[Form→Sheets] server returned non-OK status",
            res.status,
            raw,
          );
          return;
        }

        console.log("[Form→Sheets] background submission succeeded");
      } catch (error) {
        console.error("[Form→Sheets] background fetch error:", error);
      }
    };

    const submitHandler = (event: Event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const body: Record<string, string> = {};
      formData.forEach((value, key) => {
        body[key] = typeof value === "string" ? value : value.name;
      });

      void sendFormData(body);
      toast({
        title: "Form submitted",
        description: "Thanks — form submitted.",
      });
      form.reset();
      navigate("/schedule-call");
    };

    form.addEventListener("submit", submitHandler);
    return () => {
      form.removeEventListener("submit", submitHandler);
    };
  }, [navigate, toast]);

  return (
    <div className="grid gap-8 lg:grid-cols-[309px,1fr]">
      {/* Left Sidebar */}
      <div className="h-fit space-y-8 rounded-xl bg-white p-8 shadow">
        <div>
          <h2 className="mb-2 text-base text-gray-900">
            Here's How We Can Help
          </h2>
          <p className="text-base text-gray-600">
            We'll spend 30 minutes understanding your situation and exploring:
          </p>
        </div>

        <ul className="space-y-4">
          {[
            {
              title: "Your current challenges & goals",
              desc: "Whether you're just starting or need better results",
            },
            {
              title: "Solutions tailored to your needs",
              desc: "We'll match our services to what works for you",
            },
            {
              title: "How we can take the stress off your plate",
              desc: "From guest headaches to maintenance worries",
            },
            {
              title: "What your next steps look like",
              desc: "A clear path forward, no pressure",
            },
          ].map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-4 w-4 text-blue-600"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="7.333"
                    stroke="currentColor"
                    strokeWidth="1.333"
                  />
                  <path
                    d="M6 8l1.333 1.333L10 6.667"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-base text-gray-700">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="space-y-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-5 pt-8 border-t border-gray-200">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
            <ClockIcon className="h-5 w-5 text-white" />
          </div>
          <p className="text-center text-sm font-bold text-gray-900">
            Limited Availability
          </p>
          <p className="text-center text-xs text-gray-600">
            We only take on a select number of properties each month to ensure
            quality service
          </p>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-green-500 opacity-50" />
            <span className="text-xs text-gray-700">
              Spots available this month
            </span>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="rounded-xl bg-white p-8 shadow">
        <h2 className="mb-2 text-base text-gray-900">
          Tell Us About Your Property
        </h2>
        <p className="mb-8 text-base text-gray-600">
          Fill out the form below to get started
        </p>

        <form
          id="contact-form"
          action="/api/book-consultation"
          method="POST"
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="firstName" className="text-sm text-gray-900">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="lastName" className="text-sm text-gray-900">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="text-sm text-gray-900">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="address" className="text-sm text-gray-900">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="bedrooms" className="text-sm text-gray-900">
                Bedrooms <span className="text-red-500">*</span>
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                required
                defaultValue="2"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="bathrooms" className="text-sm text-gray-900">
                Bathrooms <span className="text-red-500">*</span>
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                required
                defaultValue="2"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1.5">1.5</option>
                <option value="2.0">2.0</option>
                <option value="2.5">2.5</option>
                <option value="3.0+">3.0+</option>
              </select>
            </div>
          </div>

          <div className="relative space-y-1" ref={interestRef}>
            <label htmlFor="interestLevel" className="text-sm text-gray-900">
              Interest Level <span className="text-red-500">*</span>
            </label>
            <input type="hidden" name="interestLevel" value={interestLevel} />
            <button
              type="button"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setInterestOpen((prev) => !prev)}
            >
              {
                interestOptions.find((option) => option.value === interestLevel)
                  ?.label
              }
            </button>
            {interestOpen && (
              <div className="absolute left-0 right-0 z-10 mt-2 max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-xl">
                {interestOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="w-full border-b border-gray-100 px-3 py-2 text-left text-sm text-gray-900 hover:bg-blue-50 last:border-b-0"
                    onClick={() => {
                      setInterestLevel(option.value);
                      setInterestOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="targetStartDate" className="text-sm text-gray-900">
              Target Start Date (Optional)
            </label>
            <input
              id="targetStartDate"
              name="targetStartDate"
              type="date"
              onFocus={handleDateInputFocus}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-primary to-[#4F39F6] px-6 py-2 text-sm text-white shadow-lg transition hover:shadow-xl"
          >
            Book My Discovery Call
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.333 8h9.334M8 3.333L12.667 8 8 12.667"
                stroke="currentColor"
                strokeWidth="1.333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
