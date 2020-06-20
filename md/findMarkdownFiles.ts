import { MarkdownFile } from "../types/Directory.ts";

async function findMarkdownFiles(
  directoryPath: string,
  depth: number = 5,
): Promise<MarkdownFile[]> {
  let files: MarkdownFile[] = [];

  for await (const entry of Deno.readDir(directoryPath)) {
    const {name, isDirectory, isFile} = entry;
    const path = directoryPath + "/" + name

    if (isFile && path.endsWith(".md")) {
      const [basename] = name.split('.') 
      const [directory] = name.split("/").slice(0, -1).join("/")
      files = files.concat([{ path, name, directory, basename }])
    }

    if (isDirectory && depth > 0) {
      files = files.concat(await findMarkdownFiles(path))
    }
  }

  return files;
}

export default findMarkdownFiles;
