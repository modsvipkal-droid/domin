import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  Crown,
  DollarSign,
  Zap,
  Shield,
  Palette,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Globe,
  ArrowRight,
  Send,
  Star,
  Clock,
  BadgeCheck,
  Sparkles,
  Search,
  MousePointerClick,
  CreditCard,
  HandshakeIcon,
} from "lucide-react";

const TELEGRAM_LINK = "https://t.me/kal_mods";

/* ==============================
   DOMAIN DATA
   ============================== */
const domains = [
  {
    name: "wingoai.pro",
    category: "AI Brand",
    features: ["AI Brand", "Premium Domain", "SEO Friendly"],
    color: "#7C3AED",
    icon: Sparkles,
    price: "$499",
    originalPrice: "$799",
  },
  {
    name: "kalmods.pro",
    category: "Brand Domain",
    features: ["Brand Domain", "Short & Memorable", "Premium"],
    color: "#00E5FF",
    icon: Crown,
    price: "$299",
    originalPrice: "$599",
  },
  {
    name: "wingovip.pro",
    category: "VIP Brand",
    features: ["VIP Brand", "High Value", "Premium"],
    color: "#22C55E",
    icon: Star,
    price: "$899",
    originalPrice: "$1,299",
  },
];

/* ==============================
   WHY CHOOSE US DATA
   ============================== */
const benefits = [
  {
    icon: Crown,
    title: "Premium Domains",
    desc: "Handpicked, brandable domains perfect for AI, SaaS, crypto, and modern businesses.",
  },
  {
    icon: DollarSign,
    title: "Affordable Prices",
    desc: "Get premium domains at prices that won't break the bank. Best value guaranteed.",
  },
  {
    icon: Zap,
    title: "Instant Transfer",
    desc: "Lightning-fast domain transfers. Own your domain within minutes of payment.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    desc: "Every transaction is safe and verified. 100% ownership transfer guaranteed.",
  },
  {
    icon: Palette,
    title: "Easy Branding",
    desc: "Domains crafted for brand identity. Stand out with a memorable online presence.",
  },
  {
    icon: MessageCircle,
    title: "24/7 Telegram Support",
    desc: "Get instant support anytime on Telegram. We're always here to help you.",
  },
];

/* ==============================
   HOW IT WORKS DATA
   ============================== */
const steps = [
  { icon: Search, title: "Choose Domain", desc: "Browse our curated collection and pick your perfect domain." },
  { icon: MousePointerClick, title: "Click DM for Buy", desc: "Hit the Buy button to start the purchase process." },
  { icon: Send, title: "Chat on Telegram", desc: "Connect with us instantly for a smooth transaction." },
  { icon: CreditCard, title: "Complete Payment", desc: "Make a secure payment through your preferred method." },
  { icon: HandshakeIcon, title: "Receive Domain", desc: "Get full ownership transfer to your account." },
];

/* ==============================
   FAQ DATA
   ============================== */
const faqs = [
  {
    q: "How do I buy a domain?",
    a: "Simply click the 'DM for Buy' button on any domain card. This will open our Telegram chat where you can discuss the domain, negotiate pricing, and complete the purchase securely.",
  },
  {
    q: "How long does the transfer take?",
    a: "Domain transfers are usually completed within minutes after payment confirmation. In rare cases, it may take up to 24 hours depending on the registrar.",
  },
  {
    q: "Can I negotiate the price?",
    a: "Yes, absolutely! We're open to reasonable negotiations. Contact us on Telegram and we'll work out a fair deal that works for both parties.",
  },
  {
    q: "Are these domains original?",
    a: "Yes, all domains listed are 100% original and legally owned by us. You'll receive complete ownership transfer with full control over the domain.",
  },
];

/* ==============================
   ANIMATION VARIANTS
   ============================== */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ==============================
   SPARKLE ICON for Buy Button
   ============================== */
function SparkleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={`sparkle ${className || ""}`} width="24" height="24">
      <path
        className="path"
        d="M12 1l1.5 7.5L21 10l-7.5 1.5L12 19l-1.5-7.5L3 10l7.5-1.5z"
      />
      <path
        className="path"
        d="M12 1l1.5 7.5L21 10l-7.5 1.5L12 19l-1.5-7.5L3 10l7.5-1.5z"
        transform="rotate(45 12 12)"
      />
      <path
        className="path"
        d="M12 1l1.5 7.5L21 10l-7.5 1.5L12 19l-1.5-7.5L3 10l7.5-1.5z"
        transform="rotate(90 12 12)"
      />
    </svg>
  );
}

/* ==============================
   BUY BUTTON - Premium Animated
   ============================== */
