import { useEffect, useRef, useState } from "react";

export default function PageComponent({ htmlContent, paperSize, fontSize }) {
  const containerRef = useRef(null);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      const pageHeight = paperSize === "A4" ? 1130 - 96 : 1056 - 96; // px (A4: 1130px, Letter: 1056px)
      const tempDiv = document.createElement("div");
      tempDiv.classList.add("resume-page");
      tempDiv.style.position = "absolute";
      tempDiv.style.visibility = "hidden";
      tempDiv.style.width = "210mm"; // Assuming A4 width
      tempDiv.style.top = "-10000px";
      tempDiv.innerHTML = htmlContent;
      document.body.appendChild(tempDiv);

      const childNodes = Array.from(tempDiv.childNodes);
      const newPages = [];
      let currentPage = [];
      let currentHeight = 0;

      const addNodeToPage = (node, nodeHeight) => {
        currentPage.push(node.outerHTML);
        currentHeight += nodeHeight;
      };

      childNodes.forEach((node) => {
        const clonedNode = node.cloneNode(true);
        tempDiv.appendChild(clonedNode);
        let nodeHeight = clonedNode.offsetHeight;

        if (nodeHeight !== undefined && nodeHeight !== null) {
          if (
            clonedNode.classList.contains("crossref-item") ||
            clonedNode.classList.contains("resume-header") ||
            clonedNode.tagName.toLowerCase() === "h2"
          ) {
            nodeHeight += 18; // Adding extra margin
          }

          if (clonedNode.tagName.toLowerCase() === "ul") {
            const liNodes = Array.from(clonedNode.childNodes);
            liNodes.forEach((liNode) => {
              const liClonedNode = liNode.cloneNode(true);
              tempDiv.appendChild(liClonedNode);
              const liHeight = liClonedNode.offsetHeight;
              tempDiv.removeChild(liClonedNode);

              if (liHeight !== undefined && liHeight !== null) {
                if (currentHeight + liHeight > pageHeight) {
                  newPages.push(currentPage.join(""));
                  currentPage = [liClonedNode.outerHTML];
                  currentHeight = liHeight;
                } else {
                  addNodeToPage(liClonedNode, liHeight);
                }
              }
            });
          } else {
            if (currentHeight + nodeHeight > pageHeight) {
              newPages.push(currentPage.join(""));
              currentPage = [clonedNode.outerHTML];
              currentHeight = nodeHeight;
            } else {
              addNodeToPage(clonedNode, nodeHeight);
            }
          }
        }

        tempDiv.removeChild(clonedNode);
      });

      if (currentPage.length > 0) {
        newPages.push(currentPage.join(""));
      }

      if (newPages.length === 0) {
        newPages.push("");
      }
      setPages(newPages);
      document.body.removeChild(tempDiv);
    }
  }, [htmlContent, paperSize, fontSize]);

  return (
    <div
      ref={containerRef}
      className="resume-body w-full h-full flex flex-col items-center"
    >
      {pages.map((page, index) => (
        <div
          key={index}
          className="resume-page bg-white rounded-lg shadow-lg px-8 py-6 mb-4 overflow-hidden flex-shrink-0 "
          style={{
            width: paperSize === "A4" ? "210mm" : "8.5in",
            height: paperSize === "A4" ? "1130px" : "1056px",
          }}
          dangerouslySetInnerHTML={{ __html: page }}
        ></div>
      ))}
    </div>
  );
}
