import { motion } from 'framer-motion'
import { Bell, Check, Calendar, Activity, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import PageHeader from '@/components/shared/PageHeader'

const notifications = [
  {
    id: '1',
    type: 'queue',
    icon: Activity,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Queue update: 3 patients ahead',
    description: 'Dr. Rohan Malhotra — Metro Life Hospital',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'appointment',
    icon: Calendar,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Appointment confirmed for tomorrow',
    description: 'Dr. Vikram Seth — Apex Heart & Care Clinic at 4:30 PM',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'report',
    icon: FileText,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    title: 'Lab report is ready',
    description: 'X-Ray Left Knee — City Diagnostics & Scan Center',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'reminder',
    icon: Bell,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: 'Medication reminder',
    description: 'Time to take OsteoPlus 500mg',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'appointment',
    icon: Check,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    title: 'Consultation completed',
    description: 'Dr. Rohan Malhotra — prescription has been issued.',
    time: 'Yesterday',
    read: true,
  },
]

export default function NotificationsPage() {
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <PageHeader
        title="Notifications"
        subtitle={`You have ${unread} unread notification${unread !== 1 ? 's' : ''}.`}
      />

      <div className="space-y-3">
        {notifications.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className={`hover:shadow-md transition-shadow duration-200 ${!n.read ? 'border-blue-100 bg-blue-50/30' : ''}`}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${n.iconBg}`}>
                  <n.icon className={`size-5 ${n.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold leading-tight ${n.read ? 'text-slate-700' : 'text-slate-900'}`}>{n.title}</p>
                    {!n.read && <Badge variant="info" className="text-[10px] px-1.5 py-0">New</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{n.description}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{n.time}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
