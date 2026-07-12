import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">

      {/* 404 */}
      <h1
        className="
        text-5xl
        md:text-7xl
        font-bold
        bg-gradient-to-r
        from-neutral-900
        to-neutral-500
        dark:from-white
        dark:to-neutral-500
        bg-clip-text
        text-transparent
      "
      >
        404
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white">
        Page Not Found
      </h2>

      {/* Divider */}
      <div
        className="
        h-px
        w-72
        my-7
        bg-gradient-to-r
        from-transparent
        via-neutral-300
        to-transparent

        dark:via-neutral-700
      "
      />

      {/* Description */}
      <p
        className="
        max-w-lg
        text-center
        text-neutral-600
        dark:text-neutral-400
        text-base
        md:text-lg
      "
      >
        The page you're looking for doesn't exist, has been moved,
        or the URL may be incorrect.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate(-1)}
        className="
        mt-10
        flex
        items-center
        gap-2
        rounded-full
        px-7
        py-3
        font-medium

        bg-neutral-900
        text-white
        hover:bg-neutral-800

        dark:bg-white
        dark:text-neutral-900
        dark:hover:bg-neutral-200

        transition-all
        duration-200
        active:scale-95
      "
      >
        Go Back

        <svg
          className="transition-transform group-hover:translate-x-1"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M4.583 11h12.833m0 0L11 4.584M17.416 11 11 17.417"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

    </div>
  );
}