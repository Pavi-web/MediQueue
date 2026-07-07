import { motion } from 'framer-motion'
import { FileText, FlaskConical, Download, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'
import PageHeader from '@/components/shared/PageHeader'

export default function RecordsPage() {
  const { prescriptions, diagnosticBookings } = useStore()

  const myRx = prescriptions.filter(rx => rx.patientName === 'Pavit Singh' || rx.patientName === 'Ananya Rao')
  const myDiag = diagnosticBookings.filter(d => d.patientName === 'Ananya Rao' || d.patientName === 'Pavit Singh')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader
        title="Medical Records"
        subtitle="Your prescriptions, lab reports, and health history."
      />

      {/* Prescriptions */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="size-5 text-emerald-600" /> Prescriptions
        </h2>
        <div className="space-y-4">
          {myRx.length === 0 ? (
            <p className="text-slate-400 text-sm py-6 text-center border-2 border-dashed rounded-xl">No prescriptions found.</p>
          ) : (
            myRx.map((rx, i) => (
              <motion.div key={rx.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="font-semibold text-slate-900">Prescription by {rx.doctorName}</p>
                        <p className="text-sm text-slate-500 mt-0.5">{rx.date}</p>
                      </div>
                      <Badge variant={
                        rx.status === 'completed' ? 'success' :
                        rx.status === 'tests_booked' ? 'info' : 'warning'
                      }>
                        {rx.status === 'completed' ? 'Complete' : rx.status === 'tests_booked' ? 'Tests Booked' : 'Pending Tests'}
                      </Badge>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed mb-4">
                      <p className="font-medium text-slate-600 text-xs uppercase tracking-wider mb-2">Medications</p>
                      <p className="whitespace-pre-line">{rx.medications}</p>
                    </div>

                    {rx.recommendedTests.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Recommended Tests</p>
                        <div className="flex flex-wrap gap-2">
                          {rx.recommendedTests.map(test => (
                            <Badge key={test} variant="info" className="text-xs">{test}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-slate-500 bg-blue-50 p-3 rounded-lg">
                      <span className="font-medium text-blue-700">Instructions: </span>{rx.instructions}
                    </p>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="gap-1.5"><Eye className="size-4" /> View</Button>
                      <Button variant="outline" size="sm" className="gap-1.5"><Download className="size-4" /> Download</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Diagnostic Reports */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <FlaskConical className="size-5 text-teal-600" /> Lab Reports
        </h2>
        <div className="space-y-4">
          {myDiag.length === 0 ? (
            <p className="text-slate-400 text-sm py-6 text-center border-2 border-dashed rounded-xl">No lab reports found.</p>
          ) : (
            myDiag.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="size-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <FlaskConical className="size-6 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900">{d.testName}</p>
                      <p className="text-sm text-slate-500">{d.facilityName} · {d.date} at {d.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={d.status === 'completed' ? 'success' : 'warning'}>
                        {d.status === 'completed' ? 'Report Ready' : 'Pending'}
                      </Badge>
                      {d.status === 'completed' && (
                        <Button variant="outline" size="sm" className="gap-1.5">
                          <Download className="size-4" /> Report
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