function BuyButton({ href, text, icon: Icon, onClick, className = "" }) {
  const content = (
    <>
      <span className="dots_border" />
      <SparkleIcon />
      <span className="text_button">{text}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`buy-button ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`buy-button ${className}`}>
      {content}
    </button>
  );
}

/* ==============================
   NAVBAR COMPONENT
   ============================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Domains", href: "#domains" },
    { label: "Benefits", href: "#benefits" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300 ${
        scrolled ? "py-3 shadow-lg shadow-black/20" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight">KalMods</span>
            <span className="text-lg font-bold text-[#7C3AED] tracking-tight"> Domains</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7C3AED] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <BuyButton href={TELEGRAM_LINK} text="Telegram" />
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu fixed inset-0 top-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 text-white p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-2xl font-semibold text-white hover:text-[#7C3AED] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <BuyButton href={TELEGRAM_LINK} text="DM for Buy" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ==============================
   HERO SECTION
   ============================== */
function HeroSection() {
  const stats = [
    { icon: Globe, value: "3", label: "Premium Domains" },
    { icon: BadgeCheck, value: "100%", label: "Ownership Transfer" },
    { icon: Shield, value: "Secure", label: "Deal" },
    { icon: Zap, value: "Fast", label: "Delivery" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="glow-orb glow-orb-primary w-[500px] h-[500px] -top-20 -right-20 animate-float" />
      <div className="glow-orb glow-orb-accent w-[400px] h-[400px] -bottom-20 -left-20 animate-float-delayed" />
      <div className="glow-orb glow-orb-primary w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.06)]"
        >
          <Sparkles className="w-4 h-4 text-[#7C3AED]" />
          <span className="text-sm font-medium text-[#9F67FF]">Premium Domain Marketplace</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
        >
          <span className="text-white">Own Premium Domains</span>
          <br />
          <span className="gradient-text">Before Anyone Else</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Discover premium brandable domains perfect for AI startups, SaaS, crypto, trading platforms,
          businesses, and online brands — at affordable prices.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#domains"
            className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 relative z-10 w-full sm:w-auto justify-center"
          >
            <Globe className="w-5 h-5 relative z-10" />
            <span className="relative z-10">View Domains</span>
          </a>
          <BuyButton href={TELEGRAM_LINK} text="DM for Buy" />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="stat-card text-center">
              <stat.icon className="w-5 h-5 text-[#7C3AED] mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-[#64748B]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   DOMAIN CARD COMPONENT
   ============================== */
function DomainCard({ domain, index }) {
  const [copied, setCopied] = useState(false);
  const Icon = domain.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(domain.name);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.02 }}
      className="domain-card p-6 sm:p-8 flex flex-col h-full"
    >
      {/* Top row: category + availability */}
      <div className="flex items-center justify-between mb-6">
        <span className="badge-category flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" />
          {domain.category}
        </span>
        <span className="badge-available flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          Available
        </span>
      </div>

      {/* Domain Name */}
      <div className="mb-4">
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1 font-mono">
          {domain.name}
        </h3>
        <p className="text-sm text-[#64748B]">Premium .pro domain</p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl sm:text-3xl font-extrabold text-white">{domain.price}</span>
        {domain.originalPrice && (
          <span className="text-sm text-[#64748B] line-through">{domain.originalPrice}</span>
        )}
        <span className="badge-new text-[10px] px-2 py-0.5">Limited</span>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-8">
        {domain.features.map((f) => (
          <span key={f} className="feature-pill">{f}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-auto flex flex-col sm:flex-row gap-3">
        <BuyButton href={TELEGRAM_LINK} text="Buy Now" />
        <button
          onClick={handleCopy}
          className="btn-outline flex items-center justify-center gap-2 py-3 px-4 text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#22C55E]" />
              <span className="text-[#22C55E]">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

/* ==============================
   DOMAINS SECTION
   ============================== */
function DomainsSection() {
  return (
    <section id="domains" className="relative py-24 sm:py-32">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.06)] text-sm font-medium text-[#9F67FF]">
            <Globe className="w-4 h-4" />
            Marketplace
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Available <span className="gradient-text">Domains</span>
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto">
            Premium, brandable domains ready for your next big project. Grab yours before they&#39;re gone.
          </p>
        </motion.div>

        {/* Domain Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {domains.map((domain, index) => (
            <DomainCard key={domain.name} domain={domain} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   WHY CHOOSE US SECTION
   ============================== */
function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="section-divider mb-24" />
      {/* Background orb */}
      <div className="glow-orb glow-orb-primary w-[400px] h-[400px] top-1/2 -right-40 animate-float-slow opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.06)] text-sm font-medium text-[#9F67FF]">
            <Star className="w-4 h-4" />
            Why Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="gradient-text">KalMods</span>
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto">
            We make buying premium domains simple, secure, and affordable.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((b) => (
            <motion.div key={b.title} variants={staggerItem} className="glass-card p-6 sm:p-8 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(124,58,237,0.15)] to-[rgba(124,58,237,0.05)] border border-[rgba(124,58,237,0.15)] flex items-center justify-center mb-5 group-hover:border-[rgba(124,58,237,0.3)] transition-all duration-300">
                <b.icon className="w-6 h-6 text-[#7C3AED]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   HOW IT WORKS SECTION
   ============================== */
function HowItWorksSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mb-24" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.06)] text-sm font-medium text-[#9F67FF]">
            <ArrowRight className="w-4 h-4" />
            Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto">
            Get your dream domain in just 5 simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#7C3AED] via-[rgba(124,58,237,0.3)] to-transparent hidden sm:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="flex items-start gap-4 sm:gap-6 mb-8 last:mb-0 group"
            >
              {/* Step Number Circle */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[rgba(124,58,237,0.15)] to-[rgba(124,58,237,0.05)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center group-hover:border-[rgba(124,58,237,0.4)] group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-400">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#7C3AED]" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#7C3AED] flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shadow-lg shadow-purple-500/30">
                  {i + 1}
                </div>
              </div>

              {/* Step Content */}
              <div className="glass-card p-5 sm:p-6 flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-sm text-[#94A3B8]">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   CTA SECTION
   ============================== */
function CTASection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="section-divider mb-24" />

      {/* Background effects */}
      <div className="glow-orb glow-orb-primary w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow opacity-30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.06)] text-sm font-medium text-[#9F67FF]">
            <Clock className="w-4 h-4" />
            Limited Availability
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Ready To Own Your
            <br />
            <span className="gradient-text">Premium Domain?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl mx-auto mb-10">
            Secure your favorite domain before someone else buys it. Don&#39;t miss out on the perfect
            brand name for your next big project.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BuyButton href={TELEGRAM_LINK} text="DM for Buy on Telegram" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   FAQ SECTION
   ============================== */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="section-divider mb-24" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.06)] text-sm font-medium text-[#9F67FF]">
            <MessageCircle className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto">
            Got questions? We&#39;ve got answers.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className={`faq-item ${openIndex === i ? "active" : ""}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="text-sm sm:text-base font-semibold text-white pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-[#7C3AED]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="text-sm text-[#94A3B8] leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   CUSTOM DOMAIN SECTION
   ============================== */
function CustomDomainSection() {
  const [domainName, setDomainName] = useState("");
  const [selectedExt, setSelectedExt] = useState(".pro");

  const extensions = [".pro", ".com", ".net", ".org", ".io", ".ai", ".app", ".dev"];

  const handleRequest = () => {
    if (!domainName.trim()) return;
    const fullDomain = domainName.trim() + selectedExt;
    const msg = encodeURIComponent(`Hi! I want to buy a custom domain: ${fullDomain}`);
    window.open(`${TELEGRAM_LINK}?text=${msg}`, "_blank");
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="section-divider mb-24" />

      {/* Ambient Orbs */}
      <div className="ambient-orb w-[500px] h-[500px] -top-20 -right-20 bg-[rgba(124,58,237,0.2)]" />
      <div className="ambient-orb w-[400px] h-[400px] -bottom-20 -left-20 bg-[rgba(0,229,255,0.12)]" style={{ animationDelay: "-4s" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[rgba(124,58,237,0.2)] bg-[rgba(124,58,237,0.06)] text-sm font-medium text-[#9F67FF]">
            <Globe className="w-4 h-4" />
            Custom Domain
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Buy Your <span className="gradient-text">Customize Domain</span>
          </h2>
          <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto">
            Don&apos;t see the domain you want? Request any custom domain name and we&apos;ll get it for you
            at the best price with fast transfer.
          </p>
        </motion.div>

        {/* Domain Request Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="custom-domain-wrapper p-6 sm:p-10"
        >
          <div className="input-group">
            <div className="domain-input-wrap">
              <Globe className="w-5 h-5 domain-icon" />
              <input
                type="text"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                placeholder="yourdomain"
                onKeyDown={(e) => e.key === "Enter" && handleRequest()}
              />
            </div>

            {/* Extension Selector */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedExt}
                onChange={(e) => setSelectedExt(e.target.value)}
                className="domain-input-wrap px-4 py-2 text-white font-mono text-sm cursor-pointer"
                style={{
                  background: "rgba(3,2,10,0.6)",
                  border: "1px solid rgba(124,58,237,0.15)",
                  borderRadius: "1rem",
                  padding: "1rem 1.25rem",
                  color: "#F1F0FF",
                  fontFamily: '"JetBrains Mono", monospace',
                  outline: "none",
                  minWidth: "5rem",
                }}
              >
                {extensions.map((ext) => (
                  <option key={ext} value={ext} style={{ background: "#0D0B1E", color: "#F1F0FF" }}>
                    {ext}
                  </option>
                ))}
              </select>

              <BuyButton
                text="Request Domain"
                onClick={handleRequest}
              />
            </div>
          </div>

          {/* Price info + features */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4 text-sm"
          >
            <span className="price-tag">
              <DollarSign className="w-3.5 h-3.5" />
              Best Price Guaranteed
            </span>
            <span className="price-tag">
              <Zap className="w-3.5 h-3.5" />
              Fast Transfer
            </span>
            <span className="price-tag">
              <Shield className="w-3.5 h-3.5" />
              Secure Ownership
            </span>
            <span className="price-tag">
              <MessageCircle className="w-3.5 h-3.5" />
              24/7 Support
            </span>
          </motion.div>
        </motion.div>

        {/* Popular TLDs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-[#64748B] mb-4">Popular extensions we offer:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {extensions.map((ext) => (
              <button
                key={ext}
                onClick={() => setSelectedExt(ext)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wide transition-all duration-300 cursor-pointer border ${
                  selectedExt === ext
                    ? "bg-[rgba(124,58,237,0.2)] border-[#7C3AED] text-[#A78BFA] shadow-lg shadow-purple-500/10"
                    : "bg-[rgba(124,58,237,0.04)] border-[rgba(124,58,237,0.1)] text-[#64748B] hover:border-[rgba(124,58,237,0.25)] hover:text-[#94A3B8]"
                }`}
              >
                {ext}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ==============================
   FOOTER
   ============================== */
function Footer() {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "Domains", href: "#domains" },
    { label: "Benefits", href: "#benefits" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-[rgba(124,58,237,0.1)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">KalMods</span>
                <span className="text-lg font-bold text-[#7C3AED]"> Domains</span>
              </div>
            </a>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
              Premium Domain Marketplace. Handpicked domains at affordable prices with instant transfer and 24/7 support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Get in Touch</h4>
            <p className="text-sm text-[#94A3B8] mb-4">
              Ready to buy? Reach out on Telegram for instant support and secure transactions.
            </p>
            <BuyButton href={TELEGRAM_LINK} text="Open Telegram" />
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B]">© 2026 KalMods Domains. All rights reserved.</p>
          <p className="text-xs text-[#64748B]">Premium Domains at Affordable Prices</p>
        </div>
      </div>
    </footer>
  );
}

/* ==============================
   MAIN PAGE
   ============================== */
export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  /* Schema.org JSON-LD */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KalMods Domains",
    url: "https://kalmods.pro",
    description:
      "Buy premium domains like wingoai.pro, kalmods.pro, and wingovip.pro at affordable prices with secure ownership transfer and fast support.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://kalmods.pro/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const productData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Premium Domains for Sale",
    itemListElement: domains.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: d.name,
        description: `Premium ${d.category} domain - ${d.name}`,
        category: d.category,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: "KalMods Domains" },
        },
      },
    })),
  };

  return (
    <>
      <Head>
        {/* Primary SEO */}
        <title>Premium Domains for Sale | KalMods Domains</title>
        <meta
          name="description"
          content="Buy premium domains like wingoai.pro, kalmods.pro, and wingovip.pro at affordable prices with secure ownership transfer and fast support."
        />
        <meta
          name="keywords"
          content="Premium Domains, Buy Domain, Cheap Premium Domain, AI Domain, Brandable Domain, Domain Marketplace, KalMods, Wingo AI, Wingo VIP, SEO Friendly Domain"
        />
        <meta name="author" content="KalMods Domains" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://kalmods.pro/" />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Premium Domains for Sale | KalMods Domains" />
        <meta
          property="og:description"
          content="Buy premium domains like wingoai.pro, kalmods.pro, and wingovip.pro at affordable prices with secure ownership transfer."
        />
        <meta property="og:url" content="https://kalmods.pro/" />
        <meta property="og:site_name" content="KalMods Domains" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Premium Domains for Sale | KalMods Domains" />
        <meta
          name="twitter:description"
          content="Buy premium domains like wingoai.pro, kalmods.pro, and wingovip.pro at affordable prices."
        />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
        />
      </Head>

      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center glow-primary">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold text-white">KalMods</span>
                <span className="text-xl font-bold text-[#7C3AED]">Domains</span>
              </div>
              <div className="w-40 h-1 bg-[rgba(124,58,237,0.15)] rounded-full overflow-hidden mt-2">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative min-h-screen">
        <Navbar />
        <HeroSection />
        <DomainsSection />
        <BenefitsSection />
        <HowItWorksSection />
        <CTASection />
        <FAQSection />
        <CustomDomainSection />
        <Footer />
      </div>

      {/* Copy Toast (global) */}
      <AnimatePresence>
        {/* Toast handled inside DomainCard component */}
      </AnimatePresence>
    </>
  );
}
