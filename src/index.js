import _ from 'lodash';
import './style.css';

let taskArray = [];
let indexToAssign = taskArray.length;

function Task(description) {
  this.description = description;
  this.completed = false;
  this.index = indexToAssign;

  indexToAssign += 1;
}

function AddTask(description) {
  taskArray.push(new Task(description));
}

function DisplayTask() {
  for (let idx = 0; idx < taskArray.length; idx++) {
    const element = taskArray[idx];
    const elementDIV = document.querySelector('.list-content');
    const elementHTML = document.createElement('div');
    elementHTML.classList.add('list-item');
    elementDIV.appendChild(elementHTML);

    const elementDetail = document.createElement('div');
    elementHTML.appendChild(elementDetail);

    const elementCheckbox = document.createElement('input');
    elementCheckbox.type = 'checkbox';
    elementDetail.appendChild(elementCheckbox);

    const elementDescription = document.createElement('p');
    elementDescription.innerHTML = element.description;
    elementDetail.appendChild(elementDescription);

    const elementButton = document.createElement('button');
    elementButton.innerHTML = '⋮';
    elementHTML.appendChild(elementButton);

  }
}

AddTask('do the dishes');

AddTask('do the microverse things');

DisplayTask();

// document.body.appendChild(component());