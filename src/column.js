import { factory } from "./factory.js";
import { createItemObject } from "./item.js";

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
    class: "flex flex-1 flex-col bg-gray-50 rounded-lg",
  },
  factory(
    "form",
    { id: "columnForm", class: "flex flex-col" },
    factory("input", {
      id: "columnTitleInput",
      placeholder: "Enter the title",
      class:
        "text-lg w-6/12 self-center m-4 p-4 rounded-lg bg-inherit shadow-inner mb-4",
    }),
    factory(
      "select",
      {
        id: "columnSelectColor",
        class: "w-6/12 self-center m-4 p-4 rounded-lg bg-inherit mb-4",
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
          "w-6/12 self-center m-4 p-4 bg-inherit rounded-lg drop-shadow-md active:bg-gray-100 active:drop-shadow-none active:shadow-inner",
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
    if (localColumns.indexOf(element) === localColumns.length - 1) {
      let column = factory(
        "div",
        {
          class:
            "flex-grow flex flex-col justify-start flex-1 drop-shadow-xl rounded-lg",
        },
        factory(
          "div",
          {
            id: `${element.id}-title`,
            class: "flex justify-between m-4 p-4",
          },
          factory("h2", { class: "text-lg" }, addSpaces(element.title)),
          factory("span", { class: "" })
        ),
        factory(
          "button",
          {
            id: `${element.id}-add-todo-button`,
            class: "bg-inherit mt-auto m-4 p-4 rounded-lg drop-shadow-md",
          },
          "Add ToDo"
        ),
        factory(
          "button",
          {
            id: `${element.id}-delete-all-todo-button`,
            class: "bg-inherit m-4 p-4 rounded-lg drop-shadow-md",
          },
          "Delete All"
        )
      );
      root.prepend(column);
      columnColor(element, column);
    }
  });
}

function columnColor(element, column) {
  element.color === "gray" ? column.classList.add("bg-gray-200") : null;
  element.color === "yellow" ? column.classList.add("bg-yellow-200") : null;
  element.color === "green" ? column.classList.add("bg-green-200") : null;
  element.color === "blue" ? column.classList.add("bg-blue-200") : null;
  element.color === "red" ? column.classList.add("bg-red-200") : null;
}

function addTodoButtonAction(element) {
  let addTodoButton = document.getElementById(`${element.id}-add-todo-button`);
  addTodoButton.addEventListener("click", (event) => {
    createItemObject();
  });
}
