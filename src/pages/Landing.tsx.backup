import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Activity, ArrowRight, ShieldCheck, Clock, FileText, Smartphone,
  Star, Users, Building2, CheckCircle, ChevronRight, UserPlus,
  Ticket, Stethoscope, FlaskConical, Pill, Calendar, Heart, Shield,
  Bell, Zap, Bot, Languages, ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import SmartHospitalIllustration from '@/components/shared/SmartHospitalIllustration'

/* ─── Data ─────────────────────────────────────────────── */
const featuresList = [
  {
    title: 'Smart Queue Management',
    description: 'Minimize waiting room congestion with real-time queue synchronization and automated token coordinates.',
    icon: Ticket,
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Appointment Scheduling',
    description: 'Find top-rated healthcare specialists, view live slots, and confirm appointments in under 30 seconds.',
    icon: Calendar,
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    title: 'Digital Health Records',
    description: 'Access prescriptions, lab diagnostics, and vaccination history securely from one intelligent dashboard.',
    icon: FileText,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Healthcare Security',
    description: 'HIPAA-compliant, military-grade end-to-end encryption keeping your medical history fully confidential.',
    icon: ShieldCheck,
    gradient: 'from-purple-500 to-indigo-600',
  },
  {
    title: 'AI Appointment Suggestions',
    description: 'Get intelligent booking recommendations based on doctor availability, load distributions, and symptoms.',
    icon: Bot,
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Hospital Navigation',
    description: 'Locate partner medical units nearby and navigate to departments effortlessly with active maps.',
    icon: Smartphone,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Laboratory Integration',
    description: 'Diagnostic labs sync directly with your timeline, uploading reports as soon as they are signed off.',
    icon: FlaskConical,
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    title: 'Digital Prescriptions',
    description: 'Paperless prescriptions sent straight to your wallet, immediately ready for pharmacy pickup.',
    icon: Pill,
    gradient: 'from-rose-500 to-red-600',
  },
]

const timelineSteps = [
  { title: 'Create Account', desc: 'Register as a patient or doctor securely with your digital credentials.', icon: UserPlus },
  { title: 'Book Appointment', desc: 'Browse specialties and secure a slot with your preferred doctor.', icon: Calendar },
  { title: 'Receive Digital Token', desc: 'Get an active live-tracked digital token directly on your dashboard.', icon: Ticket },
  { title: 'Visit Hospital', desc: 'Arrive at the clinic precisely when the queue progress updates your turn.', icon: Smartphone },
  { title: 'Consult Doctor', desc: 'Experience a seamless consultation without waiting in crowded lounges.', icon: Stethoscope },
  { title: 'Digital Prescription', desc: 'Access your paperless medicine orders instantly on your phone.', icon: Pill },
  { title: 'Laboratory Reports', desc: 'Receive diagnostic scan and blood test reports digitally within hours.', icon: FlaskConical },
  { title: 'Complete Visit', desc: 'Checkout smoothly with historical records stored on your cloud profile.', icon: CheckCircle },
]

const doctorsList = [
  { name: 'Dr. Rohan Malhotra', specialty: 'Cardiology', exp: '12 Years', rating: '4.9', languages: 'English, Hindi', img: '👨‍⚕️' },
  { name: 'Dr. Shalini Sen', specialty: 'Pediatrics', exp: '8 Years', rating: '4.7', languages: 'English, Bengali', img: '👩‍⚕️' },
  { name: 'Dr. Vikram Seth', specialty: 'Orthopedics', exp: '15 Years', rating: '4.8', languages: 'English, Punjabi', img: '👨‍⚕️' },
  { name: 'Dr. Amit Verma', specialty: 'General Medicine', exp: '6 Years', rating: '4.5', languages: 'English, Hindi', img: '👨‍⚕️' },
]

