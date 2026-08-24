import { motion } from "framer-motion"
import HeaderNav from "./components/HeaderNav"
import LobbyControls from "./components/LobbyControls"
import PulsingEmitter from "./components/PulsingEmitter"
import useLobbyState from "./hooks/useLobbyState"

export default function App() {
  const { handleTuneIn } = useLobbyState()

  return (
    <main className="flex min-h-dvh items-center justify-center bg-brand-black">
      <div className="relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-brand-black">
        <HeaderNav />

        <div className="flex flex-[0_0_56%] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PulsingEmitter />
          </motion.div>
        </div>

        <section
          aria-labelledby="live-now-heading"
          className="flex flex-1 flex-col justify-end"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="w-full"
          >
            <LobbyControls handleTuneIn={handleTuneIn} />
          </motion.div>
        </section>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-10 h-[5px] bg-brand-yellow"
        />
      </div>
    </main>
  )
}
