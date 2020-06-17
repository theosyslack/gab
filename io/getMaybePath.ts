async function getMaybePath (path: string): Promise<string | false> {
    try {
        return await Deno.realPath(Deno.cwd() + "/" + path)
    } catch (error) {
        return false
    }
}

export default getMaybePath