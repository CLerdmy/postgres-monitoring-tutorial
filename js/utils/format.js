export function formatText(text, strong = [], code = []) {

    if (!text) return "";

    let result = text;

    const escapeRegExp = (str) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    strong = [...strong].sort((a,b)=>b.length-a.length);
    code = [...code].sort((a,b)=>b.length-a.length);

    code.forEach(word => {

        if (!word) return;

        const reg = new RegExp(escapeRegExp(word), "g");

        result = result.replace(reg, `@@CODE_START@@${word}@@CODE_END@@`);
    });

    strong.forEach(word => {

        if (!word) return;

        const reg = new RegExp(escapeRegExp(word), "g");

        result = result.replace(reg, `@@STRONG_START@@${word}@@STRONG_END@@`);
    });

    result = result
        .replace(/@@CODE_START@@/g,"<code>")
        .replace(/@@CODE_END@@/g,"</code>")
        .replace(/@@STRONG_START@@/g,"<strong>")
        .replace(/@@STRONG_END@@/g,"</strong>");

    return result;
}