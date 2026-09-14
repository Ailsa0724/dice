const dice = document.getElementById('dice');
const result = document.getElementById('result');
const rollBtn = document.getElementById('rollBtn');

function rollDice() {
  const randomNumber = Math.floor(Math.random() * 6) + 1;

  dice.classList.remove('rolling');
  void dice.offsetWidth;
  dice.classList.add('rolling');

  dice.textContent = randomNumber;
  result.textContent = `點數：${randomNumber}`;
}

rollBtn.addEventListener('click', rollDice);

dice.textContent = '?';
result.textContent = '點數：--';
