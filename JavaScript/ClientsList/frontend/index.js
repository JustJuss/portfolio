// Данные, использующиеся в функциях

let clientsArr = [];
let nameSortDir = false;
let idSortDir = false;
let createSortDir = false;
let editSortDir = false;

const mainBlock = document.querySelector('.main-block');
const body = document.querySelector('body');

// Общие функции

function filter(arr, prop, value) {
  const result = [];
  const copy = [...arr];
  for (const item of copy) {
    if (String(item[prop]).includes(String(value))) result.push(item);
  }
  return result;
}

function sortClients(arr, prop, dir = false) {
  return arr.sort((a, b) => {
    if (dir === false ? a[prop] < b[prop] : a[prop] > b[prop]) return -1;
    return null;
  });
}

function modalAnimation(block) {
  block.classList.remove('modal-block--appear');
  block.classList.add('modal-block--disappear');
  setTimeout(() => {
    block.remove(body);
  }, 350);
}
// Функции, запускающиеся при загрузке сайта

async function renderSavedArr(arr) {
  const response = await fetch('http://localhost:3000/api/clients');
  const savedArray = await response.json();
  if (savedArray.length !== 0) {
    for (const item of savedArray) {
      arr.push(item);
    }
  }
}

function firstSortId() {
  const newArr = [...clientsArr];
  for (const client of newArr) {
    client.newId = String(client.id).substring(7, 13);
  }
  sortClients(newArr, 'newId', idSortDir);
  if (idSortDir === true) { idSortDir = false; } else { idSortDir = true; }
  renderClientsTable(newArr);
}

renderSavedArr(clientsArr);
generateClientsTable();
setTimeout(firstSortId, 200);

function preLoad() {
  const tableBlock = document.querySelector('.table-block');
  const preloadBlock = document.createElement('div');
  const preloadGif = document.createElement('span');

  preloadBlock.classList.add('preload', 'preload--visible');
  preloadGif.classList.add('preload-animation');

  preloadGif.innerHTML = preloadGifSVG;

  preloadBlock.style.top = String(document.querySelector('.table-headline').offsetHeight);

  preloadBlock.append(preloadGif);
  tableBlock.append(preloadBlock);

  setTimeout(() => {
    preloadBlock.remove();
  }, 500);
}

preLoad();

// Работа с таблицей

