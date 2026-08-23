'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LobbyState {
  isLive: boolean;
  handleTuneIn: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useLobbyState(): LobbyState {
  const handleTuneIn = useCallback(() => {
    // Handle tune-in navigation / stream start
  }, []);

  return { isLive: true, handleTuneIn };
}

// ─── HeaderNav ────────────────────────────────────────────────────────────────

function HeaderNav() {
  return (
    <header
      style={{
        backgroundColor: '#FFDB00',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexShrink: 0,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 800,
          fontSize: '1.6rem',
          color: '#0A0A0A',
          letterSpacing: '-0.01em',
          textAlign: 'center',
        }}
      >
        ChemShaa
      </span>

      {/* Three-dot vertical menu */}
      <button
        aria-label="More options"
        style={{
          position: 'absolute',
          right: 18,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          padding: 6,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: '#0A0A0A',
            }}
          />
        ))}
      </button>
    </header>
  );
}

// ─── PulsingEmitter ───────────────────────────────────────────────────────────

interface RingProps {
  size: number;
  color: string;
  opacity: number;
  delay: number;
  duration: number;
}

function Ring({ size, color, opacity, delay, duration }: RingProps) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        opacity,
        top: '50%',
        left: '50%',
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: [1, 1.12, 1],
        opacity: [opacity * 0.55, opacity, opacity * 0.55],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

function PulsingEmitter() {
  const rings: RingProps[] = [
    { size: 310, color: '#220000', opacity: 0.18, delay: 0.6, duration: 2.8 },
    { size: 230, color: '#4A0000', opacity: 0.35, delay: 0.3, duration: 2.6 },
    { size: 160, color: '#8B0000', opacity: 0.55, delay: 0.1, duration: 2.4 },
  ];

  return (
    <div
      style={{ width: 330, height: 330, position: 'relative', flexShrink: 0 }}
    >
      {rings.map((ring, i) => (
        <Ring key={i} {...ring} />
      ))}

      {/* Core circle */}
      <motion.div
        style={{
          position: 'absolute',
          width: 112,
          height: 112,
          borderRadius: '50%',
          backgroundColor: '#EE1D23',
          top: '50%',
          left: '50%',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

// ─── LobbyControls ────────────────────────────────────────────────────────────

interface LobbyControlsProps {
  handleTuneIn: () => void;
}

function LobbyControls({ handleTuneIn }: LobbyControlsProps) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        paddingBottom: 32,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <h1
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(2.6rem, 12vw, 3.5rem)',
          color: '#FFFFFF',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          lineHeight: 1.05,
          margin: 0,
          textAlign: 'center',
        }}
      >
        LIVE NOW
      </h1>

      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontStyle: 'italic',
          fontSize: '1.15rem',
          color: '#CCCCCC',
          margin: '4px 0 20px',
          textAlign: 'center',
        }}
      >
        Join the action!
      </p>

      <motion.button
        onClick={handleTuneIn}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          width: '100%',
          height: 58,
          borderRadius: 14,
          backgroundColor: '#FFDB00',
          color: '#0A0A0A',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '0.02em',
          border: 'none',
          cursor: 'pointer',
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      >
        Tune In
      </motion.button>
    </div>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function App() {
  const { handleTuneIn } = useLobbyState();

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Mobile canvas — max 430px */}
      <div
        style={{
          width: '100%',
          maxWidth: 430,
          minHeight: '100dvh',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <HeaderNav />

        {/* Upper zone — emitter */}
        <div
          style={{
            flex: '0 0 58%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PulsingEmitter />
          </motion.div>
        </div>

        {/* Lower zone — controls pinned to bottom */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            style={{ width: '100%' }}
          >
            <LobbyControls handleTuneIn={handleTuneIn} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
