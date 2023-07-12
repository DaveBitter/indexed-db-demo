import { elements, insertTaskInDOM } from './utils/dom.js';
import { db } from './utils/db.js';

const handleTaskFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(elements.taskForm);

    const task = {
        id: Math.floor(Math.random() * 1000),
        status: 'incomplete',
        task: formData.get('task'),
        date: formData.get('date'),
        priority: elements.taskForm.querySelector('input[name="priority"]:checked').value
    };

    insertTaskInDOM(task);

    // Add task to database
    db.addTask(task)
        .then(() => console.log('Task added to database'))
        .catch(err => console.error(err));


    elements.taskForm.reset();
}

elements.taskForm.addEventListener('submit', handleTaskFormSubmit);

// Open db and get all tasks
db.openDB()
    .then(() => db.getAllTasks())
    .then(tasks => tasks.forEach(task => insertTaskInDOM(task)))
    .catch(err => console.error(err));

