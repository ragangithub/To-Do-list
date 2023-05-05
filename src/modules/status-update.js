import taskCollection from './object.js';

export const clearCompletedTask = () => {
  const number = taskCollection.tasks.filter(
    (task) => task.completed === true,
  ).length;
  taskCollection.count -= number;

  taskCollection.tasks = taskCollection.tasks.filter(
    (task) => task.completed !== true,
  );
  taskCollection.tasks.forEach((task, i) => {
    task.index = i + 1;
  });

  localStorage.setItem('tasks', JSON.stringify(taskCollection.tasks));
  taskCollection.displayTasks();
};

export const completeTask = (index) => {
  const found = taskCollection.tasks.find(
    (task) => task.index === parseInt(index, 10),
  );

  // Update task description with new description
  found.completed = !found.completed;

  taskCollection.tasks = taskCollection.tasks.map((task) => {
    if (found.index === task.index) {
      return found;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(taskCollection.tasks)); // save updated collection to localStorage
  taskCollection.displayTasks();
};
