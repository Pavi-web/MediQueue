import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, X, MoreVertical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useStore } from '@/store'
import PageHeader from '@/components/shared/PageHeader'
import { cn } from '@/lib/utils'

type Tab = 'upcoming' | 'completed' | 'cancelled'

const tabConfig: Record<Tab, { label: string; emptyMsg: string }> = {
  upcoming: { label: 'Upcoming', emptyMsg: 'No upcoming appointments. Book one now!' },
  completed: { label: 'Completed', emptyMsg: 'No completed appointments yet.' },
  cancelled: { label: 'Cancelled', emptyMsg: 'No cancelled appointments.' },
}

export default function AppointmentsPage() {
  const { appointments, doctors, cancelAppointment } = useStore()
  const [activeTab, setActiveTab] = useState<Tab>('upcoming')

  const myAppointments = appointments.filter(a => a.patientName === 'Pavit Singh')

  const statusMap: Record<Tab, ('scheduled' | 'active' | 'completed' | 'cancelled')[]> = {
    upcoming: ['scheduled', 'active'],
    completed: ['completed'],
    cancelled: ['cancelled'],
  }

  const filtered = myAppointments.filter(a => statusMap[activeTab].includes(a.status))

  const statusBadge = (status: string) => {
    if (status === 'active') return <Badge variant="success">In Progress</Badge>
    if (status === 'scheduled') return <Badge variant="info">Upcoming</Badge>
    if (status === 'completed') return <Badge variant="secondary">Completed</Badge>
    return <Badge variant="destructive">Cancelled</Badge>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader
        title="My Appointments"
        subtitle="View, manage, and track all your medical appointments."
      />

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6 w-fit">
        {(Object.keys(tabConfig) as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              activeTab === tab
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {tabConfig[tab].label}
            <span className={cn(
              'ml-1.5 text-xs px-1.5 py-0.5 rounded-full',
              activeTab === tab ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-500'
            )}>
              {myAppointments.filter(a => statusMap[tab].includes(a.status)).length}
            </span>
          </button>
        ))}
      </div>

      {/* Appointment List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400 border-2 border-dashed rounded-2xl">
              <Calendar className="size-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-slate-600">{tabConfig[activeTab].emptyMsg}</p>
            </div>
          ) : (
            filtered.map((apt, i) => {
              const doc = doctors.find(d => d.id === apt.doctorId)
              return (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <Avatar className="size-12 border border-slate-100 shadow-sm shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 font-medium">
                            {doc?.name.split(' ').filter(w => w !== 'Dr.').map(w => w[0]).join('').substring(0, 2) ?? 'DR'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-slate-900">{apt.doctorName}</h4>
                              <p className="text-sm text-slate-500">{doc?.specialization ?? 'General'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {statusBadge(apt.status)}
                              {(apt.status === 'scheduled' || apt.status === 'active') && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon-sm" className="text-slate-400">
                                      <MoreVertical className="size-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={() => cancelAppointment(apt.id)}>
                                      <X className="size-4 mr-2" /> Cancel
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1.5"><Calendar className="size-3.5 text-slate-400" />{apt.date}</span>
                            <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-slate-400" />{apt.time}</span>
                            <span className="flex items-center gap-1.5 col-span-2"><MapPin className="size-3.5 text-slate-400 shrink-0" />{apt.facilityName}</span>
                          </div>

                          {apt.symptoms && (
                            <p className="mt-3 text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2 line-clamp-2">
                              <span className="font-medium text-slate-500">Symptoms: </span>{apt.symptoms}
                            </p>
                          )}

                          {apt.tokenNumber && apt.status !== 'cancelled' && (
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-slate-400">Token Number</span>
                              <span className="font-bold text-slate-800 text-lg">#{apt.tokenNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
