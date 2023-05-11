/**
 * @jest-environment jsdom
 */

import TaskCollection from "../modules/task-collection.js";

import "mock-local-storage";

describe("Task Collection", () => {
  let taskCollection;
  document.body.innerHTML = "<div>" + '  <ul id="list"></ul>' + "</div>";
  const tasksContainer = document.querySelector("#list");

  beforeEach(() => {
    localStorage.clear(); // clear storage before each test
    taskCollection = new TaskCollection();
  });

  // Create a mock function for the displayTasks() method
  const mockDisplayTasks = jest.fn();

  // Replace the original displayTasks() method with the mock function
  TaskCollection.prototype.displayTasks = mockDisplayTasks;

  test("clearCompletedTask removes completed tasks and updates task count and indices", () => {
    taskCollection.addTask("Task 1", true, 1);
    taskCollection.addTask("Task 2", false, 2);
    taskCollection.addTask("Task 3", true, 3);

    taskCollection.clearCompletedTask();

    expect(taskCollection.tasks.length).toBe(1);
    expect(taskCollection.tasks[0].description).toBe("Task 2");
    expect(taskCollection.tasks[0].index).toBe(1);
    expect(taskCollection.count).toBe(2);
  });

  test("clear completed task from the dom", () => {
    taskCollection.addTask("Task 11", true, 1);

    let list = document.createElement("li");
    list.textContent = taskCollection.tasks[0].description;
    tasksContainer.appendChild(list);

    taskCollection.clearCompletedTask();

    list.remove();
    const lists = document.querySelectorAll("#list li");
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    expect(savedTasks).toHaveLength(0);
    expect(lists).toHaveLength(0);
  });
});
