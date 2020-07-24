import { Frontmatter } from "./Frontmatter.ts";

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
    // Deno.exit(1)
}


export const updateTemplateTags = (md: string, frontmatter: Frontmatter): string => {
    const tags = getTemplateTags(md)
    let result = md;

    for (const tag of tags) {
        const value = frontmatter.get(tag.key);
        if (value) {
            result = result.replace(tag.match, value)
        }
    }

    console.log(result)
    return result
    // Deno.exit(1)
}

