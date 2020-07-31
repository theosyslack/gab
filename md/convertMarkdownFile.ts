import { Marked } from "https://deno.land/x/markdown/mod.ts";
import { MarkdownFile } from "../types.ts";

async function convertMarkdownFile({ md }: MarkdownFile): Promise<string> {
  return Marked.parse(md)
}

export default convertMarkdownFile;
