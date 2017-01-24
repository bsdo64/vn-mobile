import marked from 'marked';

const renderer = new marked.Renderer();

renderer.table = function (header, body) {
  return '<table class="ui celled table">\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  renderer: renderer
});

export default marked;