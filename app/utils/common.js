export const getStringDate = (
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1, 
    day = new Date().getDate() 
    ) => {
    
    const date = new Date(year, month, day);

    return `${ date.getDate() }-${ date.getMonth() }-${ date.getFullYear() }`;
}

export const clearList = (element) => {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

export const calculateTasksCount = (todos) => {
    return todos.reduce((count, el) => {
        if (el.completed) {
            count.completed += 1;
        } else {
            count.active += 1;
        }
        return count;
    }, { active: 0, completed: 0 });
}
