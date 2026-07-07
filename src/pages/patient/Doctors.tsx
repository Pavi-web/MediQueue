import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Clock, Calendar, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useStore } from '@/store'
import PageHeader from '@/components/shared/PageHeader'

const specialties = ['All', 'Cardiology', 'Pediatrics', 'Orthopedics', 'General Medicine', 'Neurology']

export default function DoctorsPage() {
  const { doctors, appointments, bookAppointment } = useStore()
  const [search, setSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [bookedId, setBookedId] = useState<string | null>(null)

  const filtered = doctors.filter(doc => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
      doc.facilityName.toLowerCase().includes(search.toLowerCase())
    const matchSpecialty = selectedSpecialty === 'All' || doc.specialization === selectedSpecialty
    return matchSearch && matchSpecialty
  })

  const handleBook = (doctorId: string, doctorName: string, facilityName: string) => {
    const today = new Date().toISOString().split('T')[0]
    bookAppointment({
      patientName: 'Pavit Singh',
      patientPhone: '+91 98765 43210',
      doctorId,
      doctorName,
      facilityName,
      date: today,
      time: '11:00 AM',
      symptoms: 'General consultation',
    })
    setBookedId(doctorId)
    setTimeout(() => setBookedId(null), 3000)
  }

  const ratings: Record<string, number> = {
    'doc-1': 4.9, 'doc-2': 4.7, 'doc-3': 4.8, 'doc-4': 4.5
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Find a Doctor"
        subtitle="Browse top-rated specialists across all facilities."
        actions={
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" /> Filters
          </Button>
        }
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Search by doctor name, specialty, hospital…"
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Specialty Chips */}
      <div className="flex gap-2 flex-wrap mb-8">
        {specialties.map(spec => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
              selectedSpecialty === spec
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Search className="size-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">No doctors found</p>
          <p className="text-sm">Try a different search term or specialty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((doc, i) => {
            const doctorApts = appointments.filter(a => a.doctorId === doc.id && a.status !== 'cancelled')
            const isBooked = bookedId === doc.id
            const rating = ratings[doc.id] ?? 4.6

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <Card className="hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                  <CardContent className="p-5 flex flex-col h-full">
                    {/* Doctor Info */}
                    <div className="flex gap-4 mb-4">
                      <Avatar className="size-14 border-2 border-white shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-teal-500 text-white font-bold text-lg">
                          {doc.name.split(' ').filter(w => w !== 'Dr.').map(w => w[0]).join('').substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 truncate">{doc.name}</h3>
                        <p className="text-sm text-blue-600 font-medium">{doc.specialization}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="size-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-semibold text-slate-700">{rating}</span>
                          <span className="text-xs text-slate-400">· {doc.experience} exp.</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <MapPin className="size-4 text-slate-400 mt-0.5 shrink-0" />
                        <span>{doc.facilityName}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-slate-600">
                        <Clock className="size-4 text-slate-400 mt-0.5 shrink-0" />
                        <span>{doc.availability}</span>
                      </div>
                    </div>

                    {/* Queue Status */}
                    <div className="flex items-center justify-between py-3 border-t border-slate-100 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-slate-400">Seen today</p>
                        <p className="font-bold text-slate-800">{doctorApts.length}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400">Current token</p>
                        <p className="font-bold text-slate-800">#{doc.currentToken}</p>
                      </div>
                      <Badge variant={doc.totalTokens > 0 ? 'success' : 'secondary'}>
                        {doc.totalTokens > 0 ? 'Available' : 'No slots'}
                      </Badge>
                    </div>

                    {/* Book Button */}
                    <Button
                      className="w-full gap-2"
                      variant={isBooked ? 'secondary' : 'default'}
                      onClick={() => handleBook(doc.id, doc.name, doc.facilityName)}
                      disabled={isBooked}
                    >
                      <Calendar className="size-4" />
                      {isBooked ? '✓ Appointment Booked!' : 'Book Appointment'}
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
