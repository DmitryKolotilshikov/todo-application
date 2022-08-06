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
    const searchValue = filterInput.value.trim();

    if (searchValue) {
        const filterTodoList = todoList.filter( el => el.text.includes(searchValue));
        renderWithoutSaving(filterTodoList);
    } else {
        renderAndSave(todoList);
    }
})


deleteAllBtn.addEventListener('click', () => {
    todoList = [];
    renderAndSave(todoList);
});

deleteCompletedBtn.addEventListener('click', () => {
    const todos = todoListContainer.querySelectorAll('[data-input-complete-checkbox]:checked');
    todos.forEach(todo => todo.parentElement.classList.add('todo--remove'));
    
    todos[0].parentElement.addEventListener('transitionend', () => {
        todoList = todoList.filter( el => !el.completed);
        renderAndSave(todoList);
    })
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
    todoDescription.textContent = text;
    const todoDate = todoElement.querySelector('[data-todo-item-date]');
    todoDate.textContent = date;
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

    todoRemoveBtn.addEventListener('click', (e) => {
        const el = e.target.parentElement;
        el.classList.add('todo--remove');
        
        el.addEventListener('transitionend', () => {
            todoList = todoList.filter( item => item.id !== id );
            renderAndSave(todoList);
        });
    });
        
    return todoElement;
}

function renderTodo() {
    if(todoList.length) {
        todoList.forEach((el) => {
            const todoElement = createTodoItem(el.id, el.completed, el.text, el.date);
            todoListContainer.append(todoElement);
        });

        noTodosElement.classList.add('display-none');
    } else {
        noTodosElement.classList.remove('display-none');
    }

    const todosCount = calculateTasksCount(todoList);
    activeCount.textContent = todosCount.active;
    completedCount.textContent = todosCount.completed;
}

function renderFilteredTodo(todos) {
    if(todos.length) {
        todos.forEach( el => {
            const todoElement = createTodoItem(el.id, el.completed, el.text, el.date);
            todoListContainer.append(todoElement);
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
