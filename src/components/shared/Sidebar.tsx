import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, Stethoscope, Building2, ClipboardList,
  Activity, FileText, Bell, UserCircle, Settings, ChevronLeft,
  ChevronRight, LogOut, Users, FlaskConical, BarChart3,
  MessageSquare, TestTube2, Inbox, Layers
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { type UserRole, useStore } from '@/store'

interface NavItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  to: string
}

const navByRole: Record<UserRole, NavItem[]> = {
  patient: [
    { label: 'Dashboard',       icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Doctors',         icon: Stethoscope,     to: '/dashboard/doctors' },
    { label: 'Hospitals',       icon: Building2,       to: '/dashboard/hospitals' },
    { label: 'Appointments',    icon: Calendar,        to: '/dashboard/appointments' },
    { label: 'Live Queue',      icon: Activity,        to: '/dashboard/queue' },
    { label: 'Diagnostics',     icon: FlaskConical,    to: '/dashboard/diagnostics' },
    { label: 'Medical Records', icon: FileText,        to: '/dashboard/records' },
    { label: 'Notifications',   icon: Bell,            to: '/dashboard/notifications' },
    { label: 'Profile',         icon: UserCircle,      to: '/dashboard/profile' },
    { label: 'Settings',        icon: Settings,        to: '/dashboard/settings' },
  ],
  doctor: [
    { label: 'Dashboard',        icon: LayoutDashboard, to: '/dashboard' },
    { label: "Today's Patients", icon: Users,           to: '/dashboard/patients' },
    { label: 'Queue',            icon: Activity,        to: '/dashboard/queue' },
    { label: 'Calendar',         icon: Calendar,        to: '/dashboard/calendar' },
    { label: 'Prescriptions',    icon: ClipboardList,   to: '/dashboard/prescriptions' },
    { label: 'Reports',          icon: FileText,        to: '/dashboard/reports' },
    { label: 'Analytics',        icon: BarChart3,       to: '/dashboard/analytics' },
    { label: 'Messages',         icon: MessageSquare,   to: '/dashboard/messages' },
    { label: 'Profile',          icon: UserCircle,      to: '/dashboard/profile' },
  ],
  hospital: [
    { label: 'Dashboard',     icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Doctors',       icon: Stethoscope,     to: '/dashboard/doctors' },
    { label: 'Departments',   icon: Layers,          to: '/dashboard/departments' },
    { label: 'Appointments',  icon: Calendar,        to: '/dashboard/appointments' },
    { label: 'Queue',         icon: Activity,        to: '/dashboard/queue' },
    { label: 'Patients',      icon: Users,           to: '/dashboard/patients' },
    { label: 'Diagnostics',   icon: FlaskConical,    to: '/dashboard/diagnostics' },
    { label: 'Analytics',     icon: BarChart3,       to: '/dashboard/analytics' },
    { label: 'Settings',      icon: Settings,        to: '/dashboard/settings' },
  ],
  diagnostic: [
    { label: 'Dashboard',  icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Bookings',   icon: Inbox,           to: '/dashboard/bookings' },
    { label: 'Reports',    icon: FileText,        to: '/dashboard/reports' },
    { label: 'Queue',      icon: Activity,        to: '/dashboard/queue' },
    { label: 'Analytics',  icon: BarChart3,       to: '/dashboard/analytics' },
    { label: 'Tests',      icon: TestTube2,       to: '/dashboard/tests' },
    { label: 'Profile',    icon: UserCircle,      to: '/dashboard/profile' },
  ],
}

const roleLabel: Record<UserRole, string> = {
  patient: 'Patient',
  doctor: 'Doctor',
  hospital: 'Hospital Admin',
  diagnostic: 'Diagnostics Lab',
}

const roleColor: Record<UserRole, string> = {
  patient: 'from-blue-500 to-teal-500',
  doctor: 'from-emerald-500 to-teal-600',
  hospital: 'from-blue-600 to-indigo-600',
  diagnostic: 'from-amber-500 to-orange-500',
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { currentRole, setRole } = useStore()
  const navigate = useNavigate()
  const navItems = navByRole[currentRole]

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-full bg-white border-r border-slate-200 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-100 shrink-0">
        <div className="size-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white font-bold text-sm">MQ</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
            >
              <span className="font-display font-bold text-slate-900 text-lg leading-none">MediQueue</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Role Badge */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-4 pb-2"
          >
            <div className={cn('px-3 py-2 rounded-lg bg-gradient-to-r text-white text-xs font-semibold', roleColor[currentRole])}>
              {roleLabel[currentRole]} Portal
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('size-5 shrink-0 transition-colors', isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600')} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <Separator />

      {/* Role Switcher */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3"
          >
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Switch Role</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(['patient', 'doctor', 'hospital', 'diagnostic'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => { setRole(role); navigate('/dashboard') }}
                  className={cn(
                    'text-xs px-2 py-1.5 rounded-md font-medium transition-all text-left',
                    currentRole === role
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-slate-500 hover:bg-slate-50 border border-transparent'
                  )}
                >
                  {roleLabel[role]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Separator />

      {/* User Footer */}
      <div className="p-3 flex items-center gap-3">
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className={cn('text-xs bg-gradient-to-br', roleColor[currentRole])}>
            {currentRole === 'patient' ? 'PS' : currentRole === 'doctor' ? 'DR' : currentRole === 'hospital' ? 'HA' : 'DL'}
          </AvatarFallback>
        </Avatar>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 min-w-0"
            >
              <p className="text-sm font-medium text-slate-900 truncate">
                {currentRole === 'patient' ? 'Pavit Singh' : currentRole === 'doctor' ? 'Dr. Rohan Malhotra' : currentRole === 'hospital' ? 'Metro Life Hospital' : 'City Diagnostics'}
              </p>
              <p className="text-xs text-slate-400 truncate">{roleLabel[currentRole]}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <Button variant="ghost" size="icon-sm" className="shrink-0 text-slate-400 hover:text-red-500" onClick={handleLogout}>
          <LogOut className="size-4" />
        </Button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 size-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="size-3" /> : <ChevronLeft className="size-3" />}
      </button>
    </motion.aside>
  )
}
