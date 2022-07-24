function gameStart(size) {
  let bombsCount = 1 /*size * 1.5*/;
  const field = document.querySelector('.field');
  const cellsCount = Math.pow(size, 2);
  const bombImg = '<img src="img/naval-mine.png" width="35" height="35">';

  field.style.gridTemplateColumns = `repeat(${size}, 40px)`;
  field.style.width = `${size * 40}px`;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children];

  for (let i = 0; i < cells.length; i++) {
    cells[i].id = i + 1;
  }

  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, bombsCount);
    console.log(bombs);

  let flags = [];

  field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    const index = event.target.id - 1;
    const column = index % size;
    const row = Math.floor((index) / size);
    open(row, column, index)
  });

  field.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    toggleFlag(event.target);
  })

  function open(row, column, index) {
    const cell = cells[index];
    cell.innerHTML = isBomb(row, column) ?
      gameOver(cells, bombs, bombImg, field) :
      bombsQuantity(row, column, index);
    cell.disabled = true;
    count = 0;
  }

  let count = 0;

  function toggleFlag(item) {
    let index = item.id - 1;

    if (flags.includes(index)) {
      flags = flags.filter(item => item != index);
      item.style.backgroundImage = 'inherit';
    } else {
      flags.push(index);
      item.style.backgroundImage = 'url(img/flag.svg)';
      console.log(flags);
    }
    gameWin(bombs, flags, field, cells);
  }

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
      return count;
    }

    return count;
  }

}

function gameWin(bombs, flags, field, cells) {
  if (bombs.sort().join(',') === flags.sort().join(',')) {
      field.classList.add('win');
      cells.map((item) => item.disabled = true);
  }
}

function gameOver(cells, bombs, bombImg, field) {

  cells.map((item) => item.disabled = true);

  for (let i = 0; i < cells.length; i++) {

    for (let j = 0; j < bombs.length; j++) {

      if (cells.indexOf(cells[i]) === bombs[j]) {
        cells[i].innerHTML = bombImg;
      }

    }

  }

  field.classList.add('lose');

  return bombImg;
}

function init(size, bombsCount) {
  gameStart(size, bombsCount);
}

init(10)
