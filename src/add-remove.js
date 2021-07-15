// eslint-disable-next-line
import { AddDragEvents } from './dragndrop.js';
// eslint-disable-next-line
import { AddChangeStatus } from './status.js';

const addButton = document.querySelector('#button-add');
const addInput = document.querySelector('#input-add');
const clearButton = document.querySelector('#button-clear');
let taskArray = [];

if (localStorage.getItem('taskArray')) {
  taskArray = JSON.parse(localStorage.getItem('taskArray'));
}

let indexToAssign = taskArray.length;

function Task(description) {
  this.description = description;
  this.completed = false;
  this.index = indexToAssign + 1;

  indexToAssign += 1;
}

function UpdateIndexes() {
  for (let idx = 0; idx < taskArray.length; idx += 1) {
    const element = taskArray[idx];
    element.index = idx + 1;
  }
  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

function DisplayTask() {
  const elementDIV = document.querySelector('.list-content');
  elementDIV.innerHTML = '';

  for (let idx = 0; idx < taskArray.length; idx += 1) {
    const element = taskArray[idx];
    const elementHTML = document.createElement('div');
    elementHTML.classList.add('list-item');
    elementHTML.setAttribute('description', element.description);
    elementHTML.setAttribute('completed', element.completed);
    elementHTML.setAttribute('index', element.index);
    elementDIV.appendChild(elementHTML);

    elementHTML.draggable = true;
    AddDragEvents(elementHTML);

    const elementDetail = document.createElement('div');
    elementHTML.appendChild(elementDetail);

    const elementCheckbox = document.createElement('input');
    elementCheckbox.type = 'checkbox';
    elementDetail.appendChild(elementCheckbox);

    elementCheckbox.checked = element.completed;
    AddChangeStatus(element, elementCheckbox);

    const elementDescription = document.createElement('p');
    elementDescription.innerHTML = element.description;
    elementDetail.appendChild(elementDescription);

    const elementButtonsDiv = document.createElement('div');
    elementHTML.appendChild(elementButtonsDiv);

    const elementSpan = document.createElement('span');
    elementSpan.innerHTML = '⋮';
    elementButtonsDiv.appendChild(elementSpan);

    const elementEditButton = document.createElement('button');
    elementEditButton.innerHTML = '✎';
    elementButtonsDiv.appendChild(elementEditButton);
    // eslint-disable-next-line
    elementEditButton.addEventListener('click', () => EditTask(element.index, element.description));

    const elementDeleteButton = document.createElement('button');
    elementDeleteButton.innerHTML = '✖';
    elementButtonsDiv.appendChild(elementDeleteButton);
    // eslint-disable-next-line
    elementDeleteButton.addEventListener('click', () => DeleteTask(element.index));
  }
}

function AddTask(description) {
  taskArray.push(new Task(description));
  localStorage.setItem('taskArray', JSON.stringify(taskArray));
  addInput.value = '';
  DisplayTask();
}

function EditTask(indexToUpdate, descriptionToUpdate) {
  // eslint-disable-next-line
  const taskEdit = prompt(`Editing '${descriptionToUpdate}' task`, descriptionToUpdate);
  if (taskEdit != null) {
    taskArray[indexToUpdate - 1].description = taskEdit;
    UpdateIndexes();
  }
}

function DeleteTask(indexToDelete) {
  taskArray = taskArray.filter((task) => task.index !== indexToDelete);
  UpdateIndexes();
  DisplayTask();
}

function DeleteAllCompletedTasks() {
  if (localStorage.getItem('taskArray')) {
    taskArray = JSON.parse(localStorage.getItem('taskArray'));
  }
  // eslint-disable-next-line
  taskArray = taskArray.filter((task) => task.completed != true);
  UpdateIndexes();
  DisplayTask();
}

function AddCRUDEvents() {
  addButton.addEventListener('click', () => AddTask(addInput.value));
  clearButton.addEventListener('click', () => DeleteAllCompletedTasks());
}

DisplayTask();

// eslint-disable-next-line
export { AddCRUDEvents };