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
    { id: "columnForm", class: "p-8 flex flex-col" },
    factory("input", {
      id: "columnTitleInput",
      placeholder: "Enter the title",
      class: "w-6/12 self-center p-4 rounded-lg bg-gray-50 shadow-inner mb-4",
    }),
    factory(
      "select",
      {
        id: "columnSelectColor",
        class: "w-6/12 self-center p-4 rounded-lg bg-gray-50 mb-4",
      },
      factory("option", { value: "gray" }, "Gray"),
      factory("option", { value: "yellow" }, "Yellow"),
      factory("option", { value: "green" }, "Green"),
      factory("option", { value: "blue" }, "Blue"),
      factory("option", { value: "red" }, "Red")
    ),
    factory(
      "button",
      {
        id: "columnButton",
        type: "button",
        class:
          "w-6/12 self-center p-4 bg-gray-50 rounded-lg drop-shadow-md active:bg-gray-100 active:drop-shadow-none active:shadow-inner",
      },
      "Confirm"
    )
  )
);
