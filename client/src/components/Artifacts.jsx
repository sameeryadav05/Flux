import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import Editor from "@monaco-editor/react";
import { closeArtifacts } from "../redux/Artifcacts/ArtifactSlice";

const languageMap = {
  html: "html",
  css: "css",
  js: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  json: "json",
  md: "markdown",
  py: "python",
  java: "java",
  cpp: "cpp",
  c: "c",
  cs: "csharp",
  go: "go",
  rs: "rust",
  php: "php",
  sql: "sql",
  yaml: "yaml",
  yml: "yaml",
  xml: "xml",
};

export default function Artifacts() {
  const dispatch = useDispatch();

  const { artifacts, isOpen } = useSelector(
    (state) => state.artifact
  );

  const theme = useSelector((state) => state.theme.mode);

  if (!isOpen || artifacts.length === 0) return null;

  const project = artifacts[0];

  const [selectedFile, setSelectedFile] = useState(
    project.files[0]
  );

  const language = useMemo(() => {
    const ext = selectedFile.name.split(".").pop();

    return languageMap[ext] || "plaintext";
  }, [selectedFile]);

  return (
    <aside
      className="
      fixed
      lg:relative

      inset-0
      lg:inset-auto

      z-50

      bg-white
      dark:bg-neutral-950

      w-full
      lg:w-[38%]

      border-l
      border-neutral-200
      dark:border-neutral-800

      flex
      flex-col
    "
    >
      {/* HEADER */}

      <div
        className="
        h-14
        border-b
        border-neutral-200
        dark:border-neutral-800

        px-4

        flex
        items-center
        justify-between
      "
      >
        <div>
          <h2 className="font-semibold">
            {project.type}
          </h2>

          <p className="text-xs text-neutral-500">
            {project.files.length} files
          </p>
        </div>

        <button
          onClick={() => dispatch(closeArtifacts())}
          className="
            size-9

            rounded-lg

            hover:bg-neutral-100
            dark:hover:bg-neutral-800

            flex
            items-center
            justify-center
          "
        >
          <IoClose size={20} />
        </button>
      </div>

      {/* FILE TABS */}

      <div
        className="
        flex

        overflow-x-auto

        border-b
        border-neutral-200
        dark:border-neutral-800

        no-scrollbar
      "
      >
        {project.files.map((file) => (
          <button
            key={file.name}
            onClick={() => setSelectedFile(file)}
            className={`
                px-4
                py-3

                text-sm

                whitespace-nowrap

                border-b-2

                transition

                ${
                  selectedFile.name === file.name
                    ? "border-violet-500 bg-neutral-100 dark:bg-neutral-900"
                    : "border-transparent"
                }
            `}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* MONACO */}

      <div className="flex-1">
        <Editor
          language={language}
          theme={theme === "dark" ? "vs-dark" : "light"}
          value={selectedFile.content}
          options={{
            readOnly: true,

            automaticLayout: true,

            minimap: {
              enabled: false,
            },

            fontSize: 14,

            scrollBeyondLastLine: false,

            wordWrap: "on",
          }}
        />
      </div>
    </aside>
  );
}