import {
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoReact,
  BiLogoTypescript,
  BiLogoPython,
  BiLogoJava,
} from "react-icons/bi";

import {
  SiCplusplus,
  SiC,
  SiPhp,
  SiGo,
  SiRust,
  SiJson,
  SiMarkdown,
} from "react-icons/si";
import { FaPlay } from "react-icons/fa6";

import { VscFileCode } from "react-icons/vsc";

const extensionIcons = {
  html: <BiLogoHtml5 className="text-orange-500" />,
  css: <BiLogoCss3 className="text-blue-500" />,
  js: <BiLogoJavascript className="text-yellow-400" />,
  jsx: <BiLogoReact className="text-cyan-400" />,
  ts: <BiLogoTypescript className="text-blue-600" />,
  tsx: <BiLogoReact className="text-cyan-400" />,
  json: <SiJson className="text-yellow-500" />,
  md: <SiMarkdown className="text-neutral-500" />,
  py: <BiLogoPython className="text-yellow-500" />,
  java: <BiLogoJava className="text-red-500" />,
  cpp: <SiCplusplus className="text-blue-500" />,
  c: <SiC className="text-blue-600" />,
  php: <SiPhp className="text-violet-500" />,
  go: <SiGo className="text-cyan-500" />,
  rs: <SiRust className="text-orange-600" />,
};

export default function FileTabs({
  files,
  selectedFile,
  onSelect,
}) {
  return (
    <div
      className="
      flex
      items-center

      overflow-x-auto

      no-scrollbar

      border-b
      border-neutral-200
      dark:border-neutral-800

      bg-neutral-100
      dark:bg-neutral-900
      "
    >
      {files.map((file) => {

          const isOutput = file.type === "output";

      const extension = isOutput
          ? ""
          : file.name.split(".").pop();

        // const extension = file.name.split(".").pop();

const active =
selectedFile.name === file.name;

        return (
          <button
            key={file.name}
            onClick={() => onSelect(file)}
            className={`
              group

              flex
              items-center
              gap-2

              px-4
              py-3

              border-r
              border-neutral-200
              dark:border-neutral-800

              whitespace-nowrap

              transition-all
              duration-200

              ${
                active
                  ? `
                    bg-white
                    dark:bg-neutral-950

                    border-b-2
                    border-b-violet-500
                  `
                  : `
                    hover:bg-neutral-200
                    dark:hover:bg-neutral-800
                  `
              }
            `}
          >
            <span className="text-lg">
              {
                isOutput

                  ? (
                      <FaPlay
                          className="text-green-500"
                      />
                  )

                  : (
                      extensionIcons[extension] ??
                      <VscFileCode />
                  )
              }
            </span>

            <span
              className={`
                text-sm

                ${
                  active
                    ? "font-medium"
                    : "text-neutral-500"
                }
              `}
            >
              {file.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}