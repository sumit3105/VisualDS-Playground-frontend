import { getToken } from "./authService";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}Api`;
// let dummyPlaygrounds = [
//     {
//         CodeId: 1,
//         CodeTitle: "Binary Search Tree",
//         CodeDescription: "Visualizes insert/delete in BST",
//         WrittenCode: "// BST implementation goes here",
//     },
//     {
//         CodeId: 2,
//         CodeTitle: "Dijkstra's Algorithm",
//         CodeDescription: "Finds shortest path in a graph",
//         WrittenCode: "# Dijkstra's algorithm in Python",
//     },
// ];

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
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ codeTitle, codeDescription, writtenCode}),
        }
    );
    return res.json();
};

export const updatePlayground = (CodeId, CodeTitle, CodeDescription, WrittenCode = null) => {
    // Find the index of the playground to update
    const playgroundIndex = dummyPlaygrounds.findIndex((p) => p.CodeId === CodeId);
    
    if (playgroundIndex === -1) {
        return Promise.reject(new Error("Playground not found"));
    }
    
    // Create updated playground object
    const updatedPlayground = {
        ...dummyPlaygrounds[playgroundIndex],
        CodeTitle: CodeTitle || dummyPlaygrounds[playgroundIndex].CodeTitle,
        CodeDescription: CodeDescription || dummyPlaygrounds[playgroundIndex].CodeDescription,
        ...(WrittenCode !== null && { WrittenCode }) // Only update if provided
    };
    
    // Update the array
    dummyPlaygrounds[playgroundIndex] = updatedPlayground;
    
    return Promise.resolve(updatedPlayground);
};

export const deletePlayground = (id) => {
    dummyPlaygrounds = dummyPlaygrounds.filter((p) => p.CodeId !== id);
    return Promise.resolve({ success: true });
};
