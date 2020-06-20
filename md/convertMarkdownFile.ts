import { Marked } from "https://deno.land/x/markdown/mod.ts";

import { MarkdownFile } from "../types/Directory.ts";

async function convertMarkdownFile({path}: MarkdownFile): Promise<string> {
  const content = await Deno.readTextFile(path)

  return Marked.parse(content)
}

export default convertMarkdownFile;
