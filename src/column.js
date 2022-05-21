import { columnTitle } from "./factory.js";

// Creation

let addColumnButton = document.getElementById("addColumn");

export function createColumn() {
  addColumnButton.addEventListener("click", (event) => {
    createColumnObject(event);
  });
}

function createColumnObject({ target }) {
  root.prepend(columnTitle);
  let form = document.getElementById("columnTitleForm");
  let input = form.elements["columnTitleInput"];
  let select = form.elements["columnSelectColor"];
  let button = form.elements["columnButton"];
  let id = 0;
  let arrayForItems = [];
  let arrayForColumns = [];
  let objectForValues = {};
  let titleValue;
  let colorValue;
  input.addEventListener("change", ({ target }) => {
    titleValue = target.value;
  });
  select.addEventListener("change", ({ target }) => {
    colorValue = target.value;
  });
  button.addEventListener("click", ({ target }) => {
    localStorage.setItem(
      `column-${removeSpaces(titleValue)}`,
      JSON.stringify(arrayForItems)
    );
    objectForValues.title = titleValue;
    objectForValues.color = colorValue;
    arrayForColumns.push(objectForValues);
    localStorage.setItem("columns", JSON.stringify(arrayForColumns));
  });
}

function removeSpaces(string) {
  let arrayOfLetters = string.split("");
  let result = arrayOfLetters.map((element) =>
    element === " " ? (element = "-") : element
  );
  return result.join("");
}

// Render
