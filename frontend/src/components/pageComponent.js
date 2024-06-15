import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { renderMarkdown } from '../utils/markdown';

export default function PageComponent({ content, onElementClick }) {
  // const customRenderers = {
  //   p: (paragraphProps) => (
  //     <p {...paragraphProps} onClick={() => onElementClick(paragraphProps.node)}>
  //       {paragraphProps.children}
  //     </p>
  //   ),
  //   // li: (listItemProps) => (
  //   //   <li {...listItemProps} onClick={() => onElementClick(listItemProps.node)}>
  //   //     {listItemProps.children}
  //   //   </li>
  //   // ),
  //   ul: (listProps) => (
  //     <ul {...listProps} onClick={() => onElementClick(listProps.node)}>
  //       {listProps.children}
  //     </ul>
  //   ),
  // };
  const htmlContent = renderMarkdown(content);

  return (
    <div className="p-2 bg-transparent">
      <div className='markdown-body overflow-y-auto'>
        {/* <Markdown remarkPlugins={[remarkGfm]} components={customRenderers}>{content}</Markdown> */}
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  )
}
