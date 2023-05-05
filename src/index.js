import './style.css';

import taskCollection from './modules/object.js';
import { clearCompletedTask, completeTask } from './modules/status-update.js';

taskCollection.displayTasks();

// event listener to add a new book
const addtaskForm = document.getElementById('add-task-form');
const enter = document.querySelector('.enter');

const addTask = (e) => {
  e.preventDefault();
  const descriptionInput = document.getElementById('description-input');
  const id = taskCollection.count;
  taskCollection.addTask(descriptionInput.value, false, id);
  descriptionInput.value = '';
};

addtaskForm.addEventListener('submit', (e) => {
  addTask(e);
});

enter.addEventListener('click', (e) => {
  addTask(e);
});

// event listener for remove task button click
document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove-task-button');

  if (target) {
    const { id } = target.parentNode;

    taskCollection.removeTask(id);
  }
});

// event listener for editing task  click
document.addEventListener('click', (e) => {
  const target = e.target.closest('.edit-task-button');

  if (target) {
    const descriptions = document.querySelectorAll('.description-text');
    descriptions.forEach((description) => {
      if (target.parentNode.id === description.parentNode.id) {
        target.parentNode.style.backgroundColor = '#f5bc42';
        const newText = target.parentNode.firstElementChild.nextElementSibling;
        newText.style.backgroundColor = '#f5bc42';
        const trash = target.parentNode.lastElementChild;
        const more = target.parentNode.firstElementChild.nextElementSibling
          .nextElementSibling;
        trash.style.display = 'block';
        more.style.display = 'none';

        target.parentNode.firstElementChild.nextElementSibling.removeAttribute(
          'disabled',
        );
        target.parentNode.firstElementChild.nextElementSibling.focus();
        newText.onkeydown = (e) => {
          if (e.keyCode === 13) {
            target.parentNode.style.backgroundColor = 'white';
            newText.style.backgroundColor = 'white';
            const descriptionInput = newText.value;
            const { id } = newText.parentNode;
            taskCollection.editTask(id, descriptionInput);
            newText.setAttribute('disabled', 'true');
            trash.style.display = 'none';
            more.style.display = 'block';
          }
        };
      }
    });
  }
});

// event listener for checkbox
document.addEventListener('click', (e) => {
  const target = e.target.closest('.complete-checkbox');
  if (target) {
    const index = target.parentNode.id;

    completeTask(index);
  }
});

// event listener to clear completed tasks
const clear = document.querySelector('.clear');
clear.addEventListener('click', () => {
  clearCompletedTask();
});