const whyChooseList = [
  { title: 'Reduce Waiting Time', desc: 'Save hours spent in waiting rooms with dynamic queue coordinates.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
  { title: 'Digital Healthcare', desc: 'Access clinical consultations, bills, and prescriptions in one centralized platform.', icon: Smartphone, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
  { title: 'AI Queue Optimization', desc: 'Smart workload balances patient arrivals to optimize doctor schedules.', icon: Bot, color: 'text-violet-500', bg: 'bg-violet-500/10 border-violet-500/20' },
  { title: 'Smart Notifications', desc: 'Get SMS, email, and live app alerts when your token is near.', icon: Bell, color: 'text-teal-500', bg: 'bg-teal-500/10 border-teal-500/20' },
  { title: 'Secure Medical Records', desc: 'HIPAA-grade encryption ensures that your private health records stay private.', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { title: 'Multi-Hospital Platform', desc: 'Check in at any partner hospital or lab using a single account.', icon: Building2, color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/20' },
]

const testimonialsList = [
  { name: 'Priya Sharma', role: 'Patient', text: "I used to wait 2–3 hours at the clinic. With MediQueue I arrived exactly when it was my turn. Life-changing experience!", rating: 5, avatar: 'PS' },
  { name: 'Dr. Rohan Malhotra', role: 'Cardiologist', text: "MediQueue cut my no-shows by 60%. My schedule is finally under control and my patients are much happier.", rating: 5, avatar: 'RM' },
  { name: 'Ananya Rao', role: 'Patient', text: "Having all my prescriptions and laboratory reports in one app is incredibly convenient. I highly recommend it.", rating: 5, avatar: 'AR' },
  { name: 'Dr. Shalini Sen', role: 'Pediatrician', text: "The queue progress synchronization allows my clinic to run efficiently without crowded lobbies.", rating: 5, avatar: 'SS' },
]

/* ─── Animated Counter ──────────────────────────────────── */
function AnimatedCounter({ from = 0, to, duration = 1.5, suffix = '', decimals = 0 }: { from?: number, to: number, duration?: number, suffix?: string, decimals?: number }) {
  const [count, setCount] = useState(from)
  const elementRef = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true)
        let startTimestamp: number | null = null
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp
          const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
          setCount(progress * (to - from) + from)
          if (progress < 1) {
            window.requestAnimationFrame(step)
          }
        }
        window.requestAnimationFrame(step)
      }
    }, { threshold: 0.1 })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [from, to, duration, hasAnimated])

  const displayVal = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString()

  return (
    <span ref={elementRef}>
      {displayVal}
      {suffix}
    </span>
  )
}

