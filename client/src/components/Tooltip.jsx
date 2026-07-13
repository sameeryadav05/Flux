const Tooltip = ({
  children,
  text,
  position = "top",
}) => {
  const positions = {
    top: {
      tooltip:
        "bottom-full left-1/2 -translate-x-1/2 mb-2",
      arrow:
        "top-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-neutral-900 dark:border-t-neutral-700",
    },

    bottom: {
      tooltip:
        "top-full left-1/2 -translate-x-1/2 mt-2",
      arrow:
        "bottom-full left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-neutral-900 dark:border-b-neutral-700",
    },

    left: {
      tooltip:
        "right-full top-1/2 -translate-y-1/2 mr-2",
      arrow:
        "left-full top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-neutral-900 dark:border-l-neutral-700",
    },

    right: {
      tooltip:
        "left-full top-1/2 -translate-y-1/2 ml-2",
      arrow:
        "right-full top-1/2 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-neutral-900 dark:border-r-neutral-700",
    },
  };

  return (
    <div className="relative inline-flex group">
      {children}

      <div
        className={`
          absolute z-50
          ${positions[position].tooltip}
          opacity-0 invisible
          group-hover:opacity-100
          group-hover:visible
          transition-all duration-200
          pointer-events-none
        `}
      >
        <div
          className="
            relative
            w-max
            max-w-xs
            rounded-md
            bg-neutral-900
            dark:bg-neutral-700
            px-3
            py-1.5
            text-xs
            text-white
            shadow-lg
          "
        >
          {text}

          <div
            className={`
              absolute
              w-0
              h-0
              ${positions[position].arrow}
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;