
import getMaybePath from "../io/getMaybePath.ts";
import findMarkdownFiles from "../md/findMarkdownFiles.ts";
import { ensureFile, exists } from "https://deno.land/std/fs/mod.ts";
import convertMarkdownFile from "../md/convertMarkdownFile.ts";

const logGreen = (message: string) => {
  const green = "\u001b[32m"
  const reset = "\u001b[0m"

  console.log(`${green}${message}${reset}`)
}

const counter = (count: number, total: number) => {
  return `[${count.toString().padStart(total.toString().length, " ")}/${total}]`
}

async function build(path?: string, output: string = "./build") {
  if (path === undefined) {
    return console.error("Must supply a directory path to `build`.");
  }

  const template = await exists(path + "/template.html") ? await Deno.readTextFile(path + "/template.html") : '<%= content %>'

  if (await exists(path)) {
    const files = await findMarkdownFiles(path);
    const total = files.length
    let count = 0;


    await Promise.all(files.map(async (file) => {
      const outputPath = output + "/" + file.directory + "/" + file.basename + '.html'
      await ensureFile(outputPath)

      const html = await convertMarkdownFile(file)

      await Deno.writeTextFile(outputPath, template.replace("<%= content %>", html))
      ++count
      logGreen(`${counter(count, total)} ${outputPath}`)
    }))

  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default build;
