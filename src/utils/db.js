let openRequest;

export const db = {
    // Open the database and create the tasks object store if needed
    openDB: () => {
        return new Promise((resolve, reject) => {
            openRequest = indexedDB.open('tasks', 1);

            openRequest.onupgradeneeded = () => {
                const db = openRequest.result;
                if (!db.objectStoreNames.contains('tasks')) {
                    db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
                }
            }

            openRequest.onsuccess = () => {
                resolve(openRequest.result);
            }

            openRequest.onerror = () => {
                reject(openRequest.error);
            }
        });
    },
    // Add a task to the database
    addTask: (task) => {
        return new Promise((resolve, reject) => {
            const db = openRequest.result;
            const transaction = db.transaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks');

            const addRequest = store.add(task);

            addRequest.onsuccess = () => {
                resolve(addRequest.result);
            }

            addRequest.onerror = () => {
                reject(addRequest.error);
            }
        });
    },
    // Get all tasks from the database
    getAllTasks: () => {
        return new Promise((resolve, reject) => {
            const db = openRequest.result;
            const transaction = db.transaction(['tasks'], 'readonly');
            const store = transaction.objectStore('tasks');

            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                resolve(getAllRequest.result);
            }

            getAllRequest.onerror = () => {
                reject(getAllRequest.error);
            }
        });
    },
    // Update a task in the database
    updateTask: (task) => {
        return new Promise((resolve, reject) => {
            const db = openRequest.result;
            const transaction = db.transaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks');

            const putRequest = store.put(task);

            putRequest.onsuccess = () => {
                resolve(putRequest.result);
            }

            putRequest.onerror = () => {
                reject(putRequest.error);
            }
        });
    },
    // Delete a task from the database
    deleteTask: (id) => {
        return new Promise((resolve, reject) => {
            const db = openRequest.result;
            const transaction = db.transaction(['tasks'], 'readwrite');
            const store = transaction.objectStore('tasks');

            const deleteRequest = store.delete(id);

            deleteRequest.onsuccess = () => {
                resolve(deleteRequest.result);
            }

            deleteRequest.onerror = () => {
                reject(deleteRequest.error);
            }
        });
    },
}