// utils/nakamaHelpers.ts

const SESSION_STORAGE_KEY = 'nakama_session';

export const saveSessionToStorage = (session: string) => {
    localStorage.setItem(SESSION_STORAGE_KEY, session);
}

export const getSessionFromStorage = () => {
    return localStorage.getItem(SESSION_STORAGE_KEY);
}

export const removeSessionFromStorage = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
}