function getClientsItem(item) {
  const createdAt = new Date(item.createdAt);
  const updatedAt = new Date(item.updatedAt);

  const tableLine = document.createElement('tr');
  const tableId = document.createElement('td');
  const tableName = document.createElement('td');
  const tableCreationBox = document.createElement('td');
  const tableCreationDate = document.createElement('span');
  const tableCreationTime = document.createElement('span');
  const tableEditedBox = document.createElement('td');
  const tableEditedDate = document.createElement('span');
  const tableEditedTime = document.createElement('span');
  const tableContacts = document.createElement('td');
  const tableBtnBox = document.createElement('td');
  const tableDeleteBtn = document.createElement('button');
  const tableEditBtn = document.createElement('button');
  const tableDeleteIcon = document.createElement('span');
  const tableEditIcon = document.createElement('span');
  const contactsContainer = document.createElement('div');
  const contactsMore = document.createElement('button');

  tableDeleteBtn.type = 'button'
  tableEditBtn.type = 'button'
  contactsMore.type = 'button'

  contactsMore.classList.add('btn-reset', 'contacts__more');
  contactsContainer.classList.add('table__contacts-container');
  tableLine.classList.add('table-line');
  tableId.classList.add('table__item', 'table__item-id');
  tableName.classList.add('table__item', 'table__item-name');
  tableEditedBox.classList.add('table__item', 'table__item-edited');
  tableCreationBox.classList.add('table__item', 'table__item-created');
  tableContacts.classList.add('table__item', 'table__item-contacts');
  tableBtnBox.classList.add('table__item', 'table__item-btn');
  tableDeleteBtn.classList.add('btn-reset', 'table__delete-btn');
  tableEditBtn.classList.add('btn-reset', 'table__edit-btn');
  tableContacts.classList.add('contacts');

  tableDeleteIcon.innerHTML = tableDeleteIconSVG;
  tableEditIcon.innerHTML = tableEditIconSVG;

  tableDeleteBtn.textContent = 'Удалить';
  tableEditBtn.textContent = 'Изменить';

  for (let contact of item.contacts) {
    const contactItem = clientsContacts(contact);
    if (item.contacts.length > 5) {
      contactItem.classList.add('btn-contacts--alot', 'btn-contacts--hidden');
    }
    contactsContainer.append(contactItem);
  }

  if (item.contacts.length > 4) {
    contactsMore.textContent = `+${item.contacts.length - 4}`;
    contactsContainer.append(contactsMore);
  }

  tableId.textContent = `${String(item.id).substring(7, 13)}`;
  tableName.textContent = `${item.surname}\n${item.name}\n${item.lastName}`;

  tableCreationDate.textContent = `${String(createdAt.getDate()).length === 1
    ? `0${createdAt.getDate()}` : createdAt.getDate()
  }.${String(createdAt.getMonth() + 1).length === 1
    ? `0${createdAt.getMonth() + 1}` : (createdAt.getMonth() + 1)
  }.${updatedAt.getFullYear()}`;

  tableCreationTime.textContent = `${String(createdAt.getHours()).length === 1
    ? `0${createdAt.getHours()}` : createdAt.getHours()}:${String(createdAt.getMinutes()).length === 1
    ? `0${createdAt.getMinutes()}` : createdAt.getMinutes()}`;

  tableEditedDate.textContent = `${String(updatedAt.getDate()).length === 1
    ? `0${updatedAt.getDate()}` : updatedAt.getDate()
  }.${String(updatedAt.getMonth() + 1).length === 1
    ? `0${updatedAt.getMonth() + 1}` : (updatedAt.getMonth() + 1)
  }.${updatedAt.getFullYear()}`;

  tableEditedTime.textContent = `${String(updatedAt.getHours()).length === 1
    ? `0${updatedAt.getHours()}` : updatedAt.getHours()}:${String(updatedAt.getMinutes()).length === 1
    ? `0${updatedAt.getMinutes()}` : updatedAt.getMinutes()}`;

  tableContacts.append(contactsContainer);
  tableDeleteBtn.prepend(tableDeleteIcon);
  tableEditBtn.prepend(tableEditIcon);
  tableBtnBox.append(tableEditBtn, tableDeleteBtn);
  tableLine.append(tableId);
  tableLine.append(tableName);
  tableCreationBox.append(tableCreationDate, tableCreationTime);
  tableLine.append(tableCreationBox);
  tableEditedBox.append(tableEditedDate, tableEditedTime);
  tableLine.append(tableEditedBox);
  tableLine.append(tableContacts);
  tableLine.append(tableBtnBox);
  return {
    tableLine,
    tableDeleteBtn,
    tableEditBtn,
    contactsMore,
  };
}

