export const TODO_LIST_STORAGE_KEY = 'todo.item.pro';

export const setLocalStorage = (key, todos) => {
    localStorage.setItem(key, JSON.stringify(todos));
}

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}