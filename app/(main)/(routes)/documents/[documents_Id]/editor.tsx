"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import { useCreateBlockNoteWithLiveblocks } from "@liveblocks/react-blocknote";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { Threads } from "./threads";

import LoadingSpinner from "@/components/loading-spinner";


interface EditorPageProps {
  initialContent?: string;
  onChange?: (value: string) => void;
  editable?: boolean;
}

//ToDO: Find the issue with the Code Block

//TODO : add a custom theme for the editor
// const lightRedTheme = {
//   colors: {
//     editor: {
//       text: "	#0a0a0a",
//       background: "transparent",
//     },
//     menu: {
//       text: "#0a0a0a",
//       background: "#fafafa",
//     },
//     tooltip: {
//       text: "#ffffff",
//       background: "#71717a",
//     },
//     hovered: {
//       text: "#0a0a0a",
//       background: "#f0f0f0",
//     },
//     selected: {
//       text: "#ffffff",
//       background: "#71717a",
//     },
//     disabled: {
//       text: "#a1a1aa",
//       background: "#f4f4f5",
//     },
//     shadow: "#6b7280",
//     // border: "#9ca3af",
//     sideMenu: "#bababa",
//     highlights: lightDefaultTheme.colors!.highlights,
//   },
//   borderRadius: 4,
// } satisfies Theme;

const darkCustomTheme = {
  colors: {
    editor: {
      text: "#f6f7f8",
      background: "transparent",
    },
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

const EditorPage = ({
  initialContent,
  onChange,
  editable,
}: EditorPageProps) => {
  interface EditorConfig {
    editable?: boolean;
    initialContent?: PartialBlock[];
    onEditorContentChange: (editor: BlockNoteEditor) => void;
  }

  const [isLoading, setIsLoading] = useState(true);

  const editor: BlockNoteEditor = useCreateBlockNoteWithLiveblocks(
    {
      editable,
      initialContent: initialContent
        ? (JSON.parse(initialContent) as PartialBlock[])
        : undefined,
      onEditorContentChange: (editor: BlockNoteEditor) => {
        // Schedule the onChange callback to avoid synchronous updates
        setTimeout(() => {
          onChange?.(JSON.stringify(editor.topLevelBlocks, null, 2));
        }, 0);
      },
    } as EditorConfig,
    { mentions: true, offlineSupport_experimental: true }
  );

  useEffect(() => {
    if (initialContent !== undefined) {
      setIsLoading(false);
    }
  }, [initialContent]);



  const { resolvedTheme } = useTheme();

  const currentTheme =
    resolvedTheme === "dark" ? darkCustomTheme : lightDefaultTheme;

  return (
    <div className="min-h-screen bg-background">
      {isLoading ? (
        <div className="-translate-y-56">
          <LoadingSpinner label="Document loading"/>
        </div>
      ) : (
        <>
          <BlockNoteView
            editable
            editor={editor}
            theme={currentTheme}
            className="md:max-w-5xl mx-auto pb-4 min-h-screen"
          />
          <Threads editor={editor} />
        </>
      )}
    </div>
  );
};

export default EditorPage;
