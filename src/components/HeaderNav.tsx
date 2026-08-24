export default function HeaderNav() {
  return (
    <header className="relative flex h-[74px] shrink-0 items-center justify-center bg-brand-yellow px-5">
      <span className="font-serif text-[1.6rem] font-extrabold tracking-[-0.01em] text-brand-black">
        ChemShaa
      </span>

      <button
        type="button"
        aria-label="More options"
        className="absolute right-[18px] top-1/2 flex -translate-y-1/2 flex-col items-center gap-1 rounded p-1.5 text-brand-black transition-colors hover:bg-brand-black/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
      >
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            aria-hidden="true"
            className="block size-[5px] rounded-full bg-current"
          />
        ))}
      </button>
    </header>
  )
}
