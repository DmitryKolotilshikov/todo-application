import { getStringDate, clearList, calculateTasksCount, } from './utils/common.js';
import  { TODO_LIST_STORAGE_KEY, setLocalStorage, getFromLocalStorage } from './utils/localStorage.js';
import { domElements } from './domElements.js';

const {
    todoItemTemplate, todoListContainer, setTodoInput, filterInput, addTodoBtn,
    deleteAllBtn, deleteCompletedBtn, activeCount, completedCount, noTodosElement
} = domElements;


let todoList = getFromLocalStorage(TODO_LIST_STORAGE_KEY) || [];

addTodoBtn.addEventListener('click', () => {
    if (setTodoInput.value.trim()) {
        addNewTodoItem(todoList, setTodoInput);
    } else {
        alert('Please enter todo');
    }
    setTodoInput.focus();
});

filterInput.addEventListener('input', () => {
    if (filterInput.value.trim()) {
        const filterTodoList = todoList.filter( el => el.text.includes(filterInput.value.trim()));
        renderWithoutSaving(filterTodoList);
    }else {
        renderAndSave(todoList);
    }
})


deleteAllBtn.addEventListener('click', () => {
    todoList = [];
    renderAndSave(todoList);
});

deleteCompletedBtn.addEventListener('click', () => {
    todoList = todoList.filter( el => !el.completed);
    renderAndSave(todoList);
});


function addNewTodoItem(todos, inputElement) {
    const newTodoItem = {
        id: Date.now(),
        date: getStringDate(),
        completed: false, 
        text: inputElement.value.trim()
    }
    todos.push(newTodoItem);

    inputElement.value = '';

    renderAndSave(todos);
}

function createTodoItem(id, completed, text, date) {
    const todoElement = document.importNode(todoItemTemplate.content, true);
    const checkbox = todoElement.querySelector('[data-input-complete-checkbox]');
    checkbox.checked = completed;
    const todoDescription = todoElement.querySelector('[data-todo-item-description]');
    todoDescription.innerText = text;
    const todoDate = todoElement.querySelector('[data-todo-item-date]');
    todoDate.innerText = date;
    const todoRemoveBtn = todoElement.querySelector('[data-todo-item-delete-btn]');

    checkbox.addEventListener('change', (e) => {
        todoList = todoList.map( item => {
            if (item.id === id) {
                item.completed = e.target.checked;
            }
            return item
        });
        renderAndSave(todoList);
    })

    todoRemoveBtn.addEventListener('click', () => {
        todoList = todoList.filter( item => item.id !== id );
        renderAndSave(todoList);
    });

    return todoElement;
}

function renderTodo() {
    if(todoList.length) {
        todoList.forEach((el) => {
            const todoElement = createTodoItem(el.id, el.completed, el.text, el.date);
            todoListContainer.appendChild(todoElement);
        });

        noTodosElement.classList.add('display-none');
    } else {
        noTodosElement.classList.remove('display-none');
    }

    const todosCount = calculateTasksCount(todoList);
    activeCount.innerText = todosCount.active;
    completedCount.innerText = todosCount.completed;
}

function renderFilteredTodo(todos) {
    if(todos.length) {
        todos.forEach( el => {
            const todoElement = createTodoItem(el.id, el.completed, el.text, el.date);
            todoListContainer.appendChild(todoElement);
        });

        noTodosElement.classList.add('display-none');
    } else {
        noTodosElement.classList.remove('display-none');
    }
}

export function render() {
    clearList(todoListContainer);
    renderTodo();
}

function renderAndSave(todos) {
    setLocalStorage(TODO_LIST_STORAGE_KEY, todos);
    render();
}

function renderWithoutSaving(todos) {
    clearList(todoListContainer);
    renderFilteredTodo(todos)
}