function generateClientsTable() {
  const tableBlock = document.querySelector('.table-block');
  const tableBox = document.createElement('table');
  const tableHeadline = document.createElement('tr');
  const tableHeadId = document.createElement('th');
  const tableHeadIdSpan = document.createElement('span');
  const tableHeadName = document.createElement('th');
  const tableHeadNameSpan = document.createElement('span');
  const tableHeadCreateDate = document.createElement('th');
  const tableHeadCreateDateSpan = document.createElement('span');
  const tableHeadEditDate = document.createElement('th');
  const tableHeadEditDateSpan = document.createElement('span');
  const tableHeadContacts = document.createElement('th');
  const tableHeadAction = document.createElement('th');

  tableHeadIdSpan.innerHTML = tableHeadSVG;

  tableHeadNameSpan.innerHTML = `${tableHeadSVG} Я-А`;

  tableHeadCreateDateSpan.innerHTML = tableHeadSVG;

  tableHeadEditDateSpan.innerHTML = tableHeadSVG;

  tableHeadIdSpan.classList.add('headline-arrow');
  tableHeadNameSpan.classList.add('headline-arrow');
  tableHeadCreateDateSpan.classList.add('headline-arrow');
  tableHeadEditDateSpan.classList.add('headline-arrow');
  tableHeadline.classList.add('table-headline');
  tableBox.classList.add('table-box');
  tableHeadId.classList.add('table-headline__item', 'headline-clickable');
  tableHeadName.classList.add('table-headline__item', 'headline-clickable');
  tableHeadCreateDate.classList.add('table-headline__item', 'headline-clickable');
  tableHeadEditDate.classList.add('table-headline__item', 'headline-clickable');
  tableHeadContacts.classList.add('table-headline__item');
  tableHeadAction.classList.add('table-headline__item');

  if (idSortDir === false) {
    tableHeadIdSpan.classList.add('arrow-down');
  } else {
    tableHeadId.style.color = '#9873FF';
  }
  if (nameSortDir === false) {
    tableHeadNameSpan.classList.add('arrow-down');
    tableHeadNameSpan.innerHTML = `${tableHeadSVG} А-Я`;
  } else {
    tableHeadName.style.color = '#9873FF';
  }
  if (editSortDir === false) {
    tableHeadEditDateSpan.classList.add('arrow-down');
  } else {
    tableHeadEditDate.style.color = '#9873FF';
  }
  if (createSortDir === false) {
    tableHeadCreateDateSpan.classList.add('arrow-down');
  } else {
    tableHeadCreateDate.style.color = '#9873FF';
  }
  tableHeadId.id = 'head-id';
  tableHeadName.id = 'head-name';
  tableHeadCreateDate.id = 'head-created';
  tableHeadEditDate.id = 'head-edited';

  tableHeadId.textContent = 'ID';
  tableHeadName.textContent = 'Фамилия Имя Отчество';
  tableHeadCreateDate.textContent = 'Дата и время создания';
  tableHeadEditDate.textContent = 'Последние изменения';
  tableHeadContacts.textContent = 'Контакты';
  tableHeadAction.textContent = 'Действия';

  tableHeadId.append(tableHeadIdSpan);
  tableHeadName.append(tableHeadNameSpan);
  tableHeadCreateDate.append(tableHeadCreateDateSpan);
  tableHeadEditDate.append(tableHeadEditDateSpan);
  tableHeadline.append(tableHeadId);
  tableHeadline.append(tableHeadName);
  tableHeadline.append(tableHeadCreateDate);
  tableHeadline.append(tableHeadEditDate);
  tableHeadline.append(tableHeadContacts);
  tableHeadline.append(tableHeadAction);
  tableBox.append(tableHeadline);
  tableBlock.append(tableBox);
  mainBlock.append(addClientBtn());
  return tableBlock;
}

