
const arr = [];

function createNumbersArray(count) {
  for (let i = 1; i < count + 1; i++) {
    arr.push(i);
    arr.push(i);
  }
}

function shuffle() {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startGame(count) {
  createNumbersArray(count);
  shuffle(arr);
  const gameContainer = document.getElementById('card-game');
  const cardList = document.createElement('ul');
  cardList.classList.add('container');
  gameContainer.append(cardList);
  const clickedArr = [];
  const donePairs = [];
  for (const card of arr) {
    const cardItem = document.createElement('li');
    const faceDownCard = document.createElement('div');
    faceDownCard.classList.add('face-down-card', 'face-down');
    cardItem.textContent = card;
    cardItem.classList.add('col-3', 'card');
    cardItem.append(faceDownCard);
    cardList.append(cardItem);
    cardItem.addEventListener('click', () => {
      document.querySelectorAll('.face-down').forEach((el) => {
        if (el.classList.contains('fail')) {
          el.classList.add('face-down-card');
          el.classList.remove('fail');
        }
      });

      if (faceDownCard.classList.contains('face-down-card')) {
        faceDownCard.classList.remove('face-down-card');
        clickedArr.push(card);
      }

      if (clickedArr.length === 2) {
        if (clickedArr[0] === clickedArr[1]) {
          document.querySelectorAll('.face-down').forEach((el) => {
            if ((el.classList.contains('face-down-card') !== true) && (el.classList.contains('success') !== true)) {
              el.classList.add('success');
              donePairs.push('done');
            }
          });
        } else {
          document.querySelectorAll('.face-down').forEach((el) => {
            if ((el.classList.contains('face-down-card') !== true) && (el.classList.contains('success') !== true)) {
              el.classList.add('fail');
            }
          });
        }
        clickedArr.length = 0;
      }

      if (donePairs.length === (count * 2)) {
        const reloadBtn = document.createElement('button');
        reloadBtn.textContent = 'Сыграть ещё раз';
        reloadBtn.classList.add('reload-btn');
        gameContainer.append(reloadBtn);
        donePairs.length = 0;
        reloadBtn.addEventListener('click', () => {
          gameContainer.removeChild(reloadBtn);
          gameContainer.removeChild(cardList);
          arr.length = 0;
          startGame(count);
        });
      }
    });
  }
}

startGame(8);
