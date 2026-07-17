import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeArtifacts } from "../../redux/Artifcacts/ArtifactSlice";

import JSZip from "jszip";
import { saveAs } from "file-saver";

import {
  IoClose,
  IoDownloadOutline,
  IoCopyOutline,
  IoFolderOpenOutline,
  IoCheckmark,
} from "react-icons/io5";

const ArtifactHeader = ({ project }) => {
  const dispatch = useDispatch();

  const [copied, setCopied] = useState(false);

  async function copyProject() {
    try {
      const text = project.files
        .map(
          (file) => `
===== ${file.name} =====

${file.content}
`
        )
        .join("\n\n");

      await navigator.clipboard.writeText(text);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  }

  async function downloadProject() {
    try {
      const zip = new JSZip();

      project.files.forEach((file) => {
        zip.file(file.name, file.content);
      });

      const blob = await zip.generateAsync({
        type: "blob",
      });

      saveAs(
        blob,
        `${project.type.replace(/\s+/g, "-").toLowerCase()}.zip`
      );
    } catch (err) {
      console.error(err);
    }
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

          <p className="text-xs text-neutral-500">
            {project.files.length} files
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">

        <button
          onClick={copyProject}
          title="Copy Project"
          className="
            size-9
            rounded-lg
            flex
            items-center
            justify-center
            transition
            hover:bg-neutral-200
            dark:hover:bg-neutral-800
          "
        >
          {copied ? (
            <IoCheckmark
              size={20}
              className="text-green-500"
            />
          ) : (
            <IoCopyOutline size={18} />
          )}
        </button>

        <button
          onClick={downloadProject}
          title="Download ZIP"
          className="
            size-9
            rounded-lg
            flex
            items-center
            justify-center
            transition
            hover:bg-neutral-200
            dark:hover:bg-neutral-800
          "
        >
          <IoDownloadOutline size={18} />
        </button>

        <button
          onClick={() => dispatch(closeArtifacts())}
          title="Close"
          className="
            size-9
            rounded-lg
            flex
            items-center
            justify-center
            transition

            hover:bg-red-100
            hover:text-red-600

            dark:hover:bg-red-500/20
            dark:hover:text-red-400
          "
        >
          <IoClose size={20} />
        </button>
      </div>
    </header>
  );
};

export default ArtifactHeader;