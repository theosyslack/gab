import { Marked } from "https://deno.land/x/markdown/mod.ts";
import { MarkdownFile } from "../types.ts";

async function writeToHTML({ path, name }: MarkdownFile) {
    const content = await Deno.readTextFile(path);
    console.log(Marked.parse(content))

}

export default writeToHTML