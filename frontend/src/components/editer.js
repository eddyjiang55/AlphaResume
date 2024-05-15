import React, { useRef, useEffect, useState } from "react";

import Editor from "@monaco-editor/react";

function ResumeEditer() {
  const editorRef = useRef(null);
  const [resumeContent, setResumeContent] = useState('');

  useEffect(() => {
    // Fetch resume content from server
    console.log(resumeContent)
  }, [resumeContent]);

  useEffect(() => {
    // Fetch resume content from server
    setTimeout(() => {
      setResumeContent("# Hello, world!")
    }, 2000)
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue());
  }

  return (
    <>
      <Editor
        height="100%"
        defaultLanguage="markdown"
        value={resumeContent}
        onMount={handleEditorDidMount}
        onChange={(value, event) => setResumeContent(value)}
      />
    </>
  );
}

export default ResumeEditer;
