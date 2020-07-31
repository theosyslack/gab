import { getFrontmatter } from "./Frontmatter.ts";
import path from 'https://deno.land/x/ramda@v0.27.0/path.js';
import color from 'https://deno.land/x/color/index.ts'
import lineOf from './lineOf.ts'

export const templateRegex = new RegExp(/{{[\s\S]+?}}/, 'g')

export interface TemplateTag {
    key: string
    match: string
}

export const getTemplateTags = (md: string): Set<TemplateTag> => {
    const matches = md.matchAll(templateRegex)
    let tags: Set<TemplateTag> = new Set()

    for (const [match] of matches) {
        const key = match.replace('{{', '').replace('}}', '').trim()
        tags.add({ key, match })
    }

    return tags
}


export const updateTemplateTags = (raw: string): string => {
    const { frontmatter, md } = getFrontmatter(raw)
    if (!frontmatter) return md;

    const tags = getTemplateTags(md)
    let result = md;

    for (const tag of tags) {
        const value = path(tag.key.split('.'), frontmatter);
        if (value) {
            result = result.replace(tag.match, value)
        } else {
            console.warn(color.yellow.text(`    ${tag.match} on Line ${lineOf(raw, tag.match)} does not match with any Frontmatter data`))
        }
    }

    return result
}

