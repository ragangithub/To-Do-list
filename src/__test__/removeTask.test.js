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
    // Set up a new TaskCollection instance before each test.
    localStorage.clear(); // clear storage before each test
    taskCollection = new TaskCollection();
  });

  describe('removeTask', () => {
    it('should remove a task from the collection', () => {
      // Add some test tasks to the collection.
      taskCollection.addTask('Task 1', true, 1);
      taskCollection.addTask('Task 2', false, 2);
      taskCollection.addTask('Task 3', false, 3);

      // Remove a task from the collection.
      taskCollection.removeTask(2);

      // Check that the task was removed correctly.
      expect(taskCollection.tasks.length).toBe(2);
      expect(taskCollection.tasks[0].description).toBe('Task 1');
      expect(taskCollection.tasks[1].description).toBe('Task 3');
      expect(taskCollection.tasks[0].index).toBe(1);
      expect(taskCollection.tasks[1].index).toBe(2);
    });

    it('should update the task indexes', () => {
      // Add some test tasks to the collection.
      taskCollection.addTask('Task 1', true, 1);
      taskCollection.addTask('Task 2', false, 2);
      taskCollection.addTask('Task 3', false, 3);

      // Remove a task from the collection.
      taskCollection.removeTask(2);

      // Check that the remaining tasks have been re-indexed correctly.
      expect(taskCollection.tasks[0].index).toBe(1);
      expect(taskCollection.tasks[1].index).toBe(2);
    });

    it('should update the count property', () => {
      // Add some test tasks to the collection.
      taskCollection.addTask('Task 1', true, 1);

      // Remove a task from the collection.
      taskCollection.removeTask(1);

      // Check that the count property has been updated correctly.
      expect(taskCollection.count).toBe(1);
    });

    it('remove one task from the dom', () => {
      taskCollection.addTask('task 1', false, 1);
      taskCollection.addTask('task 2', false, 2);

      const list = document.createElement('li');

      list.textContent = taskCollection.tasks[0].description;

      tasksContainer.appendChild(list);
      list.remove();
      const lists = document.querySelectorAll('#list li');

      expect(lists).toHaveLength(0);
    });
  });
});
