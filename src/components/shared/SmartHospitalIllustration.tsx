import { motion } from 'framer-motion'
import {
  CalendarDays, Ticket, Smartphone, FlaskConical, Pill,
  Bot, Building2, ShieldCheck, Database, QrCode
} from 'lucide-react'

export default function SmartHospitalIllustration() {
  // Product feature floating cards
  const floatingCards = [
    {
      id: 1,
      icon: CalendarDays,
      iconBg: 'bg-blue-600',
      label: '📅 Appointment Booking',
      value: 'Book in seconds',
      className: 'top-[4%] left-[-4%] md:left-[-8%]',
      delay: 0,
      duration: 5.2,
    },
    {
      id: 2,
      icon: Ticket,
      iconBg: 'bg-teal-500',
      label: '🎫 Queue Management',
      value: 'Track after check-in',
      className: 'top-[16%] right-[-4%] md:right-[-6%]',
      delay: 0.7,
      duration: 6.1,
    },
    {
      id: 3,
      icon: Smartphone,
      iconBg: 'bg-emerald-500',
      label: '📱 Health Records',
      value: 'Access reports securely',
      className: 'top-[42%] right-[-10%] md:right-[-12%]',
      delay: 1.4,
      duration: 5.6,
    },
    {
      id: 4,
      icon: FlaskConical,
      iconBg: 'bg-indigo-600',
      label: '🧪 Lab Integration',
      value: 'Digital reports management',
      className: 'bottom-[12%] left-[-8%] md:left-[-12%]',
      delay: 2.1,
      duration: 6.4,
    },
    {
      id: 5,
      icon: Pill,
      iconBg: 'bg-rose-500',
      label: '💊 Pharmacy Services',
      value: 'Integrated prescriptions',
      className: 'top-[28%] left-[-10%] md:left-[-14%]',
      delay: 1.0,
      duration: 7.2,
    },
    {
      id: 6,
      icon: Bot,
      iconBg: 'bg-violet-600',
      label: '🤖 AI Assistant',
      value: 'Smart suggestions & help',
      className: 'bottom-[6%] right-[-6%] md:right-[-8%]',
      delay: 0.3,
      duration: 5.9,
    },
    {
      id: 7,
      icon: Building2,
      iconBg: 'bg-sky-500',
      label: '🏥 Multi-Hospital',
      value: 'Access multiple providers',
      className: 'top-[52%] left-[-6%] md:left-[-8%]',
      delay: 1.8,
      duration: 6.3,
    },
    {
      id: 8,
      icon: ShieldCheck,
      iconBg: 'bg-amber-500',
      label: '🔒 Secure Records',
      value: 'Enterprise-grade security',
      className: 'bottom-[28%] right-[-12%] md:right-[-14%]',
      delay: 2.4,
      duration: 6.9,
    },
  ]

  return (
    <div className="relative w-full max-w-2xl aspect-[1.1] mx-auto flex items-center justify-center p-4">
      {/* Soft background glows specific to illustration */}
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[250px] h-[250px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main 3D Isometric Smart Hospital SVG */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-full h-full relative"
      >
        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotateZ: [-0.5, 0.5, -0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <svg
            viewBox="0 0 800 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_20px_50px_rgba(37,99,235,0.08)]"
          >
            {/* Definitions for Gradients, Glows, and Clip Paths */}
            <defs>
              {/* Gradients */}
              <linearGradient id="main-building-left" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="main-building-right" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="main-building-top" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </linearGradient>

              {/* Glowing gradients for pathways */}
              <linearGradient id="glow-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
              <linearGradient id="glow-grad-teal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#2dd4bf" />
              </linearGradient>

              {/* Holographic screens */}
              <linearGradient id="holo-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(37,99,235,0.4)" />
                <stop offset="100%" stopColor="rgba(20,184,166,0.05)" />
              </linearGradient>

              {/* Glass floor gradient */}
              <radialGradient id="floor-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(241, 245, 249, 0.4)" />
                <stop offset="100%" stopColor="rgba(241, 245, 249, 0)" />
              </radialGradient>

              {/* Soft Drop Shadows */}
              <filter id="svg-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="15" stdDeviation="15" floodColor="#0f172a" floodOpacity="0.06" />
              </filter>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Ground Grid / Base Plane */}
            <ellipse cx="400" cy="450" rx="350" ry="180" fill="url(#floor-grad)" />
            
            {/* Grid Lines in Perspective */}
            <g stroke="rgba(37, 99, 235, 0.04)" strokeWidth="1.5">
              {/* Isometric diagonal set 1 */}
              {Array.from({ length: 15 }).map((_, i) => {
                const offset = (i - 7) * 45
                return (
                  <line
                    key={`d1-${i}`}
                    x1={400 + offset - 250} y1={450 + (offset - 250) * 0.5}
                    x2={400 + offset + 250} y2={450 + (offset + 250) * 0.5}
                  />
                )
              })}
              {/* Isometric diagonal set 2 */}
              {Array.from({ length: 15 }).map((_, i) => {
                const offset = (i - 7) * 45
                return (
                  <line
                    key={`d2-${i}`}
                    x1={400 + offset - 250} y1={450 - (offset - 250) * 0.5}
                    x2={400 + offset + 250} y2={450 - (offset + 250) * 0.5}
                  />
                )
              })}
            </g>

            {/* 2. Road & Parking Slots (Subtle Lines) */}
            <path d="M 120 480 L 260 410 L 320 440 L 180 510 Z" fill="rgba(226, 232, 240, 0.2)" stroke="rgba(203, 213, 225, 0.5)" strokeWidth="1" />
            {/* Parking strips */}
            <line x1="160" y1="480" x2="190" y2="465" stroke="rgba(203, 213, 225, 0.8)" strokeWidth="1.5" />
            <line x1="180" y1="470" x2="210" y2="455" stroke="rgba(203, 213, 225, 0.8)" strokeWidth="1.5" />
            <line x1="200" y1="460" x2="230" y2="445" stroke="rgba(203, 213, 225, 0.8)" strokeWidth="1.5" />

            {/* 3. Smart Connections (Glowing Network Lines) */}
            <g strokeWidth="2.5" fill="none" filter="url(#neon-glow)">
              {/* Route: QR Checkin -> Desk -> Records Server -> Doctor -> Lab -> Pharmacy */}
              {/* Pathway 1 (Blue) */}
              <path
                id="pulse-path-1"
                d="M 190 440 L 330 370 L 400 405 L 530 340 L 460 305 L 430 320"
                stroke="url(#glow-grad-blue)"
                strokeDasharray="10, 15"
              >
                <animate attributeName="stroke-dashoffset" values="100;0" dur="8s" repeatCount="indefinite" />
              </path>

              {/* Pathway 2 (Teal) */}
              <path
                id="pulse-path-2"
                d="M 330 370 L 340 280 L 430 235 L 490 265 L 530 340"
                stroke="url(#glow-grad-teal)"
                strokeDasharray="8, 12"
              >
                <animate attributeName="stroke-dashoffset" values="0;100" dur="6s" repeatCount="indefinite" />
              </path>

              {/* Emergency Link */}
              <path
                d="M 150 490 L 300 415 M 300 415 L 410 470"
                stroke="#10b981"
                strokeOpacity="0.4"
                strokeWidth="1.5"
                strokeDasharray="4, 4"
              />
            </g>

            {/* 4. Ambulance (Isometric Box) */}
            <g transform="translate(-10, 10)">
              {/* Shadow */}
              <path d="M 130 500 L 190 470 L 210 480 L 150 510 Z" fill="rgba(15, 23, 42, 0.15)" />
              {/* Body left */}
              <path d="M 140 495 L 180 475 L 180 455 L 140 475 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              {/* Body right */}
              <path d="M 180 475 L 200 485 L 200 465 L 180 455 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
              {/* Cabin top */}
              <path d="M 140 475 L 180 455 L 200 465 L 160 485 Z" fill="#e2e8f0" />
              {/* Emergency Stripe (Red) */}
              <path d="M 140 483 L 180 463 L 180 468 L 140 488 Z" fill="#ef4444" />
              {/* Windshield */}
              <path d="M 145 478 L 155 473 L 155 470 L 145 475 Z" fill="#1e293b" />
              {/* Wheels */}
              <circle cx="155" cy="493" r="5" fill="#1e293b" />
              <circle cx="185" cy="478" r="5" fill="#1e293b" />
              {/* Siren (Glowing Blue Circle) */}
              <circle cx="170" cy="460" r="3" fill="#3b82f6" filter="url(#neon-glow)" />
            </g>

            {/* 5. Main Smart Hospital Skyscraper */}
            <g filter="url(#svg-shadow)">
              {/* Ground structure base */}
              <path d="M 330 420 L 460 355 L 530 390 L 400 455 Z" fill="rgba(30, 41, 59, 0.05)" />

              {/* Tower Block Left Face */}
              <path d="M 400 450 L 340 420 L 340 180 L 400 210 Z" fill="url(#main-building-left)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
              {/* Tower Block Right Face */}
              <path d="M 400 450 L 480 410 L 480 170 L 400 210 Z" fill="url(#main-building-right)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
              {/* Tower Block Top Face */}
              <path d="M 400 210 L 340 180 L 400 150 L 480 170 Z" fill="url(#main-building-top)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />

              {/* Glowing Glass Window Strips (Teal/Blue Neon) */}
              {/* Left Side Windows */}
              {Array.from({ length: 6 }).map((_, floor) => {
                const yOffset = floor * 32
                return (
                  <g key={`win-l-${floor}`} opacity="0.85">
                    {/* Glowing glass row */}
                    <path
                      d={`M ${355} ${402 - yOffset} L ${385} ${417 - yOffset} L ${385} ${408 - yOffset} L ${355} ${393 - yOffset} Z`}
                      fill="url(#glow-grad-blue)"
                      filter="url(#neon-glow)"
                    />
                  </g>
                )
              })}

              {/* Right Side Windows */}
              {Array.from({ length: 6 }).map((_, floor) => {
                const yOffset = floor * 32
                return (
                  <g key={`win-r-${floor}`} opacity="0.85">
                    {/* Glowing glass row */}
                    <path
                      d={`M ${415} ${417 - yOffset} L ${465} ${392 - yOffset} L ${465} ${383 - yOffset} L ${415} ${408 - yOffset} Z`}
                      fill="url(#glow-grad-teal)"
                      filter="url(#neon-glow)"
                    />
                  </g>
                )
              })}

              {/* Penthouse / Top Section Detail */}
              <path d="M 400 150 L 370 135 L 400 120 L 430 135 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <path d="M 370 135 L 370 145 L 400 160 L 400 150 Z" fill="#cbd5e1" />
              <path d="M 400 150 L 400 160 L 430 145 L 430 135 Z" fill="#94a3b8" />

              {/* Red Beacons (Safety lights) */}
              <circle cx="370" cy="135" r="2" fill="#ef4444" filter="url(#neon-glow)" />
              <circle cx="430" cy="135" r="2" fill="#ef4444" filter="url(#neon-glow)" />

              {/* Top Red-glowing Emergency Cross Sign */}
              <g transform="translate(390, 85)" filter="url(#neon-glow)">
                <path d="M 7 0 L 13 0 L 13 7 L 20 7 L 20 13 L 13 13 L 13 20 L 7 20 L 7 13 L 0 13 L 0 7 L 7 7 Z" fill="#ef4444" />
              </g>
            </g>

            {/* 6. Medical Records Server Wing (Left block) */}
            <g filter="url(#svg-shadow)" transform="translate(-70, 50)">
              {/* Building outline */}
              <path d="M 390 380 L 330 350 L 330 250 L 390 280 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
              <path d="M 390 380 L 430 360 L 430 260 L 390 280 Z" fill="#cbd5e1" stroke="#cbd5e1" strokeWidth="1.5" />
              <path d="M 390 280 L 330 250 L 370 230 L 430 260 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Server Blinking LEDs */}
              <g transform="translate(345, 275)" strokeWidth="0">
                {Array.from({ length: 4 }).map((_, row) => {
                  const y = row * 18
                  return (
                    <g key={`server-led-${row}`}>
                      {/* Grid line representation */}
                      <line x1="-5" y1={y} x2="30" y2={y + 15} stroke="rgba(15,23,42,0.4)" strokeWidth="1" />
                      {/* Blinking dots */}
                      <circle cx="5" cy={y + 5} r="2" fill="#10b981" />
                      <circle cx="15" cy={y + 10} r="2" fill="#3b82f6">
                        <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" delay={`${row * 0.3}s`} repeatCount="indefinite" />
                      </circle>
                      <circle cx="25" cy={y + 15} r="2" fill="#14b8a6" />
                    </g>
                  )
                })}
              </g>
              {/* Server Icon label */}
              <g transform="translate(370, 238) scale(0.65)" stroke="#60a5fa" strokeWidth="2">
                <Database className="text-blue-500" />
              </g>
            </g>

            {/* 7. Laboratory Wing (Right lower block) */}
            <g filter="url(#svg-shadow)" transform="translate(70, 50)">
              {/* Building outline */}
              <path d="M 410 380 L 370 360 L 370 280 L 410 300 Z" fill="#cbd5e1" stroke="#cbd5e1" strokeWidth="1" />
              <path d="M 410 380 L 470 350 L 470 250 L 410 300 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <path d="M 410 300 L 370 280 L 430 250 L 470 270 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

              {/* Lab Windows */}
              <path d="M 425 295 L 455 280 L 455 330 L 425 345 Z" fill="url(#holo-grad)" stroke="#14b8a6" strokeWidth="1.5" />
              {/* Sine Wave graph inside the screen window */}
              <path d="M 428 320 Q 435 305 442 320 T 453 320" stroke="#10b981" strokeWidth="1.5" fill="none" />
            </g>

            {/* 8. QR Check-In Kiosk Pillar (Front Left) */}
            <g transform="translate(190, 440)">
              {/* Base */}
              <path d="M -15 0 L 15 -15 L 25 -10 L -5 5 Z" fill="#cbd5e1" />
              {/* Pillar Column */}
              <path d="M -5 5 L 5 0 L 5 -50 L -5 -45 Z" fill="#94a3b8" />
              <path d="M 5 0 L 15 -5 L 15 -55 L 5 -50 Z" fill="#64748b" />
              <path d="M -5 -45 L 5 -50 L 15 -55 L 5 -60 Z" fill="#cbd5e1" />
              {/* Holographic glowing screen */}
              <path d="M 2 -48 L 12 -53 L 12 -73 L 2 -68 Z" fill="url(#holo-grad)" stroke="#2dd4bf" strokeWidth="1" />
              {/* Scan Beam */}
              <polygon points="12,-63 40,-45 45,-60 12,-73" fill="rgba(20, 184, 166, 0.15)" />
              {/* Floating mini QR code icon */}
              <g transform="translate(4, -68) scale(0.35)" className="text-teal-400">
                <QrCode />
              </g>
            </g>

            {/* 9. Smart Hub Rings (Doctor/Patient location indicators) */}
            {/* Hub 1: Doctor Consultation Area */}
            <g transform="translate(480, 310)">
              <ellipse cx="0" cy="0" rx="20" ry="10" fill="none" stroke="#2563eb" strokeWidth="1.5" opacity="0.6" />
              <ellipse cx="0" cy="0" rx="30" ry="15" fill="none" stroke="#2563eb" strokeWidth="1" opacity="0.3">
                <animate attributeName="rx" values="20;45;20" dur="4s" repeatCount="indefinite" />
                <animate attributeName="ry" values="10;22.5;10" dur="4s" repeatCount="indefinite" />
              </ellipse>
              <circle cx="0" cy="0" r="4" fill="#2563eb" />
            </g>

            {/* Hub 2: Reception Desk Area */}
            <g transform="translate(340, 370)">
              <ellipse cx="0" cy="0" rx="18" ry="9" fill="none" stroke="#14b8a6" strokeWidth="1.5" opacity="0.6" />
              <ellipse cx="0" cy="0" rx="28" ry="14" fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.3">
                <animate attributeName="rx" values="18;38;18" dur="5s" repeatCount="indefinite" />
                <animate attributeName="ry" values="9;19;9" dur="5s" repeatCount="indefinite" />
              </ellipse>
              <circle cx="0" cy="0" r="4" fill="#14b8a6" />
            </g>

            {/* Hub 3: Laboratory Area */}
            <g transform="translate(540, 360)">
              <ellipse cx="0" cy="0" rx="16" ry="8" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
              <circle cx="0" cy="0" r="4" fill="#10b981" />
            </g>
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Cards mapped around */}
      {floatingCards.map((card) => {
        const IconComponent = card.icon
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: [0, -12, 0],
            }}
            transition={{
              initial: { duration: 0.6, delay: card.delay },
              y: {
                duration: card.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: card.delay,
              },
            }}
            className={`absolute ${card.className} pointer-events-auto group`}
          >
            <div className="backdrop-blur-md bg-white/60 hover:bg-white/80 border border-white/50 shadow-[0_12px_30px_rgba(31,38,135,0.06)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.12)] rounded-[24px] px-3.5 py-2.5 flex items-center gap-3 transition-all duration-300 hover:scale-[1.03] cursor-default min-w-[140px] md:min-w-[170px]">
              <div className={`size-7 rounded-xl ${card.iconBg} flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="size-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase leading-none mb-1">{card.label}</span>
                <span className="text-xs text-slate-800 font-bold leading-tight">{card.value}</span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
