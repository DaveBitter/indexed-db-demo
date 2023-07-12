import {
    elements,
    insertTaskInDOM
} from './utils/dom.js';

const handleTaskFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(elements.taskForm);

    const task = {
        id: Math.floor(Math.random() * 1000),
        task: formData.get('task'),
        date: formData.get('date'),
        priority: elements.taskForm.querySelector('input[name="priority"]:checked').value
    };

    insertTaskInDOM(task);

    elements.taskForm.reset();
}

elements.taskForm.addEventListener('submit', handleTaskFormSubmit);

[
    {
        id: 1,
        task: 'Task 1',
        date: '2021-01-01',
        priority: 'high'
    },
    {
        id: 2,
        task: 'Task 2',
        date: '2021-01-02',
        priority: 'medium'
    },
    {
        id: 3,
        task: 'Task 3',
        date: '2021-01-03',
        priority: 'low'
    }
].forEach(task => insertTaskInDOM(task))