function renderClientsTable(arr) {
  const tableBlock = document.querySelector('.table-block');
  const tableBox = document.querySelector('.table-box');
  const tableBtn = document.querySelector('.table__add-btn-box');
  const search = document.querySelector('.search-input');

  tableBox.remove();
  tableBtn.remove();
  generateClientsTable();

  const table = document.querySelector('.table-box');

  let newArr = [...arr];
  for (const client of newArr) {
    client.forSearch = 
    `${String(client.id).substring(7, 13)}${client.surname}${client.name}${client.lastName}`;
  }

  if (search.value !== '') {
    newArr = filter(newArr, 'forSearch', search.value.replace(/\s/g, ''));
  }

  for (const client of newArr) {
    const clientItem = getClientsItem(client);

    clientItem.contactsMore.addEventListener('click', () => {
      document.querySelectorAll('.btn-contacts--hidden').forEach((e) => {
        e.classList.remove('btn-contacts--hidden');
        e.classList.add('btn-contacts--visible');
        clientItem.contactsMore.remove();
      });
    });

    clientItem.tableDeleteBtn.addEventListener('click', () => {
      renderConfirmModal(client);
    });

    clientItem.tableEditBtn.addEventListener('click', () => {
      renderModalWin('Edit', client);
    });
    table.append(clientItem.tableLine);
  }

  tableBlock.style.height = document.querySelector('.table-headline__item').offsetHeight + (60 * 5);

  document.querySelectorAll('.headline-clickable').forEach((el) => {
    el.addEventListener('click', () => {
      let sortArr = [];
      if (el.id === 'head-name') {
        for (const client of newArr) {
          client.fullName = `${client.surname}${client.name}${client.lastname}`;
        }
        sortArr = sortClients(newArr, 'fullName', nameSortDir);
        if (nameSortDir === true) { nameSortDir = false; } else { nameSortDir = true; }
        idSortDir = false;
        editSortDir = false;
        createSortDir = false;
      } else if (el.id === 'head-created') {
        for (const client of newArr) {
          client.newCreated = new Date() - new Date(client.createdAt);
        }
        sortArr = sortClients(newArr, 'newCreated', createSortDir);
        if (createSortDir === true) { createSortDir = false; } else { createSortDir = true; }
        idSortDir = false;
        editSortDir = false;
        nameSortDir = false;
      } else if (el.id === 'head-id') {
        for (const client of newArr) {
          client.newId = String(client.id).substring(7, 13);
        }
        sortArr = sortClients(newArr, 'newId', idSortDir);
        if (idSortDir === true) { idSortDir = false; } else { idSortDir = true; }
        editSortDir = false;
        nameSortDir = false;
        createSortDir = false;
      } else if (el.id === 'head-edited') {
        for (const client of newArr) {
          client.newEdited = new Date() - new Date(client.updatedAt);
        }
        sortArr = sortClients(newArr, 'newEdited', editSortDir);
        if (editSortDir === true) { editSortDir = false; } else { editSortDir = true; }
        idSortDir = false;
        nameSortDir = false;
        createSortDir = false;
      }
      renderClientsTable(sortArr);
    });
  });
}

document.querySelectorAll('.search-input').forEach((el) => {
  el.addEventListener('input', () => {
    setTimeout(() => {
      renderClientsTable(clientsArr);
    }, 300);
  });
});

// Работа с модальными окнами (изменение, добавление)

function addClientBtn() {
  const addBtnBox = document.createElement('div');
  const addBtn = document.createElement('button');
  const btnIcon = document.createElement('span');
  const btnText = document.createElement('span');

  addBtn.type = 'button'

  btnIcon.innerHTML = addClientBtnSVG;

  btnText.textContent = 'Добавить клиента';

  addBtnBox.classList.add('table__add-btn-box');
  addBtn.classList.add('add-btn', 'btn-reset', 'table__add-btn');
  btnIcon.classList.add('add-btn__icon');
  btnText.classList.add('add-btn__text', 'table__add-btn-text');

  addBtn.addEventListener('click', () => {
    renderModalWin('Add');
    body.classList.add('relative-body');
  });

  addBtn.append(btnIcon);
  addBtn.append(btnText);
  addBtnBox.append(addBtn);
  return addBtnBox;
}

