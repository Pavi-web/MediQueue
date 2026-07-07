import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, User, Stethoscope, Building2, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore, type UserRole } from '@/store'
import { cn } from '@/lib/utils'

const roles = [
  {
    id: 'patient' as UserRole,
    title: 'Patient',
    description: 'Book appointments, track queues, and view medical records.',
    icon: User,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    ring: 'ring-blue-600'
  },
  {
    id: 'doctor' as UserRole,
    title: 'Doctor',
    description: 'Manage schedule, view patient history, and write digital prescriptions.',
    icon: Stethoscope,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    ring: 'ring-emerald-600'
  },
  {
    id: 'hospital' as UserRole,
    title: 'Hospital Admin',
    description: 'Manage staff, departments, facility resources, and overall queue operations.',
    icon: Building2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    ring: 'ring-indigo-600'
  },
  {
    id: 'diagnostic' as UserRole,
    title: 'Diagnostic Lab',
    description: 'Receive test bookings, manage sample collection, and upload reports.',
    icon: FlaskConical,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    ring: 'ring-amber-600'
  }
]

export default function RoleSelect() {
  const navigate = useNavigate()
  const { currentRole, setRole } = useStore()

  const handleComplete = () => {
    // In a real app, you'd save this to the user's profile on the backend
    navigate('/dashboard')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <Link to="/register" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="size-4 mr-1.5" /> Back
        </Link>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 font-display">How will you use MediQueue?</h2>
        <p className="text-slate-500 mt-2">Select your primary role to customize your dashboard experience.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {roles.map((role, i) => (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <div
              onClick={() => setRole(role.id)}
              className={cn(
                'relative flex flex-col p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer h-full',
                currentRole === role.id 
                  ? `border-transparent ring-2 ${role.ring} bg-white shadow-md` 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              )}
            >
              <div className={cn('size-12 rounded-full flex items-center justify-center mb-4', role.bg)}>
                <role.icon className={cn('size-6', role.color)} />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{role.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{role.description}</p>
              
              {currentRole === role.id && (
                <div className={cn('absolute top-4 right-4 size-5 rounded-full flex items-center justify-center bg-current text-white', role.color)}>
                  <div className="size-2 rounded-full bg-white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <Button className="w-full" size="lg" onClick={handleComplete}>
        Complete Setup <ArrowRight className="size-4 ml-2" />
      </Button>
    </motion.div>
  )
}
