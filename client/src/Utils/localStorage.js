// Get item from local storage

export function getLocal(key){
    try{
        let temp = JSON.parse(localStorage.getItem(key))
        return temp;
    }catch(error){
        return error
    }
}

export function saveLocal(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}

export function removeLocal(key){
    return localStorage.removeItem(key);
}