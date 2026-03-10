import { formatText } from "../utils/format.js";

export function p(text, { strong = [], code = [] } = {}) {

    return `<p>${formatText(text, strong, code)}</p>`;

}

export function ul(items, { strong = [], code = [] } = {}) {

    const li = items.map(i => `
        <li>${formatText(i, strong, code)}</li>
    `).join("");

    return `<ul>${li}</ul>`;

}

export function codeBlock(lines, indentLevel = 0) {

    const indent = '  '.repeat(indentLevel);
    const formattedLines = lines.map(line => `${indent}${line}`).join('\n');

    return `<pre class="code-block">${formattedLines}</pre>`;
    
}