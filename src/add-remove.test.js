/**
 * @jest-environment jsdom
 */

import { AssignButtons, AddTask, DeleteTask } from './add-remove.js';

document.body.innerHTML = `<div class="list-container">
  <div class="list-title">
    <h4>Todays To Do</h4>
    <button type="button">
      <img src="https://media.flaticon.com/dist/min/img/uicons/icons/rounded/regular/fi-rr-rotate-right.svg" width="14" alt="Refresh">
    </button>
  </div>
  <div class="list-add">
    <input type="text" placeholder="Add to your list..." id="input-add">
    <button type="button" id="button-add">
      <img src="https://media.flaticon.com/dist/min/img/uicons/icons/rounded/regular/fi-rr-add.svg" width="14" alt="Add task">
    </button>
  </div>
  <div class="list-content"></div>
  <button type="button" id="button-clear">Clear all Completed</button>
</div>;`;

const fakeLocalStorage = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

describe('AddTask Function', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  test('Add one task and check on the list DOM', () => {
    // Assign
    window.localStorage.clear();
    const list = document.querySelector('.list-content');

    // Act
    AssignButtons();
    AddTask('task number 1');

    // Assert
    expect(list.children).toHaveLength(1);
  });

  test('Add one task and check the local Storage', () => {
    // Act
    AssignButtons();
    AddTask('task number 2');

    // Assert
    expect(JSON.parse(window.localStorage.getItem('taskArray'))[1].description).toBe('task number 2');
  });
});