
import findMarkdownFiles from "../md/findMarkdownFiles.ts";
import { ensureFile, exists } from "https://deno.land/std/fs/mod.ts";
import convertMarkdownFile from "../md/convertMarkdownFile.ts";

async function test(...args: string[]) {
  const files = await findMarkdownFiles('./test');
  const result = await Promise.all(files.map(convertMarkdownFile))
  console.log(result)
}
export default test;
