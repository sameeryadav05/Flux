import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import ArtifactHeader from "./ArtifactHeader";
import FileTabs from "./FileTabs";
import MonacoViewer from "./MonacoViewer";
import ResizeHandle from "./ResizeHandle";
import { useAuth } from "../../utils/AuthProvider";
import Preview from "./Preview";



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

  const { artifacts, isOpen } = useSelector(
    (state) => state.artifact
  );

  const theme = useSelector(
    (state) => state.theme.mode
  );

  const [width, setWidth] = useState(520);

  if (!isOpen || artifacts.length === 0) return null;

  const project = artifacts[0];

const OUTPUT_TAB = {
  id: "__output__",
  name: "Output",
  type: "output",
};

const [selectedTab, setSelectedTab] = useState(
  project.files[0]
);

  /*
    If another project is generated,
    automatically open its first file.
  */

useEffect(() => {
  if (project?.files?.length) {
    setSelectedTab(project.files[0]);
  }
}, [project]);

const language = useMemo(() => {
  if (selectedTab.type === "output")
    return "plaintext";

  const ext = selectedTab.name
    .split(".")
    .pop();

  return languageMap[ext] || "plaintext";
}, [selectedTab]);
  const {isMobile} = useAuth()

  const tabs = [
  ...project.files,
  OUTPUT_TAB,
];

  return (
<aside
  className={`

    ${
      isMobile
        ? "fixed inset-0 z-50 flex"
        : "relative flex shrink-0"
    }

    flex-col
    bg-white
    dark:bg-neutral-950
    border-l
    border-neutral-200
    dark:border-neutral-800
  `}
  style={{
    width: isMobile ? "100%" : width,
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
        files={tabs}
        selectedFile={selectedTab}
        onSelect={setSelectedTab}
      />

      {/* Editor */}

  <div className="flex-1 min-h-0 overflow-hidden">
{
selectedTab.type === "output"

? (
    <Preview project={project} />
)

: (
    <MonacoViewer
        language={language}
        value={selectedTab.content}
        theme={theme}
    />
)
}
  </div>
    </aside>
  );
}