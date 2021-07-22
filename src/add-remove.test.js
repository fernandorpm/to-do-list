/**
 * @jest-environment jsdom
 */

import {
  AssignButtons, AddTask, DeleteTask, EditTesting,
} from './add-remove.js';
import { ChangeStatus } from './status.js';
import { ItemDrop } from './dragndrop.js';

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
    AddTask('task number 3');

    // Assert
    expect(JSON.parse(window.localStorage.getItem('taskArray'))[1].description).toBe('task number 2');
  });
});

describe('DeleteTask function', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: fakeLocalStorage,
    });
  });

  test('Remove one task and check on the list DOM', () => {
    // Assign
    const list = document.querySelector('.list-content');

    // Act
    AssignButtons();
    DeleteTask(1);

    // Assert
    expect(list.children).toHaveLength(2);
  });

  test('Remove every task one by one and check on the list DOM', () => {
    // Assign
    const list = document.querySelector('.list-content');

    // Act
    AssignButtons();
    DeleteTask(1);
    DeleteTask(1);
    DeleteTask(1);

    // Assert
    expect(list.children).toHaveLength(0);
  });

  test('Remove one task and check on the localStorage', () => {
    // Act
    AssignButtons();
    AddTask('task number 1');
    AddTask('task number 2');
    DeleteTask(0);

    // Assert
    expect(JSON.parse(window.localStorage.getItem('taskArray'))[0].description).toBe('task number 2');
  });

  test('Remove all tasks and check on the localStorage', () => {
    // Act
    AssignButtons();
    AddTask('task number 1');
    AddTask('task number 2');
    DeleteTask(1);
    DeleteTask(1);
    DeleteTask(1);

    // Assert
    expect(JSON.parse(window.localStorage.getItem('taskArray'))).toHaveLength(0);
  });
});

describe('Editing function', () => {
  test('Edit the description of a task', () => {
    AddTask('task number 1');
    EditTesting(1, 'This function worked');
    expect(JSON.parse(window.localStorage.getItem('taskArray'))[0].description).toBe('This function worked');
  });

  test('Edit the description of a task', () => {
    const list = document.querySelector('.list-content');
    const liParagraphContent = list.children[0].children[0].children[1].innerHTML;

    AddTask('task number 1');
    EditTesting(1, 'This function worked');
    expect(liParagraphContent).toBe('This function worked');
  });
});

describe('Checkbox event', () => {
  test('Updates the completed status from the element', () => {
    const list = document.querySelector('.list-content');
    const checkbox = list.children[0].children[0].children[0];
    checkbox.checked = true;
    const taskArray = JSON.parse(window.localStorage.getItem('taskArray'));

    ChangeStatus(taskArray[0], checkbox);

    expect(checkbox.getAttribute('completed')).toBe('true');
  });
});

describe('Drag and Drop updates', () => {
  test('Updates the element according to the dragged and the dropped element and check the DOM', () => {
    const list = document.querySelector('.list-content');
    const elementDragStart = list.children[0];
    const elementDropStart = list.children[1];
    const taskArray = JSON.parse(window.localStorage.getItem('taskArray'));

    ItemDrop(taskArray, elementDragStart, elementDropStart);

    expect(Number(elementDragStart.getAttribute('index'))).toBe(1);
  });

  test('Updates the element according to the dragged and the dropped element and check the local storage', () => {
    const list = document.querySelector('.list-content');
    const elementDragStart = list.children[0];
    const elementDropStart = list.children[1];
    const taskArray = JSON.parse(window.localStorage.getItem('taskArray'));

    ItemDrop(taskArray, elementDragStart, elementDropStart);

    expect(JSON.parse(window.localStorage.getItem('taskArray'))[0].index).toBe(0);
  });
});