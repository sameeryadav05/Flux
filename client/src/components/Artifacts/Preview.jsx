import { useMemo } from "react";

export default function Preview({ project }) {
  const srcDoc = useMemo(() => {
    const html =
      project.files.find((f) => f.name.endsWith(".html"))
        ?.content || "";

    const css =
      project.files.find((f) => f.name.endsWith(".css"))
        ?.content || "";

    const js =
      project.files.find((f) => f.name.endsWith(".js"))
        ?.content || "";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<style>
${css}
</style>

</head>

<body>

${html}

<script>
${js}
</script>

</body>
</html>
`;
  }, [project]);

  return (
    <iframe
      title="Output Preview"
      className="w-full h-full bg-white"
      sandbox="allow-scripts"
      srcDoc={srcDoc}
    />
  );
}