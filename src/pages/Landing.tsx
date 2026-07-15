import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Calendar, ShieldCheck, Zap, Users, Play, ChevronRight, Check } from 'lucide-react';

export default function Landing() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-900 selection:text-white">
      {/* ── Navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-zinc-950 rounded-lg flex items-center justify-center">
              <Activity className="size-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-lg">MediQueue</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-zinc-950 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-zinc-950 transition-colors">Process</a>
            <a href="#trust" className="hover:text-zinc-950 transition-colors">Partners</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors">
              Log in
            </Link>
            <Link to="/register" className="text-sm font-medium bg-zinc-950 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-colors shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-sm font-medium mb-8"
          >
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            MediQueue 2.0 is now live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-950 max-w-4xl text-balance leading-[1.1]"
          >
            Healthcare routing, <span className="text-zinc-400">simplified.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed"
          >
            An intelligent queue management platform that connects patients with the right specialists in record time. Reduce waiting, increase care.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to="/register" className="h-12 px-8 bg-zinc-950 text-white rounded-full flex items-center justify-center font-medium hover:bg-zinc-800 transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5">
              Start Building
            </Link>
            <button className="h-12 px-8 bg-white border border-zinc-200 text-zinc-900 rounded-full flex items-center justify-center font-medium hover:bg-zinc-50 transition-all group">
              <Play className="size-4 mr-2 fill-zinc-900" />
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Floating abstract UI mockup */}
        <motion.div 
          style={{ y }}
          className="mt-20 max-w-5xl mx-auto px-6 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 h-[200px] bottom-0 top-auto" />
          <div className="rounded-[32px] border border-zinc-200/60 bg-white/50 backdrop-blur-2xl p-4 shadow-2xl relative z-0 overflow-hidden">
            <div className="bg-zinc-50 rounded-[20px] border border-zinc-100 overflow-hidden flex flex-col md:flex-row h-[400px]">
              {/* Sidebar Mock */}
              <div className="w-64 border-r border-zinc-200/60 p-6 hidden md:flex flex-col bg-white">
                <div className="flex items-center gap-2 mb-8">
                  <div className="size-6 bg-emerald-500 rounded flex items-center justify-center">
                    <Activity className="size-3 text-white" />
                  </div>
                  <span className="font-bold text-sm tracking-tight text-zinc-900">MediQueue</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 bg-zinc-100 rounded-lg text-zinc-900 font-medium text-sm">
                    <Calendar className="size-4" />
                    Appointments
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 rounded-lg font-medium text-sm transition-colors">
                    <Users className="size-4" />
                    Patients
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-zinc-500 hover:bg-zinc-50 rounded-lg font-medium text-sm transition-colors">
                    <Zap className="size-4" />
                    Analytics
                  </div>
                </div>
              </div>
              {/* Content Mock */}
              <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 bg-zinc-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Today's Schedule</h3>
                    <p className="text-xs text-zinc-500">Dr. Sarah Jenkins • Cardiology</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="size-8 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                      <Check className="size-4 text-emerald-600" />
                    </div>
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-4 flex flex-col justify-between h-24 transition-all hover:shadow-md">
                    <span className="text-xs font-medium text-zinc-500">Total Patients</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-zinc-900">42</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">+12%</span>
                    </div>
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-4 flex flex-col justify-between h-24 transition-all hover:shadow-md">
                    <span className="text-xs font-medium text-zinc-500">Avg Wait Time</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-zinc-900">14m</span>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">-5m</span>
                    </div>
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-4 flex flex-col justify-between h-24 transition-all hover:shadow-md">
                    <span className="text-xs font-medium text-zinc-500">Active Queues</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-zinc-900">3</span>
                    </div>
                  </div>
                </div>
                
                {/* Main list */}
                <div className="flex-1 bg-white border border-zinc-200 rounded-xl shadow-sm p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-100">
                    <span className="text-sm font-semibold text-zinc-900">Current Queue</span>
                    <span className="text-xs font-medium text-zinc-500">Updated just now</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Michael Chang", time: "09:30 AM", status: "In Progress", color: "bg-blue-100 text-blue-700" },
                      { name: "Emma Watson", time: "09:45 AM", status: "Waiting", color: "bg-amber-100 text-amber-700" },
                      { name: "David Miller", time: "10:00 AM", status: "Upcoming", color: "bg-zinc-100 text-zinc-700" },
                    ].map((patient, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-600">
                            {patient.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">{patient.name}</p>
                            <p className="text-xs text-zinc-500">{patient.time}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${patient.color}`}>
                          {patient.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Marquee (Social Proof) ── */}
      <section id="trust" className="py-12 border-y border-zinc-100 overflow-hidden bg-zinc-50/50">
        <p className="text-center text-sm font-medium text-zinc-500 mb-8">Trusted by leading healthcare providers</p>
        <div className="flex relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center px-8 md:px-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="size-8 bg-zinc-900 rounded flex items-center justify-center">
                  <Activity className="size-4 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">Hospital {i}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for infinite loop */}
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-32 items-center px-8 md:px-16 absolute top-0" style={{ animationDelay: '-15s' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`dup-${i}`} className="flex items-center gap-3 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <div className="size-8 bg-zinc-900 rounded flex items-center justify-center">
                  <Activity className="size-4 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">Hospital {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features (Minimal Bento) ── */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-950 mb-6">
              Everything you need.<br/><span className="text-zinc-400">Nothing you don't.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Big Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-zinc-50 rounded-3xl p-8 border border-zinc-200/80 flex flex-col justify-between overflow-hidden relative group"
            >
              <div className="relative z-10 max-w-sm">
                <div className="size-10 bg-white shadow-sm border border-zinc-200 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="size-5 text-zinc-900" />
                </div>
                <h3 className="text-2xl font-bold text-zinc-950 mb-2">Instant Scheduling</h3>
                <p className="text-zinc-500">Real-time availability syncing ensures zero double-booking and instant confirmations.</p>
              </div>
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 group-hover:translate-x-1/5 transition-transform duration-500">
                <div className="w-64 h-64 border border-zinc-200 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <div className="w-48 h-48 border border-zinc-100 bg-zinc-50 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* Small Card 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-1 bg-zinc-950 rounded-3xl p-8 border border-zinc-800 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="relative z-10">
                <div className="size-10 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
                  <ShieldCheck className="size-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Secure Data</h3>
                <p className="text-zinc-400 text-sm">Enterprise-grade encryption for all patient records.</p>
              </div>
            </motion.div>

            {/* Small Card 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-1 bg-white rounded-3xl p-8 border border-zinc-200/80 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <div>
                <div className="size-10 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-center mb-6">
                  <Users className="size-5 text-zinc-900" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950 mb-2">Multi-tenant</h3>
                <p className="text-zinc-500 text-sm">Manage multiple clinics from a single dashboard.</p>
              </div>
            </motion.div>

            {/* Medium Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 bg-zinc-50 rounded-3xl p-8 border border-zinc-200/80 flex flex-col justify-between"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="size-10 bg-white shadow-sm border border-zinc-200 rounded-xl flex items-center justify-center mb-6">
                    <Calendar className="size-5 text-zinc-900" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-950 mb-2">Smart Queues</h3>
                  <p className="text-zinc-500">Algorithmic wait-time predictions adjust dynamically based on live clinic data.</p>
                </div>
                <div className="flex-1 w-full flex flex-col gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-zinc-200 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                      <div className="size-8 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-xs text-zinc-500">{i}</div>
                      <div className="flex-1">
                        <div className="h-2 w-1/2 bg-zinc-200 rounded-full mb-2" />
                        <div className="h-2 w-1/4 bg-zinc-100 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sticky Scroll (How it works) ── */}
      <section id="how-it-works" className="py-24 md:py-32 bg-zinc-950 text-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Sticky Left Side */}
            <div className="lg:sticky lg:top-32 h-fit">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
                A seamless flow.
              </h2>
              <p className="text-zinc-400 text-lg max-w-md">
                We've abstracted away the complexity of medical coordination. Here is how MediQueue handles the heavy lifting.
              </p>
            </div>

            {/* Scrolling Right Side */}
            <div className="space-y-24 py-12">
              {[
                { title: "Book", desc: "Patients select an available slot through the intuitive frontend. Real-time sync prevents collisions." },
                { title: "Route", desc: "Our engine assigns the patient to the optimal specialist queue based on availability and urgency." },
                { title: "Care", desc: "Doctors receive a curated daily digest of appointments, integrated directly with their EHR systems." },
              ].map((step, i) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0.2, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="size-12 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center font-bold text-zinc-400">
                      0{i + 1}
                    </div>
                    {i !== 2 && <div className="w-px h-full bg-zinc-800 mt-6" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-lg">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Minimal CTA ── */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-950 mb-8">
            Ready to modernize?
          </h2>
          <p className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto">
            Join thousands of clinics optimizing their patient flow with MediQueue today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="h-14 px-8 bg-zinc-950 text-white rounded-full flex items-center justify-center text-lg font-medium hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Create free account
            </Link>
            <Link to="/login" className="h-14 px-8 bg-white border border-zinc-200 text-zinc-900 rounded-full flex items-center justify-center text-lg font-medium hover:bg-zinc-50 transition-all">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-zinc-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="size-6 bg-zinc-950 rounded md flex items-center justify-center">
                  <Activity className="size-3 text-white" />
                </div>
                <span className="font-semibold tracking-tight">MediQueue</span>
              </div>
              <p className="text-zinc-500 text-sm max-w-xs">Building the infrastructure for modern healthcare coordination.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h4 className="font-semibold text-zinc-950 mb-4 text-sm">Product</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-950">Features</a></li>
                  <li><a href="#" className="hover:text-zinc-950">Pricing</a></li>
                  <li><a href="#" className="hover:text-zinc-950">Changelog</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-950 mb-4 text-sm">Company</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-950">About</a></li>
                  <li><a href="#" className="hover:text-zinc-950">Blog</a></li>
                  <li><a href="#" className="hover:text-zinc-950">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-zinc-950 mb-4 text-sm">Legal</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li><a href="#" className="hover:text-zinc-950">Privacy</a></li>
                  <li><a href="#" className="hover:text-zinc-950">Terms</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} MediQueue Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
                </span>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
