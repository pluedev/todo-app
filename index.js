const inputEl = document.querySelector(".input-el");
const submitBtn = document.querySelector(".submit-btn");
const toDoList = document.querySelector(".to-do-list");



document.addEventListener("DOMContentLoaded", getToDos);
submitBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);


function addToDo(event) {
    event.preventDefault();
    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDo');

    const newToDo = document.createElement('li');
    newToDo.innerText = inputEl.value;
    newToDo.classList.add('toDo-item');
    toDoDiv.appendChild(newToDo);
    saveLocalToDos(inputEl.value);

    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    toDoDiv.appendChild(completedBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    toDoDiv.appendChild(trashBtn);

    toDoList.appendChild(toDoDiv);
    inputEl.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const toDo = item.parentElement;
        toDo.classList.add('fall');
        removeLocalToDos(toDo);
        toDo.addEventListener("transitionend", function() {
            toDo.remove();
        });
       
       
    }
    if (item.classList[0] === "complete-btn") {
        const toDo = item.parentElement;
        toDo.classList.toggle("completed");
}
}


function saveLocalToDos(toDo) {
    let toDos;
    if (localStorage.getItem("toDos") === null) {
        toDos = [];
    } 
    else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.push(toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
}


function getToDos() {
    let toDos;
    if (localStorage.getItem("toDos") === null) {
        toDos = [];
    } 
    else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    toDos.forEach(function(toDo) {
        const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('toDo');

    const newToDo = document.createElement('li');
    newToDo.innerText = toDo;
    newToDo.classList.add('toDo-item');
    toDoDiv.appendChild(newToDo);

    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    toDoDiv.appendChild(completedBtn);

    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    toDoDiv.appendChild(trashBtn);

    toDoList.appendChild(toDoDiv);
    })
}


function removeLocalToDos(toDo) {
    let toDos;
    if (localStorage.getItem("toDos") === null) {
        toDos = [];
    } 
    else {
        toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    const toDoIndex = toDo.children[0].innerText;
    toDos.splice(toDos.indexOf(toDoIndex), 1);
    localStorage.setItem("toDos", JSON.stringify(toDos));
}