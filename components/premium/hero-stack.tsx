/** Abstract layered panels — Tennr-style depth without image assets */
export function HeroStack() {
  return (
    <div
      className="relative hidden h-[min(22rem,50vh)] w-full max-w-md shrink-0 lg:block"
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-end pr-4">
        <div className="relative h-72 w-56">
          <div className="absolute right-0 top-8 h-48 w-40 rotate-[-8deg] rounded-2xl bg-white/25 shadow-lg ring-1 ring-white/30 backdrop-blur-sm" />
          <div className="absolute right-6 top-4 h-52 w-44 rotate-[-4deg] rounded-2xl bg-white/35 shadow-xl ring-1 ring-white/40 backdrop-blur-md" />
          <div className="absolute right-12 top-0 h-56 w-48 rotate-0 rounded-2xl bg-[#faf6f1]/95 shadow-2xl ring-1 ring-white/50 backdrop-blur-md" />
          <div className="absolute bottom-6 left-2 h-24 w-24 rounded-full bg-white/15 blur-xl" />
        </div>
      </div>
    </div>
  );
}
