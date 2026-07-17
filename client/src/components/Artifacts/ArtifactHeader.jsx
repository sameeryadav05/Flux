import { useDispatch } from "react-redux";
import { closeArtifacts } from "../../redux/Artifcacts/ArtifactSlice";

import {
  IoClose,
  IoDownloadOutline,
  IoCopyOutline,
  IoFolderOpenOutline,
} from "react-icons/io5";

const ArtifactHeader = ({ project }) => {
  const dispatch = useDispatch();

  function copyProjectNames() {
    const text = project.files
      .map((file) => file.name)
      .join("\n");

    navigator.clipboard.writeText(text);
  }

  function downloadProject() {
    // ZIP download will be implemented later.
    console.log(project);
  }

  return (
    <header
      className="
      h-14
      shrink-0

      flex
      items-center
      justify-between

      px-4

      border-b
      border-neutral-200
      dark:border-neutral-800

      bg-neutral-50
      dark:bg-neutral-900
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-3 overflow-hidden">
        <div
          className="
          size-9

          rounded-lg

          bg-violet-500/15
          text-violet-600

          dark:text-violet-400

          flex
          items-center
          justify-center
          "
        >
          <IoFolderOpenOutline size={18} />
        </div>

        <div className="overflow-hidden">
          <h2 className="font-semibold truncate">
            {project.type}
          </h2>

          <p className="text-xs text-neutral-500 truncate">
            {project.files.length} files
          </p>
        </div>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-1">
        <button
          onClick={copyProjectNames}
          className="
          size-9

          rounded-lg

          flex
          items-center
          justify-center

          hover:bg-neutral-200
          dark:hover:bg-neutral-800

          transition
          "
          title="Copy filenames"
        >
          <IoCopyOutline size={18} />
        </button>

        <button
          onClick={downloadProject}
          className="
          size-9

          rounded-lg

          flex
          items-center
          justify-center

          hover:bg-neutral-200
          dark:hover:bg-neutral-800

          transition
          "
          title="Download Project"
        >
          <IoDownloadOutline size={18} />
        </button>

        <button
          onClick={() => dispatch(closeArtifacts())}
          className="
          size-9

          rounded-lg

          flex
          items-center
          justify-center

          hover:bg-red-100
          hover:text-red-600

          dark:hover:bg-red-500/20
          dark:hover:text-red-400

          transition
          "
          title="Close"
        >
          <IoClose size={20} />
        </button>
      </div>
    </header>
  );
};

export default ArtifactHeader;