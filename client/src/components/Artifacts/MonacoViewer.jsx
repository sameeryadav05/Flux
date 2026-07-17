import Editor from "@monaco-editor/react";

export default function MonacoViewer({
  language,
  value,
  theme,
}) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme={theme === "dark" ? "vs-dark" : "light"}
      loading={
        <div className="h-full flex items-center justify-center">
          Loading Editor...
        </div>
      }
      options={{
        readOnly: true,

        automaticLayout: true,

        minimap: {
          enabled: false,
        },

        scrollBeyondLastLine: false,

        wordWrap: "on",

        wrappingStrategy: "advanced",

        smoothScrolling: true,

        cursorBlinking: "smooth",

        cursorSmoothCaretAnimation: "on",

        renderLineHighlight: "all",

        fontSize: 14,

        fontFamily:
          "'JetBrains Mono','Fira Code','Cascadia Code', monospace",

        fontLigatures: true,

        lineHeight: 24,

        tabSize: 2,

        padding: {
          top: 20,
          bottom: 20,
        },

        overviewRulerBorder: false,

        hideCursorInOverviewRuler: true,

        scrollbar: {
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
          alwaysConsumeMouseWheel: false,
        },

        folding: true,

        glyphMargin: false,

        renderIndentGuides: true,

        bracketPairColorization: {
          enabled: true,
        },

        guides: {
          indentation: true,
          bracketPairs: true,
        },

        contextmenu: true,

        links: true,

        formatOnPaste: false,

        formatOnType: false,

        stickyScroll: {
          enabled: true,
        },
      }}
    />
  );
}