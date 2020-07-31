
import findMarkdownFiles from "../md/findMarkdownFiles.ts";
import convertMarkdownFile from "../md/convertMarkdownFile.ts";

async function test(...args: string[]) {
  const files = await findMarkdownFiles('./test');
  const result = await Promise.all(files.map(convertMarkdownFile))
  console.log(result)
}
export default test;
