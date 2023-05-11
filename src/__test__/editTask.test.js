/**
 * @jest-environment jsdom
 */

import TaskCollection from '../modules/task-collection.js';
import 'mock-local-storage';

describe("Task Collection", () => {
  let taskCollection;
  document.body.innerHTML = "<div>" + '  <ul id="list"></ul>' + "</div>";
  const tasksContainer = document.querySelector("#list");

  beforeEach(() => {
    // Set up a new TaskCollection instance before each test.
    taskCollection = new TaskCollection();
    localStorage.clear(); // clear storage before each test
  });

  // Create a mock function for the displayTasks() method
  const mockDisplayTasks = jest.fn();

  // Replace the original displayTasks() method with the mock function
  TaskCollection.prototype.displayTasks = mockDisplayTasks;

  test("Edit task description", () => {
    // Arrange
    // const taskCollection = new TaskCollection();
    taskCollection.addTask("Task 1", false, 1);
    const expectedTasks = [
      {
        description: "Edit task 1",
        completed: false,
        index: 1,
      },
    ];

    // Act
    taskCollection.editTask(1, "Edit task 1");

    // Assert
    expect(taskCollection.tasks).toEqual(expectedTasks);
  });

  test("edit task from the dom", () => {
    taskCollection.addTask("task 1", false, 1);
    const list = document.createElement("li");
    list.textContent = taskCollection.tasks[0].description;

    tasksContainer.appendChild(list);
    taskCollection.editTask(1, "task edited");
    list.textContent = taskCollection.tasks[0].description;

    expect(list.textContent).toBe("task edited");
  });
});