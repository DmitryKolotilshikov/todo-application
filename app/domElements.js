const todoItemTemplate = document.getElementById('todo-template');
const todoListContainer = document.querySelector('[data-todo-list-container]');

const setTodoInput = document.querySelector('[data-input-add-todo]');
const filterInput = document.querySelector('[ data-input-filter-todo]');

const addTodoBtn = document.querySelector('[data-add-todo-btn]');
const deleteAllBtn = document.querySelector('[data-delete-all-btn]');
const deleteCompletedBtn = document.querySelector('[data-delete-completed-btn]');

const activeCount = document.querySelector('[data-active-todo-count]');
const completedCount = document.querySelector('[data-completed-todo-count]');

const noTodosElement = document.querySelector('[data-no-todo-items]');

export const domElements = {
    todoItemTemplate,
    todoListContainer,
    setTodoInput,
    filterInput,
    addTodoBtn,
    deleteAllBtn,
    deleteCompletedBtn,
    activeCount,
    completedCount,
    noTodosElement
};
