export function formatText(text, strong = [], code = []) {

    if (!text) return "";

    let result = text;

    const CODE_START = "\uE000";
    const CODE_END = "\uE001";
    const STRONG_START = "\uE002";
    const STRONG_END = "\uE003";

    const escapeRegExp = (str) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    strong = [...strong].sort((a,b)=>b.length-a.length);
    code = [...code].sort((a,b)=>b.length-a.length);

    code.forEach(word => {

        if (!word) return;

        const reg = new RegExp(escapeRegExp(word), "g");

        result = result.replace(reg, `${CODE_START}${word}${CODE_END}`);
    });

    strong.forEach(word => {

        if (!word) return;

        const reg = new RegExp(escapeRegExp(word), "g");

        result = result.replace(reg, `${STRONG_START}${word}${STRONG_END}`);
    });

    result = result
        .replace(new RegExp(CODE_START, "g"), "<code>")
        .replace(new RegExp(CODE_END, "g"), "</code>")
        .replace(new RegExp(STRONG_START, "g"), "<strong>")
        .replace(new RegExp(STRONG_END, "g"), "</strong>");

    return result;
}