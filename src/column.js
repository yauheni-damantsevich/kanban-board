import { columnTitle } from "./factory.js";

let addColumnButton = document.getElementById("addColumn");

export function createColumn() {
  addColumnButton.addEventListener("click", (event) => {
    createColumnObject(event);
  });
}

function createColumnObject({ target }) {
  root.prepend(columnTitle);
  let form = document.getElementById("ColumnTitleForm");
  let input = form.elements["ColumnTitleInput"];
  let button = form.elements["ColumnTitleButton"];
  let id = 0;
  let array = [];
  let value;
  input.addEventListener("change", ({ target }) => {
    value = target.value;
  });
  button.addEventListener("click", ({ target }) => {
    localStorage.setItem(
      `column-${removeSpaces(value)}`,
      JSON.stringify(array)
    );
  });
}

function removeSpaces(string) {
  let arrayOfLetters = string.split("");
  let result = arrayOfLetters.map((element) =>
    element === " " ? (element = "-") : element
  );
  return result.join("");
}
