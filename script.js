const dice = Array.from(document.querySelectorAll('.die'));
const resultText = document.getElementById('resultText');
const historyList = document.getElementById('historyList');
const rollButton = document.getElementById('rollButton');

const pipPositions = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 1, 2, 6, 7, 8]
};

function createPips(die) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 9; i += 1) {
    const pip = document.createElement('span');
    pip.className = 'pip';
    fragment.appendChild(pip);
  }

  die.appendChild(fragment);
}

function renderDie(die, value) {
  const pips = die.querySelectorAll('.pip');
  pips.forEach((pip) => pip.classList.remove('visible'));

  const visibleIndexes = pipPositions[value] || [];
  visibleIndexes.forEach((index) => {
    pips[index].classList.add('visible');
  });
}

dice.forEach((die) => createPips(die));

dice.forEach((die, index) => {
  const faceValue = Math.floor(Math.random() * 6) + 1;
  renderDie(die, faceValue);
  die.dataset.value = String(faceValue);
  die.setAttribute('aria-label', `骰子 ${index + 1}，點數 ${faceValue}`);
});

function updateHistory(entries) {
  historyList.innerHTML = '';

  if (entries.length === 0) {
    const item = document.createElement('li');
    item.textContent = '尚未有紀錄';
    historyList.appendChild(item);
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement('li');
    item.textContent = entry;
    historyList.appendChild(item);
  });
}

const rollHistory = [];

function rollDice() {
  const values = dice.map(() => Math.floor(Math.random() * 6) + 1);

  values.forEach((value, index) => {
    renderDie(dice[index], value);
    dice[index].dataset.value = String(value);
    dice[index].setAttribute('aria-label', `骰子 ${index + 1}，點數 ${value}`);
  });

  const total = values.reduce((sum, value) => sum + value, 0);
  const result = `(${values.join(', ')}) 總和：${total}`;
  resultText.textContent = result;

  rollHistory.unshift(`第 ${rollHistory.length + 1} 次：${values.join('、')}，總和 ${total}`);
  updateHistory(rollHistory.slice(0, 8));
}

rollButton.addEventListener('click', rollDice);
