import getMaybePath from "../io/getMaybePath.ts";
import findMarkdownFiles from "../io/findMarkdownFiles.ts";
import { MarkdownFile } from "../types/Directory.ts";

import * as Fae from 'https://deno.land/x/fae/lensPath.ts'

function groupFilesByFolder(files: MarkdownFile[]) {
  return files.reduce((acc, { path, name }) => {
    const tree = path.split('/')
    const lens = Fae.lensPath(path)
    return Object.assign({}, acc, { [tree[0]]: name })
  }, {})
}

async function list(path?: string) {
  if (path === undefined) {
    return console.error("Must supply a directory path to `list`.");
  }

  const realPath = await getMaybePath(path);

  if (realPath) {

    const files = await findMarkdownFiles(path);
    console.log(groupFilesByFolder(files))

  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default list;
