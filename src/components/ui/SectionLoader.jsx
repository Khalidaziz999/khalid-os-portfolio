export default function SectionLoader() {
  return (
    <div
      role="status"
      aria-label="Loading section"
      className="flex min-h-[300px] items-center justify-center bg-[#050816]"
    >
      <div className="flex items-center gap-3 font-mono text-sm text-cyan-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

        LOADING MODULE...
      </div>
    </div>
  );
}