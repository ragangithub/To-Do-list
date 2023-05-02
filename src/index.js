import './style.css';

const tasks = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 1,
  },
];

const displayTasks = () => {
  const taskList = document.querySelector('ul');

  tasks.forEach((task) => {
    const contain = document.createElement('li');
    contain.innerHTML = `
     
          <input type="checkbox" id="" />
          <input class='description' type='text' value='${task.description}' disabled/>
          
         
            <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        
  
          `;

    taskList.appendChild(contain);
  });
};

displayTasks();
