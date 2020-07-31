import build from './build.ts';
import { exists } from "https://deno.land/std@0.62.0/fs/mod.ts";

async function watch(path?: string, output: string = "./build") {
  if (path === undefined) {
    return console.error("Must supply a directory path to `build`.");
  }

  if (await exists(path)) {
    const watcher = Deno.watchFs(path);

    await build(path, output)

    for await (const event of watcher) {
      console.log('-----------------------')
      console.log(`Rebuilding ${path} ...`)
      // await build(path, output)
      console.log(event)
      console.log('-----------------------')
    }

  } else {
    console.error(`'${path}' is not a valid path`);
  }
}
export default watch;
