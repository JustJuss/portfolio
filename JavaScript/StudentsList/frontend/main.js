const studentsArray = [];

const form = document.getElementById('form');
const formBtn = document.getElementById('form-button');
const formName = document.getElementById('name');
const formSurname = document.getElementById('surname');
const formMidName = document.getElementById('lastname');
const formBirth = document.getElementById('birthday');
const formEducation = document.getElementById('studyStart');
const formFaculty = document.getElementById('faculty');
const tableBox = document.getElementById('table-container');
const currentDate = new Date();
let sortDir = false;

function filter(arr, prop, value) {
  const result = [];
  const copy = [...arr];
  for (const item of copy) {
    if (String(item[prop]).includes(value)) result.push(item);
  }
  return result;
}

function sortStudents(arr, prop, dir = false) {
  return arr.sort((a, b) => {
    if (dir === false ? a[prop] < b[prop] : a[prop] > b[prop]) return -1;
    return null;
  });
}

function getStudentItem(studentObj) {
  const tableLine = document.createElement('tr');
  const tableName = document.createElement('td');
  const tableBirth = document.createElement('td');
  const tableEducation = document.createElement('td');
  const tableFaculty = document.createElement('td');
  const tableDelete = document.createElement('td');
  const tableBtn = document.createElement('button');
  const birthday = new Date(studentObj.birthday);
  const dateEducation = Number(studentObj.studyStart);
  tableBtn.classList.add('btn', 'delete-btn');
  tableBtn.style.width = '100%';
  tableBtn.textContent = 'X';
  tableLine.id = studentObj.id;

  let studentCourse = '';
  let studentAge = 0;

  if ((currentDate.getFullYear() >= dateEducation + 5)
    || ((currentDate.getFullYear() >= dateEducation + 4) && (currentDate.getMonth() >= 8))) {
    studentCourse = 'закончил';
  } else if (currentDate.getMonth() < 8) {
    studentCourse = `${currentDate.getFullYear() - dateEducation} курс`;
  } else if (currentDate.getMonth() >= 8) {
    studentCourse = `${currentDate.getFullYear() - dateEducation + 1} курс`;
  }

  if ((currentDate.getMonth() + 1) > (birthday.getMonth() + 1)
    || ((currentDate.getMonth() + 1) === (birthday.getMonth() + 1)
    && currentDate.getDate() >= birthday.getDate())) {
    studentAge = currentDate.getFullYear() - birthday.getFullYear();
  } else {
    studentAge = currentDate.getFullYear() - birthday.getFullYear() - 1;
  }

  tableName.textContent = `${studentObj.surname}\n${studentObj.name}\n${studentObj.lastname}`;
  tableBirth.textContent = (`${String(birthday.getDate()).length === 1
    ? `0${birthday.getDate()}` : birthday.getDate()
  }.${String(birthday.getMonth() + 1).length === 1
    ? `0${birthday.getMonth() + 1}` : (birthday.getMonth() + 1)
  }.${birthday.getFullYear()}(${studentAge} лет)`);
  tableEducation.textContent = `${studentObj.studyStart}-${dateEducation + 4}\n(${studentCourse})`;
  tableFaculty.textContent = studentObj.faculty;

  tableDelete.append(tableBtn);
  tableLine.append(tableName);
  tableLine.append(tableBirth);
  tableLine.append(tableEducation);
  tableLine.append(tableFaculty);
  tableLine.append(tableDelete);
  return tableLine;
}

function createStudentsTable() {
  const tableContainer = document.createElement('table');
  const tableHeadline = document.createElement('tr');
  const tableHeadBirth = document.createElement('th');
  const tableHeadEducation = document.createElement('th');
  const tableHeadName = document.createElement('th');
  const tableHeadFaculty = document.createElement('th');
  tableHeadName.textContent = 'Ф.И.О';
  tableHeadBirth.textContent = 'Дата рождения';
  tableHeadEducation.textContent = 'Годы обучения';
  tableHeadFaculty.textContent = 'Факультет';
  tableHeadName.id = 'name';
  tableHeadBirth.id = 'birthday';
  tableHeadEducation.id = 'studyStart';
  tableHeadFaculty.id = 'faculty';
  tableContainer.classList.add('table', 'table-bordered');
  tableHeadline.append(tableHeadName);
  tableHeadline.append(tableHeadBirth);
  tableHeadline.append(tableHeadEducation);
  tableHeadline.append(tableHeadFaculty);
  tableContainer.append(tableHeadline);
  return tableContainer;
}

async function renderSavedArr(arr) {
  const response = await fetch('http://localhost:3000/api/students');
  const savedArray = await response.json();
  if (savedArray.length !== 0) {
    for (const student of savedArray) {
      arr.push(student);
    }
  }
}

