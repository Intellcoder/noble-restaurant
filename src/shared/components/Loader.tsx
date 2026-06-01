// ─── Types ────────────────────────────────────────────────────────────────────

type SpinnerSize = "sm" | "md" | "lg";

type LoaderVariant =
  | "spinner" // classic ring spinner
  | "food-icon" // spinning fork/knife icon
  | "dots" // bouncing dots
  | "pulse" // pulse rings
  | "wave" // equaliser bars
  | "skeleton" // shimmer skeleton cards (menu items)
  | "overlay"; // full-screen dim overlay (placing order)

interface LoaderProps {
  variant?: LoaderVariant;
  /** Only applies to "spinner" variant */
  size?: SpinnerSize;
  /** Overlay/dots message text */
  message?: string;
  /** Overlay sub-message */
  subMessage?: string;
  /** How many skeleton cards to render (skeleton variant) */
  count?: number;
  /** Extra Tailwind classes on the wrapper */
  className?: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const spinnerSize: Record<SpinnerSize, string> = {
  sm: "w-6 h-6 border-2",
  md: "w-10 h-10 border-[3px]",
  lg: "w-14 h-14 border-4",
};

const Spinner = ({ size = "md" }: { size?: SpinnerSize }) => (
  <div
    className={`${spinnerSize[size]} rounded-full border-gray-200 border-t-red-500 animate-spin`}
    role="status"
    aria-label="Loading"
  />
);

const FoodIconSpinner = () => (
  <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center animate-spin">
    {/* Inner icon counter-rotates so it stays upright */}
    <svg
      className="w-6 h-6 text-red-500 [animation:spin_1.1s_linear_infinite_reverse]"
      style={{ animation: "spin 1.1s linear infinite reverse" }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Fork */}
      <path d="M4 2v6a2 2 0 0 0 2 2v12" />
      <path d="M4 2v4M7 2v4" />
      {/* Knife */}
      <path d="M14 2s3 2 3 6v14" />
      <path d="M14 9h3" />
    </svg>
  </div>
);

const Dots = ({ message }: { message?: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="flex items-end gap-[7px]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-[9px] h-[9px] rounded-full bg-red-500 animate-bounce"
          style={{
            animationDelay: `${i * 0.12}s`,
            opacity: 1 - i * 0.25,
          }}
        />
      ))}
    </div>
    {message && (
      <p className="text-sm text-gray-500 animate-pulse">{message}</p>
    )}
  </div>
);

const PulseRings = () => (
  <div className="relative w-12 h-12" role="status" aria-label="Loading">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping"
        style={{ animationDelay: `${i * 0.33}s`, opacity: 0 }}
      />
    ))}
    <span className="absolute inset-3 rounded-full bg-red-500" />
  </div>
);

const WaveBars = () => (
  <div className="flex items-end gap-1 h-8" role="status" aria-label="Loading">
    {[28, 20, 32, 16, 24].map((h, i) => (
      <span
        key={i}
        className="w-1.5 rounded-full bg-red-500 animate-[rise_0.7s_ease-in-out_infinite]"
        style={{
          height: h,
          animationDelay: `${i * 0.1}s`,
          opacity: i % 2 === 0 ? 1 : 0.5,
        }}
      />
    ))}
  </div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-3.5">
    {/* Image placeholder */}
    <div className="h-[100px] rounded-xl mb-3 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:800px_100%] animate-[shimmer_1.4s_infinite]" />
    {/* Title line */}
    <div className="h-3 w-full rounded bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:800px_100%] animate-[shimmer_1.4s_infinite] mb-2" />
    {/* Sub line */}
    <div className="h-3 w-[55%] rounded bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:800px_100%] animate-[shimmer_1.4s_infinite]" />
    {/* Badge + price row */}
    <div className="flex justify-between items-center mt-3">
      <div className="h-2.5 w-12 rounded-full bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:800px_100%] animate-[shimmer_1.4s_infinite]" />
      <div className="h-3.5 w-14 rounded bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:800px_100%] animate-[shimmer_1.4s_infinite]" />
    </div>
  </div>
);

const SkeletonGrid = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

const Overlay = ({
  message = "Placing your order...",
  subMessage = "Please don't close this page",
}: {
  message?: string;
  subMessage?: string;
}) => (
  <div
    className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-[2px]"
    role="status"
    aria-live="polite"
    aria-label={message}
  >
    <FoodIconSpinner />
    <p className="text-white font-medium text-base tracking-wide">{message}</p>
    {subMessage && <p className="text-white/60 text-sm -mt-2">{subMessage}</p>}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const Loader = ({
  variant = "spinner",
  size = "md",
  message,
  subMessage,
  count = 3,
  className = "",
}: LoaderProps) => {
  if (variant === "overlay") {
    return (
      <Overlay
        message={message ?? "Placing your order..."}
        subMessage={subMessage ?? "Please don't close this page"}
      />
    );
  }

  if (variant === "skeleton") {
    return (
      <div className={className}>
        <SkeletonGrid count={count} />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      aria-busy="true"
    >
      {variant === "spinner" && <Spinner size={size} />}
      {variant === "food-icon" && <FoodIconSpinner />}
      {variant === "dots" && <Dots message={message} />}
      {variant === "pulse" && <PulseRings />}
      {variant === "wave" && <WaveBars />}
    </div>
  );
};

export default Loader;

// ─── Named exports for direct use ─────────────────────────────────────────────
export {
  Spinner,
  FoodIconSpinner,
  Dots,
  PulseRings,
  WaveBars,
  SkeletonCard,
  SkeletonGrid,
  Overlay,
};
