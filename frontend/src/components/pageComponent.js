import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PageComponent({ content, pageIndex, onElementClick }) {
  const customRenderers = {
    p: (paragraphProps) => (
      <p {...paragraphProps} onClick={() => onElementClick(paragraphProps.children)}>
        {paragraphProps.children}
      </p>
    ),
    // li: (listItemProps) => (
    //   <li {...listItemProps} onClick={() => onElementClick(listItemProps.node)}>
    //     {listItemProps.children}
    //   </li>
    // ),
    ul: (listProps) => (
      <ul {...listProps} onClick={() => onElementClick(listProps.node)}>
        {listProps.children}
      </ul>
    ),
  };

  return (
    <div className="page" id={`page-${pageIndex}`}>
      <div className='markdown-body'>
        <Markdown remarkPlugins={[remarkGfm]} components={customRenderers}>{content}</Markdown>
      </div>
    </div>
  )
}
