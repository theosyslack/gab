import { Marked, Parsed } from "https://deno.land/x/markdown@v2.0.0/mod.ts";
import { MarkdownFile } from "../types.ts";

async function convertMarkdownFile({ md }: MarkdownFile): Promise<string> {
  return Marked.parse(md).content
}

export default convertMarkdownFile;
