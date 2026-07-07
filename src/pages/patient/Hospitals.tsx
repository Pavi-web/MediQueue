import { motion } from 'framer-motion'
import { Building2, MapPin, Phone, Star, ChevronRight, Stethoscope } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import PageHeader from '@/components/shared/PageHeader'

const hospitalData = [
  { id: 'fac-1', rating: 4.8, phone: '+91 120 456 7890', beds: 400, established: 2004 },
  { id: 'fac-2', rating: 4.6, phone: '+91 80 234 5678', beds: 120, established: 2011 },
  { id: 'fac-3', rating: 4.7, phone: '+91 11 456 7890', beds: 0, established: 2008 },
  { id: 'fac-4', rating: 4.5, phone: '+91 33 567 8901', beds: 0, established: 2015 },
]

export default function HospitalsPage() {
  const { facilities, doctors } = useStore()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Hospitals & Facilities"
        subtitle="Explore partner hospitals, clinics, and diagnostic centres."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {facilities.map((fac, i) => {
          const extra = hospitalData.find(h => h.id === fac.id)
          const facilityDoctors = doctors.filter(d => d.facilityId === fac.id)

          return (
            <motion.div
              key={fac.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Building2 className="size-7 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-slate-900 leading-tight">{fac.name}</h3>
                        <Badge variant={fac.type === 'hospital' ? 'info' : fac.type === 'clinic' ? 'teal' : 'purple'} className="shrink-0 capitalize">
                          {fac.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold text-slate-700">{extra?.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-slate-600 mb-4 flex-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="size-4 text-slate-400 mt-0.5 shrink-0" />
                      <span>{fac.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 text-slate-400 shrink-0" />
                      <span>{extra?.phone}</span>
                    </div>
                    {extra?.beds ? (
                      <div className="flex items-center gap-2">
                        <Building2 className="size-4 text-slate-400 shrink-0" />
                        <span>{extra.beds} beds · Est. {extra.established}</span>
                      </div>
                    ) : null}
                  </div>

                  {/* Departments */}
                  {fac.departments && fac.departments.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-medium">Departments</p>
                      <div className="flex flex-wrap gap-1.5">
                        {fac.departments.map(dep => (
                          <span key={dep} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{dep}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Doctors at facility */}
                  {facilityDoctors.length > 0 && (
                    <div className="py-3 border-t border-slate-100 mb-4">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-medium flex items-center gap-1.5">
                        <Stethoscope className="size-3.5" /> Available Doctors
                      </p>
                      <div className="space-y-1">
                        {facilityDoctors.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between text-sm">
                            <span className="text-slate-700">{doc.name}</span>
                            <span className="text-slate-400 text-xs">{doc.specialization}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button className="w-full mt-auto gap-2">
                    Book Appointment <ChevronRight className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
