const $todoUl = document.getElementById("todo-list");
const $inputLine = document.getElementById("input-line");
const $addButton = document.getElementById("add-button");
const $messageBoard = document.getElementById("display-board");
let todoIdCounter = 0;
let listItemsArr = [];
let arrangeBy = "status";

class todoItem {
  constructor(date, title) {
    this.date = date;
    this.id = todoIdCounter;
    this.title = title;
    this.dateAdded = `${date.getDate()}/${date.getMonth()}, ${date.getHours()}:${date.getMinutes()}`;
    this.complete = false;
    todoIdCounter++;
  }
}

$addButton.addEventListener("click", function addItem() {
  while ($inputLine.value.length < 2) {
    alert("Length must be longer than 2");
    $inputLine.value = "";
    return;
  }
  let newItem = new todoItem(new Date(), $inputLine.value);
  listItemsArr.push(newItem);
  $messageBoard.classList.add("d-none");
  arrangeBy === "status" ? arrangeStatus() : arrangeDate();
});

function addItemHtml(obj) {
  $todoUl.innerHTML += `<li id="${
    obj.id
  }" class="list-group-item list-group-item-primary d-flex justify-content-between ${
    obj.complete ? "completed" : ""
  }"><input type="checkbox" onchange="changeStatus(this)" ${
    obj.complete ? "checked" : ""
  }/> &nbsp&nbsp ${obj.title}  &nbsp&nbsp  At:  ${
    obj.dateAdded
  } &nbsp&nbsp <button onclick="removeItem(this)" class="bg-danger align-self-end"><i class="bi bi-trash3"></i></button> </li>`;
  $inputLine.value = "";
}

//remove todo
function removeItem(element) {
  let index = findItemId(element);
  listItemsArr.splice(index, 1);
  element.parentElement.remove();
  listItemsArr.length < 1 ? emptyList() : null;
}

///change status complete or not
function changeStatus(element) {
  const index = findItemId(element);
  listItemsArr[index].complete
    ? (listItemsArr[index].complete = false)
    : (listItemsArr[index].complete = true);
  arrangeBy === "status" ? arrangeStatus("new") : arrangeDate("new");
  allComplete();
}

//sorting the list of todos according to complete or not

//find index of todo object in todos array
function findItemId(element) {
  const index = listItemsArr.findIndex(
    (objItem) => objItem.id == element.parentElement.id
  );
  return index;
}

function arrangeDate() {
  arrangeBy = "date";
  listItemsArr.sort((a, b) => (a.date > b.date ? 1 : -1));
  $todoUl.innerHTML = "";
  for (let i = 0; i < listItemsArr.length; i++) {
    addItemHtml(listItemsArr[i]);
  }
}

function arrangeStatus() {
  arrangeBy = "status";
  listItemsArr.sort((item) => (item.complete ? 1 : -1));
  $todoUl.innerHTML = "";
  for (let i = 0; i < listItemsArr.length; i++) {
    addItemHtml(listItemsArr[i]);
  }
  console.log(listItemsArr);
}

function printPdf() {
  window.print();
}

function emptyList() {
  $messageBoard.classList.remove("d-none");
  $messageBoard.innerHTML = `<div class="d-flex w-50  mx-auto h-75 bg-danger-subtle">
  <span class="mx-auto my-auto p-5"><h3>The list is Empty</span></h3></span>
</div>`;
}

function allComplete() {
  if (listItemsArr.every((e) => e.complete)) {
    $messageBoard.classList.remove("d-none");
    $messageBoard.innerHTML = `<div class="d-flex w-50  mx-auto h-75 bg-danger-subtle">
    <span class="mx-auto my-auto p-5"><h3>Great Job! <br/>You are all done!</h3></span>
  </div>`;
  } else {
    $messageBoard.classList.add("d-none");
  }
}
