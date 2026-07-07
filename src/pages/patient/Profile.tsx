import { motion } from 'framer-motion'
import { UserCircle, Mail, Phone, Calendar, MapPin, Shield, Edit3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import PageHeader from '@/components/shared/PageHeader'

const profileData = {
  name: 'Pavit Singh',
  email: 'pavit.singh@email.com',
  phone: '+91 98765 43210',
  dob: '15 Aug 1998',
  bloodGroup: 'O+',
  gender: 'Male',
  address: 'Sector 62, Noida, Uttar Pradesh - 201309',
  emergencyContact: '+91 99887 76655',
  allergies: ['Penicillin', 'Pollen'],
  conditions: ['Hypertension (Mild)'],
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
)

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>, label: string, value: string }) => (
  <div className="flex items-start gap-3">
    <div className="size-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
      <Icon className="size-4 text-slate-500" />
    </div>
    <div>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm font-medium text-slate-800 mt-0.5">{value}</p>
    </div>
  </div>
)

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal and medical information."
        actions={<Button variant="outline" className="gap-2"><Edit3 className="size-4" /> Edit Profile</Button>}
      />

      <div className="space-y-6">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-5">
                <Avatar className="size-20 border-4 border-white shadow-md">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-teal-500 text-white">PS</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{profileData.name}</h2>
                  <p className="text-slate-500 text-sm">{profileData.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="info">Blood: {profileData.bloodGroup}</Badge>
                    <Badge variant="secondary">{profileData.gender}</Badge>
                    <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                      <Shield className="size-3" /> Verified
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Section title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={UserCircle} label="Full Name" value={profileData.name} />
              <InfoRow icon={Calendar} label="Date of Birth" value={profileData.dob} />
              <InfoRow icon={Mail} label="Email" value={profileData.email} />
              <InfoRow icon={Phone} label="Phone" value={profileData.phone} />
              <InfoRow icon={MapPin} label="Address" value={profileData.address} />
              <InfoRow icon={Phone} label="Emergency Contact" value={profileData.emergencyContact} />
            </div>
          </Section>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Section title="Medical Information">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-2">Known Allergies</p>
              <div className="flex flex-wrap gap-2">
                {profileData.allergies.map(a => (
                  <Badge key={a} variant="warning">{a}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-2">Chronic Conditions</p>
              <div className="flex flex-wrap gap-2">
                {profileData.conditions.map(c => (
                  <Badge key={c} variant="info">{c}</Badge>
                ))}
              </div>
            </div>
          </Section>
        </motion.div>
      </div>
    </div>
  )
}
