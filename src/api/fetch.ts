//src/api/fetch.ts
export const fetchAPI = async (url: string, options?: RequestInit) => {

    const baseURL = process.env.NEXT_PUBLIC_API_SERVER_URL;

    return await fetch(`${baseURL}${url}`, options);
};