import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Clock, Calendar, Filter, Verified } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useStore } from '@/store'
import PageHeader from '@/components/shared/PageHeader'

const specialties = ['All', 'Cardiology', 'Pediatrics', 'Orthopedics', 'General Medicine']

// Map doctor IDs to their photo and extra metadata
const doctorMeta: Record<string, { img: string; rating: number; consultations: number; badge?: string }> = {
  'doc-1': { img: '/doctor_rohan.png',  rating: 4.9, consultations: 2840, badge: 'Top Rated' },
  'doc-2': { img: '/doctor_shalini.png', rating: 4.7, consultations: 1620, badge: 'Patient Favourite' },
  'doc-3': { img: '/doctor_vikram.png',  rating: 4.8, consultations: 3200 },
  'doc-4': { img: '/doctor_amit.png',   rating: 4.5, consultations: 980 },
}

export default function DoctorsPage() {
  const { doctors, bookAppointment } = useStore()
  const [search, setSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All')
  const [bookedId, setBookedId] = useState<string | null>(null)

  const filtered = doctors.filter(doc => {
    const q = search.toLowerCase()
    const matchSearch = doc.name.toLowerCase().includes(q) ||
      doc.specialization.toLowerCase().includes(q) ||
      doc.facilityName.toLowerCase().includes(q)
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Find a Doctor"
        subtitle="Browse top-rated specialists across all partner facilities."
        actions={
          <Button variant="outline" className="gap-2">
            <Filter className="size-4" /> Filters
          </Button>
        }
      />

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Search by doctor name, specialty or hospital…"
          className="pl-11 h-12 text-base rounded-xl shadow-sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Specialty Filter Chips */}
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

      {/* Doctor Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400 border-2 border-dashed rounded-2xl">
          <Search className="size-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium text-slate-600">No doctors found</p>
          <p className="text-sm mt-1">Try a different search or specialty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {filtered.map((doc, i) => {
            const meta = doctorMeta[doc.id]
            const isBooked = bookedId === doc.id

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-slate-200 h-full flex flex-col">
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    {meta?.img ? (
                      <img
                        src={meta.img}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-slate-300">
                        {doc.name.split(' ').filter(w => w !== 'Dr.').map(w => w[0]).join('').substring(0, 2)}
                      </div>
                    )}
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />

                    {meta?.badge && (
                      <div className="absolute top-3 left-3">
                        <Badge variant="default" className="text-[11px] shadow-md">⭐ {meta.badge}</Badge>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-slate-800">{meta?.rating ?? '4.5'}</span>
                    </div>
                  </div>

                  <CardContent className="p-4 flex flex-col flex-1">
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 leading-tight">{doc.name}</h3>
                        <Verified className="size-4 text-blue-500 fill-blue-500 shrink-0" />
                      </div>
                      <p className="text-sm text-blue-600 font-medium mt-0.5">{doc.specialization}</p>
                    </div>

                    <div className="space-y-1.5 text-sm text-slate-600 mb-3 flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="size-3.5 text-slate-400 shrink-0" />
                        <span className="truncate text-xs">{doc.facilityName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-3.5 text-slate-400 shrink-0" />
                        <span className="text-xs">{doc.experience} exp.</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2.5 border-t border-slate-100 mb-3 text-xs">
                      <div>
                        <p className="text-slate-400">Consultations</p>
                        <p className="font-bold text-slate-800">{(meta?.consultations ?? 0).toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-400">Current</p>
                        <p className="font-bold text-slate-800">#{doc.currentToken}</p>
                      </div>
                      <Badge variant={doc.totalTokens > 0 ? 'success' : 'secondary'}>
                        {doc.totalTokens > 0 ? 'Available' : 'Full'}
                      </Badge>
                    </div>

                    <Button
                      className="w-full gap-2"
                      variant={isBooked ? 'secondary' : 'default'}
                      onClick={() => handleBook(doc.id, doc.name, doc.facilityName)}
                      disabled={isBooked}
                    >
                      <Calendar className="size-4" />
                      {isBooked ? '✓ Booked!' : 'Book Appointment'}
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
