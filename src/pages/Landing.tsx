import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, ArrowRight, ShieldCheck, Clock, FileText, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    title: 'Live Queue Tracking',
    description: 'No more waiting in crowded rooms. Track your turn in real-time from your phone and arrive just when the doctor is ready.',
    icon: Clock,
  },
  {
    title: 'Digital Health Records',
    description: 'All your prescriptions, lab reports, and consultation notes safely stored in one place. Accessible anytime, anywhere.',
    icon: FileText,
  },
  {
    title: 'Seamless Booking',
    description: 'Find top doctors and diagnostic centers, view their availability, and book appointments instantly.',
    icon: Smartphone,
  },
  {
    title: 'Secure & Private',
    description: 'Your medical data is encrypted and securely stored, complying with all healthcare data protection standards.',
    icon: ShieldCheck,
  },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
              <Activity className="size-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">MediQueue</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Log in</Link>
            <Button asChild size="sm" className="rounded-full px-5">
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse-ring" />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-teal-400 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse-ring" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-6 border border-blue-100">
              🚀 Revolutionizing Healthcare Access
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight text-slate-900 mb-8 max-w-4xl mx-auto leading-tight">
              Healthcare coordination, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                beautifully simplified.
              </span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with doctors, track live queues, manage digital prescriptions, and handle diagnostic reports—all from one intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="xl" variant="gradient" className="w-full sm:w-auto rounded-full group">
                <Link to="/register">
                  Join MediQueue Free 
                  <ArrowRight className="size-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto rounded-full bg-white/50 backdrop-blur-sm">
                <Link to="/login">Provider Login</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-10 border-y border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-slate-400 mb-6 uppercase tracking-wider">Trusted by leading healthcare providers</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Logos represented as text for now */}
            {['Apollo Hospitals', 'Max Healthcare', 'Fortis', 'Dr. Lal PathLabs', 'Manipal Hospitals'].map(name => (
              <span key={name} className="text-xl font-display font-bold text-slate-800">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Everything you need for a seamless experience</h2>
            <p className="text-lg text-slate-500">We've thought of every step in the patient journey to ensure you spend less time waiting and more time healing.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors group"
              >
                <div className="size-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="size-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-teal-900 opacity-50 mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500 rounded-full filter blur-[128px] opacity-20 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to transform your healthcare experience?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of others who are already using MediQueue to manage their health efficiently.</p>
          <Button asChild size="xl" className="rounded-full bg-white text-slate-900 hover:bg-slate-100 border-0">
            <Link to="/register">Create Your Free Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Activity className="size-5 text-blue-600" />
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">MediQueue</span>
        </div>
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} MediQueue Platforms Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}
