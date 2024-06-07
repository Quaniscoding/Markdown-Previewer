import React, { useState } from 'react';
import { marked } from 'marked';
import './App.css';

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
const realTableCellRenderer = renderer.tablecell;

renderer.tablecell = function (content, flags) {
  flags.align = null;
  return realTableCellRenderer(content, flags);
};

const App = () => {
  const initialMarkdown = `
  # Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Here's some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  function anotherExample(firstLine, lastLine) {
    if (firstLine === \`\`\` && lastLine === \`\`\`) {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `;

  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [editorMaximized, setEditorMaximized] = useState(false);
  const [previewMaximized, setPreviewMaximized] = useState(false);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleToggleEditor = () => {
    setEditorMaximized(!editorMaximized);
    setPreviewMaximized(false); // Đảm bảo rằng Preview không được mở khi mở Editor
  };

  const handleTogglePreview = () => {
    setPreviewMaximized(!previewMaximized);
    setEditorMaximized(false); // Đảm bảo rằng Editor không được mở khi mở Preview
  };

  return (
    <div className={`App ${editorMaximized ? 'editor-maximized' : ''} ${previewMaximized ? 'preview-maximized' : ''}`}>
      <Editor markdown={markdown} handleChange={handleChange} handleToggleEditor={handleToggleEditor} />
      <Preview markdown={markdown} handleTogglePreview={handleTogglePreview} />
    </div>
  );
};

const Editor = ({ markdown, handleChange, handleToggleEditor, editorMaximized }) => (
  <div className="editorWrap">
    <div className="toolbar">
      <i className="fa fa-free-code-camp" title="no-stack-dub-sack" />
      Editor
      <i className={`fa ${editorMaximized ? 'fa-compress' : 'fa-arrows-alt'}`} onClick={handleToggleEditor} />
    </div>
    <textarea id="editor" value={markdown} onChange={handleChange} />
  </div>
);

const Preview = ({ markdown, handleTogglePreview, previewMaximized }) => (
  <div className="previewWrap">
    <div className="toolbar">
      <i className="fa fa-free-code-camp" title="no-stack-dub-sack" />
      Previewer
      <i className={`fa ${previewMaximized ? 'fa-compress' : 'fa-arrows-alt'}`} onClick={handleTogglePreview} />
    </div>
    <div id="preview" dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
  </div>
);

export default App;
