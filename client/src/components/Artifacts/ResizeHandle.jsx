import { useEffect, useRef } from "react";

const MIN_WIDTH = 350;
const MAX_WIDTH = 900;
const DEFAULT_WIDTH = 520;

export default function ResizeHandle({
  width,
  setWidth,
}) {
  const dragging = useRef(false);

  useEffect(() => {
    const savedWidth = Number(
      localStorage.getItem("artifact-width")
    );

    if (savedWidth) {
      setWidth(savedWidth);
    }
  }, []);

  useEffect(() => {
    function handleMove(e) {
      if (!dragging.current) return;

      const newWidth =
        window.innerWidth - e.clientX;

      const clamped = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, newWidth)
      );

      setWidth(clamped);

      localStorage.setItem(
        "artifact-width",
        clamped
      );
    }

    function stopDragging() {
      dragging.current = false;

      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMove
      );
      window.removeEventListener(
        "mouseup",
        stopDragging
      );
    };
  }, [setWidth]);

  return (
    <div
      className="
      hidden
      lg:block

      absolute

      left-0
      top-0
      bottom-0

      w-1.5

      cursor-col-resize

      group

      z-50
      "
      onMouseDown={() => {
        dragging.current = true;

        document.body.style.userSelect = "none";
        document.body.style.cursor = "col-resize";
      }}
      onDoubleClick={() => {
        setWidth(DEFAULT_WIDTH);

        localStorage.setItem(
          "artifact-width",
          DEFAULT_WIDTH
        );
      }}
    >
      <div
        className="
        h-full
        w-full

        transition-all

        group-hover:bg-violet-500/40
      "
      />
    </div>
  );
}