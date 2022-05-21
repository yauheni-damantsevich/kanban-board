export const element = (type, attributes, ...children) => {
    const el = document.createElement(type);
    for (const key in attributes) {
        el.setAttribute(key, attributes[key]);
    }
    children.forEach((child) => {
        if (typeof child === "string") {
            el.prepend(document.createTextNode(child));
        } else if (child !== undefined) {
            el.prepend(child);
        }
    });
    return el;
}

export let column = element("div", {class: "flex flex-grow flex-col"}, element("div", {class: "bg-black p-4"}))