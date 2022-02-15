const str = "<div><p><a>123123</a>768<b>23</b></p></div>";

function Node(tagName) {
  this.childNodes = [];
  this.tag = tagName;
  this.content = null;
}

let nodeBuffer = "";
const stack = [];
const root = [];
let isReadingContent = false;
let readingClosingTag = false;

let start = performance.now();
for (let i = 0; i < str.length; i++) {
  const currentChar = str[i];

  if (currentChar === "<") {
    if (nodeBuffer.length > 0 && isReadingContent) {
      const node = new Node();
      node.content = nodeBuffer;
      //AddChildToCurrentNode(contentNode);
      if (stack.length === 0) {
        root.push(node);
      } else {
        stack[stack.length - 1].childNodes.push(node);
      }
    }
    isReadingContent = false;
    nodeBuffer = "";
  } else if (currentChar !== ">" && currentChar !== "/") {
    nodeBuffer += currentChar;
  } else if (currentChar === "/" && str[i - 1] === "<") {
    readingClosingTag = true;
  }

  if (currentChar === ">") {
    if (readingClosingTag) {
      const node = stack.pop();
      if (stack.length === 0) {
        root.push(node);
      } else {
        stack[stack.length - 1].childNodes.push(node);
      }
    } else {
      const newNode = new Node(nodeBuffer);
      stack.push(newNode);
    }
    nodeBuffer = "";
    isReadingContent = true;
    readingClosingTag = false;
  }
}
console.log(performance.now() - start);

console.log(root);
