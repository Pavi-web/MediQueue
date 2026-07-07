import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Lock, User, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Register() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 font-display">Create an account</h2>
        <p className="text-slate-500 mt-2">Enter your details to get started with MediQueue.</p>
      </div>

      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <CardContent className="p-0 sm:p-6 space-y-6">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/role-select'); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                  <Input id="firstName" placeholder="John" className="pl-9" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input id="email" type="email" placeholder="john@example.com" className="pl-9" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input id="phone" type="tel" placeholder="+91 98765 43210" className="pl-9" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-9" required />
              </div>
              <p className="text-xs text-slate-500">Must be at least 8 characters long.</p>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" id="terms" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-600" required />
              <Label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed font-normal">
                I agree to the <Link to="#" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="#" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Role Selection <ArrowRight className="size-4 ml-2" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 bg-slate-50 sm:bg-white">Or register with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">Apple</Button>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-slate-600 mt-8">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:underline">
          Log in here
        </Link>
      </p>
    </motion.div>
  )
}
