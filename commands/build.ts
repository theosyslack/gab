
import getMaybePath from "../io/getMaybePath.ts";
import findMarkdownFiles from "../md/findMarkdownFiles.ts";

import convertMarkdownFile from "../md/convertMarkdownFile.ts";

async function build(path?: string, output: string = "./build") {
  if (path === undefined) {
    return console.error("Must supply a directory path to `build`.");
  }
  
  const realPath = await getMaybePath(path);

  if (realPath) {
    const files = await findMarkdownFiles(path);
    
    await Promise.all(files.map(async (file) => {
        console.log(`Building ${file.path}`)
        const html = await convertMarkdownFile(file)
        const outputPath = output + file.path + file.basename + '.html'
        await Deno.writeTextFile(outputPath, html)
        console.log(outputPath)
    }))

  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default build;
