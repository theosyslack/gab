import list from "./commands/list.ts";
import build from "./commands/build.ts";


const [command, ...args] = Deno.args;

switch (command) {
  case "list":
    await list(...args);
    break;
  case "build":
      await build(...args);
      break;
  case undefined:
    console.error(`Please supply a command.`);
    break;
  default:
    console.error(`No command found: ${command}`);
}
