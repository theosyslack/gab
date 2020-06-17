
interface Directory extends Deno.DirEntry {
    entries?: Deno.DirEntry[]
}

async function traverseDirectory(directoryPath: string, level:number = 0): Promise<Directory[]> {
    let entries: Deno.DirEntry[] = [];
    
    for await (const entry of Deno.readDir(directoryPath)) {
        if (entry.isFile) {
            entries = entries.concat([entry])
        }

        if (entry.isDirectory) {
            if (level < 5) {

                entries = entries.concat([Object.assign({}, entry, {entries: await traverseDirectory(directoryPath + "/" + entry.name, level + 1)})])
            } else {
                entries = entries.concat([entry])
            }
        }
    }

    return entries
}

export default traverseDirectory