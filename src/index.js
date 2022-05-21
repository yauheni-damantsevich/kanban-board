import {column} from "./factory"

let root = document.getElementById("root")
let addColumnButton = document.getElementById("addColumn")
let id = 0

addColumnButton.addEventListener("click", (event) => {
    createColumnObject(event)
})

function createColumnObject({target}) {
    console.log(target)
    // let object = {}
}

function toLocal(array) {
    localStorage.setItem(`column-${id}`, JSON.stringify(obj));

}