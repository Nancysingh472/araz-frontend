import { getCookie, setCookie } from './cookie';

export const setAuthToken = (value) => setCookie(`authToken`, value, 30);
export const getAuthToken = () => getCookie(`authToken`) || undefined;

export const removeAuthToken = () => setCookie(`authToken`, '', 30);
