/** Static placeholder shown in the prerendered shell while the interactive form loads. */
export function FormSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="animate-pulse p-6 sm:p-8" aria-hidden="true">
      <div className="h-7 w-48 rounded-full bg-forest-900/8" />
      <div className="mt-3 h-4 w-72 max-w-full rounded-full bg-forest-900/6" />
      <div className="mt-8 h-10 w-80 max-w-full rounded-full bg-forest-900/6" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: rows * 2 }).map((_, i) => (
          <div key={i} className="h-13 rounded-2xl bg-forest-900/5" />
        ))}
      </div>
      <div className="mt-8 ml-auto h-14 w-56 rounded-full bg-sun-400/30" />
    </div>
  );
}