function generateModalWin() {
  const modalBlock = document.createElement('div');
  const modalBox = document.createElement('div');
  const modalCloseBg = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalForm = document.createElement('form');
  const nameLabel = document.createElement('label');
  const surnameLabel = document.createElement('label');
  const lastnameLabel = document.createElement('label');
  const nameInput = document.createElement('input');
  const surnameInput = document.createElement('input');
  const lastnameInput = document.createElement('input');
  const nameLabelText = document.createElement('span');
  const surnameLabelText = document.createElement('span');
  const lastnameLabelText = document.createElement('span');
  const purpleStar = document.createElement('span');
  const purpleStar2 = document.createElement('span');
  const modalContacts = document.createElement('form');
  const contactsBtn = document.createElement('button');
  const contactsIcon = document.createElement('span');
  const contactsText = document.createElement('span');
  const modalSave = document.createElement('div');
  const saveBtn = document.createElement('button');
  const cancel = document.createElement('button');
  const modalClose = document.createElement('div');
  const closeBtn = document.createElement('button');

  contactsBtn.type = 'button'
  saveBtn.type = 'button'
  cancel.type = 'button'
  closeBtn.type = 'button'

  modalBlock.classList.add('modal-block', 'modal-block--appear');
  modalCloseBg.classList.add('modal__close-bg');
  modalBox.classList.add('modal-win');
  modalTitle.classList.add('modal-title');
  modalForm.classList.add('modal__form');
  nameLabel.classList.add('input__label');
  nameLabel.for = 'name';
  surnameLabel.classList.add('input__label');
  surnameLabel.for = 'surname';
  lastnameLabel.classList.add('input__label');
  lastnameLabel.for = 'lastname';
  nameInput.classList.add('name', 'modal__input', 'modal-required');
  nameInput.id = 'name';
  surnameInput.classList.add('surname', 'modal__input', 'modal-required');
  surnameInput.id = 'surname';
  lastnameInput.classList.add('lastname', 'modal__input');
  lastnameInput.id = 'lastname';
  nameLabelText.classList.add('label__text');
  surnameLabelText.classList.add('label__text');
  lastnameLabelText.classList.add('label__text');
  purpleStar.classList.add('purple-star');
  purpleStar2.classList.add('purple-star');
  modalContacts.classList.add('modal__contacts', 'form-group');
  contactsBtn.classList.add('new-contact', 'btn-reset');
  contactsIcon.classList.add('new-contact__icon');
  contactsText.classList.add('new-contact__text');
  modalSave.classList.add('modal__save');
  saveBtn.classList.add('save-btn', 'purple-btn', 'btn-reset');
  cancel.classList.add('cancel', 'btn-reset', 'link-btn');
  modalClose.classList.add('modal__close');
  closeBtn.classList.add('modal__close-btn', 'btn-reset');

  contactsIcon.innerHTML = contactsIconSVG;

  closeBtn.innerHTML = closeBtnSVG;

  nameLabelText.textContent = 'Имя';
  surnameLabelText.textContent = 'Фамилия';
  lastnameLabelText.textContent = 'Отчество';
  contactsText.textContent = 'Добавить контакт';
  saveBtn.textContent = 'Сохранить';
  purpleStar.textContent = '*';
  purpleStar2.textContent = '*';

  nameLabelText.append(purpleStar);
  surnameLabelText.append(purpleStar2);
  nameLabel.append(nameInput, nameLabelText);
  surnameLabel.append(surnameInput, surnameLabelText);
  lastnameLabel.append(lastnameInput, lastnameLabelText);
  modalForm.append(surnameLabel, nameLabel, lastnameLabel);
  contactsBtn.append(contactsIcon, contactsText);
  modalContacts.append(contactsBtn);
  modalSave.append(saveBtn, cancel);
  modalClose.append(closeBtn);

  modalBox.append(modalTitle, modalForm, modalContacts, modalSave, modalClose);
  modalBlock.append(modalBox, modalCloseBg);

  body.append(modalBlock);
  return {
    modalTitle,
    nameInput,
    surnameInput,
    lastnameInput,
    cancel,
    modalBlock,
    modalContacts,
  };
}

