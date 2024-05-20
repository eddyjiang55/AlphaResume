import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PageComponent({ content, onElementClick }) {
  const customRenderers = {
    p: (paragraphProps) => (
      <p {...paragraphProps} onClick={() => onElementClick(paragraphProps.node)}>
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
    <div className="p-2 bg-transparent">
      <div className='markdown-body overflow-y-auto'>
        <Markdown remarkPlugins={[remarkGfm]} components={customRenderers}>{content}</Markdown>
      </div>
    </div>
  )
}
