import { getToken } from "./authService";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}Api`;

export const getPlaygrounds = async () => {
    const token = getToken();
    let res = await fetch(
        API_URL + "/codes/user",
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
    return res.json();
};

export const addPlayground = async (codeTitle, codeDescription, writtenCode = "") => {
    const token = getToken();
    let res = await fetch(
        API_URL + "/codes/user",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ codeTitle, codeDescription, writtenCode}),
        }
    );
    return res.text();
};

export const updatePlayground = async (codeId, codeTitle, codeDescription, writtenCode = "") => {
    const token = getToken();
    let res = await fetch(
        API_URL + `/codes/${codeId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ codeTitle, codeDescription, writtenCode}),
        }
    );
    return res.json();
};