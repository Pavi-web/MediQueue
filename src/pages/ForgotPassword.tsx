import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export default function ForgotPassword() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="size-4 mr-1.5" /> Back to login
        </Link>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 font-display">Reset password</h2>
        <p className="text-slate-500 mt-2">Enter your email and we'll send you a reset link.</p>
      </div>

      <Card className="border-0 shadow-none sm:border sm:shadow-sm">
        <CardContent className="p-0 sm:p-6 space-y-6">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Reset link sent to your email!"); }}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <Input id="email" type="email" placeholder="john@example.com" className="pl-9" required />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Send Reset Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
