import logo from "/favicon.svg";

const OverlayLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950/80 backdrop-blur-lg">

      <div className="flex flex-col items-center gap-6">

        <img
          src={logo}
          className="w-16 h-16 animate-pulse"
        />

        <div className="flex gap-2">

          <div className="h-2 w-2 rounded-full bg-violet-500 animate-bounce"></div>

          <div
            className="h-2 w-2 rounded-full bg-violet-500 animate-bounce"
            style={{ animationDelay: ".15s" }}
          ></div>

          <div
            className="h-2 w-2 rounded-full bg-violet-500 animate-bounce"
            style={{ animationDelay: ".3s" }}
          ></div>

        </div>

      </div>

    </div>
  );
};

export default OverlayLoader;