/* ─── Page ───────────────────────────────────────────────── */
export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Custom Timeline Scroll Progress Ref
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  })

  // Carousels State
  const [activeDocIndex, setActiveDocIndex] = useState(0)
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto Slider for Doctors Showcase
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDocIndex((prev) => (prev + 1) % doctorsList.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Auto Slider for Testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonialsList.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const nextDoc = () => setActiveDocIndex((prev) => (prev + 1) % doctorsList.length)
  const prevDoc = () => setActiveDocIndex((prev) => (prev - 1 + doctorsList.length) % doctorsList.length)

  return (
    <div className="min-h-screen bg-white overflow-hidden">

      {/* ── Navbar ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Activity className="size-5 text-white relative z-10 animate-pulse" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">MediQueue</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</Link>
            <Button asChild size="sm" variant="gradient" className="rounded-full px-5 shadow-sm shadow-blue-500/10 hover:shadow-teal-500/20 transition-all duration-300">
              <Link to="/register">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden bg-white">
        {/* Premium Background Visuals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Radial Gradient glows */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-400/5 to-teal-400/5 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-400/5 to-emerald-400/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          
          {/* Light Medical Cross Pattern */}
          <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.12]">
            <defs>
              <pattern id="cross-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 28 30 L 32 30 M 30 28 L 30 32" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cross-pattern)" />
          </svg>

          {/* Floating Blurred Gradient Circles */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-[10%] left-[8%] w-[200px] h-[200px] bg-blue-300/10 rounded-full blur-[70px]"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0]
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-[15%] right-[5%] w-[250px] h-[250px] bg-teal-300/10 rounded-full blur-[80px]"
          />

          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                opacity: [0.1, 0.35, 0.1],
              }}
              transition={{
                duration: 9 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.2,
              }}
              className={`absolute size-${i % 2 === 0 ? '1.5' : '2'} bg-blue-400 rounded-full blur-[0.5px]`}
              style={{
                top: `${20 + i * 10}%`,
                left: `${5 + (i * 13) % 90}%`,
              }}
            />
          ))}

          {/* Animated ECG heartbeat line behind right section */}
          <div className="absolute right-[-10%] top-[25%] w-[60%] opacity-[0.05] flex items-center justify-center">
            <svg viewBox="0 0 800 300" fill="none" className="w-full">
              <path
                d="M 0 150 L 220 150 L 240 120 L 260 180 L 280 150 L 300 150 L 315 60 L 335 240 L 355 130 L 365 170 L 380 150 L 800 150"
                stroke="#2563eb"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1600"
                strokeDashoffset="1600"
              >
                <animate attributeName="stroke-dashoffset" values="1600;0" dur="4.5s" repeatCount="indefinite" />
              </path>
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge above heading */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-emerald-50/50 hover:bg-emerald-50/80 border border-emerald-100/50 backdrop-blur-sm text-emerald-800 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6 shadow-sm shadow-emerald-50/10 cursor-default transition-colors duration-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Trusted by 50+ Hospitals Across India
              </motion.div>

              {/* Main Heading with Word Stagger */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12,
                      delayChildren: 0.2
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6"
              >
                {["Skip", "the", "Queue.", "Not", "the", "Care."].map((word, i) => {
                  const isQueue = word.includes("Queue")
                  return (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 15 },
                        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
                      }}
                      className={isQueue 
                        ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 mr-2 lg:mr-3"
                        : "inline-block mr-2 lg:mr-3"
                      }
                    >
                      {word}
                    </motion.span>
                  )
                })}
              </motion.h1>

              {/* Subheading */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-lg"
              >
                Book appointments, track live queues, receive digital prescriptions, access laboratory reports, and manage your complete healthcare journey from one intelligent platform.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                {/* Book Appointment Primary Gradient Button */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Button asChild size="lg" variant="gradient" className="rounded-full group w-full sm:w-auto shadow-lg shadow-blue-500/15 hover:shadow-teal-500/25 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    <Link to="/register" className="flex items-center justify-center">
                      Book Appointment <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>

                {/* Track My Queue Secondary Glassmorphism Button */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Button asChild size="lg" className="rounded-full w-full sm:w-auto bg-white/40 hover:bg-white/60 backdrop-blur-md border border-slate-200/50 text-slate-800 shadow-sm hover:shadow-md hover:border-slate-300/60 transition-all duration-300">
                    <Link to="/login" className="flex items-center justify-center">
                      Track My Queue
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Three Glass Trust Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="grid grid-cols-3 gap-3 md:gap-4"
              >
                {/* Card 1 */}
                <div className="backdrop-blur-md bg-white/40 hover:bg-white/70 border border-white/50 rounded-2xl p-3 md:p-4 shadow-sm flex items-center gap-3 transition-colors duration-300 hover:shadow-md">
                  <div className="text-2xl shrink-0">👨‍⚕️</div>
                  <div>
                    <p className="text-lg md:text-xl font-display font-extrabold text-slate-800 leading-none mb-1">
                      <AnimatedCounter to={12000} suffix="+" />
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold leading-tight">Happy Patients</p>
                  </div>
                </div>
                
                {/* Card 2 */}
                <div className="backdrop-blur-md bg-white/40 hover:bg-white/70 border border-white/50 rounded-2xl p-3 md:p-4 shadow-sm flex items-center gap-3 transition-colors duration-300 hover:shadow-md">
                  <div className="text-2xl shrink-0">🏥</div>
                  <div>
                    <p className="text-lg md:text-xl font-display font-extrabold text-slate-800 leading-none mb-1">
                      <AnimatedCounter to={50} suffix="+" />
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold leading-tight">Partner Hospitals</p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="backdrop-blur-md bg-white/40 hover:bg-white/70 border border-white/50 rounded-2xl p-3 md:p-4 shadow-sm flex items-center gap-3 transition-colors duration-300 hover:shadow-md">
                  <div className="text-2xl shrink-0">⭐</div>
                  <div>
                    <p className="text-lg md:text-xl font-display font-extrabold text-slate-800 leading-none mb-1">
                      <AnimatedCounter to={4.9} decimals={1} />
                    </p>
                    <p className="text-[10px] text-slate-500 font-semibold leading-tight">Patient Satisfaction</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Illustration only (no live patient cards/widget) */}
            <div className="flex flex-col justify-center relative">
              <SmartHospitalIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-slate-950 border-y border-slate-900 relative overflow-hidden">
        {/* Subtle glows */}
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 50, label: 'Partner Hospitals', icon: '🏥', suffix: '+' },
              { value: 10000, label: 'Patients Served', icon: '👨‍⚕️', suffix: '+' },
              { value: 200, label: 'Medical Specialists', icon: '🩺', suffix: '+' },
              { value: 4.9, label: 'Average Rating', icon: '⭐', suffix: '', decimals: 1 },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="backdrop-blur-md bg-slate-900/40 border border-slate-850 hover:border-blue-500/30 transition-all duration-300 rounded-[24px] p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)] group relative overflow-hidden"
              >
                <div className="absolute -right-8 -top-8 size-20 rounded-full bg-blue-500/5 blur-xl group-hover:bg-blue-500/10 transition-colors" />
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="text-4xl md:text-5xl font-display font-extrabold text-white mb-2 tracking-tight">
                  <AnimatedCounter to={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="text-slate-400 text-sm font-semibold tracking-wide uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(37,99,235,0.02)_100%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-100/50">Features</span>
            <h2 className="text-4xl font-display font-extrabold text-slate-900 mb-5 leading-tight">Built for every step of your healthcare journey</h2>
            <p className="text-lg text-slate-500 leading-relaxed">MediQueue handles coordination complexities so you can focus on what matters most — receiving proper care.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresList.map((f, i) => {
              const IconComponent = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="group bg-white rounded-[24px] p-6 border border-slate-200/60 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between min-h-[290px] relative overflow-hidden"
                >
                  <div className="w-full">
                    {/* Visual Vector Icon Grid in Background */}
                    <div className="size-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="size-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{f.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">{f.description}</p>
                  </div>
                  
                  <Link 
                    to="/login"
                    className="inline-flex items-center text-blue-600 text-xs font-bold hover:text-blue-700 transition-colors group-hover:gap-1.5 gap-1"
                  >
                    Learn More <ChevronRight className="size-4" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works (Timeline) ── */}
      <section id="how-it-works" className="py-24 bg-white relative" ref={timelineRef}>
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-4 px-3 py-1 rounded-full bg-teal-50 border border-teal-100/50">Process</span>
            <h2 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">How MediQueue works</h2>
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Scroll-Linked Progress Timeline Line */}
            <div className="absolute left-6 md:left-[50%] top-6 bottom-6 w-1 bg-slate-100 -translate-x-[50%]">
              <motion.div 
                style={{ 
                  scaleY: scrollYProgress,
                  originY: 0 
                }} 
                className="w-full h-full bg-gradient-to-b from-blue-600 via-teal-500 to-emerald-500 rounded-full" 
              />
            </div>

            {timelineSteps.map((step, i) => {
              const IconComponent = step.icon
              const isEven = i % 2 === 0
              return (
                <div 
                  key={step.title}
                  className="flex flex-col md:flex-row md:justify-between items-start md:items-center relative mb-12 md:mb-16 last:mb-0"
                >
                  {/* Left Side Content Card on Desktop */}
                  <div className={`w-full md:w-[44%] order-2 md:order-1 ${isEven ? 'md:text-right' : 'md:text-left opacity-0 pointer-events-none hidden md:block'}`}>
                    {isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="backdrop-blur-md bg-white border border-slate-150 rounded-[20px] p-5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Centered Timeline Circular Icon Badge */}
                  <div className="absolute left-0 md:left-[50%] top-1 md:top-auto -translate-x-[50%] z-10 order-1 md:order-2">
                    <motion.div 
                      whileHover={{ scale: 1.15 }}
                      className="size-12 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-blue-200 border-4 border-white cursor-default"
                    >
                      <IconComponent className="size-4" />
                    </motion.div>
                  </div>

                  {/* Right Side Content Card on Desktop */}
                  <div className={`w-full md:w-[44%] order-2 md:order-3 ${!isEven ? 'md:text-left' : 'md:text-right opacity-0 pointer-events-none hidden md:block'}`}>
                    {!isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="backdrop-blur-md bg-white border border-slate-150 rounded-[20px] p-5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                        <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile content fallback card */}
                  <div className="w-full pl-6 md:hidden order-2">
                    <div className="backdrop-blur-md bg-white border border-slate-150 rounded-[20px] p-4 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Doctor Showcase Section (Carousel) ── */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/50">Our Specialists</span>
            <h2 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">Meet our top providers</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Sliding Carousel Track */}
            <div className="overflow-hidden px-4 md:px-12 py-6">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeDocIndex * 100}%)` }}
              >
                {doctorsList.map((doc, idx) => (
                  <div key={doc.name} className="w-full shrink-0 flex justify-center px-2">
                    <motion.div 
                      whileHover={{ y: -8 }}
                      className="backdrop-blur-md bg-white rounded-[24px] border border-slate-200/80 shadow-[0_12px_40px_rgba(31,38,135,0.04)] overflow-hidden max-w-md w-full flex flex-col md:flex-row gap-6 p-6 group transition-all duration-300"
                    >
                      <div className="size-28 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-5xl shadow-inner shrink-0 self-center">
                        {doc.img}
                      </div>
                      <div className="flex-1 flex flex-col justify-between text-left">
                        <div>
                          <span className="text-[10px] text-blue-600 font-bold tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100/30">{doc.specialty}</span>
                          <h3 className="text-xl font-bold text-slate-900 mt-2.5 mb-1 group-hover:text-blue-600 transition-colors">{doc.name}</h3>
                          <p className="text-slate-400 text-xs font-semibold mb-3">{doc.exp} Experience</p>
                          <div className="space-y-1.5 text-xs text-slate-500">
                            <p className="flex items-center gap-1.5">
                              <Languages className="size-3.5 text-slate-400" />
                              <span>{doc.languages}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-5">
                          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100/30 px-2.5 py-0.5 rounded-full">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-xs font-bold text-slate-700">{doc.rating}</span>
                          </div>
                          <Button asChild size="sm" variant="ghost" className="rounded-full gap-1 group/btn text-blue-600 hover:text-blue-700 hover:bg-blue-50/50">
                            <Link to="/login">
                              View Profile <ArrowRight className="size-3.5 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {doctorsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDocIndex(i)}
                  className={`size-2.5 rounded-full transition-all duration-300 ${
                    activeDocIndex === i ? 'bg-blue-600 w-6' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Section ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-block text-teal-600 font-semibold text-sm uppercase tracking-wider mb-4 px-3 py-1 rounded-full bg-teal-50 border border-teal-100/50">Why Choose Us</span>
            <h2 className="text-4xl font-display font-extrabold text-slate-900 mb-5 leading-tight">Elevating clinical efficiency and patient experiences</h2>
            <p className="text-lg text-slate-500">MediQueue bridges clinical workloads with automated patient scheduling to secure faster care coordinates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseList.map((c, i) => {
              const IconComponent = c.icon
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="backdrop-blur-md bg-white border border-slate-200/60 hover:border-blue-200 hover:shadow-xl rounded-[24px] p-6 transition-all duration-300 flex items-start gap-4 hover:scale-[1.01]"
                >
                  <div className={`size-10 rounded-xl ${c.bg} border flex items-center justify-center shrink-0`}>
                    <IconComponent className={`size-5 ${c.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{c.title}</h3>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section (Carousel) ── */}
      <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-4 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/50">Testimonials</span>
            <h2 className="text-4xl font-display font-extrabold text-slate-900 leading-tight">Loved by patients and healthcare providers</h2>
          </div>

          <div className="relative max-w-3xl mx-auto px-4">
            <div className="overflow-hidden py-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonialIndex * 100}%)` }}
              >
                {testimonialsList.map((t) => (
                  <div key={t.name} className="w-full shrink-0 flex justify-center px-1">
                    <div className="backdrop-blur-md bg-white border border-slate-200 rounded-[28px] p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] max-w-xl relative flex flex-col justify-between">
                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-1 mb-5">
                          {Array.from({ length: t.rating }).map((_, idx) => (
                            <Star key={idx} className="size-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed italic mb-8">"{t.text}"</p>
                      </div>

                      <div className="flex items-center gap-3 border-t border-slate-100 pt-5">
                        <div className="size-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 text-white flex items-center justify-center font-bold shadow-sm">
                          {t.avatar}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm">{t.name}</span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                              <CheckCircle className="size-2.5 fill-emerald-500 text-white" />
                              Verified
                            </span>
                          </div>
                          <span className="text-xs text-slate-400">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonialsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonialIndex(i)}
                  className={`size-2.5 rounded-full transition-all duration-300 ${
                    activeTestimonialIndex === i ? 'bg-blue-600 w-6' : 'bg-slate-300'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Call To Action ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 border border-slate-900 rounded-[32px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-left">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Column Content */}
            <div className="max-w-xl relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-4 leading-tight">
                Experience Smarter Healthcare with MediQueue
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
                Simplify doctor appointments, reduce waiting room time, and experience intelligent healthcare management through one unified platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" variant="gradient" className="rounded-full group shadow-md shadow-blue-500/20">
                  <Link to="/register">
                    Book Appointment <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="rounded-full bg-white/10 hover:bg-white/20 border-white/10 text-white shadow-sm transition-all duration-300">
                  <Link to="/login">Explore Features</Link>
                </Button>
              </div>
            </div>

            {/* Right Column Illustration */}
            <div className="relative w-full max-w-[280px] md:max-w-[360px] aspect-square shrink-0 flex items-center justify-center pointer-events-none select-none z-10">
              {/* Coordination Web Vector SVG */}
              <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_10px_20px_rgba(37,99,235,0.2)]">
                <circle cx="150" cy="150" r="120" stroke="rgba(37,99,235,0.08)" strokeWidth="2" />
                <circle cx="150" cy="150" r="90" stroke="rgba(20,184,166,0.06)" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="60" stroke="rgba(37,99,235,0.04)" strokeWidth="1" />
                
                {/* Connecting Web Nodes */}
                <line x1="150" y1="150" x2="60" y2="100" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="150" x2="240" y2="100" stroke="rgba(20,184,166,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="150" y1="150" x2="150" y2="240" stroke="rgba(37,99,235,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="60" y1="100" x2="240" y2="100" stroke="rgba(20,184,166,0.08)" strokeWidth="1" />
                <line x1="240" y1="100" x2="150" y2="240" stroke="rgba(37,99,235,0.08)" strokeWidth="1" />
                <line x1="150" y1="240" x2="60" y2="100" stroke="rgba(37,99,235,0.08)" strokeWidth="1" />

                {/* Central Ring Shield Pulse */}
                <circle cx="150" cy="150" r="30" fill="url(#cta-glow)" />
                <path d="M 143 150 L 148 155 L 157 146" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" />
                
                <defs>
                  <radialGradient id="cta-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.2)" />
                    <stop offset="100%" stopColor="rgba(20,184,166,0)" />
                  </radialGradient>
                </defs>

                {/* Surrounding Nodes */}
                <g transform="translate(60, 100)">
                  <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <Heart className="size-4 text-rose-500 absolute -translate-x-[50%] -translate-y-[50%] scale-75" style={{ left: 0, top: 0 }} />
                </g>
                <g transform="translate(240, 100)">
                  <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <ShieldCheck className="size-4 text-teal-400 absolute -translate-x-[50%] -translate-y-[50%] scale-75" style={{ left: 0, top: 0 }} />
                </g>
                <g transform="translate(150, 240)">
                  <circle cx="0" cy="0" r="12" fill="#1e293b" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                  <Activity className="size-4 text-blue-400 absolute -translate-x-[50%] -translate-y-[50%] scale-75" style={{ left: 0, top: 0 }} />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white py-12 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <Activity className="size-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900">MediQueue</span>
          </div>
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} MediQueue Platforms Inc. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-500 font-semibold">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
