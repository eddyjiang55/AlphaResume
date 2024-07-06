import MarkdownIt from "markdown-it";
import yaml from "js-yaml";
import MarkdownItDeflist from "markdown-it-deflist";
import LinkAttributes from "markdown-it-link-attributes";
import MarkdownItKatex from "markdown-it-katex";
import MarkdownItCite from "markdown-it-cross-ref";
import MarkdownItLatexCmds from "markdown-it-latex-cmds";
import frontmatter from "front-matter";

const preprocessMarkdown = (md) => {
  // Function to replace double quotes inside text values with single quotes
  const replaceQuotes = (line) => {
    return line.replace(/"(.*?)"/g, (match, p1) => {
      return '"' + p1.replace(/"/g, '\'') + '"';
    });
  };

  // Function to sanitize lines by removing colon and any value following it within text properties
  const sanitizeLine = (line) => {
    console.log(line);
    // Find and sanitize text properties
    if (line.includes('text:')) {
      const parts = line.split('</span>');
      if (parts.length > 1) {
        parts[1] = parts[1].replace(/:.*/, '');
        return parts.join('</span>');
      }
    }
    return line;
  };

  // Split the markdown into lines
  const lines = md.split('\n');
  let inYamlBlock = false;
  let yamlIndentation = 0;

  const processedLines = lines.map((line) => {
    if (/^---$/.test(line)) {
      inYamlBlock = !inYamlBlock;
      return line;
    }
    if (inYamlBlock) {
      // Replace quotes inside text values for the current line
      line = replaceQuotes(line);
      // Sanitize specific problematic values
      line = sanitizeLine(line);
      // console.log(line);

      const match = /^(\s*-\s*[^:]+:)\s*(.*)$/.exec(line);
      if (match) {
        // Ensure correct indentation for sequence entries
        yamlIndentation = match[1].length;
        return match[1] + ' ' + match[2];
      }
      if (line.trim().startsWith('- ')) {
        // Adjust indentation for list items within YAML block
        return ' '.repeat(yamlIndentation) + line.trim();
      }
    }
    return line;
  });

  return processedLines.join('\n');
};



const markdown = (() => {
  const md = new MarkdownIt({ html: true });

  md.use(MarkdownItDeflist);
  md.use(MarkdownItKatex);
  md.use(MarkdownItCite);
  md.use(MarkdownItLatexCmds);

  md.use(LinkAttributes, {
    matcher: (link) => /^https?:\/\//.test(link),
    attrs: {
      target: "_blank",
      rel: "noopener"
    }
  });

  return md;
})();

const resolveDeflist = (html) => {
  const dlReg = /<dl>([\s\S]*?)<\/dl>/g;
  const dlList = html.match(dlReg);

  if (dlList === null) return html;

  for (const dl of dlList) {
    const newDl = dl.replace(/<\/dd>\n<dt>/g, "</dd>\n</dl>\n<dl>\n<dt>");
    html = html.replace(dl, newDl);
  }

  return html;
};

const formatResume = (html) => {
  html = resolveDeflist(html);

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const sections = doc.querySelectorAll('h2');
  let formattedHtml = '';

  sections.forEach(section => {
    section.classList.add('theme-title');
    const sectionTitleText = section.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('section');
    sectionDiv.id = `${sectionTitleText}-section`;

    const sectionTitle = section.outerHTML;
    sectionDiv.innerHTML = sectionTitle;
    // console.log(sectionDiv);
    let sibling = section.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      sectionDiv.innerHTML += sibling.outerHTML;
      sibling = sibling.nextElementSibling;
    }

    formattedHtml += sectionDiv.outerHTML;
  });

  return formattedHtml;
};

const resolveHeader = (html, frontmatter) => {
  let header = "";

  if (frontmatter.name) header += `<h1 class='theme-title'>${frontmatter.name}</h1>\n`;

  if (frontmatter.header) {
    const n = frontmatter.header.length;

    for (let i = 0; i < n; i++) {
      const item = frontmatter.header[i];
      if (!item) continue;

      header += item.newLine ? "<br>\n" : "";

      header += `<span class="resume-header-item${i === n - 1 || frontmatter.header[i + 1].newLine ? " no-separator" : ""
        }">`;

      if (item.link)
        header += `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
      else header += item.text;

      header += `</span>\n`;
    }
  }

  return `<div class="resume-header">${header}</div>` + html;
};

export const renderMarkdown = (md) => {
  // console.log(md);
  const preprocessedMd = preprocessMarkdown(md);
  // console.log(preprocessedMd);
  const { body, attributes } = frontmatter(preprocessedMd);

  let html = markdown.render(body);
  // console.log(html);
  // html = formatResume(html);
  // console.log(html);
  html = resolveHeader(html, attributes);

  return html;
};