function renderModalWin(forWhat, item) {
  const modalWin = generateModalWin();

  const closeBtn = document.querySelector('.modal__close-btn');
  const addContact = document.querySelector('.new-contact');
  const saveBtn = document.querySelector('.save-btn');
  const modalBg = document.querySelector('.modal__close-bg');

  modalBg.addEventListener('click', () => {
    modalAnimation(modalWin.modalBlock);
  });

  closeBtn.addEventListener('click', () => {
    modalAnimation(modalWin.modalBlock);
  });

  addContact.addEventListener('click', (e) => {
    e.preventDefault();
    if (modalWin.modalContacts.children.length <= 9) {
      newContact();
    } else if (modalWin.modalContacts.children.length > 9) {
      newContact();
      addContact.remove(modalWin.modalContacts);
      modalWin.modalContacts.children[8].style.marginBottom = '15px'
      modalWin.modalContacts.children[9].style.marginBottom = '25px'
    }
  });

  saveBtn.addEventListener('click', async () => {
    if (forWhat === 'Add') {
      saveBtnAdd(forWhat);
    } else if (forWhat === 'Edit') {
      saveBtnAdd(forWhat, item);
    }
  });

  if (forWhat === 'Edit') {
    modalWin.modalTitle.textContent = 'Изменить данные';
    const modalId = document.createElement('span');
    modalWin.nameInput.value = item.name;
    modalWin.surnameInput.value = item.surname;
    modalId.textContent = `ID: ${String(item.id).substring(7, 13)}`;
    modalId.classList.add('modal-id');
    modalWin.modalTitle.insertAdjacentElement('afterend', modalId);

    for (const contact of item.contacts) {
      newContact(contact);
    }

    if (item.contacts.length > 9) {
      addContact.remove(modalWin.modalContacts);
      modalWin.modalContacts.children[9].style.marginBottom = '15px'
    }

    if (item.lastName.length !== 0) {
      modalWin.lastnameInput.value = item.lastName;
    }

    document.querySelectorAll('.modal__input').forEach((e) => {
      if (e.value !== '') {
        e.classList.add('modal__input--focus');
      }
    });
    modalWin.cancel.textContent = 'Удалить клиента';

    modalWin.cancel.addEventListener('click', () => {
      modalAnimation(modalWin.modalBlock);
      renderConfirmModal(item);
    });
  } else if (forWhat === 'Add') {
    modalWin.modalTitle.textContent = 'Новый клиент';
    modalWin.cancel.textContent = 'Отменить';

    modalWin.cancel.addEventListener('click', () => {
      modalAnimation(modalWin.modalBlock);
    });
  }

  document.querySelectorAll('.modal__input').forEach((e) => {
    e.addEventListener('input', () => {
      if (e.value !== '') {
        e.classList.add('modal__input--focus');
      } else if (e.classList.contains('modal__input--focus')) {
        e.classList.remove('modal__input--focus');
      }
    });
  });
}

// Модальное окно для подтверждения удаления

function generateConfirmModal() {
  const modalCloseBg = document.createElement('div');
  const modalBlock = document.createElement('div');
  const modalBox = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const modalText = document.createElement('p');
  const modalTrueBtn = document.createElement('button');
  const modalFalseBtn = document.createElement('button');
  const modalClose = document.createElement('div');
  const closeBtn = document.createElement('button');

  modalTrueBtn.type = 'button'
  modalFalseBtn.type = 'button'
  closeBtn.type = 'button'

  modalCloseBg.classList.add('modal__close-bg');
  modalBlock.classList.add('modal-block', 'modal-block--appear');
  modalBox.classList.add('modal-win', 'confirm-win');
  modalTitle.classList.add('modal-title', 'confirm-title');
  modalText.classList.add('confirm-text');
  modalClose.classList.add('modal__close');
  closeBtn.classList.add('modal__close-btn', 'btn-reset');
  modalTrueBtn.classList.add('purple-btn', 'btn-reset');
  modalFalseBtn.classList.add('link-btn', 'btn-reset', 'confirm-cancel');

  closeBtn.innerHTML = closeBtnSVG;

  modalTitle.textContent = 'Удалить клиента';
  modalText.textContent = 'Вы действительно хотите удалить данного клиента?';
  modalTrueBtn.textContent = 'Удалить';
  modalFalseBtn.textContent = 'Отмена';

  modalClose.append(closeBtn);
  modalBox.append(modalTitle, modalText, modalTrueBtn, modalFalseBtn, modalClose);
  modalBlock.append(modalBox, modalCloseBg);
  body.append(modalBlock);
  return {
    closeBtn,
    modalBlock,
    modalTrueBtn,
    modalFalseBtn,
  };
}

