"use client"; 
import { useCreateBlockNote } from "@blocknote/react";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
// import { PartialBlock } from "@blocknote/core";


const darkCustomTheme = {
  colors: {
    editor: {
      text: "#f6f7f8",
      background: "transparent",
    },
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

// const initialContent: PartialBlock[] = [
//   {
//     type: "heading",
//     content: "Experience the Dokunote Editor ✨",
//     props: { level: 2 },
//   },
//   {
//     type: "paragraph",
//     content: "Try out the demo editor, You can start writing with '/'",
//   },
//   {
//     type: "paragraph",
//     content: "",
//   }
// ];
export default function EditorForHeroDemo() {
  
  const editor = useCreateBlockNote({
    // initialContent,
  });

  const { resolvedTheme } = useTheme();

  const currentTheme = resolvedTheme === "dark" ? darkCustomTheme : lightDefaultTheme;
 
  return <BlockNoteView editor={editor} className="h-[calc(100vh-12rem)] w-full overflow-y-scroll bg-neutral-50 dark:bg-neutral-800 rounded-3xl" theme={currentTheme} spellCheck={false}/>;
}