import { factory } from "./factory.js";

let root = document.getElementById("root");
let addColumnButton = document.getElementById("addColumn");

export function createColumn() {
  addColumnButton.addEventListener("click", function creation(event) {
    createColumnObject(event);
  });
}

export function createColumnObject({ target }) {
  root.prepend(columnForm);
  let form = document.getElementById("columnForm");
  let input = form.elements["columnTitleInput"];
  let select = form.elements["columnSelectColor"];
  let button = form.elements["columnButton"];
  let id = 0;
  let arrayForItems = [];
  let arrayForColumns = [];
  let objectForValues = {};
  let titleValue;
  let colorValue;
  input.addEventListener("change", function editTitle({ target }) {
    titleValue = target.value;
    input.removeEventListener("click", editTitle);
  });
  select.addEventListener("change", function editColor({ target }) {
    colorValue = target.value;
    select.removeEventListener("click", editColor);
  });
  button.addEventListener("click", function confirmAll({ target }) {
    localStorage.setItem(
      `column-${removeSpaces(titleValue)}`,
      JSON.stringify(arrayForItems)
    );
    objectForValues.title = titleValue;
    objectForValues.color = colorValue;
    let localColumns = [];
    if (localStorage.getItem("columns")) {
      localColumns = JSON.parse(localStorage.getItem("columns"));
      let oldId = localColumns[localColumns.length - 1].id;
      objectForValues.id = ++oldId;
      localColumns.push(objectForValues);
      localStorage.setItem("columns", JSON.stringify(localColumns));
      console.log("localStorage true");
    } else {
      objectForValues.id = id;
      localColumns.push(objectForValues);
      localStorage.setItem("columns", JSON.stringify(localColumns));
    }
    columnForm.remove();
    createColumnElement();
    button.removeEventListener("click", confirmAll);
  });
}

export let columnForm = factory(
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
      factory("option", { value: " " }, "Select Color"),
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

function removeSpaces(string) {
  let arrayOfLetters = string.split("");
  let result = arrayOfLetters.map((element) =>
    element === " " ? (element = "-") : element
  );
  return result.join("");
}

function addSpaces(string) {
  let arrayOfLetters = string.split("");
  let result = arrayOfLetters.map((element) =>
    element === "-" ? (element = " ") : element
  );
  return result.join("");
}

export function createColumnElement() {
  let localColumns = JSON.parse(localStorage.getItem("columns"));
  localColumns.forEach((element) => {
    let column = factory(
      "div",
      {
        class:
          "flex flex-col justify-start flex-1 drop-shadow-xl p-2 rounded-lg",
      },
      factory(
        "div",
        {
          id: `${element.id}-title`,
          class: "flex justify-between mb-2 p-4",
        },
        factory("h2", { class: "text-xl" }, addSpaces(element.title)),
        factory("span", { class: "" })
      ),
      factory(
        "button",
        {
          id: `${element.id}-add-todo-button`,
          class: "mt-auto p-4 rounded-lg drop-shadow-md",
        },
        "Add ToDo"
      ),
      factory(
        "button",
        {
          id: `${element.id}-delete-all-todo-button`,
          class: "mt-auto p-4 rounded-lg drop-shadow-md",
        },
        "Delete All"
      )
    );
    root.prepend(column);
    columnColor(element, column);
  });
}

function columnColor(element, column) {
  let columnTitle = column.childNodes[0];
  element.color === "gray" ? columnTitle.classList.add("bg-gray-200") : null;
  element.color === "yellow"
    ? columnTitle.classList.add("bg-yellow-200")
    : null;
  element.color === "green" ? columnTitle.classList.add("bg-green-200") : null;
  element.color === "blue" ? columnTitle.classList.add("bg-blue-200") : null;
  element.color === "red" ? columnTitle.classList.add("bg-red-200") : null;
}
