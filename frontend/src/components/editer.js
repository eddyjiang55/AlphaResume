import Editor from "@monaco-editor/react";

function ResumeEditer({ markdownData, editMarkdownData }) {

  return (
    <>
      <Editor
        defaultLanguage="markdown"
        value={markdownData}
        onChange={(value, event) => editMarkdownData(value)}
      />
    </>
  );
}

export default ResumeEditer;
