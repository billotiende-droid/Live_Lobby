import { motion } from "framer-motion"

interface LobbyControlsProps {
  handleTuneIn: () => void
}

export default function LobbyControls({ handleTuneIn }: LobbyControlsProps) {
  return (
    <div className="box-border flex w-full flex-col items-center gap-2 px-5 pb-[42px]">
      <h1
        id="live-now-heading"
        className="m-0 text-center font-sans text-[clamp(2.6rem,12vw,3.5rem)] font-bold leading-[1.05] tracking-[0.04em] text-white"
      >
        LIVE NOW
      </h1>

      <p className="mb-5 mt-1 text-center font-sans text-[1.15rem] italic text-[#CCCCCC]">
        Join the action!
      </p>

      <motion.button
        type="button"
        onClick={handleTuneIn}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
        aria-label="Tune in to the live broadcast"
        className="box-border h-[58px] w-full cursor-pointer rounded-[14px] border-0 bg-brand-yellow font-sans text-[1.1rem] font-bold tracking-[0.02em] text-brand-black transition-colors hover:bg-[#ffe233] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
      >
        Tune In
      </motion.button>
    </div>
  )
}
