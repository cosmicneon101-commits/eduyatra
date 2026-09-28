"use client";
import { useEffect, useRef } from "react";
export default function RichTextEditor({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (editorRef.current) editorRef.current.innerHTML = defaultValue; if (hiddenRef.current) hiddenRef.current.value = defaultValue; }, [defaultValue]);
  const sync = () => { if (hiddenRef.current && editorRef.current) hiddenRef.current.value = editorRef.current.innerHTML; };
  const cmd = (command: string, value?: string) => { editorRef.current?.focus(); document.execCommand(command, false, value); sync(); };
  return <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
    <div className="flex flex-wrap gap-1 border-b bg-slate-50 p-2">
      <button type="button" onClick={() => cmd("bold")} className="rounded px-2 py-1 text-sm font-bold hover:bg-white">B</button>
      <button type="button" onClick={() => cmd("italic")} className="rounded px-2 py-1 text-sm italic hover:bg-white">I</button>
      <button type="button" onClick={() => cmd("formatBlock", "h2")} className="rounded px-2 py-1 text-sm font-semibold hover:bg-white">H2</button>
      <button type="button" onClick={() => cmd("formatBlock", "h3")} className="rounded px-2 py-1 text-sm font-semibold hover:bg-white">H3</button>
      <button type="button" onClick={() => cmd("insertUnorderedList")} className="rounded px-2 py-1 text-sm hover:bg-white">• List</button>
      <button type="button" onClick={() => cmd("insertOrderedList")} className="rounded px-2 py-1 text-sm hover:bg-white">1. List</button>
      <button type="button" onClick={() => cmd("formatBlock", "blockquote")} className="rounded px-2 py-1 text-sm hover:bg-white">Quote</button>
      <button type="button" onClick={() => { const url = window.prompt("Link URL"); if (url) cmd("createLink", url); }} className="rounded px-2 py-1 text-sm hover:bg-white">Link</button>
    </div>
    <div ref={editorRef} contentEditable suppressContentEditableWarning onInput={sync} className="min-h-56 p-4 outline-none prose prose-slate max-w-none" />
    <input ref={hiddenRef} type="hidden" name={name} />
  </div>;
}
