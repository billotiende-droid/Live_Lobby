import { motion } from "framer-motion"

interface RingProps {
  className: string
  opacity: number
  delay: number
  duration: number
}

function Ring({ className, opacity, delay, duration }: RingProps) {
  return (
    <motion.div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${className}`}
      animate={{
        scale: [1, 1.12, 1],
        opacity: [opacity * 0.55, opacity, opacity * 0.55],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

const rings: RingProps[] = [
  {
    className: "size-[310px] bg-[#220000]",
    opacity: 0.18,
    delay: 0.6,
    duration: 2.8,
  },
  {
    className: "size-[230px] bg-[#4A0000]",
    opacity: 0.35,
    delay: 0.3,
    duration: 2.6,
  },
  {
    className: "size-[160px] bg-[#8B0000]",
    opacity: 0.55,
    delay: 0.1,
    duration: 2.4,
  },
]

export default function PulsingEmitter() {
  return (
    <div aria-hidden="true" className="relative size-[330px] shrink-0">
      {rings.map((ring) => (
        <Ring key={ring.className} {...ring} />
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EE1D23]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
