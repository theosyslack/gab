import { Marked } from "https://deno.land/x/markdown/mod.ts";

import { MarkdownFile } from "../types.ts";
import { getFrontmatter } from "./Frontmatter.ts"
import { getTemplateTags, updateTemplateTags } from "./parse.ts";

async function convertMarkdownFile({ path }: MarkdownFile): Promise<string> {
  const content = await Deno.readTextFile(path)

  return Marked.parse(updateTemplateTags(content))
}

export default convertMarkdownFile;
