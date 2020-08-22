import findMarkdownFiles from "../md/findMarkdownFiles.ts";
import { ensureFile, emptyDir, exists, copy } from "https://deno.land/std@0.62.0/fs/mod.ts";
import convertMarkdownFile from "../md/convertMarkdownFile.ts";

const counter = (count: number, total: number) => {
  return `[${count.toString().padStart(total.toString().length, " ")}/${total}]`
}

async function build(path?: string, output: string = "./build") {
  if (path === undefined) {
    return console.error("Must supply a directory path to `build`.");
  }

  const template = await exists(path + "/template.html") ? await Deno.readTextFile(path + "/template.html") : '<%= content %>'
  const hasPublic = await exists(path + "/public")

  if (await exists(path)) {
    const files = await findMarkdownFiles(path);
    const total = files.length
    let count = 0;

    await emptyDir(output)

    for await (const file of files) {
      const fixedPath = file.directory.replace(path, "").replace("//", "")

      const outputPath = output + fixedPath + "/" + file.basename + '.html'
      await ensureFile(outputPath)

      const html = await convertMarkdownFile(file)

      await Deno.writeTextFile(outputPath, template.replace("<%= content %>", html))

      console.log(`${counter(++count, total)} ${outputPath}`)
    }

    if (hasPublic) {
      await copy(path + "/public", output + "/public")
    }
  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default build;
