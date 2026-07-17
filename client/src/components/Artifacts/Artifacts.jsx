import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import ArtifactHeader from "./ArtifactHeader";
import FileTabs from "./FileTabs";
import MonacoViewer from "./MonacoViewer";
import ResizeHandle from "./ResizeHandle";
import { useAuth } from "../../utils/AuthProvider";

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

  console.log("Artifacts Mounted");
  const { artifacts, isOpen } = useSelector(
    (state) => state.artifact
  );

  const theme = useSelector(
    (state) => state.theme.mode
  );

  const [width, setWidth] = useState(520);

  if (!isOpen || artifacts.length === 0) return null;

  const project = artifacts[0];

  const [selectedFile, setSelectedFile] = useState(
    project.files[0]
  );

  /*
    If another project is generated,
    automatically open its first file.
  */

  useEffect(() => {
    if (project?.files?.length) {
      setSelectedFile(project.files[0]);
    }
  }, [project]);

  const language = useMemo(() => {
    const ext = selectedFile?.name
      ?.split(".")
      ?.pop();

    return languageMap[ext] || "plaintext";
  }, [selectedFile]);

  // const {isMobile} = useAuth()

  return (
<aside
  className="
    hidden lg:flex
    relative
    flex-col
    shrink-0

    bg-white
    dark:bg-neutral-950

    border-l
    border-neutral-200
    dark:border-neutral-800
  "
  style={{
    width,
  }}
>
      {/* Resize Handle (Desktop only) */}

      <ResizeHandle
        width={width}
        setWidth={setWidth}
      />

      {/* Header */}

      <ArtifactHeader
        project={project}
      />

      {/* Tabs */}

      <FileTabs
        files={project.files}
        selectedFile={selectedFile}
        onSelect={setSelectedFile}
      />

      {/* Editor */}

  <div className="flex-1 min-h-0 overflow-hidden">
      <MonacoViewer
          language={language}
          value={selectedFile.content}
          theme={theme}
      />
  </div>
    </aside>
  );
}