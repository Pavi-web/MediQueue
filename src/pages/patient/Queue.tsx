import { motion, AnimatePresence } from 'framer-motion'
import { Activity, MapPin, Clock, Users, ChevronRight, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useStore } from '@/store'
import PageHeader from '@/components/shared/PageHeader'

export default function QueuePage() {
  const { appointments, doctors } = useStore()

  const myAppointments = appointments.filter(
    a => a.patientName === 'Pavit Singh' && (a.status === 'scheduled' || a.status === 'active')
  )

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        title="Live Queue Tracking"
        subtitle="Real-time status for all your active appointments."
      />

      {myAppointments.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed rounded-2xl text-slate-400">
          <Activity className="size-12 mx-auto mb-4 opacity-30" />
          <p className="font-semibold text-slate-600 text-lg">No active queue entries</p>
          <p className="text-sm mt-2">Book an appointment to start tracking your queue in real-time.</p>
          <Button className="mt-6" variant="outline">Book a Doctor</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {myAppointments.map((apt, i) => {
            const doc = doctors.find(d => d.id === apt.doctorId)
            if (!doc) return null

            const myToken = apt.tokenNumber
            const currentToken = doc.currentToken || 1
            const totalTokens = doc.totalTokens || myToken
            const ahead = Math.max(0, myToken - currentToken)
            const estWait = ahead * 10
            const progress = Math.min(100, Math.round((currentToken / Math.max(totalTokens, 1)) * 100))
            const isMyTurn = myToken === currentToken

            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <Card className="overflow-hidden border-blue-100">
                  {/* Gradient header */}
                  <div className={`px-6 py-4 text-white ${isMyTurn ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-600 to-teal-500'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="size-2.5 rounded-full bg-white/80" />
                          <div className="size-2.5 rounded-full bg-white/80 absolute inset-0 animate-ping" />
                        </div>
                        <span className="font-semibold text-sm tracking-wide">LIVE</span>
                      </div>
                      <Badge className="bg-white/20 text-white border-0">
                        {isMyTurn ? '🔔 Your Turn!' : `${ahead} patients ahead`}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-blue-100 text-xs uppercase tracking-wider">Now Serving</p>
                        <p className="text-4xl font-bold">#{currentToken}</p>
                      </div>
                      <div>
                        <p className="text-blue-100 text-xs uppercase tracking-wider">Your Token</p>
                        <p className="text-4xl font-bold">#{myToken}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-100 text-xs uppercase tracking-wider">Est. Wait</p>
                        <p className="text-3xl font-bold">~{estWait}m</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Queue Progress</span>
                        <span>{currentToken} / {totalTokens} patients seen</span>
                      </div>
                      <Progress
                        value={progress}
                        className="h-3"
                        indicatorClassName={isMyTurn ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-500'}
                      />
                    </div>

                    {/* Status alert */}
                    <AnimatePresence mode="wait">
                      {isMyTurn ? (
                        <motion.div
                          key="turn"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-3 bg-emerald-50 rounded-xl p-4 border border-emerald-200"
                        >
                          <AlertCircle className="size-5 text-emerald-600 shrink-0" />
                          <div>
                            <p className="font-semibold text-emerald-800 text-sm">It's your turn! Please proceed to the cabin.</p>
                            <p className="text-xs text-emerald-600 mt-0.5">{doc.facilityName}</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="wait"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-3 bg-amber-50 rounded-xl p-4 border border-amber-200"
                        >
                          <Clock className="size-5 text-amber-600 shrink-0" />
                          <div>
                            <p className="font-semibold text-amber-800 text-sm">
                              Arrive by {new Date(Date.now() + Math.max(0, estWait - 10) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-xs text-amber-600 mt-0.5">{ahead} patient{ahead !== 1 ? 's' : ''} ahead of you</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Doctor & location */}
                    <div className="space-y-1.5 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-slate-400" />
                        <span className="font-medium">{doc.name}</span>
                        <span className="text-slate-400">·</span>
                        <span>{doc.specialization}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-slate-400" />
                        <span>{doc.facilityName}</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full gap-2 mt-2">
                      Get Directions <ChevronRight className="size-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
