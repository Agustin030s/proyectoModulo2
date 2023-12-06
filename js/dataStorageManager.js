export const insertLocalStorage = (key, array) =>{
    localStorage.setItem(key, JSON.stringify(array));
}

export const getLocalStorage = (key) =>{
    return JSON.parse(localStorage.getItem(key)) || [];
}