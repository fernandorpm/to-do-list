// eslint-disable-next-line
import _ from 'lodash';
import './style.css';
// eslint-disable-next-line
import { AddDragEvents } from './dragndrop.js';
// eslint-disable-next-line
import { AddChangeStatus } from './status.js';

let taskArray;

if (localStorage.getItem('taskArray')) {
  taskArray = JSON.parse(localStorage.getItem('taskArray'));
} else {
  taskArray = [];
}

let indexToAssign = taskArray.length;

function Task(description) {
  this.description = description;
  this.completed = false;
  this.index = indexToAssign;

  indexToAssign += 1;
}

function AddTask(description) {
  taskArray.push(new Task(description));
  localStorage.setItem('taskArray', JSON.stringify(taskArray));
}

function DisplayTask() {
  for (let idx = 0; idx < taskArray.length; idx += 1) {
    const element = taskArray[idx];
    const elementDIV = document.querySelector('.list-content');
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

    const elementSpan = document.createElement('span');
    elementSpan.innerHTML = '⋮';
    elementHTML.appendChild(elementSpan);
  }
}

AddTask('do the dishes');

AddTask('do the microverse things');

DisplayTask();
