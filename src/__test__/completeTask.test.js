/**
 * @jest-environment jsdom
 */

import TaskCollection from '../modules/task-collection.js';

import 'mock-local-storage';

// Create a test suite for the completeTask method
describe('TaskCollection completeTask method', () => {
  let taskCollection;

  // Create a mock function for the displayTasks() method
  const mockDisplayTasks = jest.fn();

  // Replace the original displayTasks() method with the mock function
  TaskCollection.prototype.displayTasks = mockDisplayTasks;

  // Create a test case for the method
  test('should complete task with the given index', () => {
    // Initialize a new TaskCollection object
    taskCollection = new TaskCollection();

    // Add a new task to the collection
    taskCollection.addTask('Sample Task', false, 1);
    taskCollection.addTask('Sample Task', false, 2);

    // Call the completeTask method with the index of the added task
    taskCollection.completeTask(2);

    // Retrieve the updated tasks from local storage
    const updatedTasks = JSON.parse(localStorage.getItem('tasks'));

    // Find the completed task
    const completedTask = updatedTasks.find((task) => task.index === 2);

    // Expect the completed property of the task to be true
    expect(completedTask.completed).toBe(true);
  });
});
