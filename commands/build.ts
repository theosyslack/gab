
import getMaybePath from "../io/getMaybePath.ts";
import findMarkdownFiles from "../md/findMarkdownFiles.ts";
import { ensureFile, exists, move } from "https://deno.land/std/fs/mod.ts";
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
  const hasPublic = await exists(path + "/public")
  console.log(path + "/public")


  if (await exists(path)) {
    const files = await findMarkdownFiles(path);
    const total = files.length
    let count = 0;

    await Promise.all(files.map(async (file) => {
      const fixedPath = file.directory.replace(path, "").replace("//", "")

      const outputPath = output + fixedPath + "/" + file.basename + '.html'
      await ensureFile(outputPath)

      const html = await convertMarkdownFile(file)

      await Deno.writeTextFile(outputPath, template.replace("<%= content %>", html))
      logGreen(`${counter(++count, total)} ${outputPath}`)
    }))


    if (hasPublic) {
      console.log('moving', path + "/public")
      await move(path + "/public", output + "/public")
      console.log("did it")
    }
  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default build;
