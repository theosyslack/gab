
export type Frontmatter = object

export interface ParsedMarkdown {
    frontmatter: Frontmatter | null,
    md: string
}


export interface MarkdownFile extends ParsedMarkdown {
    name: string
    basename: string
    directory: string
    path: string
    raw: string
}