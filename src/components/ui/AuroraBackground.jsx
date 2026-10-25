export default function AuroraBackground({
  className = "",
  intensity = "medium",
}) {
  const opacity = {
    low: "opacity-30",
    medium: "opacity-50",
    high: "opacity-70",
  };

  return (
    <div
      aria-hidden="true"
      className={`
        pointer-events-none
        absolute inset-0
        overflow-hidden
        ${opacity[intensity] || opacity.medium}
        ${className}
      `}
    >
      {/* Cyan Aurora */}

      <div
        className="
          aurora-blob aurora-blob-one
          absolute -left-40 top-0
          h-[500px] w-[500px]
          rounded-full
          bg-cyan-500/20
          blur-[110px]
        "
      />

      {/* Purple Aurora */}

      <div
        className="
          aurora-blob aurora-blob-two
          absolute -right-40 top-1/3
          h-[550px] w-[550px]
          rounded-full
          bg-purple-500/20
          blur-[120px]
        "
      />

      {/* Pink Aurora */}

      <div
        className="
          aurora-blob aurora-blob-three
          absolute bottom-0 left-1/3
          h-[450px] w-[450px]
          rounded-full
          bg-pink-500/15
          blur-[120px]
        "
      />

      {/* Electric Blue Aurora */}

      <div
        className="
          aurora-blob aurora-blob-four
          absolute right-1/4 top-1/4
          h-[400px] w-[400px]
          rounded-full
          bg-blue-500/15
          blur-[100px]
        "
      />
    </div>
  );
}