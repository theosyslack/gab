
import getMaybePath from "../io/getMaybePath.ts";
import findMarkdownFiles from "../md/findMarkdownFiles.ts";
import { ensureFile } from "https://deno.land/std/fs/mod.ts";
import convertMarkdownFile from "../md/convertMarkdownFile.ts";

async function build(path?: string, output: string = "./build") {
  if (path === undefined) {
    return console.error("Must supply a directory path to `build`.");
  }

  const realPath = await getMaybePath(path);

  if (realPath) {
    const files = await findMarkdownFiles(path);

    await Promise.all(files.map(async (file) => {
      const outputPath = output + "/" + file.directory + "/" + file.basename + '.html'
      console.log(`Building ${outputPath}`)

      await ensureFile(outputPath)

      const html = await convertMarkdownFile(file)
      console.log(outputPath)
      await Deno.writeTextFile(outputPath, html)
      console.log(outputPath)
    }))

  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default build;