function renderConfirmModal(item) {
  const confirmModal = generateConfirmModal();
  const modalBg = document.querySelector('.modal__close-bg');

  modalBg.addEventListener('click', () => {
    modalAnimation(confirmModal.modalBlock);
  });

  confirmModal.closeBtn.addEventListener('click', () => {
    modalAnimation(confirmModal.modalBlock);
  });

  confirmModal.modalTrueBtn.addEventListener('click', () => {
    modalAnimation(confirmModal.modalBlock);
    let i = 0;
    for (const client of clientsArr) {
      if (client.id === item.id) {
        clientsArr.splice(i, 1);
        onDelete(client.id);
        renderClientsTable(clientsArr);
      }
      i++;
    }
    return true;
  });

  confirmModal.modalFalseBtn.addEventListener('click', () => {
    modalAnimation(confirmModal.modalBlock);
    return false;
  });
}

// Работа с контактами

function clientsContacts(item) {
  const tooltip = document.createElement('button');
  tooltip.type = 'button'

  if (item.type === 'Телефон') {
    tooltip.innerHTML = phoneSVG;
  } else if (item.type === 'Доп. телефон') {
    tooltip.innerHTML = phoneSVG;
  } else if (item.type === 'Email') {
    tooltip.innerHTML = emailSVG;
  } else if (item.type === 'Vk') {
    tooltip.innerHTML = vkSVG;
  } else if (item.type === 'Facebook') {
    tooltip.innerHTML = facebookSVG;
  }

  tooltip.dataset.tippyContent = `${item.type}: ${item.value}`;
  tippy(tooltip);
  tooltip.classList.add('btn-reset', 'btn-contact');
  return tooltip;
}

function inputDeleteBtn(container, input) {
  const modalContacts = document.querySelector('.modal__contacts');
  const addContact = document.querySelector('.new-contact');

  if (input.value !== '' && container.classList.contains('input-with-btn') !== true) {
    const deleteBtn = document.createElement('button');

    deleteBtn.type = 'button'

    container.classList.add('input-with-btn');
    deleteBtn.classList.add('btn-reset', 'contacts__input-delete');
    deleteBtn.innerHTML = deleteBtnSVG;
    deleteBtn.addEventListener('submit', () => {
      e.preventDefault()
    })
    deleteBtn.addEventListener('click', () => {
      container.remove(modalContacts);
      if (modalContacts.children.length > 1) {
        modalContacts.children[0].style.paddingTop = '25px';
      }
      addContact.style.paddingBottom = '8px';
      modalContacts.style.paddingTop = '0px';
    });
    container.append(deleteBtn);
  } else if (container.classList.contains('input-with-btn') && input.value === '') {
    container.children[2].remove();
    container.classList.remove('input-with-btn');
  }
}

function generateNewContact() {
  const modalContacts = document.querySelector('.modal__contacts');
  const addContact = document.querySelector('.new-contact');

  const contactList = document.createElement('select');
  const contactListPhone = document.createElement('option');
  const contactListAddPhone = document.createElement('option');
  const contactListEMail = document.createElement('option');
  const contactListVk = document.createElement('option');
  const contactListFacebook = document.createElement('option');
  const contactListInput = document.createElement('input');
  const contactListLabel = document.createElement('label');

  contactList.classList.add('modal-select', 'form-select', 'select');
  contactList.name = 'select';
  contactListInput.classList.add('modal-select-input', 'form-control');
  contactListLabel.classList.add('modal__contacts-label');

  addContact.style.paddingBottom = '25px';
  modalContacts.style.paddingTop = '25px';

  contactListInput.placeholder = 'Введите данные контакта';
  contactListPhone.textContent = 'Телефон';
  contactListPhone.value = 'Телефон';
  contactListAddPhone.textContent = 'Доп. телефон';
  contactListAddPhone.value = 'Доп. телефон';
  contactListEMail.textContent = 'Email';
  contactListEMail.value = 'Email';
  contactListVk.textContent = 'Vk';
  contactListVk.value = 'Vk';
  contactListFacebook.textContent = 'Facebook';
  contactListFacebook.value = 'Facebook';

  contactList.append(contactListPhone, contactListAddPhone,
    contactListEMail, contactListVk, contactListFacebook);
  contactListLabel.append(contactList, contactListInput);
  addContact.insertAdjacentElement("beforebegin", contactListLabel);

  const valuesArr = { contactList, contactListLabel, contactListInput };
  return valuesArr;
}

