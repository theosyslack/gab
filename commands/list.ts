import getMaybePath from "../io/getMaybePath.ts"
import traverseDirectory from "../io/traverseDirectory.ts"

async function list(path?: string) {
    if (path === undefined) {
        return console.error('Must supply a directory path to `list`.')
    }

    const realPath = await getMaybePath(path)

    if (realPath) {
        const realPath = await Deno.realPath(Deno.cwd() + "/" + path)
        
        const directories = await traverseDirectory(realPath)
        console.log(JSON.stringify(directories, null, 2))
        
    } else {
        console.error(`'${path}' is not a valid path`)
    }

    
}
export default list