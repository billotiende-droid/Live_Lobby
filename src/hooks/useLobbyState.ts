import { useCallback } from "react"

interface LobbyState {
  isLive: boolean
  handleTuneIn: () => void
}

export default function useLobbyState(): LobbyState {
  const handleTuneIn = useCallback(() => {
    // Navigation or stream-start behavior is connected here.
  }, [])

  return { isLive: true, handleTuneIn }
}
