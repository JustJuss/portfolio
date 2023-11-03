// Заголовок
function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

// Форма для создания дел
function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';
  button.disabled = true;

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  input.addEventListener('input', (e) => {
    e.preventDefault();

    if (input.value.length > 0) {
      button.disabled = false;
    } else if (input.value.length < 1) {
      button.disabled = true;
    }
  });

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItem(name) {
  let item = document.createElement('li');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return {
    item,
    doneButton,
    deleteButton,
  };
}

function createTodoApp(container, title = 'Мои дела', listName) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  let todoListArr = [];

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  function todoLocal() {
    let todosArr = todoListArr;
    localStorage.setItem(`${listName}todosHtml`, JSON.stringify(todosArr));
    todosArr = localStorage.getItem('todosHtml');
  }

  todoItemForm.form.addEventListener('submit', (e) => {
    e.preventDefault();
    // if (!todoItemForm.input.value) {
    //     return;
    // }

    let todoItem = createTodoItem(todoItemForm.input.value);

    // todoItem.item.id = obj.id;

    function getTodoId() {
      let maxId = 0;
      for (let todoName of todoListArr) {
        if (maxId <= todoName.id) {
          maxId = todoName.id + 1;
        }
      }
      todoItem.item.id = maxId;
      return maxId;
    }

    let obj = {
      id: getTodoId(),
      name: null,
      done: 'false',
    };

    obj.name = todoItemForm.input.value;

    todoItem.doneButton.addEventListener('click', () => {
      todoItem.item.classList.toggle('list-group-item-success');
      if (todoItem.item.classList.contains('list-group-item-success')) {
        obj.done = 'true';
      } else { obj.done = 'false'; }
      todoLocal();
    });
    todoItem.deleteButton.addEventListener('click', () => {
      if (window.confirm('Вы уверены?')) {
        let i = 0;
        for (let todoName of todoListArr) {
          if (todoItem.item.id == todoName.id) {
            todoListArr.splice(i, 1);
          }
          i++;
        }
        todoItem.item.remove();
        todoLocal();
      }
    });

    todoItemForm.input.addEventListener('input', (elem) => {
      elem.preventDefault();

      if (todoItemForm.input.value.length > 0) {
        todoItemForm.button.disabled = false;
      } else if (todoItemForm.input.value.length < 1) {
        todoItemForm.button.disabled = true;
      }
    });

    todoListArr.push(obj);
    todoList.append(todoItem.item);
    todoLocal();
    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;
  });
  if (localStorage.getItem(`${listName}todosHtml`) != null) {
    todoListArr = JSON.parse(localStorage.getItem(`${listName}todosHtml`));
    for (let todo of todoListArr) {
      let todoArrItem = createTodoItem(todo.name);
      todoList.append(todoArrItem.item);
      todoArrItem.item.id = todo.id;
      if (todo.done === 'true') {
        todoArrItem.item.classList.add('list-group-item-success');
      }
      todoArrItem.doneButton.addEventListener('click', () => {
        todoArrItem.item.classList.toggle('list-group-item-success');
        if (todoArrItem.item.classList.contains('list-group-item-success')) {
          todo.done = 'true';
        } else (todo.done = 'false');
        todoLocal();
      });
      todoArrItem.deleteButton.addEventListener('click', () => {
        if (window.confirm('Вы уверены?')) {
          let i = 0;
          for (let todoName of todoListArr) {
            if (todoArrItem.item.id == todoName.id) {
              todoListArr.splice(i, 1);
              todoLocal();
            }
            i++;
          }

          todoArrItem.item.remove();
          todoLocal();
        }
      });
    }
  }
}

window.createTodoApp = createTodoApp;
