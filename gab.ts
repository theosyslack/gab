import list from "./commands/list.ts";

const [command, ...args] = Deno.args;

switch (command) {
  case "list":
    await list(...args);
    break;
  case undefined:
    console.error(`Please supply a command.`);
    break;
  default:
    console.error(`No command found: ${command}`);
}
