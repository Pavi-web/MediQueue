import { Calendar, Clock, MapPin, MoreVertical, X } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface AppointmentCardProps {
  id: string
  doctorName: string
  specialty: string
  facility: string
  date: string
  time: string
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  tokenNumber?: number
}

export default function AppointmentCard({
  doctorName,
  specialty,
  facility,
  date,
  time,
  status,
  tokenNumber
}: AppointmentCardProps) {
  
  const statusConfig = {
    scheduled: { color: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Upcoming' },
    active: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'In Progress' },
    completed: { color: 'bg-slate-100 text-slate-700 border-slate-200', label: 'Completed' },
    cancelled: { color: 'bg-red-50 text-red-700 border-red-200', label: 'Cancelled' }
  }

  const currentStatus = statusConfig[status]

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <Badge variant="outline" className={cn(currentStatus.color)}>
            {currentStatus.label}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="h-8 w-8 text-slate-400 group-hover:text-slate-600">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Reschedule</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600"><X className="size-4 mr-2" /> Cancel Appointment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-4">
          <Avatar className="size-12 border border-slate-100 shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 font-medium">
              {doctorName.split(' ').map(n => n[0]).join('').substring(0, 2).replace('D', '')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900 truncate">{doctorName}</h4>
            <p className="text-sm text-slate-500 truncate">{specialty}</p>
            
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="size-4 text-slate-400" />
                <span className="truncate">{date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="size-4 text-slate-400" />
                <span className="truncate">{time}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 col-span-2">
                <MapPin className="size-4 text-slate-400 shrink-0" />
                <span className="truncate">{facility}</span>
              </div>
            </div>
          </div>
        </div>
        
        {tokenNumber && status !== 'cancelled' && status !== 'completed' && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500">Your Token</span>
            <span className="font-semibold text-lg text-slate-900">#{tokenNumber}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
