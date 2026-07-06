import { Bell, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useStore, type UserRole } from '@/store'

const roleTitle: Record<UserRole, string> = {
  patient: 'Patient Portal',
  doctor: 'Doctor Console',
  hospital: 'Hospital Admin',
  diagnostic: 'Diagnostics Lab',
}

interface HeaderProps {
  onMenuToggle?: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { currentRole } = useStore()

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center gap-4 shrink-0">
      {/* Mobile menu */}
      <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={onMenuToggle}>
        <Menu className="size-5" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Search doctors, hospitals, appointments..."
          className="pl-9 bg-slate-50 border-slate-200 h-9 text-sm"
        />
      </div>

      <div className="flex-1 sm:hidden">
        <span className="font-display font-semibold text-slate-900">{roleTitle[currentRole]}</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <Button variant="ghost" size="icon-sm" className="relative text-slate-500">
          <Bell className="size-5" />
          <Badge
            variant="destructive"
            className="absolute -top-0.5 -right-0.5 size-4 p-0 flex items-center justify-center text-[10px] min-w-0"
          >
            3
          </Badge>
        </Button>

        {/* Role indicator */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-teal-500 text-white">
              {currentRole === 'patient' ? 'PS' : currentRole === 'doctor' ? 'DR' : currentRole === 'hospital' ? 'HA' : 'DL'}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-900 leading-none">
              {currentRole === 'patient' ? 'Pavit Singh' : currentRole === 'doctor' ? 'Dr. Rohan Malhotra' : currentRole === 'hospital' ? 'Metro Life Hospital' : 'City Diagnostics'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{roleTitle[currentRole]}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