function onDelete(id) {
  fetch(`http://localhost:3000/api/students/${id}`, {
    method: 'DELETE',
  });
}

renderSavedArr(studentsArray);

function renderStudentsTable(arr) {
  tableBox.innerHTML = '';
  const tableContainer = createStudentsTable();

  const filterFio = document.getElementById('filter-fio').value;
  const filterFaculty = document.getElementById('filter-faculty').value;
  const filterStart = document.getElementById('filter-startYear').value;
  const filterFinish = document.getElementById('filter-finishYear').value;

  let newArr = [...arr];

  for (const student of newArr) {
    student.fullName = `${student.surname}${student.name}${student.lastname}`;
    student.finishOfEducation = Number(student.studyStart) + 4;
  }

  if (filterFio !== '') newArr = filter(newArr, 'fullName', filterFio);
  if (filterFaculty !== '') newArr = filter(newArr, 'faculty', filterFaculty);
  if (filterStart !== '') newArr = filter(newArr, 'studyStart', filterStart);
  if (filterFinish !== '') newArr = filter(newArr, 'finishOfEducation', filterFinish);

  for (const student of newArr) {
    const studentItem = getStudentItem(student);
    tableContainer.append(studentItem);
  }
  tableBox.append(tableContainer);

  document.querySelectorAll('.delete-btn').forEach((el) => {
    el.addEventListener('click', () => {
      if (window.confirm('Вы уверены?')) {
        for (const student of arr) {
          let i = 0;
          if (student.id === el.parentElement.parentElement.id) {
            arr.splice(i, 1);
            onDelete(student.id);
            renderStudentsTable(arr);
          }
          i++;
        }
      }
    });
  });

  document.querySelectorAll('th').forEach((el) => {
    el.addEventListener('click', () => {
      let sortArr = [];
      if (el.id === 'name') {
        for (const student of newArr) {
          student.fullName = student.surname + student.name + student.lastname;
        }
        sortArr = sortStudents(newArr, 'fullName', sortDir);
      } else if (el.id === 'birthday') {
        for (const student of newArr) {
          student.birthSec = new Date() - new Date(student.birthday);
        }
        sortArr = sortStudents(newArr, 'birthSec', sortDir);
      } else {
        sortArr = sortStudents(newArr, el.id, sortDir);
      }
      if (sortDir === true) { sortDir = false; } else { sortDir = true; }
      tableBox.removeChild(tableContainer);
      renderStudentsTable(sortArr);
    });
  });
}

setTimeout(renderStudentsTable, 200,
  studentsArray);

formBtn.addEventListener('click', async () => {
  const minbirthday = new Date(1900, 0, 1);
  const tableContainer = document.querySelector('.table');
  const studentBirthDate = new Date(formBirth.value);
  const educationNum = Number(formEducation.value);

  if (form.contains(document.querySelector('.error'))) {
    document.querySelectorAll('.error').forEach((el) => {
      el.remove();
    });
  }

  document.querySelectorAll('.info-input').forEach((el) => {
    if (el.value.trim().length === 0 && form.contains(document.querySelector('.empty-error')) !== true) {
      const error = document.createElement('p');
      error.classList.add('empty-error', 'error', 'col-12');
      error.textContent = 'Вы заполнили не все поля';
      form.append(error);
    }
  });

  if ((studentBirthDate - minbirthday < 0) || (currentDate - studentBirthDate < 0) || formBirth.value === '') {
    const error = document.createElement('p');
    error.classList.add('date-error', 'error', 'col-12');
    error.textContent = 'Вы ввели неправильную дату рождения';
    form.append(error);
  }

  if ((educationNum < 2000) || (educationNum > currentDate.getFullYear())) {
    const error = document.createElement('p');
    error.classList.add('date-error', 'error', 'col-12');
    error.textContent = 'Вы ввели неправильный год начала обучения';
    form.append(error);
  }

  if (form.contains(document.querySelector('.error')) !== true) {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      body: JSON.stringify({
        name: formName.value.trim(),
        surname: formSurname.value.trim(),
        lastname: formMidName.value.trim(),
        birthday: formBirth.value,
        studyStart: (`${formEducation.value.trim()}`),
        faculty: formFaculty.value.trim(),
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const studentsItem = await response.json();

    studentsArray.push(studentsItem);
    tableBox.removeChild(tableContainer);
    renderStudentsTable(studentsArray);
  }
});

document.querySelectorAll('.filter-input').forEach((el) => {
  el.addEventListener('input', () => {
    renderStudentsTable(studentsArray);
  });
});
