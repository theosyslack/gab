import { MarkdownFile } from "../types/Directory.ts";

async function findMarkdownFiles(
  directoryPath: string,
  depth: number = 5,
): Promise<MarkdownFile[]> {
  let files: MarkdownFile[] = [];

  for await (const entry of Deno.readDir(directoryPath)) {
    const path = directoryPath + "/" + entry.name
    if (entry.isFile && path.endsWith(".md")) {
      const { name } = entry;

      files = files.concat([{ path, name }])
    }

    if (entry.isDirectory && depth > 0) {
      files = files.concat(await findMarkdownFiles(path))
    }
  }

  return files;
}

export default findMarkdownFiles;
