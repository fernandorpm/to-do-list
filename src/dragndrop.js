let elementDrag;
let elementDrop;

function AddDragEvents(element) {

  element.addEventListener('dragstart', () => ItemDragStart(element));
  element.addEventListener('dragover', () => ItemDragOver(element));
  element.addEventListener('dragleave', () => ItemDragLeave(element));
  element.addEventListener('drop', () => ItemDrop());
}

function ItemDragStart(element) {

  elementDrag = element;
}

function ItemDragOver(element) {
  event.preventDefault();
  elementDrop = element;
}

function ItemDragLeave(element) {
  event.preventDefault();

  element.style.paddingTop = "0";
}

function ItemDrop() {
  event.preventDefault();

  const taskArray = JSON.parse(localStorage.getItem('taskArray'));

  let dragIndex;
  let dragCompleted;
  let dragDescription;

  let dropIndex;
  let dropCompleted;
  let dropDescription;

  // element.style.paddingTop = "0";

  if (elementDrag.getAttribute('index') != elementDrop.getAttribute('index')) {

    localStorage.clear();

    for (let idx = 0; idx < taskArray.length; idx++) {
      const element = taskArray[idx];
      if (element.index == elementDrag.getAttribute('index')) {
        dragIndex = elementDrag.getAttribute('index');
        dragCompleted = elementDrag.getAttribute('completed');
        dragDescription = elementDrag.getAttribute('description');
      }
      if (element.index == elementDrop.getAttribute('index')) {
        dropIndex = elementDrop.getAttribute('index');
        dropCompleted = elementDrop.getAttribute('completed');
        dropDescription = elementDrop.getAttribute('description');
      }
    }

    elementDrop.setAttribute('description', dragDescription);
    elementDrop.setAttribute('completed', dragCompleted);
    elementDrop.setAttribute('index', dragIndex);

    elementDrop.querySelector('p').innerHTML = dragDescription;
    if (dragCompleted) {
      elementDrop.querySelector('input').checked = dragCompleted;
    } else {
      elementDrop.querySelector('input').checked = false;
    }

    console.log('drag completed ' + dragCompleted);

    elementDrag.setAttribute('description', dropDescription);
    elementDrag.setAttribute('completed', dropCompleted);
    elementDrag.setAttribute('index', dropIndex);

    elementDrag.querySelector('p').innerHTML = dropDescription;

    if (dropCompleted) {
      elementDrag.querySelector('input').checked = dropCompleted;
    } else {
      elementDrag.querySelector('input').checked = false;
    }

    console.log('drop completed ' + dropCompleted);



    let newTaskArray = [...taskArray];

    newTaskArray[dragIndex] = taskArray[dropIndex];
    newTaskArray[dropIndex] = taskArray[dragIndex];


    localStorage.setItem('taskArray', JSON.stringify(newTaskArray));

  }
}

export { AddDragEvents };