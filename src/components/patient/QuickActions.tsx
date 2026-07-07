import { motion } from 'framer-motion'
import { Stethoscope, FileText, FlaskConical, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const actions = [
  {
    title: 'Book Doctor',
    description: 'Find specialists near you',
    icon: Stethoscope,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hover: 'hover:border-blue-300 hover:shadow-blue-100/50'
  },
  {
    title: 'Lab Tests',
    description: 'Book home collection',
    icon: FlaskConical,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    hover: 'hover:border-teal-300 hover:shadow-teal-100/50'
  },
  {
    title: 'Upload Rx',
    description: 'Order medicines online',
    icon: FileText,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hover: 'hover:border-emerald-300 hover:shadow-emerald-100/50'
  },
  {
    title: 'Find Hospital',
    description: 'Search by specialty',
    icon: Search,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    hover: 'hover:border-indigo-300 hover:shadow-indigo-100/50'
  }
]

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((action, i) => (
        <motion.button
          key={action.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * i, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'flex flex-col items-center text-center p-4 rounded-xl border bg-white shadow-sm transition-all duration-200 cursor-pointer',
            action.border,
            action.hover
          )}
        >
          <div className={cn('size-12 rounded-full flex items-center justify-center mb-3', action.bg)}>
            <action.icon className={cn('size-6', action.color)} />
          </div>
          <h4 className="font-medium text-slate-900 text-sm mb-1">{action.title}</h4>
          <p className="text-xs text-slate-500">{action.description}</p>
        </motion.button>
      ))}
    </div>
  )
}
