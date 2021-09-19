
export const addItem = (key, value = "") => {
  if (key) localStorage.setItem(key, JSON.stringify(value));
};



export const clearItem = (key) => {
  localStorage.removeItem(key);
};

export const getTokenItem = () => {
  return localStorage.getItem("token");
};

export const getToken = () => {
  const data = getTokenItem();
  if (data) {
    return JSON.parse(localStorage.getItem("token")).token;
  }
  return null;
};



export const clearToken = () => {
  clearItem("token");
};

export const addLanguage = (languageObject) => {
  addItem("language", languageObject);
};

export const addToken = (tokenObject) => {
  addItem("token", tokenObject);
};

