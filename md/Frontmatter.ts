import { load } from 'https://deno.land/x/js_yaml_port@3.14.0/js-yaml.js'
import { ParsedMarkdown } from '../types.ts'


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

export function parseFrontmatter(frontmatterString: string): object {
    const yaml = frontmatterString.split('\n').filter(s => s !== '---').join('\n');

    return load(yaml)
}