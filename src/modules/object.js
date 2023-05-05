import TaskCollection from './task-collection.js';

const taskCollection = new TaskCollection();
taskCollection.displayTasks = () => {
  const taskList = document.querySelector('ul');
  taskList.innerHTML = '';
  taskCollection.tasks.forEach((task) => {
    const contain = document.createElement('li');
    contain.id = task.index;
    contain.innerHTML = `
  
          <input type="checkbox" ${
  task.completed ? 'checked' : ''
}  class='complete-checkbox'/>
          <input class='description-text ${
  task.completed ? 'completed' : ''
}'  type='text' value='${task.description}' disabled/>
          <i class="fa fa-ellipsis-v edit-task-button" aria-hidden="true"></i>
          <i class="fa fa-trash remove-task-button" aria-hidden="true"></i>
  
          `;

    taskList.appendChild(contain);
  });
};
export default taskCollection;
