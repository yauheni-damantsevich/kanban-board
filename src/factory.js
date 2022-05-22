// Factory function

export const factory = (type, attributes, ...children) => {
  const el = document.createElement(type);
  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  children.forEach((child) => {
    if (typeof child === "string") {
      el.append(document.createTextNode(child));
    } else if (child !== undefined) {
      el.append(child);
    }
  });
  return el;
};
