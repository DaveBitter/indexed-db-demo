import { db } from './db.js';

// Elements
export const elements = {
    taskForm: document.querySelector('[data-task-form]'),
    taskTable: document.querySelector('[data-task-table]'),
    taskTableBody: document.querySelector('[data-task-table-body]'),
    taskTableTemplate: document.querySelector('[data-task-table-template]').content
}

export const toggleTaskInDOM = (id) => {
    const task = document.querySelector(`[data-id="${id}"]`);
    task.dataset.status = task.querySelector('[data-completed-toggle]').checked ? 'complete' : 'incomplete';
}

export const removeTaskFromDom = (id) => {
    const taskToRemove = document.querySelector(`[data-id="${id}"]`);
    taskToRemove.remove();
}

export const insertTaskInDOM = (task) => {
    const taskTemplate = elements.taskTableTemplate.cloneNode(true);
    taskTemplate.querySelector('[data-row]').dataset.id = task.id;
    taskTemplate.querySelector('[data-row]').dataset.status = task.status;
    taskTemplate.querySelector('[data-completed-toggle]').checked = task.status === 'complete';
    taskTemplate.querySelector('[data-task]').textContent = task.task;
    taskTemplate.querySelector('[data-date]').textContent = task.date;
    taskTemplate.querySelector('[data-priority]').textContent = task.priority;

    taskTemplate.querySelector('[data-completed-toggle]').addEventListener('click', () => {
        toggleTaskInDOM(task.id)
        db.updateTask({...task, status: task.status === 'complete' ? 'incomplete' : 'complete'});
    });
    taskTemplate.querySelector('[data-remove-button]').addEventListener('click', () => {
        removeTaskFromDom(task.id)
        db.deleteTask(task.id);
    });

    elements.taskTableBody.appendChild(taskTemplate);
}