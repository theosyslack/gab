import getMaybePath from "../io/getMaybePath.ts";
import findMarkdownFiles from "../io/findMarkdownFiles.ts";
import { MarkdownFile } from "../types/Directory.ts";

import * as Fae from 'https://deno.land/x/fae/mod.ts'

function groupFilesByFolder(files: MarkdownFile[]) {
  return files.reduce((acc, { path, name }) => {
    const tree = path.split('/').slice(0, -1).concat(["files"])
    const lens = Fae.lensPath(tree)
    const previous = Fae.path(tree, acc) || []
    const result = Fae.set(lens, [...previous, name], acc)
    return result
  }, {})
}

async function list(path?: string) {
  if (path === undefined) {
    return console.error("Must supply a directory path to `list`.");
  }

  const realPath = await getMaybePath(path);

  if (realPath) {

    const files = await findMarkdownFiles(path);
    console.log(JSON.stringify(groupFilesByFolder(files), null, 2))

  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default list;
