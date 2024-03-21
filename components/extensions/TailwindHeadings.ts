
import Heading from '@tiptap/extension-heading'
import { mergeAttributes } from '@tiptap/core'

const TailwindHeadings = Heading.configure({ levels: [1, 2, 3] }).extend({
    levels: [1, 2, 3],
    renderHTML({ node, HTMLAttributes }) {
      const classes = {
        1: 'text-4xl',
        2: 'text-3xl',
        3: 'text-2xl',
      }
      const level = (this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0]) as keyof typeof classes
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ]
    },
  })

export default TailwindHeadings
