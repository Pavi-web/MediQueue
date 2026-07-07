import { motion } from 'framer-motion'
import { Calendar, FileText, FlaskConical, Stethoscope, ChevronRight } from 'lucide-react'
import { useStore } from '@/store'
import StatsCard from '@/components/shared/StatsCard'
import LiveQueueCard from '@/components/patient/LiveQueueCard'
import AppointmentCard from '@/components/patient/AppointmentCard'
import QuickActions from '@/components/patient/QuickActions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function PatientDashboard() {
  const { appointments, doctors, prescriptions } = useStore()

  // Filter for demo data
  const myAppointments = appointments.filter(a => a.patientName === 'Pavit Singh')
  const upcomingApt = myAppointments.filter(a => a.status === 'scheduled')
  const myPrescriptions = prescriptions.filter(p => p.patientName === 'Pavit Singh')

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-display font-bold text-slate-900"
        >
          Good morning, Pavit 👋
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="text-slate-500 mt-1"
        >
          Here is your healthcare summary for today.
        </motion.p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Upcoming Appointments"
          value={upcomingApt.length}
          subtitle="Next: Tomorrow, 10:00 AM"
          icon={Calendar}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          delay={0}
        />
        <StatsCard
          title="Pending Reports"
          value="2"
          subtitle="Awaiting lab results"
          icon={FlaskConical}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
          delay={0.1}
        />
        <StatsCard
          title="Active Prescriptions"
          value={myPrescriptions.length}
          subtitle="2 needs refill soon"
          icon={FileText}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          delay={0.2}
        />
        <StatsCard
          title="Recent Doctors"
          value="4"
          subtitle="In the last 6 months"
          icon={Stethoscope}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Quick Actions */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            </div>
            <QuickActions />
          </section>

          {/* Upcoming Appointments */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Upcoming Appointments</h2>
              <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingApt.length > 0 ? (
                upcomingApt.map((apt, i) => {
                  const doc = doctors.find(d => d.id === apt.doctorId)
                  return doc ? (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                    >
                      <AppointmentCard
                        id={apt.id}
                        doctorName={doc.name}
                        specialty={doc.specialization}
                        facility={doc.facilityName}
                        date={apt.date}
                        time={apt.time}
                        status={apt.status}
                        tokenNumber={apt.tokenNumber}
                      />
                    </motion.div>
                  ) : null
                })
              ) : (
                <div className="col-span-2 text-center p-8 border border-dashed rounded-xl border-slate-200">
                  <p className="text-slate-500">No upcoming appointments</p>
                </div>
              )}
            </div>
          </section>

          {/* Recent Prescriptions */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Recent Prescriptions</h2>
              <Button variant="ghost" size="sm" className="text-blue-600">View All</Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {myPrescriptions.length > 0 ? myPrescriptions.map(rx => {
                    return (
                      <div key={rx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <FileText className="size-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">Prescription from {rx.doctorName}</p>
                            <p className="text-sm text-slate-500">{rx.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="hidden sm:inline-flex">
                            {rx.medications.split('\n').length} Medicines
                          </Badge>
                          <Button variant="ghost" size="icon-sm" className="text-slate-400 hover:text-blue-600">
                            <ChevronRight className="size-5" />
                          </Button>
                        </div>
                      </div>
                    )
                  }) : (
                    <div className="p-8 text-center text-slate-500">No recent prescriptions</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Live Queue Widget */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Live Queue Status</h2>
            <LiveQueueCard />
          </section>

          {/* Health Timeline Summary */}
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Health Timeline</h2>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activities</CardTitle>
                <CardDescription>Your healthcare journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                  {/* Timeline Item 1 */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 rounded-full size-4 border-[3px] border-white bg-blue-500 shadow-sm" />
                    <p className="text-sm font-medium text-slate-900">Blood Test Completed</p>
                    <p className="text-xs text-slate-500 mt-0.5">City Diagnostics • Yesterday</p>
                  </div>
                  {/* Timeline Item 2 */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 rounded-full size-4 border-[3px] border-white bg-emerald-500 shadow-sm" />
                    <p className="text-sm font-medium text-slate-900">Prescription Refilled</p>
                    <p className="text-xs text-slate-500 mt-0.5">Apollo Pharmacy • 3 days ago</p>
                  </div>
                  {/* Timeline Item 3 */}
                  <div className="relative pl-6">
                    <span className="absolute -left-[9px] top-1 rounded-full size-4 border-[3px] border-white bg-slate-300 shadow-sm" />
                    <p className="text-sm font-medium text-slate-900">Consultation with Dr. Sharma</p>
                    <p className="text-xs text-slate-500 mt-0.5">Metro Life Hospital • Last week</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-6">View Full Timeline</Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