function newContact(ifEdit = null) {
  const newContactLine = generateNewContact();

  if (ifEdit !== null) {
    document.querySelectorAll('option').forEach((el) => {
      el.textContent === ifEdit.type ? el.selected = true : el.selected = false;
    });
    newContactLine.contactListInput.value = ifEdit.value;
  }
  const choices = new Choices(newContactLine.contactList, {
    searchEnabled: false,
    position: 'bottom',
  });

  if (newContactLine.contactListInput.value !== '') {
    inputDeleteBtn(newContactLine.contactListLabel, newContactLine.contactListInput);
  }

  newContactLine.contactListInput.addEventListener('input', () => {
    inputDeleteBtn(newContactLine.contactListLabel, newContactLine.contactListInput);
  });
}

// Работа с API

function onDelete(id) {
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });
}

async function saveBtnAdd(forWhat, item = false) {
  const modalContacts = document.querySelector('.modal__contacts');
  const modalSave = document.querySelector('.modal__save');
  const nameInput = document.querySelector('.name');
  const surnameInput = document.querySelector('.surname');
  const lastnameInput = document.querySelector('.lastname');
  const modalBlock = document.querySelector('.modal-block');

  const obj = [];

  if (modalContacts.contains(document.querySelector('.modal-select-input'))) {
    document.querySelectorAll('.modal-select-input').forEach((el) => {
      if (el.value.trim().length !== 0) {
        const contact = {
          type: el.parentElement.children[0].children[0].children[0].children[0].textContent,
          value: el.value.trim(),
        };
        obj.push(contact);
      }
    });
  }

  if (modalSave.contains(document.querySelector('.error'))) {
    document.querySelectorAll('.error').forEach((el) => {
      el.remove();
    });
  }

  document.querySelectorAll('.modal-required').forEach((e) => {
    if (e.value.trim().length === 0 && modalSave.contains(document.querySelector('.empty-error')) !== true) {
      const error = document.createElement('p');
      error.classList.add('empty-error', 'error');
      error.textContent = 'Ошибка: новая модель организационной деятельности предполагает независимые способы реализации поставленных обществом задач!';
      modalContacts.style.marginBottom = '8px';
      modalSave.prepend(error);
    }
  });

  if (modalSave.contains(document.querySelector('.error')) !== true) {
    if (forWhat === 'Add') {
      const response = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
          name: nameInput.value.trim(),
          surname: surnameInput.value.trim(),
          lastName: lastnameInput.value.trim(),
          contacts: obj,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const clientsItem = await response.json();
      clientsArr.push(clientsItem);
      renderClientsTable(clientsArr);
    } else if (forWhat === 'Edit') {
      let i = 0;
      const response = await fetch(`http://localhost:3000/api/clients/${item.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: nameInput.value.trim(),
          surname: surnameInput.value.trim(),
          lastName: lastnameInput.value.trim(),
          contacts: obj,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const clientsItem = await response.json();
      for (const client of clientsArr) {
        if (client.id === item.id) {
          clientsArr[i] = clientsItem;
          renderClientsTable(clientsArr);
        }
        i++;
      }
    }

    modalAnimation(modalBlock);
  }
}
