

const BASE_URL = 'http://ouss.sytes.net:5000/api'; 


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
};



const handleError = (error) => {
  console.error('Erreur:', error);
  throw error;
};



export const get = async (endpoint = '') => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const getImage = async (endpoint = '') => {
    try {
      const response = await fetch(`${BASE_URL}/uploads/${endpoint}`);
      return response;
    } catch (error) {
      handleError(error);
    }
  };

export const post = async (endpoint = '', data = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const patch = async (endpoint = '', data = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};


export const del = async (endpoint = '') => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
