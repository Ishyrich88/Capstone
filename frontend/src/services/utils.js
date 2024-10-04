// src/services/utils.js

export const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
};


