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

export let columnTitle = factory(
  "div",
  {
    class: "flex flex-col flex-grow flex-col bg-gray-50 rounded-lg",
  },
  factory(
    "form",
    { id: "ColumnTitleForm", class: "p-8 flex flex-col" },
    factory("input", {
      id: "ColumnTitleInput",
      placeholder: "Enter the title",
      class: "w-6/12 self-center p-4 rounded-lg bg-gray-50 shadow-inner mb-4",
    }),
    factory(
      "button",
      {
        id: "ColumnTitleButton",
        type: "button",
        class:
          "w-6/12 self-center p-4 bg-gray-50 rounded-lg drop-shadow-md active:bg-gray-100 active:drop-shadow-none active:shadow-inner",
      },
      "Confirm"
    )
  )
);
