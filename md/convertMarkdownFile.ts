import { Marked } from "https://deno.land/x/markdown/mod.ts";

import { MarkdownFile } from "../types/Directory.ts";
import { getFrontmatter } from "./Frontmatter.ts"
import { getTemplateTags, updateTemplateTags } from "./parse.ts";

async function convertMarkdownFile({ path }: MarkdownFile): Promise<string> {
  const content = await Deno.readTextFile(path)

  const { frontmatter, md } = getFrontmatter(content)

  if (frontmatter) {
    return Marked.parse(updateTemplateTags(md, frontmatter))
  } else {
    return Marked.parse(md)
  }
}

export default convertMarkdownFile;
