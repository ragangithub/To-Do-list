import Task from './task.js';

export default class TaskCollection {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (this.tasks.length === 0) {
      this.count = 1;
    } else {
      this.count = this.tasks.length + 1;
    }
  }

  addTask(description, completed, index) {
    const newTask = new Task(description, completed, index);

    this.tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // save updated collection to localStorage
    this.displayTasks();

    this.count += 1;
  }

  removeTask(index) {
    this.tasks = this.tasks.filter(
      (task) => task.index !== parseInt(index, 10),
    );

    this.tasks = this.tasks.map((task, i) => ({ ...task, index: i + 1 }));
    this.count -= 1;

    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // save updated collection to localStorage
    this.displayTasks();
  }

  editTask(index, newDescription) {
    // Find task with specified index in tasks array
    const found = this.tasks.find((task) => task.index === parseInt(index, 10));

    // Update task description with new description
    found.description = newDescription;

    this.tasks = this.tasks.map((task) => {
      if (found.index === task.index) {
        return found;
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(this.tasks)); // save updated collection to localStorage
  }
}
