import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Calendar, FileText, FlaskConical, Stethoscope,
  ChevronRight, TrendingUp, Heart, Bell
} from 'lucide-react'
import { useStore } from '@/store'
import StatsCard from '@/components/shared/StatsCard'
import LiveQueueCard from '@/components/patient/LiveQueueCard'
import QuickActions from '@/components/patient/QuickActions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Map doctorId to photo
const doctorPhotos: Record<string, string> = {
  'doc-1': '/doctor_rohan.png',
  'doc-2': '/doctor_shalini.png',
  'doc-3': '/doctor_vikram.png',
  'doc-4': '/doctor_amit.png',
}

export default function PatientDashboard() {
  const { appointments, doctors, prescriptions } = useStore()
  const navigate = useNavigate()

  const myAppointments = appointments.filter(a => a.patientName === 'Pavit Singh')
  const upcomingApt = myAppointments.filter(a => a.status === 'scheduled' || a.status === 'active')
  const myPrescriptions = prescriptions.filter(p => p.patientName === 'Pavit Singh' || p.patientName === 'Ananya Rao')

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">

      {/* ── Greeting Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-display font-bold text-slate-900">
            {greeting()}, Pavit 👋
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-slate-500 mt-1 text-sm">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </motion.p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate('/dashboard/notifications')}>
          <Bell className="size-4" />
          <span className="hidden sm:inline">3 Alerts</span>
          <span className="size-2 rounded-full bg-red-500" />
        </Button>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Appointments" value={upcomingApt.length} subtitle="Active bookings" icon={Calendar} iconColor="text-blue-600" iconBg="bg-blue-50" trend={{ value: 12, label: 'vs last month' }} delay={0} />
        <StatsCard title="Pending Reports" value="2" subtitle="Awaiting results" icon={FlaskConical} iconColor="text-teal-600" iconBg="bg-teal-50" delay={0.1} />
        <StatsCard title="Prescriptions" value={myPrescriptions.length} subtitle="Active & archived" icon={FileText} iconColor="text-emerald-600" iconBg="bg-emerald-50" delay={0.2} />
        <StatsCard title="Doctors Consulted" value="4" subtitle="In last 6 months" icon={Stethoscope} iconColor="text-indigo-600" iconBg="bg-indigo-50" trend={{ value: 2, label: 'new' }} delay={0.3} />
      </div>

      {/* ── Health Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 p-6 text-white flex items-center justify-between gap-4 overflow-hidden relative"
      >
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <Heart className="w-64 h-64 -translate-y-1/4 translate-x-1/4" />
        </div>
        <div className="relative">
          <p className="text-blue-100 text-sm font-medium mb-1">Your Health Score</p>
          <p className="text-4xl font-bold mb-1">87 <span className="text-2xl text-blue-200">/ 100</span></p>
          <div className="flex items-center gap-1.5 text-sm text-blue-100">
            <TrendingUp className="size-4 text-emerald-300" />
            <span className="text-emerald-300 font-semibold">+5 pts</span> from last month
          </div>
        </div>
        <div className="relative hidden sm:block text-right">
          <p className="text-blue-100 text-xs mb-2 uppercase tracking-wider">Next checkup recommended</p>
          <p className="text-xl font-bold">In 30 days</p>
          <Button variant="outline" size="sm" className="mt-3 border-white/30 text-white hover:bg-white/10 hover:text-white">
            Book Now
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* ── Main Column ── */}
        <div className="xl:col-span-2 space-y-8">

          {/* Quick Actions */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <QuickActions />
          </section>

          {/* Upcoming Appointments */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Appointments</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 gap-1" onClick={() => navigate('/dashboard/appointments')}>
                View All <ChevronRight className="size-4" />
              </Button>
            </div>
            {upcomingApt.length > 0 ? (
              <div className="space-y-3">
                {upcomingApt.slice(0, 3).map((apt, i) => {
                  const doc = doctors.find(d => d.id === apt.doctorId)
                  return doc ? (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <Card className="hover:shadow-md transition-shadow duration-200 border-slate-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="size-12 shrink-0 border-2 border-white shadow-md">
                              <AvatarImage src={doctorPhotos[apt.doctorId]} alt={doc.name} className="object-cover" />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white font-semibold">
                                {doc.name.split(' ').filter(w => w !== 'Dr.').map(w => w[0]).join('').substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-semibold text-slate-900 truncate">{doc.name}</h4>
                                <Badge variant={apt.status === 'active' ? 'success' : 'info'} className="shrink-0">
                                  {apt.status === 'active' ? 'In Progress' : 'Upcoming'}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-500">{doc.specialization}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                                <span>📅 {apt.date}</span>
                                <span>🕐 {apt.time}</span>
                                <span className="font-semibold text-blue-600">Token #{apt.tokenNumber}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : null
                })}
              </div>
            ) : (
              <div className="text-center p-10 border-2 border-dashed rounded-xl border-slate-200 text-slate-400">
                <Calendar className="size-8 mx-auto mb-2 opacity-40" />
                <p className="font-medium text-slate-600">No upcoming appointments</p>
                <Button size="sm" className="mt-4" onClick={() => navigate('/dashboard/doctors')}>Book a Doctor</Button>
              </div>
            )}
          </section>

          {/* Recent Prescriptions */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Recent Prescriptions</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 gap-1" onClick={() => navigate('/dashboard/records')}>
                View All <ChevronRight className="size-4" />
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {myPrescriptions.length > 0 ? myPrescriptions.map(rx => (
                    <div key={rx.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => navigate('/dashboard/records')}>
                      <div className="size-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <FileText className="size-5 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 text-sm">Prescription · {rx.doctorName}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{rx.date} · {rx.medications.split('\n').length} medications</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rx.status === 'completed' ? 'success' : rx.status === 'tests_booked' ? 'info' : 'warning'}>
                          {rx.status === 'completed' ? 'Done' : rx.status === 'tests_booked' ? 'Tests Booked' : 'Pending'}
                        </Badge>
                        <ChevronRight className="size-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  )) : (
                    <div className="p-10 text-center text-slate-400 text-sm">No prescriptions yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-6">

          {/* Live Queue */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Live Queue</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 gap-1" onClick={() => navigate('/dashboard/queue')}>
                Full View <ChevronRight className="size-4" />
              </Button>
            </div>
            <LiveQueueCard />
          </section>

          {/* My Doctors */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">My Doctors</h2>
              <Button variant="ghost" size="sm" className="text-blue-600 gap-1" onClick={() => navigate('/dashboard/doctors')}>
                Browse <ChevronRight className="size-4" />
              </Button>
            </div>
            <Card>
              <CardContent className="p-4 space-y-3">
                {doctors.slice(0, 3).map(doc => (
                  <div key={doc.id} className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/dashboard/doctors')}>
                    <Avatar className="size-10 border border-slate-100 shadow-sm shrink-0">
                      <AvatarImage src={doctorPhotos[doc.id]} alt={doc.name} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-400 to-teal-400 text-white text-xs font-semibold">
                        {doc.name.split(' ').filter(w => w !== 'Dr.').map(w => w[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{doc.name}</p>
                      <p className="text-xs text-slate-400 truncate">{doc.specialization}</p>
                    </div>
                    <ChevronRight className="size-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Health Timeline */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Health Timeline</h2>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Recent Activities</CardTitle>
                <CardDescription>Your healthcare journey</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-5">
                  {[
                    { color: 'bg-blue-500', title: 'Blood Test Completed', sub: 'City Diagnostics · Yesterday', icon: '🧪' },
                    { color: 'bg-emerald-500', title: 'Prescription Refilled', sub: 'Apollo Pharmacy · 3 days ago', icon: '💊' },
                    { color: 'bg-slate-300', title: 'Consult: Dr. Malhotra', sub: 'Metro Life Hospital · Last week', icon: '👨‍⚕️' },
                  ].map((item, i) => (
                    <div key={i} className="relative pl-6">
                      <span className={`absolute -left-[9px] top-1 rounded-full size-4 border-[3px] border-white ${item.color} shadow-sm`} />
                      <p className="text-sm font-medium text-slate-900">{item.icon} {item.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
