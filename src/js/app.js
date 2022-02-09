import markup from "../template/todo-template";
import Notiflix from 'notiflix';

const refs = {
    submitForm: document.querySelector('.todo__form'),
    input: document.querySelector('.todo__input'),
    todoList: document.querySelector('.todo__list'),
    btnClose: document.querySelector('.todo--close')
}

let arrTasks;
let checkbox;

checkLocalStorage();

function onSubmitForm(event) {
    event.preventDefault();
    if (!refs.input.value) {
        Notiflix.Notify.info('Please enter the task');
        return
    }

    arrTasks.push(new DataTask(refs.input.value));
    updateLocal();
    clearValueTask();
    addMarkup(arrTasks);
}

function DataTask(description) {
    this.description = description;
    this.completed = false;
}

function updateLocal() {
    localStorage.setItem('tasks', JSON.stringify(arrTasks));
}

function clearValueTask() {
    refs.input.value = '';
}

function addMarkup(array) {
    refs.todoList.innerHTML = '';
    refs.todoList.insertAdjacentHTML('beforeend', markup(array));
    addEvent();
}   

function checkLocalStorage() {
    !localStorage.tasks ? arrTasks = [] : checkAfterRefresh();
}

function checkAfterRefresh() {
    arrTasks = JSON.parse(localStorage.getItem('tasks'));
    addMarkup(arrTasks);
    checkCheckbox(arrTasks);
}

function addEvent() {
    checkbox = document.querySelectorAll('.todo__list--item');
    checkbox.forEach(el => {
        el.addEventListener('click', onClickCheckbox);
    })
}


function onClickCheckbox(event) {
    let eventTargetName = event.target.value;

    if (event.target.nodeName === 'BUTTON') {
        checkbox.forEach((el, index) => {
            if (event.currentTarget === el) { 
                arrTasks.splice(index, 1)
            }
        })
        updateLocal(arrTasks);
        checkAfterRefresh();
    }

    arrTasks.forEach((el, index) => {
        if (eventTargetName === el.description) {
            arrTasks[index].completed = !arrTasks[index].completed;    
        }
    })

    checkCheckbox(arrTasks);
    updateLocal(arrTasks);
}

function checkCheckbox(arrTasks) {
    arrTasks.forEach((el, index) => {
        if (el.completed) {
            checkbox[index].classList.add('todo__text')
        }
        else {
            checkbox[index].classList.remove('todo__text')
        }
    })
}

// function onCLickBtnClose() {
    
// }


refs.submitForm.addEventListener('submit', onSubmitForm);