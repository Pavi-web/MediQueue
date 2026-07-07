import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Stethoscope, FileText, FlaskConical, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const actions = [
  {
    title: 'Book Doctor',
    description: 'Find specialists near you',
    to: '/dashboard/doctors',
    icon: Stethoscope,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hover: 'hover:border-blue-300 hover:bg-blue-50/60',
  },
  {
    title: 'Lab Tests',
    description: 'Book home sample collection',
    to: '/dashboard/diagnostics',
    icon: FlaskConical,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    hover: 'hover:border-teal-300 hover:bg-teal-50/60',
  },
  {
    title: 'My Records',
    description: 'View prescriptions & reports',
    to: '/dashboard/records',
    icon: FileText,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hover: 'hover:border-emerald-300 hover:bg-emerald-50/60',
  },
  {
    title: 'Find Hospital',
    description: 'Search by specialty',
    to: '/dashboard/hospitals',
    icon: Building2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    hover: 'hover:border-indigo-300 hover:bg-indigo-50/60',
  },
]

export default function QuickActions() {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, i) => (
        <motion.button
          key={action.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 * i, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(action.to)}
          className={cn(
            'group flex flex-col items-center text-center p-5 rounded-xl border bg-white shadow-sm',
            'transition-all duration-200 cursor-pointer w-full',
            action.border,
            action.hover,
          )}
        >
          <div className={cn(
            'size-12 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110',
            action.bg
          )}>
            <action.icon className={cn('size-6', action.color)} />
          </div>
          <h4 className="font-semibold text-slate-900 text-sm mb-1">{action.title}</h4>
          <p className="text-xs text-slate-500 leading-tight">{action.description}</p>
        </motion.button>
      ))}
    </div>
  )
}
