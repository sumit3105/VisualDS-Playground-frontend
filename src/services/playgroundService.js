let dummyPlaygrounds = [
    {
        CodeId: 1,
        CodeTitle: "Binary Search Tree",
        CodeDescription: "Visualizes insert/delete in BST",
        CodeLanguage: "JavaScript",
        WrittenCode: "// BST implementation goes here",
    },
    {
        CodeId: 2,
        CodeTitle: "Dijkstra's Algorithm",
        CodeDescription: "Finds shortest path in a graph",
        CodeLanguage: "Python",
        WrittenCode: "# Dijkstra's algorithm in Python",
    },
];

export const getPlaygrounds = () => Promise.resolve(dummyPlaygrounds);

export const addPlayground = (CodeTitle, CodeDescription, CodeLanguage, WrittenCode = "") => {
    const newPlayground = {
        CodeId: dummyPlaygrounds.length + 1,
        CodeTitle,
        CodeDescription,
        CodeLanguage,
        WrittenCode
    };

    dummyPlaygrounds.push(newPlayground);
    return Promise.resolve(newPlayground);
};

export const updatePlayground = (CodeId, CodeTitle, CodeDescription, CodeLanguage, WrittenCode = null) => {
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
        CodeLanguage: CodeLanguage || dummyPlaygrounds[playgroundIndex].CodeLanguage,
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
