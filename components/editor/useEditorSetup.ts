import StarterKit from '@tiptap/starter-kit'
import { useEditor as _useEditor } from '@tiptap/vue-3'
import { TailwindHeadings, TailwindCode, TailwindUnderline, TailwindCodeBlock } from './extensions'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

export function useEditorSetup(initialContent: string, onUpdate: (content: string) => void) {
  return _useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        code: false,
        codeBlock: false
      }),
      Document,
      Image,
      Dropcursor,
      Paragraph,
      Text,
      TailwindHeadings,
      TailwindUnderline,
      TailwindCode,
      TailwindCodeBlock,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'textarea textarea-bordered textarea-lg'
      }
    },
  })
}
