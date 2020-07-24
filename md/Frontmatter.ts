export interface ParsedMarkdown {
    frontmatter: Frontmatter | null,
    md: string
}

export type Frontmatter = Map<string, string>

export const frontmatterRegex = new RegExp(/^---[\s\S]+?---/)

export function getFrontmatter(string: string): ParsedMarkdown {
    const match = string.match(frontmatterRegex)
    const md = string.replace(frontmatterRegex, '')
    const frontmatter = match ? parseFrontmatter(match[0]) : null

    return { frontmatter, md }
}

export function hasFrontmatter(string: string): boolean {
    const match = string.match(frontmatterRegex)
    return !!match
}

export function parseFrontmatter(frontmatterString: string): Map<string, string> {
    const lines = frontmatterString.split('\n')
    const keyValuePairs = lines.filter(line => line.includes(":"))

    const frontmatter = keyValuePairs.reduce((acc, line) => {
        const [key, value] = line.split(':')
        acc.set(key.trim(), value.trim())
        return acc
    }, new Map())
    return frontmatter
}