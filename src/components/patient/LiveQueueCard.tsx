import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Clock, Users, MapPin, ChevronRight, AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

export default function LiveQueueCard() {
  const { doctors, appointments } = useStore()

  // Use first active appointment for demo
  const activeApt = appointments.find(a => a.status === 'active' || a.status === 'scheduled')
  const doc = doctors.find(d => d.id === activeApt?.doctorId)

  if (!activeApt || !doc) {
    return (
      <Card className="border-dashed border-2 border-slate-200">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-3">
          <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Activity className="size-6 text-slate-400" />
          </div>
          <div>
            <p className="font-medium text-slate-700">No Active Queue</p>
            <p className="text-sm text-slate-400 mt-1">Book an appointment to see live queue status here.</p>
          </div>
          <Button variant="outline" size="sm">Book Appointment</Button>
        </CardContent>
      </Card>
    )
  }

  const myToken = activeApt.tokenNumber
  const currentToken = doc.currentToken || 1
  const totalTokens = doc.totalTokens || myToken
  const ahead = Math.max(0, myToken - currentToken)
  const estWait = ahead * 10
  const progress = Math.min(100, Math.round((currentToken / Math.max(totalTokens, 1)) * 100))
  const isMyTurn = myToken === currentToken

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="overflow-hidden border-blue-100 shadow-sm">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="size-2.5 rounded-full bg-emerald-300" />
                <div className="size-2.5 rounded-full bg-emerald-300 absolute inset-0 animate-ping opacity-75" />
              </div>
              <span className="text-sm font-semibold tracking-wide">LIVE QUEUE</span>
            </div>
            <Badge className="bg-white/20 text-white border-0 text-xs">
              {isMyTurn ? '🔔 Your Turn!' : `${ahead} ahead`}
            </Badge>
          </div>
          <div className="mt-3 flex items-end gap-6">
            <div>
              <p className="text-blue-100 text-xs uppercase tracking-wider">Now Serving</p>
              <p className="text-4xl font-bold leading-none mt-1">#{currentToken}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs uppercase tracking-wider">Your Token</p>
              <p className="text-4xl font-bold leading-none mt-1 text-white/90">#{myToken}</p>
            </div>
            {!isMyTurn && (
              <div className="ml-auto text-right">
                <p className="text-blue-100 text-xs uppercase tracking-wider">Est. Wait</p>
                <p className="text-2xl font-bold leading-none mt-1">~{estWait}m</p>
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-5 space-y-4">
          {/* Queue Progress */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Queue Progress</span>
              <span>{currentToken} / {totalTokens} patients</span>
            </div>
            <Progress
              value={progress}
              className="h-2.5"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-teal-500"
            />
          </div>

          {/* Status Message */}
          <AnimatePresence mode="wait">
            {isMyTurn ? (
              <motion.div
                key="my-turn"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 bg-emerald-50 rounded-xl p-3.5 border border-emerald-200"
              >
                <div className="size-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="size-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">It's your turn!</p>
                  <p className="text-xs text-emerald-600">Please proceed to {doc.facilityName} – Cabin {(myToken % 3) + 1}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 bg-amber-50 rounded-xl p-3.5 border border-amber-200"
              >
                <div className="size-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="size-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">{ahead} patient{ahead !== 1 ? 's' : ''} ahead of you</p>
                  <p className="text-xs text-amber-600">
                    Arrive by {new Date(Date.now() + Math.max(0, estWait - 10) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Doctor & Location */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="size-4 text-slate-400" />
              <span className="font-medium">{doc.name}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-400">{doc.specialization}</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-blue-600 hover:text-blue-700 pr-0">
              Details <ChevronRight className="size-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="size-3.5" />
            <span>{doc.facilityName}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
