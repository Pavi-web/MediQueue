import { Outlet } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Brand / Visual */}
      <div className="hidden lg:flex flex-col flex-1 bg-gradient-to-br from-blue-600 to-teal-600 text-white p-12 relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-white blur-3xl mix-blend-overlay" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-teal-300 blur-3xl mix-blend-overlay" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Activity className="size-6 text-white" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight">MediQueue</span>
        </div>

        <div className="relative z-10 mt-auto max-w-lg">
          <h1 className="text-4xl font-display font-bold leading-tight mb-6">
            The intelligent healthcare coordination platform.
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Join thousands of patients, doctors, and hospitals experiencing a seamless, transparent, and connected healthcare journey.
          </p>
        </div>

        {/* Floating elements visual representation */}
        <div className="relative z-10 mt-12 grid grid-cols-2 gap-4 opacity-80">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="h-2 w-1/3 bg-white/30 rounded-full mb-3" />
            <div className="h-2 w-2/3 bg-white/20 rounded-full mb-2" />
            <div className="h-2 w-1/2 bg-white/20 rounded-full" />
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 mt-8">
            <div className="h-2 w-1/2 bg-white/30 rounded-full mb-3" />
            <div className="h-2 w-full bg-white/20 rounded-full mb-2" />
            <div className="h-2 w-3/4 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="size-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shadow-md">
              <Activity className="size-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900">MediQueue</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
