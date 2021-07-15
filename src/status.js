function ChangeStatus(element, elementHTML) {
  const taskArray = JSON.parse(localStorage.getItem('taskArray'));

  console.log(1);
  for (let idx = 0; idx < taskArray.length; idx++) {
    const taskElement = taskArray[idx];
    if (taskElement.index == element.index) {
  console.log(2);


      const checkElement = elementHTML.checked;

      if (checkElement === true) {
        elementHTML.setAttribute('completed', true);
        taskElement.completed = true;
      } else {
        elementHTML.setAttribute('completed', false);
        taskElement.completed =false;
      }

      localStorage.setItem('taskArray', JSON.stringify(taskArray));
      break;

    }
  }


}

function AddChangeStatus(element, elementHTML) {
  elementHTML.addEventListener('change', () => ChangeStatus(element, elementHTML));
}

export { AddChangeStatus };
