import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: { value: number; label: string }
  icon: React.ComponentType<{ className?: string }>
  iconColor?: string
  iconBg?: string
  delay?: number
}

export default function StatsCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
  delay = 0,
}: StatsCardProps) {
  const trendPositive = trend && trend.value > 0
  const trendNegative = trend && trend.value < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-default">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 leading-none">{value}</p>
              {subtitle && (
                <p className="text-xs text-slate-400 mt-1.5">{subtitle}</p>
              )}
              {trend && (
                <div className={cn(
                  'inline-flex items-center gap-1 mt-2 text-xs font-medium rounded-full px-2 py-0.5',
                  trendPositive ? 'text-emerald-700 bg-emerald-50' :
                  trendNegative ? 'text-red-600 bg-red-50' :
                  'text-slate-500 bg-slate-100'
                )}>
                  {trendPositive ? <TrendingUp className="size-3" /> :
                   trendNegative ? <TrendingDown className="size-3" /> :
                   <Minus className="size-3" />}
                  <span>{trendPositive ? '+' : ''}{trend.value}% {trend.label}</span>
                </div>
              )}
            </div>
            <div className={cn('size-11 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
              <Icon className={cn('size-5', iconColor)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
