
const getDataFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : {};
  };
  
  
  const setDataToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  

  export const setValue = (key, value) => {
    const data = getDataFromLocalStorage(key);
    data[key] = value;
    setDataToLocalStorage(key, data);
  };
  

  export const getValue = (key) => {
    const data = getDataFromLocalStorage(key);
    return data[key];
  };
  

  export const deleteValue = (key) => {
    const data = getDataFromLocalStorage(key);
    delete data[key];
    setDataToLocalStorage(key, data);
  };
  

  export const clearLocalStorage = (key) => {
    localStorage.removeItem(key);
  };
  