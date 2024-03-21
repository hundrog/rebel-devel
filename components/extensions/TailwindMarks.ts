import { mergeAttributes } from '@tiptap/core'
import Code from '@tiptap/extension-code'
import Underline from '@tiptap/extension-underline'
import CodeBlock from '@tiptap/extension-code-block'

export const TailwindCode = Code.extend({
    renderHTML({ HTMLAttributes }) {
        return [
            'div', mergeAttributes(HTMLAttributes, { class: 'mockup-code max-w-xs bg-base-300 text-base-content rounded-xl' }),
            ['pre', mergeAttributes(HTMLAttributes, { 'data-prefix': '$' }),
                ['code', 0]
            ]
        ]
    },
})

export const TailwindCodeBlock = CodeBlock.extend({
    renderHTML({ HTMLAttributes }) {
        return [
            'div', mergeAttributes(HTMLAttributes, { class: 'mockup-code max-w-md bg-base-300 text-base-content rounded-xl' }),
            ['pre', mergeAttributes(HTMLAttributes, { 'data-prefix': '$' }),
                ['code', 0]
            ]
        ]
    },
})

export const TailwindUnderline = Underline.configure({
    HTMLAttributes: {
        class: 'underline',
    },
})
