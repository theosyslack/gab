import { MarkdownFile } from "../types/Directory.ts";

async function findMarkdownFiles(
  directory: string,
  depth: number = 5,
): Promise<MarkdownFile[]> {
  let files: MarkdownFile[] = [];

  for await (const entry of Deno.readDir(directory)) {
    const { name, isDirectory, isFile } = entry;
    const path = directory + "/" + name

    if (isFile && path.endsWith(".md")) {
      const [basename] = name.split('.')
      files = files.concat([{ path, name, directory, basename }])
    }

    if (isDirectory && depth > 0) {
      files = files.concat(await findMarkdownFiles(path))
    }
  }

  return files;
}

export default findMarkdownFiles;
