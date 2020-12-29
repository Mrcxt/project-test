import marked from "marked";
import hljs from "highlight.js";


const _marked = (md) => {
    const renderer = new marked.Renderer();
    renderer.code = function(code, lang = "bash") {
        return (`<pre><code class="hljs lang-${lang}" data-lang="${lang}">${hljs.highlight(lang, code).value}</code></pre>`);
    };
    marked.setOptions({
        renderer: renderer,
        breaks: true // md中的空行识别为分段，默认为false
    });
    return marked(md);
}

export default _marked;