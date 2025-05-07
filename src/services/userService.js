import { getToken } from "./authService";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}Api`;

export const getProfile = async () => {
    const token = getToken();

    let res = await fetch(
        API_URL + "/user/profile",
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );
    return res.json();
}

export const updateUserProfile = async (imageFile, name) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("imageUrl", imageFile); 
    if (name) {
        formData.append("name", name); 
    }

    const res = await fetch(
        API_URL + "/user/UpdateProfile",
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        }
    );

    if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Updated user:", data);
    return data;
}
