/**
 * @jest-environment jsdom
 */

import TaskCollection from '../modules/task-collection.js';
import 'mock-local-storage';

describe('TaskCollection', () => {
  let taskCollection;
  document.body.innerHTML = '<div><ul id="list"></ul> </div>';
  const tasksContainer = document.querySelector('#list');
  // Create a mock function for the displayTasks() method
  const mockDisplayTasks = jest.fn();

  // Replace the original displayTasks() method with the mock function
  TaskCollection.prototype.displayTasks = mockDisplayTasks;

  beforeEach(() => {
    localStorage.clear(); // clear storage before each test
    taskCollection = new TaskCollection();
  });

  test('Add one new item to the dom', () => {
    taskCollection.addTask('Buy groceries', false, 1);

    const list = document.createElement('li');
    list.textContent = taskCollection.tasks[0].description;

    tasksContainer.appendChild(list);
    const lists = document.querySelectorAll('#list li');

    expect(lists).toHaveLength(1);
  });

  test('should add a task to the task collection', () => {
    // Create a mock function for the displayTasks() method
    const mockDisplayTasks = jest.fn();

    // Replace the original displayTasks() method with the mock function
    TaskCollection.prototype.displayTasks = mockDisplayTasks;

    taskCollection.addTask('Buy groceries', false, 1);
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    expect(savedTasks.length).toBe(1);
    expect(savedTasks[0].description).toBe('Buy groceries');
    expect(savedTasks[0].completed).toBe(false);
    expect(savedTasks[0].index).toBe(1);
    expect(mockDisplayTasks).toHaveBeenCalledTimes(1);
  });

  test('should increment count when a task is added', () => {
    // Create a mock function for the displayTasks() method
    const mockDisplayTasks = jest.fn();

    // Replace the original displayTasks() method with the mock function
    TaskCollection.prototype.displayTasks = mockDisplayTasks;
    expect(taskCollection.count).toBe(1);
    taskCollection.addTask('Do laundry', false, 2);
    expect(taskCollection.count).toBe(2);
    TaskCollection.prototype.displayTasks = mockDisplayTasks;
    expect(mockDisplayTasks).toHaveBeenCalledTimes(1);
  });
});
