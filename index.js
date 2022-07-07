function gameStart(size, bombsCount) {
  const field = document.querySelector('.field');
  const cellsCount = Math.pow(size, 2);
  const bombImg = '<img src="img/naval-mine.png" width="40" height="40">';

  field.style.gridTemplateColumns = `repeat(${size}, 40px)`;
  field.style.width = `${size * 40}px`;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children]

  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombsCount);

  field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const index = cells.indexOf(event.target);
    const column = index % size;
    const row = Math.floor(index / size);
    open(row, column)
  });

  field.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  })

  function open(row, column) {
    const index = row * size + column;
    const cell = cells[index];
    cell.innerHTML = isBomb(row, column) ?
      gameOver(cells, bombs, bombImg, field) :
      bombsQuantity(row, column, index);
    cell.disabled = true;
    count = 0;
  }

  let count = 0;

  function isBomb(row, column) {
    const index = row * size + column;

    if (bombs.includes(index)) {
      count++;
    }

    return bombs.includes(index)
  }

  function bombsQuantity(row, column, index) {
    // углы карты

    if (index === 0) {
      isBomb(row, column + 1);
      isBomb(row + 1, column);
      isBomb(row + 1, column + 1);
      return count;

    }

    if (index === size - 1) {
      isBomb(row, column - 1);
      isBomb(row + 1, column);
      isBomb(row + 1, column - 1);
      return count;
    }

    if (index === size * size - size) {
      isBomb(row, column + 1);
      isBomb(row - 1, column);
      isBomb(row - 1, column + 1);
      return count;
    }

    if (index === size * size - 1) {
      isBomb(row, column - 1);
      isBomb(row - 1, column);
      isBomb(row - 1, column - 1);
      return count;
    }
    //стороны карты

    if (index <= size * size - 1 && index >= size * size - size) {
      isBomb(row, column + 1);
      isBomb(row, column - 1);
      isBomb(row - 1, column);
      isBomb(row - 1, column + 1);
      isBomb(row - 1, column - 1);
      return count;
    }

    if (index >= 0 && index <= size - 1) {
      isBomb(row, column + 1);
      isBomb(row, column - 1);
      isBomb(row + 1, column);
      isBomb(row + 1, column + 1);
      isBomb(row + 1, column - 1);
      return count;
    }

    if (index % size === 0) {
      isBomb(row, column + 1);
      isBomb(row + 1, column);
      isBomb(row - 1, column);
      isBomb(row + 1, column + 1);
      isBomb(row - 1, column + 1);
      return count;
    }

    if ((index + 1) % size === 0) {
      isBomb(row, column - 1);
      isBomb(row + 1, column);
      isBomb(row - 1, column);
      isBomb(row - 1, column - 1);
      isBomb(row + 1, column - 1);
      return count;
    } else {
      isBomb(row, column + 1);
      isBomb(row, column - 1);
      isBomb(row - 1, column);
      isBomb(row + 1, column);
      isBomb(row - 1, column - 1);
      isBomb(row + 1, column - 1);
      isBomb(row + 1, column + 1);
      isBomb(row - 1, column + 1);
    }

    return count;
  }

}

function gameOver(cells, bombs, bombImg, field) {

  cells.map((item) => item.disabled = true)

  for (let i = 0; i < cells.length; i++) {

    for (let j = 0; j < bombs.length; j++) {

      if (cells.indexOf(cells[i]) === bombs[j]) {
        cells[i].innerHTML = bombImg;
      }

    }

  }

  field.classList.add('lose');
  console.log(field.width);

  return bombImg;
}

function init(size, bombsCount) {
  gameStart(size, bombsCount);
}

init(10, 15)
