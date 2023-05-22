const hljs = require("highlight.js");

export const markdown = (mavonEditor, content) => {
  const md = mavonEditor.getMarkdownIt();
  return md
    .set({
      highlight: function(str, lang) {
        const codeIndex =
          parseInt(Date.now()) + Math.floor(Math.random() * 10000000);
        let html = `<button class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}">copy</button>`;

        const linesLength = str.split(/\n/).length - 1;
        let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
        for (let index = 0; index < linesLength; index++) {
          linesNum = linesNum + "<span></span>";
        }
        linesNum += "</span>";
        if (lang && hljs.getLanguage(lang)) {
          try {
            const preCode = hljs.highlight(lang, str, true).value;
            html = html + preCode;
            if (linesLength) {
              html += '<b class="name">' + lang + "</b>";
            }
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
              /<\/textarea>/g,
              "&lt;/textarea>"
            )}</textarea>`;
          } catch (error) {
            console.log(error);
          }
        }

        const preCode = md.utils.escapeHtml(str);
        html = html + preCode;
        return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
          /<\/textarea>/g,
          "&lt;/textarea>"
        )}</textarea>`;
      },
    })
    .render(content);
};
