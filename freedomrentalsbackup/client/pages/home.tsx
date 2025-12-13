import {
  ArrowRight,
  Check,
  X,
  TrendingUp,
  Headphones,
  Shield,
  Clock,
  MapPin,
  Zap,
  Target,
  BarChart3,
  MessageSquare,
  Lock,
  Calendar,
  Wifi,
  Home,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <WhatSeparatesUs />
      <ServicePlans />
      <ComparisonTable />
      <TechnologySection />
      <HowItWorks />
    </div>
  );
}

function Header() {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOwnerServicesClick = () => {
    const element = document.getElementById("owner-services-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-[1280px] mx-auto px-8 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleHomeClick}
        >
          <div className="w-10 h-10 rounded-lg bg-blue-primary flex items-center justify-center border border-white">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-normal bg-gradient-to-r from-slate-dark to-slate-medium bg-clip-text text-transparent">
            Freedom Rental Properties
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={handleHomeClick}
            className="px-4 py-2 rounded-lg bg-blue-primary text-white text-base hover:bg-blue-600 transition"
          >
            Home
          </button>
          <button
            onClick={handleOwnerServicesClick}
            className="px-4 py-2 rounded-lg text-slate-medium text-base hover:bg-gray-50"
          >
            Owner Services
          </button>
          <Link
            to="/book-consultation"
            className="px-4 py-2 rounded-lg text-slate-medium text-base hover:bg-gray-50"
          >
            Book a Consultation
          </Link>
        </div>

        <Link
          to="/book-consultation"
          className="px-4 py-2 rounded-lg bg-blue-primary text-white text-sm hover:bg-blue-600 transition"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-20 bg-gradient-to-br from-slate-dark via-slate-darker to-slate-dark overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://cdn.builder.io/api/v1/image/assets%2F57791c8f86b24afcb84a4850ff752a40%2F7a4b56d5e5f84325885ca915657640cf?format=webp&width=1600')] bg-cover bg-center opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-dark/80 via-slate-dark/50 to-transparent" />

      <div className="relative max-w-[1280px] mx-auto px-8 py-32 lg:py-40">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-primary/30 bg-blue-primary/20 mb-8">
            <span className="text-blue-lighter text-base">
              Premium Short-Term Rental Management
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6 text-[#e0f7ff] drop-shadow-[0_0_32px_rgba(56,189,248,0.9)] drop-shadow-[0_0_48px_rgba(56,189,248,0.6)]">
            Turn Your Property Into a Profitable Short-Term Rental
          </h1>

          <p className="text-xl leading-relaxed mb-10 max-w-2xl text-[#e0f7ff] drop-shadow-[0_0_36px_rgba(56,189,248,0.9)] drop-shadow-[0_0_56px_rgba(56,189,248,0.8)] drop-shadow-[0_0_80px_rgba(56,189,248,0.6)] font-black bg-white/5 px-4 py-2 rounded-2xl backdrop-blur-md">
            Full-service property management that delivers 35-50% higher revenue
            than self-managing. We handle every detail while you enjoy
            hassle-free passive income.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              to="/book-consultation"
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-primary text-white text-sm hover:bg-blue-600 transition"
            >
              Get Started Today
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-consultation"
              className="px-6 py-3 rounded-lg border border-white bg-blue-primary/87 text-white text-sm hover:bg-blue-primary/70 transition"
            >
              Request a Free Consultation
            </Link>
          </div>

          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-normal text-white mb-1">25%</div>
              <div className="text-base text-slate-lighter">
                Full Management Fee
              </div>
            </div>
            <div>
              <div className="text-3xl font-normal text-white mb-1">24/7</div>
              <div className="text-base text-slate-lighter">Guest Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: "Revenue Maximization",
      description:
        "Our dynamic pricing algorithms and multi-channel distribution strategy consistently outperform market averages by 35-60%.",
      detail:
        "We analyze over 200 data points daily including local events, competitor pricing, and seasonal trends.",
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: "24/7 Guest Support",
      description:
        "Round-the-clock guest communication in multiple languages ensures 5-star reviews and instant issue resolution.",
      detail:
        "Average response time under 15 minutes. Dedicated guest support team handling all inquiries and emergencies.",
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Comprehensive Protection",
      description:
        "Multi-layer property protection including guest screening, damage insurance, and security deposit management.",
      detail:
        "$1M liability coverage on every booking. Pre-screening of all guests with background checks available.",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Dedicated Financial Deep Dive",
      description:
        "Monthly Deep Financial Reporting so you have accurate financial records.",
      detail:
        "Transparent financial reporting with detailed breakdowns of all income, expenses, and fees.",
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: "Strategic Underwriting & Compliance",
      description:
        "Before we onboard anything, we dissect everything — regulations, licensing, profitability projections, and market fit. Only properties that pass our performance standards move forward.",
      detail:
        "Zero-tolerance for non-compliance. We handle permits, tax filings, zoning verification, and HOA communications — delivering bulletproof, risk-free operations from day one.",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Advanced Technology",
      description:
        "State-of-the-art property management software with owner portal access for real-time insights and analytics.",
      detail:
        "Smart locks, automated messaging, IoT sensors, and detailed performance dashboards across properties.",
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: "Strategic Execution",
      description:
        "Every decision is data-driven and engineered for maximum profitability. We think like investors, move like operators.",
      detail:
        "Proprietary performance systems optimize every listing for conversion, revenue, and guest satisfaction.",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Performance Systems",
      description:
        "Built on discipline, precision, and relentless optimization. Our systems don't react — they anticipate.",
      detail:
        "Real-time market intelligence, predictive analytics, and automated maintenance & performance tracking.",
    },
  ];

  return (
    <section
      id="owner-services-section"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-blue-bg border border-blue-pale mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-primary opacity-90" />
            <span className="text-blue-primary text-base">
              Strategy. Systems. Results.
            </span>
          </div>

          <h2 className="text-4xl font-normal text-slate-dark mb-6">
            Leading The New Era of Property Management
          </h2>
          <p className="text-slate-text text-lg max-w-3xl mx-auto leading-relaxed">
            At Freedom Rental Properties, every system, process, and decision is
            designed to maximize performance and protect profitability. We
            operate with Strategy, precision, and data-driven execution.
            Creating value that transforms short-term rentals into high
            performing assets and provide a true hands-off experience for our
            clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-primary flex items-center justify-center text-white mb-6 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-base font-normal text-slate-dark text-center mb-3 min-h-[48px] flex items-center justify-center">
                {feature.title}
              </h3>
              <p className="text-slate-text text-base leading-relaxed mb-4 text-center">
                {feature.description}
              </p>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-slate-light text-sm leading-relaxed text-center">
                  {feature.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatSeparatesUs() {
  const pillars = [
    {
      title: "Systems",
      description:
        "Nothing is left to chance. Every detail systematized. Every outcome engineered.",
    },
    {
      title: "Foresight",
      description:
        "We don't react to markets. We anticipate them. Positioning before others realize what's happening.",
    },
    {
      title: "Urgency",
      description:
        "Issues don't wait. Neither do we. Problems are resolved before they escalate. We operate with speed and precision.",
    },
    {
      title: "Innovation",
      description:
        "We operate in silence, building intelligent systems designed to outperform, protect, and evolve — setting a new standard in property management.",
    },
  ];

  return (
    <section className="bg-slate-dark py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-white mb-8">What Separates Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {pillars.map((pillar, index) => (
              <div key={index} className="text-center">
                <h3 className="text-base text-blue-light mb-3">
                  {pillar.title}
                </h3>
                <p className="text-slate-lightest text-base leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-medium pt-8">
            <p className="text-white text-base mb-6">
              Elite property owners understand what we offer. The question is
              whether you're ready.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-blue-light text-base">
              <span>Strategy</span>
              <span className="text-slate-text">•</span>
              <span>Precision</span>
              <span className="text-slate-text">•</span>
              <span>Innovation</span>
              <span className="text-slate-text">•</span>
              <span>Results</span>
              <span className="text-blue-light">•</span>
              <span>Leadership</span>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-dark border border-white rounded-2xl shadow-2xl p-12 text-center">
          <h3 className="text-base text-white mb-6">
            Partner With a Team That Delivers
          </h3>
          <p className="text-slate-lightest text-base leading-relaxed mb-8">
            Our commitment extends beyond management — we're dedicated to
            maximizing your property's performance through disciplined
            execution, strategic planning, and unwavering attention to detail.
            Every decision we make is in service of your long-term success.
          </p>
          <Link
            to="/book-consultation"
            className="px-8 py-4 rounded-xl border border-white bg-slate-dark text-white text-base shadow-lg hover:bg-slate-medium transition"
          >
            Schedule a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicePlans() {
  return (
    <section id="service-plans" className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-normal text-black mb-4">
            Choose Your Management Plan
          </h2>
          <p className="text-slate-text text-xl max-w-3xl mx-auto">
            Select the level of service that fits your needs. All plans are
            designed to maximize your revenue and guest satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PlanCard
            popular
            title="Full Property Management"
            subtitle="Program"
            description="Comprehensive, hands-off property management for maximum peace of mind"
            price="25% Of Gross Income"
            features={[
              "24/7 Guest Communication, Screening & Disputes",
              "Advanced Dynamic Pricing Optimization",
              "Multi-Channel Bookings",
              "Cleaning & Turnover after Every Check-Out",
              "Comprehensive maintenance oversight and coordination",
              "Property Inspections & Guest Review Management",
              "Essentials Program*",
              "Monthly Financial Reporting Deep Dive.",
              "Pest Prevention Program",
              "Assistance with short-term rental licenses and local regulations",
              "Security Deposit Management",
              "Financial Bookkeeping & Year End Tax Prep",
              "Landscaping & Snow Removal",
              "Smart Tech Installation(See Below)",
              "Listing Creation & Optimization",
              "Pool Cleaning & Maintenance*",
              "Power Washing & House Wash",
              "Minor Maintenance*",
              "Gutter Cleaning",
            ]}
          />

          <PlanCard
            title="Co-Hosting"
            subtitle="Program"
            description="Perfect for hands-on owners who want professional support with key tasks"
            price="20% Of Gross Income"
            features={[
              "24/7 Guest Communication, Screening & Disputes",
              "Advanced Dynamic Pricing Optimization",
              "Cleaning & Turnover after Every Check-Out*",
              "Comprehensive maintenance oversight and coordination*",
              "Guest Review Management",
              "Essentials Program*",
              "Monthly Financial Reporting Deep Dive.",
              "Pest Prevention Program*",
              "Smart Tech Installation(See Below)*",
              "Listing Optimization",
              "Minor Maintenance*",
            ]}
          />

          <PlanCard
            addon
            title="Cleaning & Essentials Program"
            description="Professional cleaning and restocking services between guest stays"
            price="Free Estimate"
            features={[
              "Linen & Bedding Service",
              "• Wash, fold, and replace all linens and bedding every cleaning",
              "• Towels, bath mats, and kitchen cloths cleaned and rotated",
              "• On-site organization system for streamlined turnovers",
              "Restocking of All Guest Essentials",
              "• Toilet paper, paper towels, trash bags",
              "• Hand soap, dish soap, shampoo, conditioner, body wash",
              "• Laundry detergent, dishwasher pods, sponges, and cleaning supplies",
              "Kitchen & Guest Experience Supplies",
              "• Coffee, tea, seasonings, condiments",
              "• Full kitchen setup: pots, pans, utensils, plates, glasses, mugs, etc.",
              "• Iron, ironing board, vacuum, broom, Roku or streaming setup",
              "Purchasing, Storage & Inventory Management",
              "• All supplies purchased, tracked, and restocked by our team",
              "• Supplies stored, labeled, and rotated for consistency",
              "• Monthly report on inventory usage & costs",
              "Premium Presentation & Guest Experience",
              "• Every stay looks, feels, and smells brand new",
              "• Quality control on decor, linens, and kitchenware",
              "• Replacements handled seamlessly — owners never lift a finger",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  title,
  subtitle,
  description,
  price,
  features,
  popular,
  addon,
}: any) {
  return (
    <div
      className={`relative bg-white rounded-2xl border-2 ${popular ? "border-blue-primary" : "border-blue-primary"} shadow-xl p-6 flex flex-col`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-primary text-white text-xs rounded-lg">
          Most Popular
        </div>
      )}
      {addon && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-primary text-white text-xs rounded-lg">
          Add-On Available
        </div>
      )}

      <div className="text-center mb-6">
        <div className="min-h-[150px] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-normal text-black mb-2">{title}</h3>
            {subtitle && (
              <h3 className="text-2xl font-normal text-black mb-2">
                {subtitle}
              </h3>
            )}
          </div>
          <p
            className={`text-base text-gray-500 mb-4 min-h-[48px] ${subtitle ? "mt-2" : "mt-4"}`}
          >
            {description}
          </p>
        </div>
        <div className="text-3xl font-normal text-blue-primary mt-2">
          {price}
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-6 pb-4">
        {features.map((feature: string, index: number) => (
          <div key={index} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-blue-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-slate-medium">
              {feature.replace(/^•\s*/, "")}
            </span>
          </div>
        ))}
      </div>

      <Link
        to="/book-consultation"
        className="w-full py-3 rounded-lg bg-blue-primary text-white text-sm hover:bg-blue-600 transition text-center"
      >
        Get Started
      </Link>
    </div>
  );
}

function ComparisonTable() {
  const features = [
    {
      name: "24/7 Guest Communication",
      us: true,
      competitors: "Limited",
      self: false,
    },
    {
      name: "Advanced Dynamic Pricing Optimization",
      us: true,
      competitors: "Basic",
      self: false,
    },
    {
      name: "Multi-Channel Distribution",
      us: true,
      competitors: true,
      self: "Manual",
    },
    {
      name: "License Compliance Assistance",
      us: true,
      competitors: false,
      self: false,
    },
    {
      name: "Minor Maintenance",
      us: true,
      competitors: "Just wait until the guest complains",
      self: false,
    },
    {
      name: "Maintenance Coordination",
      us: true,
      competitors: "Extra Fee",
      self: "DIY",
    },
    {
      name: "Monthly Financial Reporting",
      us: "Detailed",
      competitors: "Basic",
      self: "None",
    },
    {
      name: "$1M Liability Coverage",
      us: true,
      competitors: false,
      self: false,
    },
    {
      name: "Smart Lock Integration",
      us: true,
      competitors: true,
      self: false,
    },
    {
      name: "IoT Property Monitoring",
      us: true,
      competitors: "Basic",
      self: false,
    },
    {
      name: "Landscaping & Snow Removal",
      us: true,
      competitors: false,
      self: false,
    },
    { name: "Pool Maintenance", us: true, competitors: false, self: false },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-normal text-black mb-4">
            See How We Compare
          </h2>
          <p className="text-slate-text text-xl">
            Not all property management companies are created equal. Here's what
            sets us apart.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-base text-black">Features</div>
              <div className="text-center">
                <span className="inline-block px-4 py-2 rounded-lg bg-blue-primary text-white text-base">
                  Our Service
                </span>
              </div>
              <div className="text-center text-base text-slate-text">
                Competitors
              </div>
              <div className="text-center text-base text-slate-text">
                Self-Managing
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 px-6 py-4 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <div className="text-sm text-black flex items-center">
                  {feature.name}
                </div>
                <div className="flex items-center justify-center">
                  {feature.us === true ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <span className="text-sm text-slate-text">
                      {feature.us}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {feature.competitors === true ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : feature.competitors === false ? (
                    <X className="w-5 h-5 text-gray-300" />
                  ) : (
                    <span className="text-sm text-slate-text">
                      {feature.competitors}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {feature.self === true ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : feature.self === false ? (
                    <X className="w-5 h-5 text-gray-300" />
                  ) : (
                    <span className="text-sm text-slate-text">
                      {feature.self}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  const technologies = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Dynamic Pricing Engine",
      description:
        "AI-powered revenue management adjusts rates daily based on 200+ market factors",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Automated Messaging",
      description:
        "Smart communication system handles guest inquiries instantly with personalized responses",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Smart Lock Integration",
      description:
        "Keyless entry via Smart Lock with unique codes automatically generated for each guest, enhanced security and convenience",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Multi-Channel Manager",
      description:
        "Real-time calendar synchronization across all booking platforms that prevents double-bookings and maximizes Revenue and Occupancy.",
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "IoT Monitoring",
      description:
        "Smart sensors monitor temperature, noise levels, Smoking odors, Cameras, and occupancy for proactive management.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-dark via-slate-darker to-slate-dark py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-normal text-white mb-6">
              Powered by Industry-Leading Technology
            </h2>
            <p className="text-xl text-slate-lightest mb-8 leading-relaxed">
              We leverage cutting-edge property management technology to
              maximize your revenue, minimize vacancies, and provide complete
              transparency.
            </p>

            <div className="space-y-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-primary flex items-center justify-center text-white flex-shrink-0">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-lg text-black mb-1">{tech.title}</h3>
                    <p className="text-sm text-slate-lightest leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/e63d6bc470d9137373d9645db9c2edcd75bbc848?width=1166"
                alt="Technology Dashboard"
                className="w-full h-auto"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6">
              <div className="text-3xl font-normal text-slate-dark mb-1">
                99.8%
              </div>
              <div className="text-base text-slate-text">Uptime Guarantee</div>
            </div>

            <div className="absolute -top-6 -right-6 bg-blue-primary rounded-2xl shadow-2xl p-6">
              <div className="text-3xl font-normal text-white mb-1">
                &lt;15min
              </div>
              <div className="text-base text-blue-pale">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Free Consultation",
      description:
        "Schedule a call with our team to discuss your property and goals. We'll provide a custom revenue estimate. If interested we will schedule a walkthrough",
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Property Onboarding",
      description:
        "We handle professional photography, listing creation, property setup, cleaning, and prepare your property for the market.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Launch & Manage",
      description:
        "Your property goes live. We manage bookings, guests, cleaning, maintenance, and everything in between.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Earn & Grow",
      description:
        "Receive direct deposits and detailed reports. Watch your passive income grow and enjoy a true hands-off experience.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-normal text-black mb-4">How It Works</h2>
          <p className="text-slate-text text-xl">
            Get started in four simple steps and start earning passive income
            from your property
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-primary to-transparent -translate-y-1/2" />
              )}

              <div className="relative bg-white rounded-2xl border border-gray-200 p-6 h-full">
                <div className="absolute -top-4 left-6 px-3 py-1 bg-blue-primary text-white text-sm rounded-full">
                  0{index + 1}
                </div>

                <div className="w-12 h-12 rounded-lg bg-blue-pale flex items-center justify-center text-blue-primary mb-6 mt-4">
                  {step.icon}
                </div>

                <h3 className="text-xl font-normal text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-text text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
